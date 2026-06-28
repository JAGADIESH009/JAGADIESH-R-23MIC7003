// Preloader Initialization
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderText = document.getElementById('preloader-text');

  // Disable scrolling during load
  document.body.style.overflow = 'hidden';

  let progress = 0;
  let isLoaded = false;
  let animationId;

  window.addEventListener('load', () => {
    isLoaded = true;
  });

  function updateLoader() {
    if (isLoaded) {
      progress += 4; // Fast finish once loaded
    } else {
      progress += (90 - progress) * 0.03; // Ease towards 90%
    }

    if (progress >= 100) {
      progress = 100;
      preloaderBar.style.width = '100%';
      preloaderText.textContent = 'INITIALIZING PORTFOLIO 100%';

      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 600); // Smooth fade out delay
      return;
    }

    preloaderBar.style.width = `${progress}%`;
    preloaderText.textContent = `INITIALIZING PORTFOLIO ${Math.floor(progress)}%`;

    animationId = requestAnimationFrame(updateLoader);
  }

  requestAnimationFrame(updateLoader);
})();

// Document startup initialization
document.addEventListener('DOMContentLoaded', () => {
  // Footer year binder
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Spotlight coordinates updating listener
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3D Parallax tilt selectors coordinate adjustments
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = -(y - centerY) / (rect.height / 18);
      const tiltY = (x - centerX) / (rect.width / 18);
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // Hero Mouse tracking radial background glow coord updates
  const hero = document.getElementById('hero');
  const heroGlow = document.getElementById('hero-mouse-glow');
  if (hero && heroGlow) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroGlow.style.left = `${x}px`;
      heroGlow.style.top = `${y}px`;
    });
  }

  // Component bindings
  initCursor();
  initParticles();
  initNavbar();
  initFilters();
  initMagneticButtons();
  initRippleEffects();
  initTimelineScrollTracker();
  initScrollReveals();
  if (typeof initVectorParallax === 'function') initVectorParallax();
  initTypingAnimation();
});
