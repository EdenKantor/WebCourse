// A password input field with a toggleable visibility feature, supporting dynamic styling for light and dark modes.
const PasswordInput = ({
  label, // The label displayed above the input field
  placeholder, // Placeholder text for the input field
  value, // The current value of the input field
  onChange, // Event handler for input changes
  toggleVisibility, // Function to toggle password visibility
  isPasswordVisible, // Boolean indicating whether the password is visible
}) => {
  return (
    <div className="w-full">
      {/* Label for the input */}
      <label className="block text-lg font-semibold dark:text-gray-200 mb-2">
        {label}
      </label>
      <div className="relative">
        {/* Input field for password */}
        <input
          type={isPasswordVisible ? "text" : "password"} // Switches between text and password types
          value={value} // Binds the input value
          onChange={onChange} // Updates value on input change
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600" // Dynamic styles for light and dark modes
          placeholder={placeholder} // Placeholder text
        />
        {/* Button to toggle password visibility */}
        <button
          type="button"
          onClick={toggleVisibility} // Toggles visibility state
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
        >
          {/* Eye icon changes based on visibility state */}
          <i className={`fas ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
