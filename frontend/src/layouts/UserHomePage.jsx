import { useLocation } from "wouter";
import { useUserHomePageLogic } from "../utils/UserHomePageLogic";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import LoadingSpinner from "../components/LoadingSpinner";

const UserHomePage = () => {
  const [, navigate] = useLocation(); // Hook for navigation

  // Extract logic and state management from the custom hook
  const {
    loading,
    userName,
    quote,
    author,
    isAdmin,
    handleNavigate,
  } = useUserHomePageLogic(navigate);

  // Show loading spinner while data is loading
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center space-y-10 p-6">
        {/* User greeting */}
        <Title text={`HELLO USER ${userName}!`} />

        {/* Motivational quote */}
        <Subtitle text={`"${quote}"`} />
        <p className="italic text-lg text-black dark:text-white">- {author}</p>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ActionButton
            label="Discover"
            iconClass="fas fa-compass"
            onClick={() => handleNavigate("/discover1")}
            className="w-full sm:w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
          <ActionButton
            label="Continue"
            iconClass="fas fa-dumbbell"
            onClick={() => handleNavigate("/routine")}
            className="w-full sm:w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
          <ActionButton
            label="My Info"
            iconClass="fas fa-smile"
            onClick={() => handleNavigate("/my-info")}
            className="w-full sm:w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
        </div>

        {/* Admin-specific buttons */}
        {isAdmin && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <ActionButton
              label="Pending Users"
              iconClass="fas fa-user-clock"
              onClick={() => handleNavigate("/PendingUsers")}
              className="w-full sm:w-40 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 shadow-lg"
            />
            <ActionButton
              label="Manage Users"
              iconClass="fas fa-users-cog"
              onClick={() => handleNavigate("/ManageUsers")}
              className="w-full sm:w-40 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
