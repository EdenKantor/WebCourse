import { useEffect } from "preact/hooks";
import { useLocation } from "wouter";
import { useRegistration1Logic } from "../utils/Registration1PageLogic";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import DropdownMenu from "../components/DropdownMenu";
import FormField from "../components/FormField";
import Message from "../components/Message";

const Registration1Page = () => {
  const [, navigate] = useLocation(); // Hook for navigating between pages
  // Extract logic and state management from the custom hook
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
    handleNext, 
    clearStorageOnLoad, 
  } = useRegistration1Logic(navigate);

  // Clear session storage when the component mounts
  useEffect(() => {
    clearStorageOnLoad();
  }, []);

  return (
    <div className="bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Page title */}
        <Title text="Please Enter your personal information" />
        {/* Subtitle to guide the user */}
        <Subtitle text="This helps us personalize your experience." />
        {/* Dropdown menu for selecting gender */}
        <DropdownMenu
          options={["Male", "Female", "Other"]}
          selected={selectedGender}
          onSelect={setSelectedGender}
        />
        <div className="w-full max-w-sm space-y-4">
          {/* Input field for age */}
          <FormField
            label="Age"
            placeholder="Enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {/* Input field for height */}
          <FormField
            label="Height (cm)"
            placeholder="Enter your height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          {/* Input field for weight */}
          <FormField
            label="Weight (kg)"
            placeholder="Enter your weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        {/* Display error message, if any */}
        <Message message={errorMessage} />
        {/* Next button to proceed to the next step */}
        <ActionButton
          label="Next"
          iconClass="fas fa-arrow-right"
          onClick={handleNext}
          className={`px-6 py-2 ${
            errorMessage
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300" // Disabled style if errors exist
              : "bg-green-400 hover:bg-green-500 text-white" // Enabled style if no errors
          }`}
          disabled={!!errorMessage} // Disable button if there's an error
        />
      </div>
    </div>
  );
};

export default Registration1Page;
