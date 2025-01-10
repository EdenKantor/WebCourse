import { useEffect} from "preact/hooks"; 
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import VideoContainer from "../components/VideoContainer"; 
import { useContinueRoutineLogic } from "../utils/ContinueRoutineLogic";
import { signedUserData } from "./LoginPage"; // Import username from login page
import { useLocation } from 'wouter'; 
import Popup from "../components/Popup";


const ContinueRoutine = () => {
  const { 
    workouts ,
    doneArray ,
    likeArray , 
    fetchUserSessionInfo,
    handleSubmit,
    handleDone,
    handleLike,
    isOpen,
    handlePopupClose,
    popupMessage,
    showSuccess,
    isError,
  } = useContinueRoutineLogic(); // Get workouts from logic

  const [, navigate] = useLocation(); // Updated to use Wouter's navigation
 
  const handleBackToHome = async() => {
    navigate("user-home"); // Navigate to home page
  };

  // Fetch user exercise session info when the page loads
  useEffect(() => {
    const loadUserData = async () => {
      if (signedUserData && signedUserData.userName) {
        await fetchUserSessionInfo(signedUserData.userName); 
      }
    };
    loadUserData(); // Fetch user data
  }, []);


  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text="Continue Routine" />
        <Subtitle text="Your Daily Workout - You Can Do It!" />

        {/* Workout Cards */}
        <div className="space-y-8 w-full max-w-4xl">
          {workouts.map((workout, index) => (
            <VideoContainer
              id={index}
              title={workout.title}
              videoUrl={workout.url}
              category={workout.bodyPart}
              level={workout.difficulty}
              numOfLikes = {workout.likeCount}
              done={doneArray[index]} 
              liked={likeArray[index]}
              onDone={handleDone}
              onLike={handleLike}
            />
          ))}
        </div>

        {/* Submit Button */}
        <ActionButton
          label="Submit Workout"
          iconClass="fas fa-check-circle"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          onClick={handleSubmit}
        />
      </div>
      <Popup
        isOpen={isOpen}
        onClose={handlePopupClose}
        message={popupMessage}
        showSuccess={showSuccess}
        backToHome={handleBackToHome}
        isError={isError} 
      />
    </div>
  );
};

export default ContinueRoutine;