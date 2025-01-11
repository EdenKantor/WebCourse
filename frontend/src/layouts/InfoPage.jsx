import { useInfoPageLogic } from "../utils/InfoPageLogic"; 
import { useEffect, useState } from "preact/hooks"; 
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import FormField from "../components/FormField";
import ActionButton from "../components/ActionButton";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner"; 
import { signedUserData } from "./LoginPage"; // Import username from login page

const InfoPage = () => {
  // Import logic hooks from InfoPageLogic
  const {
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    bmi,
    errorMessage,
    successMessage,
    handleUpdate, 
    fetchUserInfo, 
  } = useInfoPageLogic();

  // Loading states
  const [loading, setLoading] = useState(true); // Initial spinner
  const [updating, setUpdating] = useState(false); // Update spinner

  // Fetch user info when the page loads
  useEffect(() => {
    const loadUserData = async () => {
      if (signedUserData && signedUserData.userName) {
        await fetchUserInfo(signedUserData.userName); 
        setLoading(false); // Turn off loading spinner
      }
    };
    loadUserData(); // Fetch user data
  }, []);

  // Handle Update Click
  const handleUpdateClick = async () => {
    setUpdating(true); // Show spinner while updating
    await handleUpdate(signedUserData.userName); // Update data
    setUpdating(false); // Turn off spinner
  };

  // Show loading spinner if fetching data
  if (loading) {
    return <LoadingSpinner />; 
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text={`${signedUserData.userName}'s Personal Information`} />

        <Subtitle text="View your BMI and personal data here. You can update your age, height, and weight as needed!" />
        <p className="text-xl text-center text-green-500 font-semibold">
          Your BMI: <span className="text-3xl">{bmi}</span>
        </p>

        <div className="w-full max-w-sm space-y-4">
          <FormField
            label="Age"
            placeholder="Enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <FormField
            label="Height (cm)"
            placeholder="Enter your height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <FormField
            label="Weight (kg)"
            placeholder="Enter your weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <Message message={errorMessage} />
        <Message message={successMessage} type="success" />

        {updating ? (
          <LoadingSpinner /> 
        ) : (
          <ActionButton
            label="Update"
            iconClass="fas fa-save"
            onClick={handleUpdateClick}
            className="px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default InfoPage;
