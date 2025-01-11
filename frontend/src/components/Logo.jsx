import { useState, useEffect } from 'preact/hooks';

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' // Check localStorage initially
  );

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'dark'); // Update on theme change
    };

    // Listen for custom event dispatched during theme toggle
    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  return (
    <div>
      {!isDarkMode ? (
        <img
          src="/WebFitPro.jpeg"
          alt="WebFitPro Logo"
          className="w-250 h-250 object-contain max-w-full"
        />
      ) : (
        <img
          src="/WebFitProDarkMode.jpeg"
          alt="WebFitPro Dark Logo"
          className="w-250 h-250 object-contain max-w-full"
        />
      )}
    </div>
  );
};

export default Logo;
