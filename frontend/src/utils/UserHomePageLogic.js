import { useState, useEffect } from "preact/hooks";
import { getFromSessionStorage } from "../utils/LocalSessionHelper";

// API URL for fetching quotes
const url = "https://web-fit-pro-back-rose.vercel.app/api/homepage";

export const useUserHomePageLogic = (navigate) => {
  // State variables
  const [loading, setLoading] = useState(true); // Loading spinner
  const [quote, setQuote] = useState(""); // Motivational quote
  const [author, setAuthor] = useState(""); // Quote author
  const [userName, setUserName] = useState("Guest"); // Default username
  const [isAdmin, setIsAdmin] = useState(false); // Admin flag

  // Fetch quote from backend
  const fetchQuote = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200 && data.quote) {
        setQuote(data.quote.quote); // Set quote text
        setAuthor(data.quote.name || "Unknown"); // Set author
      } else {
        setQuote("No quote available right now."); // Fallback quote
        setAuthor("Unknown");
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote("No quote available right now."); // Fallback quote
      setAuthor("Unknown");
    }
  };

  // Retrieve user data from session storage
  const loadUserData = () => {
    const userData = getFromSessionStorage("signedUserData");
    if (userData?.userName) {
      setUserName(userData.userName); // Set username
      setIsAdmin(userData.userName === "admin"); // Check if admin
    }
  };

  // Navigate to the specified route
  const handleNavigate = (route) => {
    navigate(route);
  };

  // Initialize data on component mount
  useEffect(() => {
    const initialize = async () => {
      loadUserData(); // Load user data from session storage
      await fetchQuote(); // Fetch quote from backend
      setLoading(false); // Turn off loading spinner
    };
    initialize();
  }, []);

  return {
    loading, // Loading state
    userName, // Current username
    quote, // Quote text
    author, // Quote author
    isAdmin, // Admin status
    handleNavigate, // Navigation handler
  };
};
