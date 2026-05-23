/* ============================================
   MediLearn — Main JavaScript
   ============================================ */

'use strict';

// ============================================
// Scroll Progress Bar
// ============================================
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scrolled state
  if (nav) {
    function onScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close when link clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.includes(currentPage.replace('.html', '')))) {
      link.classList.add('active');
    }
  });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Tab System
// ============================================
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container');

  tabContainers.forEach(container => {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');
    const loadedTabs = new Set();

    function activateTab(index) {
      tabBtns.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-selected', i === index);
      });

      tabPanels.forEach((panel, i) => {
        const isActive = i === index;
        panel.classList.toggle('active', isActive);

        // Lazy load tab content
        if (isActive && !loadedTabs.has(i)) {
          loadedTabs.add(i);
          // Trigger reveal animations in the newly visible panel
          panel.querySelectorAll('.animated, .animated-left, .animated-right, .animated-scale').forEach(el => {
            setTimeout(() => el.classList.add('animate-in'), 50);
          });
        }
      });
    }

    tabBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => activateTab(index));
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0);
    });

    tabPanels.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
    });

    // Activate first tab and mark it as loaded
    if (tabBtns.length > 0) {
      loadedTabs.add(0);
    }
  });
}

// ============================================
// IntersectionObserver for Reveal Animations
// ============================================
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in', 'revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.animated, .animated-left, .animated-right, .animated-scale, .reveal').forEach(el => {
    observer.observe(el);
  });

  // Observe cards with stagger
  document.querySelectorAll('.disease-card, .feature-card, .drug-card, .cell-card, .info-card').forEach((el, index) => {
    el.style.transitionDelay = `${index * 80}ms`;
    observer.observe(el);
  });
}

// ============================================
// Tooltip System
// ============================================
function initTooltips() {
  // CSS-based tooltips handle most cases via [data-tooltip]
  // This adds dynamic tooltip positioning for long tooltips

  const tooltipEls = document.querySelectorAll('[data-tooltip]');

  tooltipEls.forEach(el => {
    el.addEventListener('mouseenter', function() {
      const rect = this.getBoundingClientRect();
      // Check if tooltip would go off screen
      if (rect.left < 150) {
        this.style.setProperty('--tooltip-left', '0');
        this.style.setProperty('--tooltip-transform', 'translateX(0)');
      } else if (rect.right > window.innerWidth - 150) {
        this.style.setProperty('--tooltip-left', 'auto');
        this.style.setProperty('--tooltip-right', '0');
      }
    });
  });
}

// ============================================
// Card 3D Tilt Effect
// ============================================
function initCardTilt() {
  document.querySelectorAll('.disease-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;

      this.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform 500ms ease';
      setTimeout(() => {
        this.style.transition = '';
      }, 500);
    });
  });
}

// ============================================
// Stats Counter Animation
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1500;
        const start = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ============================================
// WebGL Fallback Detection
// ============================================
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

window.webGLSupported = checkWebGLSupport();

// Apply fallback class if needed
if (!window.webGLSupported) {
  document.querySelectorAll('.hero-canvas').forEach(canvas => {
    const fallback = document.createElement('div');
    fallback.className = 'hero-canvas-fallback anim-gradient';
    fallback.style.cssText = `
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #0A1628, #0D1F3C, #1a0a3a, #0A1628);
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
    `;
    canvas.parentNode.insertBefore(fallback, canvas.nextSibling);
    canvas.style.display = 'none';
  });
}

// ============================================
// Module Page Specific
// ============================================
function initModulePage() {
  // Ensure first tab is active on load
  const firstTabBtn = document.querySelector('.tab-btn');
  if (firstTabBtn) {
    firstTabBtn.click();
  }
}

// ============================================
// Keyboard Accessibility
// ============================================
function initKeyboardNav() {
  // Tab navigation with arrow keys
  document.querySelectorAll('.tabs-header').forEach(header => {
    const tabs = header.querySelectorAll('.tab-btn');

    tabs.forEach((tab, index) => {
      tab.addEventListener('keydown', (e) => {
        let newIndex;
        if (e.key === 'ArrowRight') {
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else {
          return;
        }
        e.preventDefault();
        tabs[newIndex].click();
        tabs[newIndex].focus();
      });
    });
  });
}

// ============================================
// Page Load Performance
// ============================================
function initPageLoad() {
  // Add loaded class for entrance animations
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  });

  // Defer non-critical initializations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

// ============================================
// Main Init
// ============================================
function init() {
  initScrollProgress();
  initNavigation();
  initSmoothScroll();
  initTabs();
  initRevealAnimations();
  initTooltips();
  initCardTilt();
  initCounters();
  initKeyboardNav();

  // Module pages
  if (document.querySelector('.tabs-container')) {
    initModulePage();
  }
}

initPageLoad();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Three.js scenes clean themselves up via disposeScene
  if (window.activeScenes) {
    window.activeScenes.forEach(scene => {
      if (scene.dispose) scene.dispose();
    });
  }
});
