import { useState } from "preact/hooks";

const DropdownMenu = ({ options, selected, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative w-full max-w-sm">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 w-full text-white 
                   bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center shadow-lg
                   dark:bg-green-800 dark:hover:bg-green-950 transition-all"
      >
        <span className="text-center">{selected}</span>
        <i className="fas fa-caret-down ml-2"></i>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-green-500 hover:bg-green-600 text-white 
                        dark:bg-green-800 dark:text-white rounded-lg shadow-lg transition-all">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsDropdownOpen(false); // Close dropdown after selection
              }}
              className="block w-full px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-950 text-center transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
