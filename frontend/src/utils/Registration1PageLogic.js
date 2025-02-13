import { useState } from "preact/hooks";
import { getFromSessionStorage, saveToSessionStorage, clearSessionStorage } from "../utils/LocalSessionHelper";

export const useRegistration1Logic = (navigate) => {
  // Load saved data from session storage
  const savedData = getFromSessionStorage("registrationData") || {};

  // States for user input fields and errors
  const [selectedGender, setSelectedGender] = useState(
    savedData.gender || "- Select Gender -"
  );
  const [age, setAge] = useState(savedData.age || "");
  const [height, setHeight] = useState(savedData.height || "");
  const [weight, setWeight] = useState(savedData.weight || "");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Clears session storage for registration data on page load.
   */
  const clearStorageOnLoad = () => {
    clearSessionStorage("registrationData");
  };

  /**
   * Validates user inputs and returns an error message if validation fails.
   * @returns {string} Error message or an empty string if inputs are valid.
   */
  const validateInputs = () => {
    if (!age || age <= 0) return "Please enter a valid age.";
    if (!height || height <= 0) return "Please enter a valid height.";
    if (!weight || weight <= 0) return "Please enter a valid weight.";
    if (selectedGender === "- Select Gender -") return "Please select a gender.";
    return ""; // No errors
  };

  /**
   * Checks for errors in user inputs and updates the error message state.
   * @returns {boolean} True if inputs are valid, false otherwise.
   */
  const checkForErrors = () => {
    const error = validateInputs();
    setErrorMessage(error);
    return !error;
  };

  /**
   * Handles the "Next" button click, validates inputs, and navigates to the next page.
   */
  const handleNext = () => {
    if (checkForErrors()) {
      saveToSessionStorage("registrationData", {
        gender: selectedGender,
        age: parseInt(age, 10), // Save age as an integer
        height: parseFloat(height), // Save height as a float
        weight: parseFloat(weight), // Save weight as a float
      });
      navigate("/register2"); // Navigate to the next registration step
    }
  };

  return {
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
  };
};
