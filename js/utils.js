// Tactical utilities

// Soft magnetic element pull displacement calculation
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
  });
}

// Click ripple expand triggers
function initRippleEffects() {
  const rippleElements = document.querySelectorAll('.btn-ripple');
  rippleElements.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-span');
      this.appendChild(ripple);
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Cinematic 12-Layer Parallax and Tilt interaction
function initVectorParallax() {
  try {
    const container = document.getElementById('vector-parallax-container');
    const character = document.getElementById('c-character');
    const particles = document.getElementById('c-particles');
    const hud = document.querySelector('.layer-10-hud');
    const ui = document.getElementById('c-ui-elements');
    const foreground = document.getElementById('c-foreground');
    const glow = document.getElementById('c-magnetic-glow');
    
    if (!container || !character) return;
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      // Portrait tilts
      character.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // HUD shifts slightly in opposite direction for depth
      if (hud) {
        const hX = ((x - centerX) / centerX) * -8;
        const hY = ((y - centerY) / centerY) * -8;
        hud.style.transform = `translate(${hX}px, ${hY}px)`;
      }

      // Particles and UI chips shift heavily in opposite direction
      if (particles) {
        const pX = ((x - centerX) / centerX) * -15;
        const pY = ((y - centerY) / centerY) * -15;
        particles.style.transform = `translate(${pX}px, ${pY}px)`;
      }
      
      if (ui) {
        const uX = ((x - centerX) / centerX) * -25;
        const uY = ((y - centerY) / centerY) * -25;
        ui.style.transform = `translate(${uX}px, ${uY}px)`;
      }

      // Foreground elements shift WITH the cursor (moves in front of portrait)
      if (foreground) {
        const fX = ((x - centerX) / centerX) * 10;
        const fY = ((y - centerY) / centerY) * 10;
        foreground.style.transform = `translate(${fX}px, ${fY}px)`;
      }

      if (glow) {
        // Adjust by half the width/height of the glow (200/2 = 100) so cursor is centered
        glow.style.left = `${x - 100}px`;
        glow.style.top = `${y - 100}px`;
      }
    });
    
    container.addEventListener('mouseleave', () => {
      character.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
      if (hud) hud.style.transform = `translate(0px, 0px)`;
      if (particles) particles.style.transform = `translate(0px, 0px)`;
      if (ui) ui.style.transform = `translate(0px, 0px)`;
      if (foreground) foreground.style.transform = `translate(0px, 0px)`;
    });
  } catch (err) {
    console.warn('Vector parallax init failed gently:', err);
  }
}
