import { useEffect, useState } from "preact/hooks";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import VideoContainer from "../components/VideoContainer";
import { useContinueRoutineLogic } from "../utils/ContinueRoutineLogic";
import { useLocation } from "wouter";
import Popup from "../components/Popup";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const ContinueRoutine = () => {
  const {
    workouts,
    doneArray,
    likeArray,
    handleSubmit,
    handleDone,
    handleLike,
    isOpen,
    handlePopupClose,
    popupMessage,
    showSuccess,
    isError,
    errorMessage,
    userName,
    loadUserData,
    loading,
  } = useContinueRoutineLogic();
  const [, navigate] = useLocation(); // Hook for navigation

  // Load user data on component mount or when userName changes
  useEffect(() => {
    loadUserData();
  }, [userName]);

  // Display a loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text="Continue Routine" />
        <Subtitle text="Your Daily Workout - You Can Do It!" />
        {/* Display error message if errorMessage exists */}
        {errorMessage && <Message message={errorMessage} type="error" />}

        <div className="space-y-8 w-full max-w-4xl">
          {/* Render a VideoContainer for each workout the user have to do */}
          {workouts.map((workout, index) => (
            <VideoContainer
              key={index}
              id={index} // Used to associate actions like "done" and "like" with the correct workout
              title={workout.title}
              videoUrl={workout.url}
              category={workout.bodyPart}
              level={workout.difficulty}
              numOfLikes={workout.likeCount}
              done={doneArray[index]} // Indicates if this workout is marked as done
              liked={likeArray[index]} // Indicates if this workout is liked
              onDone={handleDone} // Callback to mark as done
              onLike={handleLike} // Callback to toggle like
            />
          ))}
        </div>

        <ActionButton
          label="Submit Workout"
          iconClass="fas fa-check-circle"
          className={`px-6 py-3 rounded-lg transition-all ${
            errorMessage
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          }`}
          onClick={handleSubmit} // Submit all workouts
          disabled={!!errorMessage} // Disable button when errorMessage is active
        />
      </div>
      {/* Popup to display if user completed all his challanges or not after pressing submit */}
      <Popup
        isOpen={isOpen} // Determines if the popup is visible
        onClose={handlePopupClose} // Callback to close the popup
        message={popupMessage} // Message to display in the popup
        showSuccess={showSuccess} // Style the popup as a success message if true
        backToHome={() => navigate("user-home")} // Navigate back to the home page
        isError={isError} // Style the popup as an error message if true
      />
    </div>
  );
};

export default ContinueRoutine;
