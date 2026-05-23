/* ============================================
   MediLearn — TBC 3D Scene
   Granuloma structure with concentric rings,
   M. tuberculosis bacteria, macrophages
   ============================================ */

'use strict';

(function() {
  function initTbcScene() {
    if (typeof THREE === 'undefined' || !window.webGLSupported) return;

    const canvas = document.getElementById('tbc-canvas');
    if (!canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 3, 12);
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

      // ─── Lighting ────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const mainLight = new THREE.DirectionalLight(0xFFDDBB, 1.3);
      mainLight.position.set(6, 8, 5);
      scene.add(mainLight);

      const cyanFill = new THREE.PointLight(0x00D4FF, 0.6, 18);
      cyanFill.position.set(-5, 2, 5);
      scene.add(cyanFill);

      const innerGlow = new THREE.PointLight(0xFFCC44, 1.2, 8);
      innerGlow.position.set(0, 0, 1);
      scene.add(innerGlow);

      // ─── GRANULOMA ───────────────────────────

      // Center: Caseous necrosis (dark yellow/caseous solid sphere)
      const necrosisGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const necrosisMat = new THREE.MeshPhongMaterial({
        color: 0xCCA433,
        emissive: 0x443300,
        shininess: 20,
        transparent: true,
        opacity: 0.95
      });
      const necrosis = new THREE.Mesh(necrosisGeo, necrosisMat);
      scene.add(necrosis);

      // Ring 1: Epithelioid macrophages (beige, ~8)
      const macrophages = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const geo = new THREE.SphereGeometry(0.32, 12, 10);
        const mat = new THREE.MeshPhongMaterial({
          color: 0xDDB88C,
          emissive: 0x221100,
          shininess: 40,
          transparent: true,
          opacity: 0.9
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          1.5 * Math.cos(angle),
          1.5 * Math.sin(angle) * 0.3,
          1.5 * Math.sin(angle)
        );
        mesh.userData.baseAngle = angle;
        mesh.userData.orbitRadius = 1.5;
        macrophages.add(mesh);
      }
      scene.add(macrophages);

      // Ring 2: Lymphocytes (small blue, ~16)
      const lymphocytes = new THREE.Group();
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const geo = new THREE.SphereGeometry(0.18, 8, 8);
        const mat = new THREE.MeshPhongMaterial({
          color: 0x4488DD,
          emissive: 0x001133,
          shininess: 60,
          transparent: true,
          opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);
        const r = 2.6 + (Math.random() - 0.5) * 0.3;
        mesh.position.set(
          r * Math.cos(angle),
          r * Math.sin(angle) * 0.25,
          r * Math.sin(angle)
        );
        mesh.userData.baseAngle = angle;
        mesh.userData.orbitRadius = r;
        lymphocytes.add(mesh);
      }
      scene.add(lymphocytes);

      // Outer: Fibrosis shell (grey TorusGeometry)
      const fibrosisGeo = new THREE.TorusGeometry(3.4, 0.25, 12, 60);
      const fibrosisMat = new THREE.MeshPhongMaterial({
        color: 0x888888,
        transparent: true,
        opacity: 0.55,
        shininess: 30
      });
      const fibrosis = new THREE.Mesh(fibrosisGeo, fibrosisMat);
      fibrosis.rotation.x = Math.PI / 2;
      scene.add(fibrosis);

      // Second fibrosis ring (rotated)
      const fibrosis2 = fibrosis.clone();
      fibrosis2.rotation.x = Math.PI / 3;
      fibrosis2.rotation.y = Math.PI / 4;
      scene.add(fibrosis2);

      // ─── M. tuberculosis bacteria ─────────────
      // Rod-shaped: Cylinder + two hemisphere caps
      const bacteria = new THREE.Group();
      const bacteriaData = [];

      for (let i = 0; i < 20; i++) {
        const bacterium = new THREE.Group();

        // Body (cylinder)
        const bodyGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.35, 8);
        const bodyMat = new THREE.MeshPhongMaterial({
          color: 0x8B1A1A,
          emissive: 0x330000,
          shininess: 60
        });
        bacterium.add(new THREE.Mesh(bodyGeo, bodyMat));

        // Caps (hemisphere approximation with sphere clipped)
        const capGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const cap1 = new THREE.Mesh(capGeo, bodyMat.clone());
        const cap2 = new THREE.Mesh(capGeo, bodyMat.clone());
        cap1.position.y = 0.175;
        cap2.position.y = -0.175;
        bacterium.add(cap1, cap2);

        // Position: some near macrophages (being engulfed), rest drifting
        const engulfed = i < 5;
        let px, py, pz;
        if (engulfed) {
          const macIdx = i % 8;
          const macAngle = (macIdx / 8) * Math.PI * 2;
          px = 1.5 * Math.cos(macAngle) + (Math.random() - 0.5) * 0.3;
          py = 1.5 * Math.sin(macAngle) * 0.3;
          pz = 1.5 * Math.sin(macAngle) + (Math.random() - 0.5) * 0.3;
        } else {
          const r = 2 + Math.random() * 5;
          const a = Math.random() * Math.PI * 2;
          const b = Math.random() * Math.PI;
          px = r * Math.sin(b) * Math.cos(a);
          py = r * Math.cos(b) * 0.4;
          pz = r * Math.sin(b) * Math.sin(a);
        }

        bacterium.position.set(px, py, pz);
        bacterium.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        bacteriaData.push({
          mesh: bacterium,
          rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          ),
          driftSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.005
          ),
          engulfed: engulfed
        });

        bacteria.add(bacterium);
      }
      scene.add(bacteria);

      // ─── Background particles ──────────────────
      const bgGeo = new THREE.BufferGeometry();
      const bgPos = new Float32Array(250 * 3);
      for (let i = 0; i < 250 * 3; i++) bgPos[i] = (Math.random() - 0.5) * 30;
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
        color: 0x223344,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        depthWrite: false
      })));

      // ─── Resize ──────────────────────────────
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
      let frameId;
      let time = 0;

      function animate() {
        frameId = requestAnimationFrame(animate);
        time += 0.016;

        // Granuloma pulsation
        const pulse = 1 + 0.04 * Math.sin(time * 0.8);
        necrosis.scale.setScalar(pulse);
        innerGlow.intensity = 1.0 + 0.5 * Math.sin(time * 0.8);

        // Macrophage ring slow rotation
        macrophages.rotation.y = time * 0.12;
        macrophages.rotation.z = Math.sin(time * 0.08) * 0.15;

        // Lymphocyte ring rotation (opposite direction)
        lymphocytes.rotation.y = -time * 0.08;
        lymphocytes.rotation.x = Math.sin(time * 0.05) * 0.1;

        // Fibrosis shell rotation
        fibrosis.rotation.y = time * 0.04;
        fibrosis2.rotation.y = -time * 0.03;
        fibrosis2.rotation.z = time * 0.02;

        // Bacteria rotation and drift
        bacteriaData.forEach(b => {
          b.mesh.rotation.x += b.rotSpeed.x;
          b.mesh.rotation.y += b.rotSpeed.y;
          b.mesh.rotation.z += b.rotSpeed.z;

          if (!b.engulfed) {
            b.mesh.position.add(b.driftSpeed);
            // Bounce back
            if (Math.abs(b.mesh.position.x) > 7) b.driftSpeed.x *= -1;
            if (Math.abs(b.mesh.position.y) > 4) b.driftSpeed.y *= -1;
            if (Math.abs(b.mesh.position.z) > 7) b.driftSpeed.z *= -1;
          } else {
            // Engulfed bacteria subtly move inside macrophage
            b.mesh.position.y += Math.sin(time * 2 + b.driftSpeed.x * 100) * 0.002;
          }
        });

        // Camera slow orbit
        const orbitRadius = 12;
        camera.position.x = Math.sin(time * 0.1) * orbitRadius * 0.3;
        camera.position.z = Math.cos(time * 0.1) * orbitRadius;
        camera.position.y = 3 + Math.sin(time * 0.07) * 1;
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
      console.error('TBC 3D scene error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTbcScene);
  } else {
    initTbcScene();
  }
})();
