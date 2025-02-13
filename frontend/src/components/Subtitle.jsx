// A simple subtitle component for displaying centered text with light and dark mode support.
const Subtitle = ({ text }) => {
  return (
    <p className="text-lg text-center text-gray-600 dark:text-gray-300">
      {text} {/* Subtitle text content */}
    </p>
  );
};

export default Subtitle;
