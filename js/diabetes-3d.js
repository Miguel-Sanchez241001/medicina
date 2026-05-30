/* ============================================
   MediLearn — DIABETES 3D Scene
   Insulin resistance: beta cell, glucose
   molecules, blocked receptors
   ============================================ */

'use strict';

(function() {
  function initDiabetesScene() {
    if (typeof THREE === 'undefined' || !window.webGLSupported) return;

    const canvas = document.getElementById('diabetes-canvas');
    if (!canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 12);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0A1628, 1);

      // ─── Lighting ────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const goldLight = new THREE.DirectionalLight(0xF9CA24, 1.2);
      goldLight.position.set(5, 8, 5);
      scene.add(goldLight);

      const purpleLight = new THREE.PointLight(0x6C5CE7, 1.0, 20);
      purpleLight.position.set(-5, -3, 4);
      scene.add(purpleLight);

      const redLight = new THREE.PointLight(0xE17055, 0.8, 15);
      redLight.position.set(3, -5, -3);
      scene.add(redLight);

      // ─── Background particle field ────────────
      const bgGeo = new THREE.BufferGeometry();
      const bgCount = 300;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount * 3; i++) bgPos[i] = (Math.random() - 0.5) * 30;
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
        color: 0xF9CA24, size: 0.03, transparent: true, opacity: 0.25, depthWrite: false
      })));

      // ─── Central beta cell ───────────────────
      const betaCellGeo = new THREE.SphereGeometry(1.2, 20, 18);
      const betaCellMat = new THREE.MeshPhongMaterial({
        color: 0xF9CA24,
        emissive: 0x443300,
        transparent: true,
        opacity: 0.9,
        shininess: 80
      });
      const betaCell = new THREE.Mesh(betaCellGeo, betaCellMat);
      scene.add(betaCell);

      // Beta cell nucleus
      const nucleusGeo = new THREE.SphereGeometry(0.5, 12, 10);
      const nucleusMat = new THREE.MeshPhongMaterial({
        color: 0xE17055,
        emissive: 0x330000,
        transparent: true,
        opacity: 0.8
      });
      scene.add(new THREE.Mesh(nucleusGeo, nucleusMat));

      // ─── Insulin particles ────────────────────
      const insulinGroup = new THREE.Group();
      const insulinData = [];
      for (let i = 0; i < 40; i++) {
        const geo = new THREE.SphereGeometry(0.07 + Math.random() * 0.05, 6, 6);
        const mat = new THREE.MeshPhongMaterial({
          color: 0x6C5CE7,
          emissive: 0x110088,
          transparent: true,
          opacity: 0.85
        });
        const sphere = new THREE.Mesh(geo, mat);
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI;
        const r = 1.5 + Math.random() * 3.5;
        sphere.position.set(
          r * Math.cos(angle) * Math.cos(elevation),
          r * Math.sin(elevation),
          r * Math.sin(angle) * Math.cos(elevation)
        );
        sphere.userData.angle = angle;
        sphere.userData.elevation = elevation;
        sphere.userData.r = r;
        sphere.userData.speed = 0.008 + Math.random() * 0.012;
        sphere.userData.phase = Math.random() * Math.PI * 2;
        insulinData.push(sphere);
        insulinGroup.add(sphere);
      }
      scene.add(insulinGroup);

      // ─── Cell receptors (blocked / resistant) ─
      const receptors = new THREE.Group();
      const receptorData = [];
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * 1.2;
        const r = 4.5 + Math.random() * 0.5;
        const geo = new THREE.SphereGeometry(0.2, 8, 8);
        const mat = new THREE.MeshPhongMaterial({
          color: 0xAAAAAA,
          emissive: 0x111111,
          transparent: true,
          opacity: 0.75,
          shininess: 30
        });
        const sphere = new THREE.Mesh(geo, mat);
        sphere.position.set(
          r * Math.cos(angle) * Math.cos(elevation),
          r * Math.sin(elevation),
          r * Math.sin(angle) * Math.cos(elevation)
        );
        sphere.userData.baseAngle = angle;
        sphere.userData.elevation = elevation;
        sphere.userData.r = r;
        sphere.userData.speed = 0.003 + Math.random() * 0.002;
        receptorData.push({ mesh: sphere, mat });
        receptors.add(sphere);
      }
      scene.add(receptors);

      // ─── Glucose molecules (floating icosahedra) ─
      const glucoseGroup = new THREE.Group();
      const glucoseData = [];
      for (let i = 0; i < 30; i++) {
        const geo = new THREE.IcosahedronGeometry(0.14 + Math.random() * 0.08, 0);
        const mat = new THREE.MeshPhongMaterial({
          color: 0xFDCB6E,
          emissive: 0x332200,
          transparent: true,
          opacity: 0.9,
          shininess: 100
        });
        const mesh = new THREE.Mesh(geo, mat);
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI;
        const r = 3.5 + Math.random() * 2;
        mesh.position.set(
          r * Math.cos(angle) * Math.cos(elevation),
          r * Math.sin(elevation),
          r * Math.sin(angle) * Math.cos(elevation)
        );
        mesh.userData.angle = angle;
        mesh.userData.elevation = elevation;
        mesh.userData.r = r;
        mesh.userData.speed = 0.005 + Math.random() * 0.008;
        mesh.userData.rotSpeed = new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        );
        glucoseData.push(mesh);
        glucoseGroup.add(mesh);
      }
      scene.add(glucoseGroup);

      // ─── Resize ───────────────────────────────
      const resizeObs = new ResizeObserver(() => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      });
      resizeObs.observe(canvas);

      // ─── Animation Loop ───────────────────────
      let frameId, time = 0;

      function animate() {
        frameId = requestAnimationFrame(animate);
        time += 0.016;

        // Beta cell pulsing (secretion rhythm)
        const pulse = 1 + 0.06 * Math.sin(time * 1.5);
        betaCell.scale.setScalar(pulse);

        // Insulin drift outward — reset when too far
        insulinData.forEach(sphere => {
          sphere.userData.angle += sphere.userData.speed * 0.5;
          const el = sphere.userData.elevation + Math.sin(time * 0.3 + sphere.userData.phase) * 0.02;
          sphere.userData.r += 0.003;
          if (sphere.userData.r > 6.5) {
            sphere.userData.r = 1.5 + Math.random() * 1;
            sphere.userData.angle = Math.random() * Math.PI * 2;
            sphere.userData.elevation = (Math.random() - 0.5) * Math.PI;
          }
          const a = sphere.userData.angle;
          const r = sphere.userData.r;
          sphere.position.set(
            r * Math.cos(a) * Math.cos(el),
            r * Math.sin(el),
            r * Math.sin(a) * Math.cos(el)
          );
        });

        // Receptors orbit + turn red (insulin resistance)
        receptorData.forEach(({ mesh, mat }, i) => {
          mesh.userData.baseAngle += mesh.userData.speed;
          const a = mesh.userData.baseAngle;
          const el = mesh.userData.elevation;
          const r = mesh.userData.r;
          mesh.position.set(
            r * Math.cos(a) * Math.cos(el),
            r * Math.sin(el),
            r * Math.sin(a) * Math.cos(el)
          );
          const redness = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.8);
          mat.color.setRGB(0.6 + redness * 0.4, 0.4 - redness * 0.2, 0.2 - redness * 0.1);
        });

        // Glucose rotate and orbit
        glucoseData.forEach(mesh => {
          mesh.rotation.x += mesh.userData.rotSpeed.x;
          mesh.rotation.y += mesh.userData.rotSpeed.y;
          mesh.userData.angle += mesh.userData.speed * 0.3;
          const a = mesh.userData.angle;
          const el = mesh.userData.elevation;
          const r = mesh.userData.r;
          mesh.position.set(
            r * Math.cos(a) * Math.cos(el),
            r * Math.sin(el),
            r * Math.sin(a) * Math.cos(el)
          );
        });

        // Camera slow orbit
        camera.position.x = Math.sin(time * 0.07) * 2;
        camera.position.y = Math.cos(time * 0.05) * 1;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(frameId);
        resizeObs.disconnect();
        renderer.dispose();
      });

    } catch (err) {
      console.error('Diabetes 3D scene error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDiabetesScene);
  } else {
    initDiabetesScene();
  }
})();
