import { useInfoPageLogic } from "../utils/InfoPageLogic";
import { useEffect, useState } from "preact/hooks";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import FormField from "../components/FormField";
import ActionButton from "../components/ActionButton";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const InfoPage = () => {
  const {
    userName, // The user's name retrieved from logic
    age, // User's current age
    setAge, // Function to update age
    height, // User's current height
    setHeight, // Function to update height
    weight, // User's current weight
    setWeight, // Function to update weight
    bmi, // Calculated Body Mass Index (BMI)
    errorMessage, // Error messages to display to the user
    successMessage, // Success messages to display to the user
    handleUpdateClick, // Function to handle the update button click
    fetchInitialData, // Function to fetch initial user data
    completedSessions, // Number of completed workout sessions
    openedSessions, // Number of opened workout sessions
    loading, // Loading state for initial data fetch
    updating, // Loading state for the update process
  } = useInfoPageLogic();

  // Fetch user data when the page loads
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Show loading spinner if data is still loading
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Page title with the user's name */}
        <Title text={`${userName}'s Personal Information`} />
        {/* Subtitle providing context for the user */}
        <Subtitle text="View your BMI and personal data here. You can update your age, height, and weight as needed!" />

        {/* Display the user's BMI */}
        <p className="text-xl text-center text-green-500 font-semibold">
          Your BMI: <span className="text-3xl">{bmi}</span>
        </p>

        {/* User session statistics */}
        <div className="w-full max-w-sm space-y-2 text-center">
          <Subtitle text={`Completed Sessions: ${completedSessions}`} className="text-blue-500 text-lg" />
          <Subtitle text={`Opened Sessions: ${openedSessions}`} className="text-blue-500 text-lg" />
        </div>

        {/* Form fields for user information input */}
        <div className="w-full max-w-sm space-y-4">
          <FormField
            label="Age"
            placeholder="Enter your age"
            type="number"
            value={age} // Current age value
            onChange={(e) => setAge(e.target.value)} // Update age state on input change
          />
          <FormField
            label="Height (cm)"
            placeholder="Enter your height"
            type="number"
            value={height} // Current height value
            onChange={(e) => setHeight(e.target.value)} // Update height state on input change
          />
          <FormField
            label="Weight (kg)"
            placeholder="Enter your weight"
            type="number"
            value={weight} // Current weight value
            onChange={(e) => setWeight(e.target.value)} // Update weight state on input change
          />
        </div>

        {/* Display error or success messages */}
        <Message message={errorMessage} /> {/* Error messages */}
        <Message message={successMessage} type="success" /> {/* Success messages */}

        {/* Update button or spinner during update */}
        {updating ? (
          <LoadingSpinner /> // Show spinner while updating
        ) : (
          <ActionButton
            label="Update"
            iconClass="fas fa-save"
            onClick={handleUpdateClick} // Trigger update function
            className="px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default InfoPage;
