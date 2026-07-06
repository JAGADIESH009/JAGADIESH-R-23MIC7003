// Custom trailing cursor coordinates tracking
function initCursor() {
  if (window.innerWidth <= 1024) return;
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    dotX += (mouseX - dotX) * 0.7;
    dotY += (mouseY - dotY) * 0.7;
    glowX += (mouseX - glowX) * 0.4;
    glowY += (mouseY - glowY) * 0.4;

    if (cursorDot && cursorGlow) {
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Hover scale selectors
  const hoverElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .skills-tab-btn, .btn');
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    elem.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
