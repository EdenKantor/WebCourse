import { useState } from "preact/hooks";
import { getFromSessionStorage, saveToSessionStorage, clearSessionStorage } from "../utils/LocalSessionHelper";

// API URL for registration requests
const url = "https://web-fit-pro-back-rose.vercel.app/api/register";

export const useRegistration2Logic = (navigate) => {
  // Form input states
  const [username, setUsername] = useState(""); // Stores the entered username
  const [password, setPassword] = useState(""); // Stores the entered password
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores the re-entered password for confirmation
  const [errorMessage, setErrorMessage] = useState(""); // Holds any validation or API error messages

  // States to control visibility of password fields
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Visibility toggle for password field
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // Visibility toggle for confirm password field

  // Popup state management
  const [isOpen, setIsOpen] = useState(false); // Controls the visibility of the popup
  const [showSuccess, setShowSuccess] = useState(false); // Indicates if the popup shows a success message
  const [isError, setIsError] = useState(false); // Indicates if the popup shows an error message
  const [popupMessage, setPopupMessage] = useState(
    "Are you sure you want to submit your information?"
  ); // The message to be displayed in the popup

  // Loading spinner state
  const [loading, setLoading] = useState(false); // Indicates if a loading spinner should be shown

  // Maximum allowed length for username and password
  const MAX_LENGTH = 15;

  /**
   * Sanitizes the input value by removing spaces and enforcing the maximum length.
   * @param {string} value - The input value to sanitize.
   * @returns {string} - The sanitized input value.
   */
  const sanitizeInput = (value) => value.replace(/\s/g, "").slice(0, MAX_LENGTH);

  /**
   * Validates the user input fields and returns an error message if validation fails.
   * @returns {string} - Error message if validation fails, otherwise an empty string.
   */
  const validateInputs = () => {
    if (!username) return "Username is required.";
    if (username.length > MAX_LENGTH) return "Username exceeds 15 characters.";
    if (!password) return "Password is required.";
    if (password.length > MAX_LENGTH) return "Password exceeds 15 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return ""; // No errors
  };

  /**
   * Handles the "Save" button click event.
   * Validates inputs and updates session storage with the entered data.
   */
  const handleSaveClick = () => {
    const error = validateInputs(); // Validate inputs
    setErrorMessage(error); // Display any validation errors
    if (!error) {
      const userData = getFromSessionStorage("registrationData"); // Retrieve existing registration data
      const finalUserData = {
        ...userData,
        userName: username,
        password,
      };
      saveToSessionStorage("registrationData", finalUserData); // Save the final user data to session storage
      console.log("Final User Data Saved to SessionStorage: ", finalUserData); // Debugging log
      openPopup(); // Open the confirmation popup
    }
  };

  // Toggles the visibility of the password field
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Toggles the visibility of the confirm password field
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  // Opens the confirmation popup
  const openPopup = () => setIsOpen(true);

  /**
   * Closes the popup and resets its state to default values.
   */
  const handlePopupClose = () => {
    setIsOpen(false);
    setShowSuccess(false);
    setIsError(false); // Clear any error flags
    setPopupMessage("Are you sure you want to submit your information?");
  };

  /**
   * Cleans localSession and goes back to the first page.
   */
  const handleBackToHome = () => {
    clearSessionStorage("registrationData"); // Clear stored data
    navigate("/"); // Navigate to home page
  };

  /**
   * Handles the confirmation of the popup by sending the data to the backend.
   */
  const handlePopupConfirm = async () => {
    setLoading(true); // Start loading spinner
    try {
      const userData = getFromSessionStorage("registrationData"); // Retrieve registration data from session
      const payload = {
        gender: userData.gender,
        age: parseInt(userData.age, 10),
        height: parseFloat(userData.height),
        weight: parseFloat(userData.weight),
        userName: userData.userName,
        password: userData.password,
      };
      console.log("Payload Sent to Backend: ", payload); // Debugging log
      await registerUser(payload); // Send the data to the backend
    } catch (error) {
      console.error("Failed to confirm popup:", error); // Log errors
    } finally {
      setLoading(false); // Stop the spinner regardless of the outcome
    }
  };

  /**
   * Sends a POST request to the backend API to register the user.
   * @param {Object} userData - The payload containing user registration data.
   */
  const registerUser = async (userData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Handle API response status
      if (response.status === 200) {
        setShowSuccess(true);
        setPopupMessage("You have registered successfully! Wait for admin approval");
      } else {
        setIsError(true); // Show error message
        setPopupMessage(data.message || "An unexpected error occurred.");
        setIsOpen(true); // Open the error popup
      }
    } catch (error) {
      setIsError(true);
      setPopupMessage("Error: Network connection failed.");
      setIsOpen(true); // Open the error popup
    }
  };

  return {
    username,
    setUsername: (val) => setUsername(sanitizeInput(val)), // Sanitized setter for username
    password,
    setPassword: (val) => setPassword(sanitizeInput(val)), // Sanitized setter for password
    confirmPassword,
    setConfirmPassword: (val) => setConfirmPassword(sanitizeInput(val)), // Sanitized setter for confirmPassword
    isPasswordVisible,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    toggleConfirmPasswordVisibility,
    errorMessage,
    handleSaveClick,
    isOpen,
    showSuccess,
    popupMessage,
    isError,
    handlePopupClose,
    handlePopupConfirm,
    handleBackToHome,
    loading,
  };
};
