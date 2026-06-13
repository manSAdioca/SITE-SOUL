// Initialize Lucide icons and wire up the mobile nav toggle
lucide.createIcons();

const toggleBtn = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

toggleBtn?.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
  toggleBtn.querySelector('i').dataset.lucide = navMenu.classList.contains('hidden') ? 'menu' : 'x';
  lucide.createIcons();
});
