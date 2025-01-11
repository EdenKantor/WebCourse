const Message = ({ message }) => {
  if (!message) return null;

  const isSuccess = message.includes('successful');
  return (
    <p
      id="message"
      className={`mt-4 text-lg text-center ${
        isSuccess ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {message}
    </p>
  );
};

export default Message;
