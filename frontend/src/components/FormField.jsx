// A reusable form field component for labeled input elements, supporting dynamic types, values, and placeholders.
const FormField = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="w-full">
      {/* Label for the input field */}
      <label className="block text-lg dark:text-gray-200 mb-1">{label}</label>
  
      {/* Input field with dynamic type, value, and placeholder */}
      <input
        type={type} // Defines the input type (e.g., text, number, password, etc.)
        value={value} // Binds the input value
        onChange={onChange} // Updates the value on change
        placeholder={placeholder} // Placeholder text for guidance
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white" // Styling for both light and dark modes
      />
    </div>
  );
};

export default FormField;
