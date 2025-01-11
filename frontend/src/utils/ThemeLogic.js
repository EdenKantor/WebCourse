// Initialize theme based on localStorage
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme'); // Get saved theme
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark'); // Apply dark mode
  } else {
    document.documentElement.classList.remove('dark'); // Apply light mode
  }
};

// Toggle theme and persist the selection in localStorage
export const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle('dark'); // Toggle dark class

  // Update localStorage based on the current theme
  if (html.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark'); // Save dark mode
  } else {
    localStorage.setItem('theme', 'light'); // Save light mode
  }

  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("themeChange"));
};
