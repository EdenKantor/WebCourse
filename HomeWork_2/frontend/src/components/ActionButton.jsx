const ActionButton = ({ label, iconClass, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-950 hover:animate-wiggle flex items-center space-x-2 shadow-lg transition-all duration-300 ${className}`}
    >
      {iconClass && <i className={iconClass}></i>}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
