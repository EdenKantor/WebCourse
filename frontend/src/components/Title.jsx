// A simple title component for displaying prominent text, centered and styled for emphasis.
const Title = ({ text }) => {
  return (
    <h1 className="text-4xl font-extrabold text-center">
      {text} {/* Title text content */}
    </h1>
  );
};

export default Title;
