/* ============================================
   MediLearn — Three.js Engine
   ============================================ */

'use strict';

(function(global) {

  // Track all active scenes for cleanup
  global.activeScenes = global.activeScenes || [];

  /**
   * Initialize a Three.js scene on a canvas element
   * @param {string} canvasId - ID of the canvas element
   * @param {number} bgColor - Background color as hex number
   * @returns {Object|null} - {scene, camera, renderer, animate, dispose} or null on failure
   */
  function initScene(canvasId, bgColor) {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded');
      return null;
    }

    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn('Canvas not found:', canvasId);
      return null;
    }

    let renderer, scene, camera, animFrameId;

    try {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 8);

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });

      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(bgColor !== undefined ? bgColor : 0x0A1628, 1);

      // Handle resize
      const resizeObserver = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      });
      resizeObserver.observe(canvas);

      // Animation loop
      const animCallbacks = [];

      function animate() {
        animFrameId = requestAnimationFrame(animate);
        animCallbacks.forEach(cb => cb());
        renderer.render(scene, camera);
      }

      function addAnimCallback(cb) {
        animCallbacks.push(cb);
      }

      // Dispose
      function dispose() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        resizeObserver.disconnect();

        scene.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });

        renderer.dispose();

        // Remove from global list
        const idx = global.activeScenes.indexOf(sceneObj);
        if (idx > -1) global.activeScenes.splice(idx, 1);
      }

      const sceneObj = { scene, camera, renderer, animate, addAnimCallback, dispose };
      global.activeScenes.push(sceneObj);

      return sceneObj;

    } catch (err) {
      console.error('Three.js scene init failed:', err);
      if (renderer) renderer.dispose();
      return null;
    }
  }

  /**
   * Create a particle system
   * @param {number} count - Number of particles
   * @param {number} color - Particle color (hex)
   * @param {number} spread - Spread radius
   * @param {number} [size=0.05] - Particle size
   * @returns {THREE.Points} - Particle mesh
   */
  function createParticleSystem(count, color, spread, size) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i]     = (Math.random() - 0.5) * spread * 2;
      positions[i + 1] = (Math.random() - 0.5) * spread * 2;
      positions[i + 2] = (Math.random() - 0.5) * spread * 2;

      velocities[i]     = (Math.random() - 0.5) * 0.002;
      velocities[i + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i + 2] = (Math.random() - 0.5) * 0.002;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.userData.velocities = velocities;

    const material = new THREE.PointsMaterial({
      color: color,
      size: size || 0.05,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);

    // Store update function
    points.userData.update = function() {
      const pos = points.geometry.attributes.position.array;
      const vel = points.geometry.userData.velocities;
      const half = spread;

      for (let i = 0; i < pos.length; i += 3) {
        pos[i]     += vel[i];
        pos[i + 1] += vel[i + 1];
        pos[i + 2] += vel[i + 2];

        // Wrap around
        if (Math.abs(pos[i]) > half) vel[i] *= -1;
        if (Math.abs(pos[i + 1]) > half) vel[i + 1] *= -1;
        if (Math.abs(pos[i + 2]) > half) vel[i + 2] *= -1;
      }

      points.geometry.attributes.position.needsUpdate = true;
    };

    return points;
  }

  /**
   * Create a sphere mesh
   * @param {number} radius
   * @param {number} color
   * @param {boolean} wireframe
   * @param {Object} [materialOptions]
   * @returns {THREE.Mesh}
   */
  function createSphere(radius, color, wireframe, materialOptions) {
    const geometry = new THREE.SphereGeometry(radius, 32, 16);
    const mat = Object.assign({
      color: color,
      wireframe: wireframe || false,
      transparent: true,
      opacity: wireframe ? 0.3 : 0.85
    }, materialOptions || {});

    let material;
    if (mat.emissive !== undefined) {
      material = new THREE.MeshStandardMaterial(mat);
    } else {
      material = new THREE.MeshPhongMaterial(mat);
    }

    return new THREE.Mesh(geometry, material);
  }

  /**
   * Create a tube along a path
   * @param {THREE.Curve} path
   * @param {number} radius
   * @param {number} color
   * @param {boolean} wireframe
   * @returns {THREE.Mesh}
   */
  function createTube(path, radius, color, wireframe) {
    const geometry = new THREE.TubeGeometry(path, 64, radius, 12, false);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      wireframe: wireframe || false,
      transparent: true,
      opacity: 0.85,
      shininess: 80
    });

    return new THREE.Mesh(geometry, material);
  }

  /**
   * Add orbital particles around a center mesh
   * @param {THREE.Scene} scene
   * @param {THREE.Object3D} centerMesh
   * @param {number} count
   * @param {number} color
   * @param {number} speed
   * @param {number} orbitRadius
   * @returns {THREE.Group}
   */
  function addOrbitalParticles(scene, centerMesh, count, color, speed, orbitRadius) {
    const group = new THREE.Group();
    const radius = orbitRadius || 3;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const tiltAngle = (Math.random() - 0.5) * Math.PI;
      const geo = new THREE.SphereGeometry(0.06, 8, 8);
      const mat = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.7
      });
      const mesh = new THREE.Mesh(geo, mat);

      mesh.userData.angle = angle;
      mesh.userData.tilt = tiltAngle;
      mesh.userData.r = radius + (Math.random() - 0.5) * 0.5;
      mesh.userData.speed = speed * (0.8 + Math.random() * 0.4);

      group.add(mesh);
    }

    if (centerMesh) {
      group.position.copy(centerMesh.position);
    }

    scene.add(group);

    group.userData.update = function(time) {
      group.children.forEach(mesh => {
        const a = mesh.userData.angle + time * mesh.userData.speed;
        const r = mesh.userData.r;
        const tilt = mesh.userData.tilt;
        mesh.position.x = r * Math.cos(a) * Math.cos(tilt);
        mesh.position.y = r * Math.sin(tilt) * 0.5;
        mesh.position.z = r * Math.sin(a) * Math.cos(tilt);
      });
    };

    return group;
  }

  /**
   * Dispose scene and free GPU resources
   * @param {THREE.WebGLRenderer} renderer
   */
  function disposeScene(renderer) {
    if (renderer) renderer.dispose();
  }

  /**
   * Create ambient + directional lighting
   * @param {THREE.Scene} scene
   * @param {number} ambientIntensity
   * @param {number} dirIntensity
   * @param {number} dirColor
   */
  function addLighting(scene, ambientIntensity, dirIntensity, dirColor) {
    const ambient = new THREE.AmbientLight(0xffffff, ambientIntensity || 0.4);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(dirColor || 0x00D4FF, dirIntensity || 1.2);
    dir.position.set(5, 8, 5);
    scene.add(dir);

    const fill = new THREE.DirectionalLight(0x7B2FBE, 0.4);
    fill.position.set(-5, -3, -5);
    scene.add(fill);

    return { ambient, dir, fill };
  }

  // Expose API
  global.ThreeEngine = {
    initScene,
    createParticleSystem,
    createSphere,
    createTube,
    addOrbitalParticles,
    disposeScene,
    addLighting
  };

})(window);
