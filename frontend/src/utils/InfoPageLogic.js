import { useState } from "preact/hooks";
import { getFromSessionStorage } from "../utils/LocalSessionHelper";

// API URL
const apiUrl = "https://web-fit-pro-back-rose.vercel.app/api/myInfo";

export const useInfoPageLogic = () => {
  // States for user data
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [openedSessions, setOpenedSessions] = useState(0);

  // States for feedback messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Loading states
  const [loading, setLoading] = useState(true); // Initial loading
  const [updating, setUpdating] = useState(false); // While updating data

  // Retrieve username from session storage
  const userData = getFromSessionStorage("signedUserData");
  const userName = userData?.userName || "Guest"; // Default to "Guest" if no data found

  /**
   * Calculates the BMI and updates the state.
   * @param {number} height - Height in centimeters.
   * @param {number} weight - Weight in kilograms.
   */
  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  /**
   * Fetches user information from the backend.
   */
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}?userName=${userName}&action=getUserData`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

  /**
   * Fetches user session data from the backend.
   */
  const fetchUserSessionsInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}?userName=${userName}&action=getUserSessionsData`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        setCompletedSessions(data.user.completesessions);
        setOpenedSessions(data.user.openedsessions);
      } else {
        setErrorMessage(data.message || "Failed to fetch user sessions data.");
      }
    } catch (error) {
      setErrorMessage("Error: Network connection failed.");
    }
  };

  /**
   * Handles user data update and validation.
   */
  const handleUpdateClick = async () => {
    const error = validateInputs();
    if (error) {
      setErrorMessage(error);
      setSuccessMessage("");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          age: parseInt(age),
          height: parseInt(height),
          weight: parseInt(weight),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Details updated successfully!");
        setErrorMessage("");
        calculateBMI(height, weight);
      } else {
        setErrorMessage(data.message || "Failed to update details.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setUpdating(false);
    }
  };

  /**
   * Validates user inputs.
   * @returns {string} - Error message if validation fails, otherwise empty string.
   */
  const validateInputs = () => {
    if (!age || age <= 0) return "Please enter a valid age.";
    if (!height || height <= 0) return "Please enter a valid height.";
    if (!weight || weight <= 0) return "Please enter a valid weight.";
    return "";
  };

  /**
   * Fetches initial data on component mount.
   */
  const fetchInitialData = async () => {
    await fetchUserInfo();
    await fetchUserSessionsInfo();
    setLoading(false);
  };

  return {
    userName,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    bmi,
    errorMessage,
    successMessage,
    completedSessions,
    openedSessions,
    handleUpdateClick,
    fetchInitialData,
    loading,
    updating,
  };
};
