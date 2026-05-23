/* ============================================
   MediLearn — COLECISTITIS 3D Scene
   Gallbladder, gallstones, bile duct,
   inflammatory particles
   ============================================ */

'use strict';

(function() {
  function initColecistitisScene() {
    if (typeof THREE === 'undefined' || !window.webGLSupported) return;

    const canvas = document.getElementById('colecistitis-canvas');
    if (!canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(56, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.set(0, 1, 11);
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
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const mainLight = new THREE.DirectionalLight(0xFFEECC, 1.3);
      mainLight.position.set(5, 8, 6);
      scene.add(mainLight);

      const warmUnder = new THREE.PointLight(0xFF8833, 1.5, 12);
      warmUnder.position.set(0, -5, 2);
      scene.add(warmUnder);

      const inflam = new THREE.PointLight(0xFF3333, 0, 10);
      inflam.position.set(0, 0, 3);
      scene.add(inflam); // animated

      // ─── Gallbladder ─────────────────────────
      // Flattened sphere (pear/teardrop shape)
      const gbGeo = new THREE.SphereGeometry(2.0, 24, 20);

      // Deform vertices for pear shape
      const positions = gbGeo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        // Flatten Y, elongate bottom, squeeze top
        const normalizedY = y / 2.0;
        const newY = y * 0.7 - 0.3; // flatten and shift down
        const scaleXZ = 1.0 + normalizedY * 0.3; // wider at bottom
        positions.setXYZ(i, x * scaleXZ, newY, z * scaleXZ);
      }
      gbGeo.computeVertexNormals();

      const gbMat = new THREE.MeshPhongMaterial({
        color: 0xAACC66,
        emissive: 0x112200,
        transparent: true,
        opacity: 0.82,
        shininess: 80,
        side: THREE.DoubleSide
      });
      const gallbladder = new THREE.Mesh(gbGeo, gbMat);
      gallbladder.position.set(0, 0.5, 0);
      scene.add(gallbladder);

      // Inner wall (inflammation layer)
      const innerGbGeo = new THREE.SphereGeometry(1.75, 20, 16);
      const innerGbMat = new THREE.MeshPhongMaterial({
        color: 0x885522,
        transparent: true,
        opacity: 0.55,
        shininess: 40,
        side: THREE.DoubleSide
      });
      const innerGb = new THREE.Mesh(innerGbGeo, innerGbMat);
      innerGb.position.copy(gallbladder.position);
      scene.add(innerGb);

      // ─── Bile Duct ────────────────────────────
      const ductGeo = new THREE.CylinderGeometry(0.3, 0.35, 2.5, 10);
      const ductMat = new THREE.MeshPhongMaterial({
        color: 0xCC9944,
        transparent: true,
        opacity: 0.8,
        shininess: 50
      });
      const bileduct = new THREE.Mesh(ductGeo, ductMat);
      bileduct.position.set(0, -2.5, 0);
      scene.add(bileduct);

      // ─── Gallstones ───────────────────────────
      const stones = [];
      const stonePositions = [
        [0, -1.2, 0.3],
        [-0.5, -1.5, -0.2],
        [0.4, -1.4, 0.1],
        [-0.2, -1.8, 0.4],
        [0.3, -1.0, -0.3]
      ];

      stonePositions.forEach((pos, i) => {
        const size = 0.15 + Math.random() * 0.18;
        const geo = new THREE.SphereGeometry(size, 10, 8);

        // Slightly deform stone geometry for natural look
        const stPos = geo.attributes.position;
        for (let j = 0; j < stPos.count; j++) {
          stPos.setX(j, stPos.getX(j) * (0.9 + Math.random() * 0.2));
          stPos.setY(j, stPos.getY(j) * (0.85 + Math.random() * 0.3));
          stPos.setZ(j, stPos.getZ(j) * (0.9 + Math.random() * 0.2));
        }
        geo.computeVertexNormals();

        const mat = new THREE.MeshPhongMaterial({
          color: 0x554433,
          emissive: 0x110A00,
          shininess: 20,
          transparent: false
        });
        const stone = new THREE.Mesh(geo, mat);
        stone.position.set(
          gallbladder.position.x + pos[0],
          gallbladder.position.y + pos[1],
          gallbladder.position.z + pos[2]
        );
        stone.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        scene.add(stone);
        stones.push(stone);
      });

      // ─── Inflammatory Particles ───────────────
      const inflParticles = new THREE.Group();
      const inflCount = 80;

      for (let i = 0; i < inflCount; i++) {
        const geo = new THREE.SphereGeometry(0.06 + Math.random() * 0.05, 5, 5);
        const isRed = Math.random() > 0.4;
        const mat = new THREE.MeshPhongMaterial({
          color: isRed ? 0xFF3311 : 0xFF7722,
          emissive: isRed ? 0x440000 : 0x331100,
          transparent: true,
          opacity: 0.7 + Math.random() * 0.3
        });
        const sphere = new THREE.Mesh(geo, mat);

        // Orbit surface of gallbladder
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 2.2 + Math.random() * 0.3;
        sphere.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.7 + 0.5,
          r * Math.sin(phi) * Math.sin(theta)
        );

        sphere.userData.theta = theta;
        sphere.userData.phi = phi;
        sphere.userData.r = r;
        sphere.userData.speed = 0.005 + Math.random() * 0.01;
        sphere.userData.phiSpeed = (Math.random() - 0.5) * 0.008;

        inflParticles.add(sphere);
      }
      scene.add(inflParticles);

      // ─── Subtle warm glow under gallbladder ───
      const bgGeo = new THREE.BufferGeometry();
      const bgPos = new Float32Array(200 * 3);
      for (let i = 0; i < 200 * 3; i++) bgPos[i] = (Math.random() - 0.5) * 28;
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
        color: 0x332211,
        size: 0.07,
        transparent: true,
        opacity: 0.5,
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

        // Gallbladder inflammation pulse: red → normal
        const inflammCycle = (Math.sin(time * 1.5) + 1) * 0.5;
        const r = 0.67 + inflammCycle * 0.4;
        const g = 0.8 - inflammCycle * 0.5;
        const b = 0.4 - inflammCycle * 0.3;
        gbMat.color.setRGB(r, g, b);
        gbMat.emissive.setRGB(inflammCycle * 0.15, 0, 0);

        // Inflammation light
        inflam.intensity = inflammCycle * 2.0;

        // Gallbladder pulse scale
        const pulse = 1 + 0.04 * Math.sin(time * 1.2);
        gallbladder.scale.set(pulse, pulse * 0.95, pulse);
        innerGb.scale.copy(gallbladder.scale);

        // Stones: subtle settling movement
        stones.forEach((stone, i) => {
          stone.position.y += Math.sin(time * 0.5 + i) * 0.001;
        });

        // Inflammatory particles orbit
        inflParticles.children.forEach(p => {
          p.userData.theta += p.userData.speed;
          p.userData.phi += p.userData.phiSpeed;

          const t = p.userData.theta;
          const ph = p.userData.phi;
          const r = p.userData.r;
          p.position.set(
            r * Math.sin(ph) * Math.cos(t),
            r * Math.cos(ph) * 0.7 + 0.5,
            r * Math.sin(ph) * Math.sin(t)
          );

          // Pulsing opacity with inflammation
          p.material.opacity = 0.5 + inflammCycle * 0.5;
        });

        // Camera gentle drift
        camera.position.x = Math.sin(time * 0.09) * 1.5;
        camera.position.y = 1 + Math.cos(time * 0.07) * 0.6;
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
      console.error('Colecistitis 3D scene error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColecistitisScene);
  } else {
    initColecistitisScene();
  }
})();
