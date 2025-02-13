// A reusable button component with support for icons, labels, and custom styles.
const ActionButton = ({ label, iconClass, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick} // Handles button click events
      className={`px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-950 hover:animate-wiggle flex items-center space-x-2 shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Optional icon rendered if iconClass is provided */}
      {iconClass && <i className={iconClass}></i>}
      {/* Button label text */}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
