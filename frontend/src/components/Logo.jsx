// A logo component that dynamically updates based on the current theme (light or dark mode).
import { useState, useEffect } from 'preact/hooks';

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' // Check localStorage for the initial theme state
  );

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'dark'); // Update the state when the theme changes
    };

    // Add event listener for the custom "themeChange" event
    window.addEventListener("themeChange", handleThemeChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  return (
    <div>
      {/* Render the appropriate logo based on the theme */}
      {!isDarkMode ? (
        <img
          src="/WebFitPro.jpeg" // Logo for light mode
          alt="WebFitPro Logo"
          className="w-250 h-250 object-contain max-w-full"
        />
      ) : (
        <img
          src="/WebFitProDarkMode.jpeg" // Logo for dark mode
          alt="WebFitPro Dark Logo"
          className="w-250 h-250 object-contain max-w-full"
        />
      )}
    </div>
  );
};

export default Logo;
