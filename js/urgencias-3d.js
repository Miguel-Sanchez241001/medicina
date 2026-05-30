/* ============================================
   MediLearn — URGENCIAS ENDOCRINAS 3D Scene
   Thyroid storm: follicles, T3/T4 particles,
   tachycardia light, inflammatory neutrophils
   ============================================ */

'use strict';

(function() {
  function initUrgenciasScene() {
    if (typeof THREE === 'undefined' || !window.webGLSupported) return;

    const canvas = document.getElementById('urgencias-canvas');
    if (!canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(54, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 1, 13);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0A1628, 1);

      // ─── Lighting ─────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const mainLight = new THREE.DirectionalLight(0xFFEEAA, 1.2);
      mainLight.position.set(6, 8, 6);
      scene.add(mainLight);

      const tealFill = new THREE.PointLight(0x00CEC9, 0.8, 20);
      tealFill.position.set(-6, 2, 4);
      scene.add(tealFill);

      // Tachycardia pulsing red light
      const tachy = new THREE.PointLight(0xFF4444, 0, 14);
      tachy.position.set(0, 0, 4);
      scene.add(tachy);

      // ─── Thyroid Gland (butterfly shape) ──────
      // Two lobes + isthmus
      const thyroidGroup = new THREE.Group();

      const lobeMat = new THREE.MeshPhongMaterial({
        color: 0x88CC44,
        emissive: 0x113300,
        transparent: true,
        opacity: 0.88,
        shininess: 70
      });

      // Left lobe
      const leftLobe = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 18, 14),
        lobeMat.clone()
      );
      leftLobe.scale.set(0.75, 1.0, 0.65);
      leftLobe.position.set(-1.3, 0, 0);
      thyroidGroup.add(leftLobe);

      // Right lobe
      const rightLobe = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 18, 14),
        lobeMat.clone()
      );
      rightLobe.scale.set(0.75, 1.0, 0.65);
      rightLobe.position.set(1.3, 0, 0);
      thyroidGroup.add(rightLobe);

      // Isthmus
      const isthmus = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 2.2, 10),
        new THREE.MeshPhongMaterial({
          color: 0x77BB33,
          emissive: 0x112200,
          transparent: true,
          opacity: 0.8,
          shininess: 50
        })
      );
      isthmus.rotation.z = Math.PI / 2;
      thyroidGroup.add(isthmus);

      // Thyroid follicles (small yellow spheres inside lobes)
      const follicleData = [];
      for (let i = 0; i < 12; i++) {
        const side = i < 6 ? -1 : 1;
        const angle = (i % 6) / 6 * Math.PI * 2;
        const r = 0.4 + Math.random() * 0.35;
        const geo = new THREE.SphereGeometry(0.16 + Math.random() * 0.08, 8, 7);
        const mat = new THREE.MeshPhongMaterial({
          color: 0xFFDD44,
          emissive: 0x332200,
          transparent: true,
          opacity: 0.9,
          shininess: 90
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          side * 1.3 + r * Math.cos(angle) * 0.7,
          r * Math.sin(angle) * 0.6,
          r * Math.cos(angle) * 0.4
        );
        mesh.userData.phase = Math.random() * Math.PI * 2;
        follicleData.push(mesh);
        thyroidGroup.add(mesh);
      }

      scene.add(thyroidGroup);

      // ─── T3/T4 Hormone Particles (burst outward) ──
      const hormoneGroup = new THREE.Group();
      const hormoneData = [];
      for (let i = 0; i < 50; i++) {
        const geo = new THREE.SphereGeometry(0.065 + Math.random() * 0.04, 6, 5);
        const mat = new THREE.MeshPhongMaterial({
          color: 0xFDCB6E,
          emissive: 0x332200,
          transparent: true,
          opacity: 0.9,
          shininess: 120
        });
        const sphere = new THREE.Mesh(geo, mat);
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI;
        const r = 1.8 + Math.random() * 2.5;
        sphere.position.set(
          r * Math.cos(angle) * Math.cos(elevation),
          r * Math.sin(elevation),
          r * Math.sin(angle) * Math.cos(elevation)
        );
        sphere.userData.angle = angle;
        sphere.userData.elevation = elevation;
        sphere.userData.r = r;
        sphere.userData.speed = 0.015 + Math.random() * 0.02;
        sphere.userData.phase = Math.random() * Math.PI * 2;
        hormoneData.push(sphere);
        hormoneGroup.add(sphere);
      }
      scene.add(hormoneGroup);

      // ─── Neutrophils / Inflammatory cells ─────
      const neutroGroup = new THREE.Group();
      const neutroData = [];
      for (let i = 0; i < 35; i++) {
        // Multi-lobed nucleus (3 small spheres grouped)
        const cell = new THREE.Group();
        for (let j = 0; j < 3; j++) {
          const nGeo = new THREE.SphereGeometry(0.075, 7, 6);
          const nMat = new THREE.MeshPhongMaterial({
            color: j % 2 === 0 ? 0xFF6B35 : 0xFF4757,
            emissive: 0x220000,
            transparent: true,
            opacity: 0.8
          });
          const lobe = new THREE.Mesh(nGeo, nMat);
          lobe.position.set(
            (j - 1) * 0.1,
            (Math.random() - 0.5) * 0.08,
            0
          );
          cell.add(lobe);
        }

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 4.5 + Math.random() * 2;
        cell.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.6,
          r * Math.sin(phi) * Math.sin(theta)
        );
        cell.userData.theta = theta;
        cell.userData.phi = phi;
        cell.userData.r = r;
        cell.userData.speed = 0.006 + Math.random() * 0.008;
        cell.userData.phiSpeed = (Math.random() - 0.5) * 0.005;
        neutroData.push(cell);
        neutroGroup.add(cell);
      }
      scene.add(neutroGroup);

      // ─── Glucose molecules (hypoglycemia — tiny cubes) ──
      const glucoseGroup = new THREE.Group();
      const glucoseData = [];
      for (let i = 0; i < 20; i++) {
        const geo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const mat = new THREE.MeshPhongMaterial({
          color: 0x55EEBB,
          emissive: 0x001122,
          transparent: true,
          opacity: 0.75,
          shininess: 80
        });
        const mesh = new THREE.Mesh(geo, mat);
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI;
        const r = 3 + Math.random() * 3;
        mesh.position.set(
          r * Math.cos(angle) * Math.cos(elevation),
          r * Math.sin(elevation),
          r * Math.sin(angle) * Math.cos(elevation)
        );
        mesh.userData.angle = angle;
        mesh.userData.elevation = elevation;
        mesh.userData.r = r;
        mesh.userData.speed = 0.003 + Math.random() * 0.005;
        mesh.userData.rotSpeed = (Math.random() - 0.5) * 0.04;
        glucoseData.push(mesh);
        glucoseGroup.add(mesh);
      }
      scene.add(glucoseGroup);

      // ─── Background particle field ─────────────
      const bgGeo = new THREE.BufferGeometry();
      const bgCount = 280;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount * 3; i++) bgPos[i] = (Math.random() - 0.5) * 32;
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
        color: 0x00CEC9,
        size: 0.04,
        transparent: true,
        opacity: 0.2,
        depthWrite: false
      })));

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

        // Thyroid storm: pulse intensity
        const stormCycle = (Math.sin(time * 1.2) + 1) * 0.5;

        // Lobes pulse and color shift (hyperactive)
        const pulse = 1 + 0.08 * Math.sin(time * 2.5);
        leftLobe.scale.set(0.75 * pulse, pulse, 0.65 * pulse);
        rightLobe.scale.set(0.75 * pulse, pulse, 0.65 * pulse);

        const gr = 0.5 + stormCycle * 0.3;
        const gg = 0.7 + stormCycle * 0.1;
        leftLobe.material.color.setRGB(gr, gg, 0.2);
        rightLobe.material.color.setRGB(gr, gg, 0.2);

        // Tachycardia — fast pulsing red light (simulates HR ~140+)
        tachy.intensity = 1.5 + 1.5 * Math.sin(time * 9);

        // Follicles glow
        follicleData.forEach(f => {
          const glow = 0.8 + 0.2 * Math.sin(time * 3 + f.userData.phase);
          f.material.emissiveIntensity = glow * 0.5;
          f.scale.setScalar(glow);
        });

        // Hormone particles burst outward — reset from center
        hormoneData.forEach(sphere => {
          sphere.userData.angle += sphere.userData.speed * 0.4;
          sphere.userData.r += 0.006 + stormCycle * 0.004;
          if (sphere.userData.r > 7.5) {
            sphere.userData.r = 1.5 + Math.random() * 0.5;
            sphere.userData.angle = Math.random() * Math.PI * 2;
            sphere.userData.elevation = (Math.random() - 0.5) * Math.PI;
          }
          const a = sphere.userData.angle;
          const el = sphere.userData.elevation + Math.sin(time * 0.4 + sphere.userData.phase) * 0.015;
          const r = sphere.userData.r;
          sphere.position.set(
            r * Math.cos(a) * Math.cos(el),
            r * Math.sin(el),
            r * Math.sin(a) * Math.cos(el)
          );
          sphere.material.opacity = 0.5 + stormCycle * 0.5;
        });

        // Neutrophils orbit
        neutroData.forEach(cell => {
          cell.userData.theta += cell.userData.speed;
          cell.userData.phi += cell.userData.phiSpeed;
          const t = cell.userData.theta;
          const ph = cell.userData.phi;
          const r = cell.userData.r;
          cell.position.set(
            r * Math.sin(ph) * Math.cos(t),
            r * Math.cos(ph) * 0.6,
            r * Math.sin(ph) * Math.sin(t)
          );
        });

        // Glucose cubes drift and rotate
        glucoseData.forEach(mesh => {
          mesh.rotation.x += mesh.userData.rotSpeed;
          mesh.rotation.y += mesh.userData.rotSpeed * 0.7;
          mesh.userData.angle += mesh.userData.speed;
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
        camera.position.x = Math.sin(time * 0.08) * 1.8;
        camera.position.y = 1 + Math.cos(time * 0.06) * 0.8;
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
      console.error('Urgencias 3D scene error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUrgenciasScene);
  } else {
    initUrgenciasScene();
  }
})();
