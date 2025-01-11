const UsernameInput = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-lg font-semibold dark:text-gray-200 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder={placeholder}
      />
    </div>
  );
};

export default UsernameInput;
