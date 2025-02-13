import { useState } from "preact/hooks";
import { saveToSessionStorage } from "../utils/LocalSessionHelper"; 

export const useLoginLogic = (navigate) => {
  // States for user inputs and feedback
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle visibility of password field
  const [message, setMessage] = useState(""); // Feedback message for the user
  
  // State for loading spinner
  const [loading, setLoading] = useState(false); 
 
  /**
   * Sanitizes the input by removing spaces and limiting the length.
   * @param {string} value - Input value to sanitize.
   * @returns {string} Sanitized input.
   */
 const sanitizeInput = (value) => value.replace(/\s/g, "").slice(0);

  /**
   * Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

   // Handle Login Button Click
   const handleLoginClick = async () => {
    setLoading(true); // Start loading spinner
    try {
      await handleLogin(); // Wait for login process to complete
    } catch (error) {
      console.error('Login error:', error); // Log unexpected errors
    } finally {
      setLoading(false); // Stop spinner after login process 
    }
  };

  /**
   * Handles login logic, including validation, API request, and navigation.
   */
  const handleLogin = async () => {
    // Validate that both username and password are provided
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      return;
    }

    const url = `https://web-fit-pro-back-rose.vercel.app/api/login?username=${username}&password=${password}`;

    try {
      // Send GET request to the login endpoint
      const response = await fetch(url, { method: "GET" });

      // Handle successful login
      if (response.status === 200) {
        const data = await response.json();
        const { isRegistered } = data.user;
        // Save userData with the username input to sessionStorage
      const signedUserData = {
        userName: username,
      };
      saveToSessionStorage("signedUserData", signedUserData); // Save to sessionStorage
      console.log("login Data Saved in SessionStorage: ", signedUserData); // Debugging log
        // Navigate based on user's registration status
        if (isRegistered === "N") {
          navigate("/NotSoFast");
        } else {
          navigate("/user-home");
        }
      }
      // Handle incorrect credentials or user not found
      else if (response.status === 401 || response.status === 404) {
        setMessage("Incorrect username or password. Please try again.");
      }
      // Handle unexpected server errors
      else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      // Handle network or request errors
      console.error("Error:", error);
      setMessage(
        "An error occurred while trying to sign in. Please check your network connection and try again."
      );
    }
  };

  return {
    username, // Current username
    setUsername: (value) => setUsername(sanitizeInput(value)), // Sanitized username setter
    password, // Current password
    setPassword: (value) => setPassword(sanitizeInput(value)), // Sanitized password setter
    isPasswordVisible, // Password visibility state
    togglePasswordVisibility, // Function to toggle password visibility
    message, // Feedback message for the user
    handleLoginClick, // Login function
    loading, // loading
  };
};
