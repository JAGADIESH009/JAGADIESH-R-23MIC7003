// Filter projects and skills categories
function initFilters() {
  // Skills tabs
  const filterButtons = document.querySelectorAll('.skills-tabs .skills-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Projects tabs
  const projFilterButtons = document.querySelectorAll('.projects-filter .skills-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  projFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-proj-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-proj-cat');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
