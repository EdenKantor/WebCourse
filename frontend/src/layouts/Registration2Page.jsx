import { useLocation } from 'wouter'; 
import { useState } from "preact/hooks"; 
import { useRegistration2Logic } from "../utils/Registration2PageLogic";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import ActionButton from "../components/ActionButton";
import Message from "../components/Message";
import Popup from "../components/Popup";
import LoadingSpinner from "../components/LoadingSpinner";
import { userData } from "./Registration1Page";

const Registration2Page = () => {
  const [, navigate] = useLocation(); // Use Wouter's navigation

  // Hooks for logic
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    handleSave,
    isPasswordVisible,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    toggleConfirmPasswordVisibility,
    isOpen,
    showSuccess,
    popupMessage,
    isError, 
    openPopup,
    closePopup,
    confirmPopup,
  } = useRegistration2Logic();

  const [loading, setLoading] = useState(false); // Loading spinner state

  const handleSaveClick = () => {
    const isValid = handleSave(); // Validate inputs
    if (isValid) {
      userData.userName = username; // Update username
      userData.password = password; // Update password
      console.log("Final User Data:", userData); // Debugging log
      openPopup(); // Open popup only if no errors
    }
  };
  
  const handlePopupConfirm = async () => {
    setLoading(true); // Start loading spinner

    try {
      await confirmPopup(userData); // Confirm registration to backend
    } catch (error) {
      console.error("Failed to confirm popup:", error); // Log error
    } finally {
      setLoading(false); // Stop spinner regardless of outcome
    }
  };

  const handleBackToHome = () => {
    localStorage.removeItem("registrationData"); // Clear stored data
    navigate("/"); // Navigate to home page
  };

  const handlePopupClose = () => {
    if (showSuccess) {
      handleBackToHome(); // Use the same logic for closing popup and navigating home
    } else {
      closePopup(); // Close popup without navigating
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text="Please Enter your user information" />
        <Subtitle text="Almost done!" />

        <div className="w-full max-w-md space-y-6">
          <UsernameInput
            label="Username"
            placeholder="Enter your username (max 15 characters, no spaces)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password (max 15 characters, no spaces)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleVisibility={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggleVisibility={toggleConfirmPasswordVisibility}
            isPasswordVisible={isConfirmPasswordVisible}
          />
        </div>

        <Message message={errorMessage} />

        <ActionButton
          label="Save"
          iconClass="fas fa-save"
          onClick={handleSaveClick}
          className={`px-6 py-2 ${
            errorMessage
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
              : "bg-green-400 hover:bg-green-500 text-white"
          }`}
          disabled={!!errorMessage}
        />
      </div>

      <Popup
        isOpen={isOpen}
        onClose={handlePopupClose}
        onConfirm={handlePopupConfirm}
        message={popupMessage}
        showSuccess={showSuccess}
        backToHome={handleBackToHome}
        isError={isError} 
      />

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Registration2Page;
