import { useRegistration2Logic } from "../utils/Registration2PageLogic";
import { useLocation } from "wouter";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import ActionButton from "../components/ActionButton";
import Message from "../components/Message";
import Popup from "../components/Popup";
import LoadingSpinner from "../components/LoadingSpinner";

const Registration2Page = () => {
  const [, navigate] = useLocation(); // Hook for navigating between pages
  // Extract logic and state management from the custom hook
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    handleSaveClick,
    isPasswordVisible,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    toggleConfirmPasswordVisibility,
    isOpen,
    showSuccess,
    popupMessage,
    isError,
    handlePopupClose,
    handlePopupConfirm,
    handleBackToHome,
    loading,
  } = useRegistration2Logic(navigate);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Main container for page content */}
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Page title and subtitle */}
        <Title text="Please Enter your user information" />
        <Subtitle text="Almost done!" />

        {/* Input fields container */}
        <div className="w-full max-w-md space-y-6">
          <UsernameInput
            label="Username"
            placeholder="Enter your username (max 15 characters, no spaces)"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password (max 15 characters, no spaces)"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            toggleVisibility={togglePasswordVisibility} // Toggle password visibility
            isPasswordVisible={isPasswordVisible}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
            toggleVisibility={toggleConfirmPasswordVisibility} // Toggle confirm password visibility
            isPasswordVisible={isConfirmPasswordVisible}
          />
        </div>

        {/* Display error messages */}
        <Message message={errorMessage} />

        {/* Save button */}
        <ActionButton
          label="Save"
          iconClass="fas fa-save"
          onClick={handleSaveClick} // Trigger save logic
          className={`px-6 py-2 ${
            errorMessage
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300" // Disabled style
              : "bg-green-400 hover:bg-green-500 text-white" // Enabled style
          }`}
          disabled={!!errorMessage} // Disable button if there are errors
        />
      </div>

      {/* Confirmation popup */}
      <Popup
        isOpen={isOpen}
        onClose={handlePopupClose} // Close popup handler
        onConfirm={handlePopupConfirm} // Confirm popup action
        message={popupMessage} // Popup message text
        showSuccess={showSuccess} // Success state for popup
        backToHome={handleBackToHome} // Goes back to the first page
        isError={isError} // Error state for popup
      />

      {/* Loading spinner */}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Registration2Page;
