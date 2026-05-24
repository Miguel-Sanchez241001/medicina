/* ============================================
   MediLearn — EPOC 3D Scene
   Alveoli, emphysema animation, smoke particles,
   cylindrical bronchus
   ============================================ */

'use strict';

(function() {
  function initEpocScene() {
    if (typeof THREE === 'undefined' || !window.webGLSupported) return;

    const canvas = document.getElementById('epoc-canvas');
    if (!canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(58, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 2, 12);
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

      // ─── Lighting ────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));

      const keyLight = new THREE.DirectionalLight(0xFFCCBB, 1.2);
      keyLight.position.set(5, 8, 6);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(0x7B2FBE, 0.8, 20);
      fillLight.position.set(-6, -2, -4);
      scene.add(fillLight);

      const groundLight = new THREE.PointLight(0xFF4444, 0.5, 12);
      groundLight.position.set(0, -6, 0);
      scene.add(groundLight);

      // ─── Alveoli ─────────────────────────
      const alveoli = [];
      const alveoliCount = 18;

      const positions = [
        [-4, 2, -1], [-2, 2.5, 0], [0, 2, -0.5], [2, 2.3, 0], [4, 2, -1],
        [-3.5, 0, 0], [-1.5, 0.3, -0.5], [0.5, 0, 0], [2.5, 0.2, -0.5], [4, 0.1, 0],
        [-4, -2, -1], [-2, -1.8, 0], [0, -2, -0.5], [2, -1.9, 0], [3.5, -2, -1],
        [-1, 1.2, 2], [1, -0.8, 2], [0, 0, -2]
      ];

      const baseScales = [0.5, 0.7, 0.6, 0.65, 0.55, 0.8, 0.6, 0.75, 0.5, 0.65, 0.6, 0.55, 0.7, 0.6, 0.5, 0.65, 0.7, 0.55];
      const isDestroyed = [false, false, true, false, true, false, true, false, false, true, true, false, false, true, false, false, true, false];

      positions.forEach((pos, i) => {
        const size = baseScales[i] || 0.6;
        const destroyed = isDestroyed[i] || false;
        const geo = new THREE.SphereGeometry(size, 12, 10);

        let color, emissive;
        if (destroyed) {
          color = 0x8B1A1A;
          emissive = 0x3A0A0A;
        } else {
          color = 0xFFCCCC;
          emissive = 0x220808;
        }

        const mat = new THREE.MeshPhongMaterial({
          color: color,
          emissive: emissive,
          transparent: true,
          opacity: destroyed ? 0.7 : 0.8,
          shininess: 30,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(pos[0], pos[1], pos[2]);
        mesh.userData.baseScale = size;
        mesh.userData.destroyed = destroyed;
        mesh.userData.inflateRate = destroyed ? 0.0015 : 0.0008;
        mesh.userData.phase = Math.random() * Math.PI * 2;
        mesh.userData.maxScale = destroyed ? size * 2.8 : size * 1.15;
        mesh.userData.growing = true;
        mesh.userData.currentScale = size;

        scene.add(mesh);
        alveoli.push(mesh);
      });

      // ─── Bronchus ────────────────────────
      const bronchusGeo = new THREE.CylinderGeometry(0.35, 0.45, 4, 12);
      const bronchusMat = new THREE.MeshPhongMaterial({
        color: 0xCC9988,
        transparent: true,
        opacity: 0.85,
        shininess: 60
      });
      const bronchus = new THREE.Mesh(bronchusGeo, bronchusMat);
      bronchus.position.set(0, -4.5, 0);
      scene.add(bronchus);

      const mucusGeo = new THREE.CylinderGeometry(0.15, 0.18, 4.2, 12);
      const mucusMat = new THREE.MeshPhongMaterial({
        color: 0x88AA22,
        transparent: true,
        opacity: 0.7,
        shininess: 100
      });
      const mucusTube = new THREE.Mesh(mucusGeo, mucusMat);
      mucusTube.position.set(0, -4.5, 0);
      scene.add(mucusTube);

      // ─── Smoke Particles ───────────────────
      const smokeGeo = new THREE.BufferGeometry();
      const smokeCount = 200;
      const smokePosArr = new Float32Array(smokeCount * 3);
      const smokeVelArr = new Float32Array(smokeCount * 3);

      for (let i = 0; i < smokeCount; i++) {
        smokePosArr[i * 3]     = (Math.random() - 0.5) * 4;
        smokePosArr[i * 3 + 1] = -8 + Math.random() * 3;
        smokePosArr[i * 3 + 2] = (Math.random() - 0.5) * 2;
        smokeVelArr[i * 3]     = (Math.random() - 0.5) * 0.01;
        smokeVelArr[i * 3 + 1] = 0.015 + Math.random() * 0.02;
        smokeVelArr[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
      }

      smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePosArr, 3));
      const smokeMat = new THREE.PointsMaterial({
        color: 0xAAAAAA,
        size: 0.18,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        depthWrite: false
      });
      const smoke = new THREE.Points(smokeGeo, smokeMat);
      scene.add(smoke);

      const bgGeo = new THREE.BufferGeometry();
      const bgPos = new Float32Array(200 * 3);
      for (let i = 0; i < 200 * 3; i++) bgPos[i] = (Math.random() - 0.5) * 35;
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({ color: 0x334466, size: 0.05, transparent: true, opacity: 0.5, depthWrite: false })));

      // ─── Resize ──────────────────────────
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
      let totalInflation = 0;

      function animate() {
        frameId = requestAnimationFrame(animate);
        time += 0.016;
        totalInflation += 0.001;

        alveoli.forEach(mesh => {
          if (mesh.userData.destroyed) {
            const inflated = Math.min(mesh.userData.maxScale, mesh.userData.currentScale + mesh.userData.inflateRate);
            mesh.userData.currentScale = inflated;
            mesh.scale.setScalar(inflated / mesh.userData.baseScale);
            const breathe = 1 + 0.06 * Math.sin(time * 0.6 + mesh.userData.phase);
            mesh.scale.multiplyScalar(breathe);
          } else {
            const breathe = 1 + 0.08 * Math.sin(time * 1.2 + mesh.userData.phase);
            mesh.scale.setScalar(breathe);
          }
        });

        const mucusScale = 1 + Math.min(totalInflation * 0.3, 0.5);
        mucusTube.scale.set(mucusScale, 1, mucusScale);

        const posArr = smoke.geometry.attributes.position.array;
        for (let i = 0; i < smokeCount; i++) {
          posArr[i * 3]     += smokeVelArr[i * 3];
          posArr[i * 3 + 1] += smokeVelArr[i * 3 + 1];
          posArr[i * 3 + 2] += smokeVelArr[i * 3 + 2];

          if (posArr[i * 3 + 1] > 6) {
            posArr[i * 3]     = (Math.random() - 0.5) * 4;
            posArr[i * 3 + 1] = -8;
            posArr[i * 3 + 2] = (Math.random() - 0.5) * 2;
          }

          posArr[i * 3] += Math.sin(time + i) * 0.003;
        }
        smoke.geometry.attributes.position.needsUpdate = true;
        smokeMat.opacity = 0.3 + 0.1 * Math.sin(time * 0.5);

        camera.position.x = Math.sin(time * 0.07) * 2;
        camera.position.y = 2 + Math.cos(time * 0.05) * 0.5;
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
      console.error('EPOC 3D scene error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEpocScene);
  } else {
    initEpocScene();
  }
})();
