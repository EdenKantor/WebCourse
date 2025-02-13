// A dynamic top bar component with a back button and a theme toggle button, customized based on the current route.
import { toggleTheme } from '../utils/ThemeLogic';
import { useLocation } from 'wouter';

const TopBar = () => {
  const [, navigate] = useLocation(); // Use Wouter navigation

  // Get current location pathname
  const location = window.location.pathname;

  // Default settings for the back button
  let showBackButton = true; // Whether to display the back button
  let buttonText = "Back"; // Default text for the button
  let buttonIcon = "fas fa-arrow-left"; // Default icon for the button
  let backPath = "/"; // Default navigation path for the back button

  // Customize back button settings for specific routes
  switch (location) {
    case "/":
      showBackButton = false; // Hide the back button on the home page
      break;
    case "/user-home":
      buttonText = "Logout";
      buttonIcon = "fas fa-sign-out-alt"; 
      backPath = "/login"; 
      break;
    case "/discover1":
      backPath = "/user-home"; 
      break;
    case "/discover2":
      backPath = "/discover1"; 
      break;
    case "/register1":
      backPath = "/"; 
      break;
    case "/register2":
      backPath = "/register1"; 
      break;
    case "/my-info":
      backPath = "/user-home"; 
      break;
    case "/routine":
      backPath = "/user-home"; 
      break;
    case "/AdminNavigation":
      buttonText = "Logout"; 
      buttonIcon = "fas fa-sign-out-alt";
      backPath = "/";
      break;
    case "/PendingUsers":
      backPath = "/user-home";
      break;
    case "/ManageUsers":
      backPath = "/user-home";
      break;
    case "/NotSoFast":
      buttonText = "Logout"; 
      buttonIcon = "fas fa-sign-out-alt";
      backPath = "/login";
      break;
    default:
      break;
  }

  // Handle Back Button Click
  const handleBackClick = () => {
    navigate(backPath); // Navigate to the assigned back path
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200 
                    dark:border-gray-700 bg-green-400 dark:bg-green-800 transition-all">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={handleBackClick} // Handle navigation on click
          className="text-lg bg-green-500 dark:bg-green-900 text-white 
                     rounded-lg hover:bg-green-600 dark:hover:bg-green-950 
                     flex items-center space-x-2 transition-transform duration-200 
                     hover:scale-105 shadow-md hover:shadow-lg"
        >
          <i className={buttonIcon}></i> {/* Icon for the back/logout button */}
          <span>{buttonText}</span> {/* Text for the back/logout button */}
        </button>
      )}

      {/* Theme Toggle Button */}
      <div className="ml-auto">
        <button
          onClick={toggleTheme} // Toggle between light and dark themes
          className="px-4 py-2 bg-green-500 dark:bg-green-900 text-white 
                     rounded-lg hover:bg-green-600 dark:hover:bg-green-950 
                     transition-transform duration-200 hover:scale-105 
                     shadow-md hover:shadow-lg"
        >
          <i className="fas fa-paint-brush mr-2"></i>Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default TopBar;
