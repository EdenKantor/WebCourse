import { useState } from "preact/hooks";
import { getFromSessionStorage } from "../utils/LocalSessionHelper";

const apiUrl = "https://web-fit-pro-back-rose.vercel.app/api/continueRoutine";

export const useContinueRoutineLogic = () => {
  // Workout Video Data
  const [workouts, setWorkouts] = useState([]);
  const [doneArray, setDoneArray] = useState([]);
  const [likeArray, setLikeArray] = useState([]);

  // Retrieve username from session storage
  const userData = getFromSessionStorage("signedUserData");
  const userName = userData?.userName || "";// Use empty string if no userName exists

  // Loading circle status, changes when we finished loading videos
  const [loading, setLoading] = useState(true);


  // Popup states
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Error state
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Fetches initial user session information from the server.
   * @param {string} userName - The username of the logged-in user.
   */  
  const fetchUserSessionInfo = async (userName) => {
    try {
      const response = await fetch(
        `${apiUrl}?userName=${userName}&action=getInitalUserSessionData`,
        { method: "GET" }
      );
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data.videos);
        setDoneArray(data.checks);
        setLikeArray(data.likes);
        setErrorMessage(""); // Clear any previous error
      } else {
        setErrorMessage(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  /**
   * Loads user data from the backend if username exists.
   */
  const loadUserData = async () => {
    if (userName) {
      await fetchUserSessionInfo(userName);
      setLoading(false);
    }
  };

  /**
   * Updates the completion status of an exercise.
   * @param {number} index - Index of the exercise in the list.
   * @param {boolean} doneAction - Completion action (true/false).
   */  
  const handleDone = async (index, doneAction) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          index: index,
          doneAction: doneAction,// Action to update workout status
          action: "patchDone",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(""); // Clear error on success
      } else {
        setErrorMessage(data.message || "Failed to update exercise status.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  /**
   * Updates the like status of a specific video.
   * @param {string} url - URL of the video.
   * @param {boolean} likeAction - Like action (true/false).
   */ 
  const handleLike = async (url, likeAction) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          url: url, // URL of the video to update like status
          likeAction: likeAction, // Like or dislike action
          action: "patchLikes",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(""); // Clear error on success
      } else {
        setErrorMessage(data.message || "Failed to update like status.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  /**
   * Submits the exercise progress and checks if all are completed.
   */
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}?userName=${userName}&action=getDoneVideoArray`,
        { method: "GET" }
      );
      const data = await response.json();

      if (response.ok) {
        if (data.counterChecks === 3) { // Check if all exercises are completed
          setShowSuccess(true);
          setPopupMessage("Completed all exercises! Well done champ!");
          setIsOpen(true); // Show the popup with "Completed" message
          setErrorMessage(""); // Clear error on success
        } else {
          setIsError(true);
          setPopupMessage("Almost there! Please complete all exercises.");
          setIsOpen(true); // Show the popup with "almost done" message
        }
      } else {
        setErrorMessage(data.message || "Failed to submit exercises.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };
  
  /**
   * Handles closing the popup window.
   */
  const handlePopupClose = () => {
      setIsOpen(false);
      setShowSuccess(false);
      setIsError(false);
  };

  return {
    workouts,
    doneArray,
    likeArray,
    handleSubmit,
    handleLike,
    handleDone,
    isOpen,
    handlePopupClose,
    popupMessage,
    showSuccess,
    isError,
    userName,
    errorMessage, // Expose error message
    loadUserData,
    loading,
  };
};
