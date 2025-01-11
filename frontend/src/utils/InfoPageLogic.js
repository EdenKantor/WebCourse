import { useState } from "preact/hooks";

// API URL
const apiUrl = "http://localhost:3000/api/myInfo"; 

export const useInfoPageLogic = () => {
  // States for data
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Calculate BMI
  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  // Fetch user info from backend
  const fetchUserInfo = async (userName) => {
    try {
      const response = await fetch(`${apiUrl}?userName=${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAge(data.user.age);
        setHeight(data.user.height);
        setWeight(data.user.weight);
        calculateBMI(data.user.height, data.user.weight); 
      } else {
        setErrorMessage(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      setErrorMessage("Error: Network connection failed.");
    }
  };

  // Validate inputs
  const validateInputs = () => {
    if (!age || age <= 0) return "Please enter a valid age.";
    if (!height || height <= 0) return "Please enter a valid height.";
    if (!weight || weight <= 0) return "Please enter a valid weight.";
    return "";
  };

  // Update user details
  const handleUpdate = async (userName) => {
    const error = validateInputs();
    if (error) {
      setErrorMessage(error);
      setSuccessMessage("");
      return; // Stop if validation fails
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          age: parseInt(age),
          height: parseInt(height),
          weight: parseInt(weight),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Details updated successfully!");
        setErrorMessage("");
        calculateBMI(height, weight); // Recalculate BMI
      } else {
        setErrorMessage(data.message || "Failed to update details.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      setSuccessMessage("");
    }
  };

  return {
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
  };
};
