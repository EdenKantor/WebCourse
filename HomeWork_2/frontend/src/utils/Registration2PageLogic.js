import { useState } from "preact/hooks";

// API URL
const url = "http://localhost:3000/api/register";

export const useRegistration2Logic = () => {
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Visibility states for password inputs
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Popup states
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false); // NEW - Error popup flag
  const [popupMessage, setPopupMessage] = useState(
    "Are you sure you want to submit your information?"
  );

  // Character limit
  const MAX_LENGTH = 15;

  // Sanitize input to remove spaces and enforce max length
  const sanitizeInput = (value) => value.replace(/\s/g, "").slice(0, MAX_LENGTH);

  // Validation function
  const validateInputs = () => {
    if (!username) return "Username is required.";
    if (username.length > MAX_LENGTH) return "Username exceeds 15 characters.";
    if (!password) return "Password is required.";
    if (password.length > MAX_LENGTH) return "Password exceeds 15 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return ""; // No errors
  };

  const handleSave = () => {
    const error = validateInputs(); // Validate inputs
    setErrorMessage(error); // Update error message
    return !error; // Return true if no error
  };

  // Toggle visibility functions
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  // Popup controls
  const openPopup = () => setIsOpen(true);
  const closePopup = () => {
    setIsOpen(false);
    setShowSuccess(false);
    setIsError(false); // Reset error flag
    setPopupMessage("Are you sure you want to submit your information?");
  };

  const confirmPopup = async (userData) => {
    await registerUser(userData); // Make the POST API call
  };

// API Call Function
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

    // Handle status codes
    if (response.status === 200) {
      setShowSuccess(true);
      setPopupMessage("You have registered successfully! Wait for admin approval");
    } else {
      setIsError(true); // Trigger error popup
      setPopupMessage(data.message || "An unexpected error occurred.");
      setIsOpen(true);
    }
  } catch (error) {
    setIsError(true);
    setPopupMessage("Error: Network connection failed.");
    setIsOpen(true);
  }
};

  return {
    username,
    setUsername: (val) => setUsername(sanitizeInput(val)),
    password,
    setPassword: (val) => setPassword(sanitizeInput(val)),
    confirmPassword,
    setConfirmPassword: (val) => setConfirmPassword(sanitizeInput(val)),
    isPasswordVisible,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    toggleConfirmPasswordVisibility,
    errorMessage,
    handleSave,
    isOpen,
    showSuccess,
    popupMessage,
    isError, // Expose error state
    openPopup,
    closePopup,
    confirmPopup,
  };
};
