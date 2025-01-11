import { useLocation } from 'wouter'; 
import { useRegistration1Logic } from "../utils/Registration1PageLogic";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import DropdownMenu from "../components/DropdownMenu";
import FormField from "../components/FormField";
import Message from "../components/Message";

let userData = {}; // Global variable to hold data

const Registration1Page = () => {
  const [, navigate] = useLocation(); // Use Wouter's navigation

  const {
    selectedGender,
    setSelectedGender,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    errorMessage,
    checkForErrors,
  } = useRegistration1Logic();

  // Handles navigation and validation before moving to the next page
  const handleNext = () => {
    if (checkForErrors()) {
      // Update userData with the user inputs
      userData = {
        gender: selectedGender,
        age,
        height,
        weight,
      };

      console.log("Registration1 Data Saved: ", userData); // Debugging log

      navigate("/register2"); // Navigate only if inputs are valid
    }
  };

  return (
    <div className="bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white min-h-screen">

      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">

        <Title text="Please Enter your personal information" />

        <Subtitle text="This helps us personalize your experience." />

        <DropdownMenu
          options={["Male", "Female", "Other"]}
          selected={selectedGender}
          onSelect={setSelectedGender}
        />

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

        <ActionButton
          label="Next"
          iconClass="fas fa-arrow-right"
          onClick={handleNext}
          className={`px-6 py-2 ${
            errorMessage
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
              : "bg-green-400 hover:bg-green-500 text-white"
          }`}
          disabled={!!errorMessage}
        />
      </div>
    </div>
  );
};

export { userData }; // Export userData globally
export default Registration1Page;
