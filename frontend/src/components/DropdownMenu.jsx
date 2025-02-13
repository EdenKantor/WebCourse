import { useState } from "preact/hooks";

// A dropdown menu component that allows selection from a list of options.
const DropdownMenu = ({ options, selected, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manages the dropdown's open/closed state

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Toggles the dropdown state

  return (
    <div className="relative w-full max-w-sm">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown} // Opens or closes the dropdown
        className="px-4 py-2 w-full text-white 
                   bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center shadow-lg
                   dark:bg-green-800 dark:hover:bg-green-950 transition-all"
      >
        <span className="text-center">{selected}</span> {/* Displays the selected option */}
        <i className="fas fa-caret-down ml-2"></i> {/* Dropdown arrow icon */}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-green-500 hover:bg-green-600 text-white 
                        dark:bg-green-800 dark:text-white rounded-lg shadow-lg transition-all">
          {options.map((option) => (
            <button
              key={option} // Unique key for each option
              onClick={() => {
                onSelect(option); // Calls the provided onSelect function with the chosen option
                setIsDropdownOpen(false); // Closes the dropdown after selection
              }}
              className="block w-full px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-950 text-center transition-all"
            >
              {option} {/* Displays the dropdown option */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
