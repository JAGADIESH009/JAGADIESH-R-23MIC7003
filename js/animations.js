// Dynamic typing state machine
function initTypingAnimation() {
  const typedTextSpan = document.getElementById('typed-text');
  if (!typedTextSpan) return;
  const textArray = TYPING_TEXTS || [];
  const typingSpeed = CONFIG.typingSpeed || 100;
  const erasingSpeed = CONFIG.erasingSpeed || 60;
  const newTextDelay = CONFIG.newTextDelay || 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }
  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 500);
    }
  }
  setTimeout(type, 1000);
}

// Ease out expo for smooth animation
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

let countersActive = false;

function loadStatCounters() {
  if (countersActive) return;
  countersActive = true;

  const counters = document.querySelectorAll('.count-target');
  const duration = 1500; // 1.5 seconds

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    
    if (isNaN(target)) {
      counter.textContent = '0' + suffix;
      return;
    }

    let startTime = null;

    function updateCounter(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = Math.floor(easedProgress * target);

      counter.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    }
    requestAnimationFrame(updateCounter);
  });
}

// Skill bars widths loading
function loadSkillBars() {
  const progresses = document.querySelectorAll('.skill-progress');
  progresses.forEach(prog => {
    prog.style.width = prog.getAttribute('data-width');
  });
}

// Scroll Bound Timeline Fill Indicator
function initTimelineScrollTracker() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineFill = document.getElementById('timeline-fill-line');
  if (!timelineFill) return;

  window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline-container');
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const progressStart = rect.top - viewHeight / 2;
    const totalDist = rect.height;
    
    let progress = 0;
    if (progressStart < 0) {
      progress = Math.min(Math.max(-progressStart / totalDist, 0), 1);
    }
    timelineFill.style.height = `${progress * 100}%`;

    timelineItems.forEach(item => {
      const dot = item.querySelector('.timeline-dot');
      const dotRect = dot.getBoundingClientRect();
      if (dotRect.top < viewHeight / 2 + 50) {
        item.classList.add('active-scroll');
      } else {
        item.classList.remove('active-scroll');
      }
    });
  });
}

// Intersection Observer reveal triggers
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.closest('#skills') || entry.target.classList.contains('skills-grid')) {
          loadSkillBars();
        }
        if (entry.target.closest('#about') && entry.target.classList.contains('about-details')) {
          loadStatCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(elem => observer.observe(elem));
}

function triggerAnimationsOnLoad() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(elem => {
    const rect = elem.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      elem.classList.add('active');
      if (elem.closest('#skills')) loadSkillBars();
      if (elem.closest('#about') && elem.classList.contains('about-details')) loadStatCounters();
    }
  });
}
