import { useState} from "preact/hooks";

const apiUrl = "http://localhost:3000/api/discover";

export const useDiscover2PageLogic = () => {

  // Workout Video Data
  const [workouts, setWorkouts] = useState([]);
  const [likeArray, setLikeArray] = useState([]);
  const [userNameUser, setUsername] = useState("");
  const [chosenBodyPart, setbodyPart] = useState("");
  const [selectedSortParam, setSelectedSort] = useState("- Sort by -");
  
  // Fetch user session info from backend
  const fetchBodyPartVideos = async (userName,bodyPart) => {
    try {
      const response = await fetch(`${apiUrl}?userName=${userName}&action=filterByBodyPart&bodyPart=${bodyPart}`, {method: 'GET'});
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data.videos);
        setLikeArray(data.likes);
        setUsername(userName);
        setbodyPart(bodyPart);
      } else {
        console.error(data.message || "Failed to fetch user data.");
      }        

    } catch (error) {
      console.error("Error: Network connection failed.");
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
          console.log("Videos",data.videos);
          console.log("Videos",data.likes);
        } else {
          console.error(data.message || "Failed to fetch sorted videos.");
        }
      } catch (error) {
        console.error("Error fetching sorted videos:", error.message);
      }
  
    }

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
          action: "updateVideoLikes",
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Like/Unlike update successful:", data.message);
      } else {
        console.error("Failed to update like status:", data.message);
      }
    } catch (error) {
      console.error("Error calling API:", error.message);
    }
  };
  
  return {
    selectedSortParam,
    setSelectedSort,
    workouts,
    likeArray,
    fetchBodyPartVideos,
    handleLike,
    fetchSortedVideos,
  };
};