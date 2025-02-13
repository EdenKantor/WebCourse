// A customizable popup component that supports error, success, and confirmation states.
const Popup = ({
  isOpen, // Boolean to control whether the popup is visible
  onClose, // Function to handle closing the popup
  onConfirm, // Function to handle confirmation action
  message, // Message text to display in the popup
  showSuccess, // Boolean to indicate if it's a success popup
  backToHome, // Function to navigate back to the home page
  isError, // Boolean to indicate if it's an error popup
}) => {
  if (!isOpen) return null; // Don't render the popup if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transition-all">
        {/* Display the provided message */}
        <p className="text-lg text-center text-black dark:text-white mb-4">
          {message}
        </p>

        {/* Conditional Rendering of Buttons */}
        {isError ? (
          // Error Popup - Close Button Only
          <div className="flex justify-center">
            <button
              onClick={onClose} // Trigger close action
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500
                         dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
            >
              Close
            </button>
          </div>
        ) : showSuccess ? (
          // Success Popup - Back to Home Button
          <div className="flex justify-center">
            <button
              onClick={backToHome} // Navigate to home page
              className="px-6 py-2 text-white rounded-lg hover:bg-green-600
                         bg-green-500 dark:bg-green-900 dark:hover:bg-green-950 transition-all"
            >
              Back to Home
            </button>
          </div>
        ) : (
          // Confirmation Popup - Yes/No Buttons
          <div className="flex justify-center space-x-4">
            {/* Confirm Button */}
            <button
              onClick={onConfirm} // Trigger confirmation action
              className="px-4 py-2 text-white rounded-lg hover:bg-green-600
                         bg-green-500 dark:bg-green-900 dark:hover:bg-green-950 transition-all"
            >
              Yes
            </button>

            {/* Cancel Button */}
            <button
              onClick={onClose} // Trigger close action
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500
                         dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
