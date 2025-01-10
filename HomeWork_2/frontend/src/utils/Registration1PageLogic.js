import { useState, useEffect } from "preact/hooks";

export const useRegistration1Logic = () => {
  // Load saved data from localStorage
  const savedData = JSON.parse(localStorage.getItem("registrationData")) || {};

  const [selectedGender, setSelectedGender] = useState(
    savedData.selectedGender || "- Select Gender -"
  );
  const [age, setAge] = useState(savedData.age || "");
  const [height, setHeight] = useState(savedData.height || "");
  const [weight, setWeight] = useState(savedData.weight || "");
  const [errorMessage, setErrorMessage] = useState("");

  // Save data to localStorage whenever fields change
  useEffect(() => {
    localStorage.setItem(
      "registrationData",
      JSON.stringify({ selectedGender, age, height, weight })
    );
  }, [selectedGender, age, height, weight]);

  // Validation function
  const validateInputs = () => {
    if (!age || age <= 0) return "Please enter a valid age.";
    if (!height || height <= 0) return "Please enter a valid height.";
    if (!weight || weight <= 0) return "Please enter a valid weight.";
    if (selectedGender === "- Select Gender -") return "Please select a gender.";
    return ""; // No errors
  };

  const checkForErrors = () => {
    const error = validateInputs();
    setErrorMessage(error);
    return !error; // Return true if no errors
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
    checkForErrors,
  };
};
