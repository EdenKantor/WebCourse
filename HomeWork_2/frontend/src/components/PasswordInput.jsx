const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  toggleVisibility,
  isPasswordVisible,
}) => {
  return (
    <div className="w-full">
      <label className="block text-lg font-semibold dark:text-gray-200 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
        >
          <i className={`fas ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
