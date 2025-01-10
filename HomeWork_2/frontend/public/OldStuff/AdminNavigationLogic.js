const html = document.documentElement;
const themeToggleButton = document.getElementById('toggle-theme');

tailwind.config = {
  darkMode: 'class',
};

if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
}

// Toggle dark mode and save preference in localStorage
themeToggleButton.addEventListener('click', () => {
  html.classList.toggle('dark');

  // Save the theme preference to localStorage
  if (html.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});