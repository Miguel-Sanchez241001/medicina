/* ============================================
   MediLearn — ASMA 3D Scene
   Bronchial tube with bronchospasm animation,
   eosinophils, mast cells, IgE antibodies
   ============================================ */

'use strict';

(function() {
  function initAsmaScene() {
    if (typeof THREE === 'undefined' || !window.webGLSupported) return;

    const canvas = document.getElementById('asma-canvas');
    if (!canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 10);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0A1628, 1);

      // ─── Lighting ────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const cyanLight = new THREE.DirectionalLight(0x00D4FF, 1.2);
      cyanLight.position.set(5, 8, 5);
      scene.add(cyanLight);

      const purpleLight = new THREE.PointLight(0x7B2FBE, 1.5, 20);
      purpleLight.position.set(-4, -3, 4);
      scene.add(purpleLight);

      const warmLight = new THREE.PointLight(0xFF6B35, 0.8, 15);
      warmLight.position.set(3, -5, -3);
      scene.add(warmLight);

      // ─── Background Particle Field ───────────
      const bgGeo = new THREE.BufferGeometry();
      const bgCount = 300;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount * 3; i++) {
        bgPos[i] = (Math.random() - 0.5) * 30;
      }
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      const bgMat = new THREE.PointsMaterial({ color: 0x00D4FF, size: 0.04, transparent: true, opacity: 0.35, depthWrite: false });
      scene.add(new THREE.Points(bgGeo, bgMat));

      // ─── Bronchial Tube ─────────────────────
      class BronchialCurve extends THREE.Curve {
        getPoint(t) {
          const angle = t * Math.PI * 2 - Math.PI;
          const x = 3.5 * Math.cos(angle);
          const y = 1.8 * Math.sin(angle);
          const z = 0;
          return new THREE.Vector3(x, y, z);
        }
      }

      const bronchialCurve = new BronchialCurve();
      const tubeGeo = new THREE.TubeGeometry(bronchialCurve, 80, 0.55, 12, true);
      const tubeMat = new THREE.MeshPhongMaterial({
        color: 0xE88B8B,
        transparent: true,
        opacity: 0.75,
        shininess: 60,
        side: THREE.DoubleSide
      });
      const bronchialTube = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(bronchialTube);

      // Inner lumen
      const innerGeo = new THREE.TubeGeometry(bronchialCurve, 80, 0.28, 12, true);
      const innerMat = new THREE.MeshPhongMaterial({
        color: 0x8B2020,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const innerTube = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerTube);

      // ─── Eosinophils (yellow-orange particles) ─
      const eosiGeo = new THREE.BufferGeometry();
      const eosiCount = 200;
      const eosiPos = new Float32Array(eosiCount * 3);
      const eosiVel = new Float32Array(eosiCount * 3);
      const eosiAngle = new Float32Array(eosiCount);

      for (let i = 0; i < eosiCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 2 + Math.random() * 4;
        eosiPos[i * 3]     = r * Math.cos(a);
        eosiPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        eosiPos[i * 3 + 2] = r * Math.sin(a) * 0.3;
        eosiVel[i * 3]     = (Math.random() - 0.5) * 0.015;
        eosiVel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
        eosiVel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
        eosiAngle[i]       = Math.random() * Math.PI * 2;
      }

      eosiGeo.setAttribute('position', new THREE.BufferAttribute(eosiPos, 3));
      const eosiMat = new THREE.PointsMaterial({
        color: 0xFFBB33,
        size: 0.12,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false
      });
      const eosinophils = new THREE.Points(eosiGeo, eosiMat);
      scene.add(eosinophils);

      // ─── Mast Cells (larger magenta spheres) ──
      const mastCells = new THREE.Group();
      for (let i = 0; i < 50; i++) {
        const a = (i / 50) * Math.PI * 2;
        const r = 3.5 + Math.random() * 1.5;
        const geo = new THREE.SphereGeometry(0.15 + Math.random() * 0.1, 8, 8);
        const mat = new THREE.MeshPhongMaterial({
          color: 0xCC44AA,
          transparent: true,
          opacity: 0.85,
          emissive: 0x441122,
          shininess: 70
        });
        const sphere = new THREE.Mesh(geo, mat);
        sphere.position.set(
          r * Math.cos(a),
          (Math.random() - 0.5) * 6,
          r * Math.sin(a) * 0.25
        );
        sphere.userData.orbitAngle = a;
        sphere.userData.orbitRadius = r;
        sphere.userData.speed = 0.003 + Math.random() * 0.002;
        sphere.userData.phase = Math.random() * Math.PI * 2;
        mastCells.add(sphere);
      }
      scene.add(mastCells);

      // ─── IgE Antibodies (Y-shaped lines) ──────
      const igeGroup = new THREE.Group();
      const igeCount = 30;

      for (let i = 0; i < igeCount; i++) {
        const pts = [];
        const baseX = (Math.random() - 0.5) * 10;
        const baseY = (Math.random() - 0.5) * 8;
        const baseZ = (Math.random() - 0.5) * 3;
        const len = 0.4 + Math.random() * 0.2;

        pts.push(new THREE.Vector3(baseX, baseY - len, baseZ));
        pts.push(new THREE.Vector3(baseX, baseY, baseZ));
        pts.push(new THREE.Vector3(baseX, baseY, baseZ));
        pts.push(new THREE.Vector3(baseX - len * 0.6, baseY + len * 0.6, baseZ));
        pts.push(new THREE.Vector3(baseX, baseY, baseZ));
        pts.push(new THREE.Vector3(baseX + len * 0.6, baseY + len * 0.6, baseZ));

        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.45,
          linewidth: 1
        });
        igeGroup.add(new THREE.LineSegments(geo, mat));
      }
      scene.add(igeGroup);

      // ─── Mucus (green-yellow cluster inside tube) ─
      const mucusGroup = new THREE.Group();
      for (let i = 0; i < 25; i++) {
        const geo = new THREE.SphereGeometry(0.08 + Math.random() * 0.12, 6, 6);
        const mat = new THREE.MeshPhongMaterial({
          color: 0x88CC33,
          transparent: true,
          opacity: 0.7,
          shininess: 120
        });
        const sphere = new THREE.Mesh(geo, mat);
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.2;
        sphere.position.set(
          3.5 * Math.cos(a) + r,
          1.8 * Math.sin(a) * 0.5,
          (Math.random() - 0.5) * 0.3
        );
        mucusGroup.add(sphere);
      }
      scene.add(mucusGroup);

      // ─── Resize handling ─────────────────
      const resizeObs = new ResizeObserver(() => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      });
      resizeObs.observe(canvas);

      // ─── Animation Loop ───────────────────
      let frameId;
      let time = 0;

      function animate() {
        frameId = requestAnimationFrame(animate);
        time += 0.016;

        // Bronchospasm: tube contracts and expands
        const spasm = 0.85 + 0.15 * Math.sin(time * 1.2);
        const lumenSpasm = 0.7 + 0.3 * Math.sin(time * 1.2);
        bronchialTube.scale.set(spasm, spasm, 1);
        innerTube.scale.set(lumenSpasm, lumenSpasm, 1);

        // Tube color shifts during spasm (redder when contracted)
        const r = 0.55 + (1 - spasm) * 2;
        tubeMat.color.setRGB(r, 0.3 - (1 - spasm) * 0.1, 0.3 - (1 - spasm) * 0.1);

        // Drift eosinophils
        const eosiPosArr = eosinophils.geometry.attributes.position.array;
        for (let i = 0; i < eosiCount; i++) {
          eosiAngle[i] += eosiVel[i * 3] * 0.5;
          eosiPosArr[i * 3]     += eosiVel[i * 3];
          eosiPosArr[i * 3 + 1] += eosiVel[i * 3 + 1];
          eosiPosArr[i * 3 + 2] += eosiVel[i * 3 + 2];

          if (Math.abs(eosiPosArr[i * 3]) > 8) eosiVel[i * 3] *= -1;
          if (Math.abs(eosiPosArr[i * 3 + 1]) > 6) eosiVel[i * 3 + 1] *= -1;
          if (Math.abs(eosiPosArr[i * 3 + 2]) > 3) eosiVel[i * 3 + 2] *= -1;
        }
        eosinophils.geometry.attributes.position.needsUpdate = true;

        // Orbit mast cells
        mastCells.children.forEach(cell => {
          cell.userData.orbitAngle += cell.userData.speed;
          const a = cell.userData.orbitAngle;
          const r = cell.userData.orbitRadius;
          cell.position.x = r * Math.cos(a);
          cell.position.z = r * Math.sin(a) * 0.25;
          cell.position.y += Math.sin(time + cell.userData.phase) * 0.005;
        });

        // Slow camera orbit
        camera.position.x = Math.sin(time * 0.08) * 1.5;
        camera.position.y = Math.cos(time * 0.06) * 0.8;
        camera.lookAt(0, 0, 0);

        // IgE gentle sway
        igeGroup.rotation.z = Math.sin(time * 0.3) * 0.05;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(frameId);
        resizeObs.disconnect();
        renderer.dispose();
      });

    } catch (err) {
      console.error('ASMA 3D scene error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAsmaScene);
  } else {
    initAsmaScene();
  }
})();
