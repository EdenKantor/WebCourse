import { useState } from "preact/hooks";
import { getFromSessionStorage } from "../utils/LocalSessionHelper";

const apiUrl = "https://web-fit-pro-back-rose.vercel.app/api/discover";

export const useDiscover2PageLogic = () => {
  // Workout Video Data
  const [workouts, setWorkouts] = useState([]);
  const [likeArray, setLikeArray] = useState([]);
  const [userNameUser, setUsername] = useState("");
  const [chosenBodyPart, setBodyPart] = useState("");
  const [selectedSortParam, setSelectedSort] = useState("- Sort by -");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const [loading, setLoading] = useState(true);

  // Retrieve data from session storage about who is the user
  // And what is the body part he selcted in Discover1Page
  const userData = getFromSessionStorage("signedUserData");
  const bodyAreaChoice = getFromSessionStorage("bodyAreaChoice");

  const userName = userData?.userName || "";
  const bodyArea = bodyAreaChoice?.bodyArea || "Unknown";

  const [isSorting, setIsSorting] = useState(false); // State for sorting spinner


  // Fetch user session info from backend
  const fetchBodyPartVideos = async (userName, bodyPart) => {
    try {
      const response = await fetch(
        `${apiUrl}?userName=${userName}&action=filterByBodyPart&bodyPart=${bodyPart}`,
        { method: "GET" }
      );
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data.videos);
        setLikeArray(data.likes);
        setUsername(userName);
        setBodyPart(bodyPart);
        setErrorMessage(""); // Clear any previous error
      } else {
        setErrorMessage(data.message || "Failed to fetch exercises.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    }
  };


  const loadUserData = async () => {
    if (userName && bodyArea) {
      await fetchBodyPartVideos(userName, bodyArea);
      setLoading(false);
    }
  };

  const changeVideosOrderAfterSort = async () => {
    if (selectedSortParam !== "- Sort by -") {
      setIsSorting(true); // Show sorting spinner
      await fetchSortedVideos();
      setIsSorting(false); // Hide sorting spinner
    }
  };

  const fetchSortedVideos = async () => {
    let action = "";

    switch (selectedSortParam) {
      case "Title (A->Z)":
        action = "sortByTitle&ascending=true";
        break;
      case "Title (Z->A)":
        action = "sortByTitle&ascending=false";
        break;
      case "Most Liked":
        action = "sortByLikes&highestFirst=true";
        break;
      case "Least Liked":
        action = "sortByLikes&highestFirst=false";
        break;
      case "Most Difficult":
        action = "sortByDifficulty&beginnerFirst=false";
        break;
      case "Least Difficult":
        action = "sortByDifficulty&beginnerFirst=true";
        break;
      default:
        return;
    }

    try {
      const response = await fetch(
        `${apiUrl}?userName=${userNameUser}&action=${action}&bodyPart=${chosenBodyPart}`
      );
      const data = await response.json();
      if (response.ok) {
        setLikeArray(data.likes);
        setWorkouts(data.videos);
        setErrorMessage(""); // Clear any previous error
      } else {
        setErrorMessage(data.message || "Failed to fetch sorted videos.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
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
          url,
          likeAction,
          action: "updateVideoLikes",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(""); // Clear any previous error
      } else {
        setErrorMessage(data.message || "Failed to update like status.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return {
    selectedSortParam,
    setSelectedSort,
    workouts,
    likeArray,
    handleLike,
    errorMessage,
    loading,
    userName,
    bodyArea,
    loadUserData,
    isSorting,
    changeVideosOrderAfterSort,
  };
};
