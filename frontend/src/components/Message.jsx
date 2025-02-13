// A component for displaying feedback messages, styled based on success or error context.
const Message = ({ message }) => {
  if (!message) return null; // Return nothing if no message is provided

  const isSuccess = message.includes('successful'); // Determine if the message is a success message
  return (
    <p
      id="message" // Unique ID for easy selection
      className={`mt-4 text-lg text-center ${
        isSuccess ? 'text-green-500' : 'text-red-500' // Green for success, red for errors
      }`}
    >
      {message} {/* Display the message text */}
    </p>
  );
};

export default Message;
