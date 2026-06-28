// Submit actions and confetti blasts
function handleFormSubmit(e) {
  e.preventDefault();
  const submitBtn = document.querySelector('.btn-submit');
  const successOverlay = document.getElementById('form-success');
  if (!submitBtn || !successOverlay) return;
  
  submitBtn.textContent = 'Sending Message...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    successOverlay.classList.add('active');
    
    // Confetti particles emitter
    spawnSuccessParticles(submitBtn);
    
    document.getElementById('portfolio-form').reset();
    setTimeout(() => {
      successOverlay.classList.remove('active');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }, 5000);
  }, 1500);
}

// Particle confettis
function spawnSuccessParticles(targetElement) {
  const rect = targetElement.getBoundingClientRect();
  const containerX = rect.left + rect.width / 2 + window.scrollX;
  const containerY = rect.top + window.scrollY;

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 8 + 4}px`;
    particle.style.height = particle.style.width;
    const colors = ['#06b6d4', '#8b5cf6', '#3b82f6', '#00f2ff'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.zIndex = '99999';
    particle.style.pointerEvents = 'none';
    
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 4;
    let pX = containerX;
    let pY = containerY;
    let opacity = 1;

    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 2;

    function animate() {
      pX += vx;
      pY += vy;
      opacity -= 0.02;
      particle.style.left = `${pX}px`;
      particle.style.top = `${pY}px`;
      particle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    }
    requestAnimationFrame(animate);
  }
}
