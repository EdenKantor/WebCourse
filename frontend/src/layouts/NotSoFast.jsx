import { useLocation } from 'wouter';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";

const NotSoFast = () => {
  const [, navigate] = useLocation();

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="pt-20 flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Title */}
        <Title text="Not So Fast" />

        {/* Subtitle */}
          <Subtitle text="Admin approval is pending. You cannot log in yet." />
          <Subtitle text="Once approved, you’ll be able to access your account. For now, you can return to the First page or log out." />

        <div className="flex space-x-4">
          <ActionButton
            label="Back Home"
            iconClass="fas fa-home"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default NotSoFast;
