import { h } from 'preact';
import { useLocation } from 'wouter'; 
import ActionButton from '../components/ActionButton';
import Title from '../components/Title';

const AdminNavigation = () => {
  const [, navigate] = useLocation(); // Use Wouter's navigation

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className="flex flex-col items-center min-h-screen space-y-12 p-6 bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white">
      {/* Title */}
      <Title text="Admin Navigation Page" />

      {/* Action Buttons */}
      <div className="flex flex-col space-y-6 w-full max-w-sm">
        <ActionButton
          label="My Home Page"
          className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          onClick={() => handleNavigation('/user-home')}
        />
        <ActionButton
          label="Approve Pending Users"
          className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          onClick={() => handleNavigation('/PendingUsers')}
        />
        <ActionButton
          label="Manage Users"
          className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          onClick={() => handleNavigation('/ManageUsers')}
        />
      </div>
    </div>
  );
};

export default AdminNavigation;
