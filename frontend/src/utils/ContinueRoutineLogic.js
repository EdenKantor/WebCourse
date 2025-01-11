import { useState} from "preact/hooks";

const apiUrl = "http://localhost:3000/api/continueRoutine";

export const useContinueRoutineLogic = () => {

  // Workout Video Data
  const [workouts, setWorkouts] = useState([]);
  const [doneArray, setDoneArray] = useState([]);
  const [likeArray, setLikeArray] = useState([]);
  const [userNameUser, setUsername] = useState("");

  // Popup states
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false); 
  const [popupMessage, setPopupMessage] = useState("");

  
  // Fetch user session info from backend
  const fetchUserSessionInfo = async (userName) => {
    try {
      const response = await fetch(`${apiUrl}?userName=${userName}&action=getInitalUserSessionData`, {method: 'GET'});
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data.videos);
        setDoneArray(data.checks);
        setLikeArray(data.likes);
        setUsername(userName);
      } else {
        console.log(data.message || "Failed to fetch user data.");
      }        

    } catch (error) {
      console.log("Error: Network connection failed.");
    }
  };

  const handleDone = async (index, doneAction) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameUser,
          index: index,
          doneAction: doneAction,
          action: "patchDone",
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Update successful:", data.message);
      } else {
        console.error("Failed to update:", data.message);
      }
    } catch (error) {
      console.error("Error calling API:", error.message);
    }
  };

  const handleLike = async (url, likeAction) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameUser,
          url: url,
          likeAction: likeAction,
          action: "patchLikes",
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Like/Unlike update successful:", data.message);
      } else {
        console.log("Failed to update like status:", data.message);
      }
    } catch (error) {
      console.log("Error calling API:", error.message);
    }
  };
  
  
  
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}?userName=${userNameUser}&action=getDoneVideoArray`, {method: 'GET'});
      const data = await response.json();

      if (response.ok) {
        if(data.counterChecks==3){
          setShowSuccess(true);
          setPopupMessage("Completed all exercises! Well done champ!");
          setIsOpen(true);
          console.log("Here");
        }
        else {
          setIsError(true);
          setPopupMessage("Almost there! Please complete all exercises.");
          setIsOpen(true);
        }
      } 
    } catch (error) {
      console.log(error);
    }    
    };

    const handlePopupClose = async() => {
      if (showSuccess) {
        handleBackToHome(); // Use the same logic for closing popup and navigating home
      } else {
        setIsOpen(false);
        setShowSuccess(false);
        setIsError(false);
      }

  }
    return {
      workouts,
      doneArray,
      likeArray,
      fetchUserSessionInfo,
      handleSubmit,
      handleLike,
      handleDone,
      isOpen,
      handlePopupClose,
      popupMessage,
      showSuccess,
      isError,
  
    };
};