document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    document.documentElement.dataset.theme = storedTheme;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const updateThemeToggle = () => {
    const isDark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : prefersDark;
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.firstElementChild.textContent = isDark ? '☀' : '☾';
    }
    if (themeMeta) themeMeta.setAttribute('content', isDark ? '#121d1f' : '#f6f6f1');
  };
  updateThemeToggle();
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : prefersDark;
    const theme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    updateThemeToggle();
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const filterButtons = document.querySelectorAll('[data-filter]');
  const publications = document.querySelectorAll('.publication[data-theme]');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterButtons.forEach(b => b.classList.toggle('active', b === button));
    publications.forEach(pub => { pub.hidden = !(filter === 'all' || pub.dataset.theme === filter); });
  }));
});
