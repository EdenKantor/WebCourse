// A reusable input component for entering a username, with dynamic styling for light and dark modes.
const UsernameInput = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="w-full">
      {/* Label for the username input field */}
      <label className="block text-lg font-semibold dark:text-gray-200 mb-2">
        {label}
      </label>
      {/* Input field for the username */}
      <input
        type="text" // Input type is text
        value={value} // Binds the input value
        onChange={onChange} // Updates value on input change
        className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" // Styling for both light and dark modes
        placeholder={placeholder} // Placeholder text for guidance
      />
    </div>
  );
};

export default UsernameInput;
