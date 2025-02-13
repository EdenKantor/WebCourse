import { useLocation } from 'wouter'; 
import Logo from '../components/Logo';
import ActionButton from '../components/ActionButton'; 

const FirstPage = () => {
  const [, navigate] = useLocation(); 

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col items-center min-h-screen p-6">
        {/* Logo Section */}
        <div className="mt-6 mb-8">
          <Logo /> 
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-4">
          {/* Login Button */}
          <ActionButton
            label="Login"
            iconClass="fas fa-sign-in-alt"
            onClick={() => navigate('/login')}
            className="px-8 py-4 text-lg bg-green-400 text-white rounded-md hover:bg-green-500 flex items-center space-x-3 shadow-lg"
          />
          {/* Register Button */}
          <ActionButton
            label="Register"
            iconClass="fas fa-user-plus"
            onClick={() => navigate('/register1')}
            className="px-8 py-4 text-lg bg-green-400 text-white rounded-md hover:bg-green-500 flex items-center space-x-3 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
