const FormField = ({ label, placeholder, value, onChange, type = "text" }) => {
    return (
      <div className="w-full">
        {/* Label */}
        <label className="block text-lg dark:text-gray-200 mb-1">{label}</label>
  
        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
    );
  };
  
  export default FormField;
  