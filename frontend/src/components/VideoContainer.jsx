// A video container component that displays video details and allows users to like or mark videos as done.
// It supports dynamic styles, state updates, and responsive behavior for light and dark modes.

import { useState, useEffect } from "preact/hooks";

const VideoContainer = ({
  id, // Unique identifier for the video
  title, // Title of the video
  videoUrl, // URL for the video iframe
  category, // Category of the video
  level, // Difficulty level of the video
  numOfLikes, // Initial number of likes
  done, // Initial "done" status
  liked, // Initial "liked" status
  onLike, // Callback for handling "like" action
  onDone, // Callback for handling "done" action
}) => {
  // State for like data (liked status and like count)
  const [likeData, setLikeData] = useState({
    liked: liked,
    likeCount: numOfLikes,
  });

  // Update likeData when props change
  useEffect(() => {
    setLikeData({
      liked: liked,
      likeCount: numOfLikes,
    });
  }, [liked, numOfLikes]);

  // State for "done" status
  const [doneStatus, setDoneStatus] = useState({ done: done });

  let showDoneButton = true; // Default: show "Done" button
  const location = window.location.pathname;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Disable buttons temporarily to prevent spamming

  // Customize button visibility for specific routes
  switch (location) {
    case "/discover2":
      showDoneButton = false; // Hide "Done" button on Discover2 page
      break;
  }

  // Handle "Like" button click
  const handleLike = () => {
    if (isButtonDisabled) return; // Prevent action if button is disabled
    setIsButtonDisabled(true);

    const updatedLike = {
      liked: !likeData.liked, // Toggle liked state
      likeCount: likeData.liked
        ? Math.max(0, likeData.likeCount - 1) // Decrease like count
        : likeData.likeCount + 1, // Increase like count
    };
    setLikeData(updatedLike);
    onLike(videoUrl, updatedLike.liked); // Trigger callback
    setTimeout(() => setIsButtonDisabled(false), 500); // Re-enable button after 0.5 seconds
  };

  // Handle "Done" button click
  const handleDone = () => {
    if (isButtonDisabled) return; // Prevent action if button is disabled
    setIsButtonDisabled(true);

    const updatedDone = { done: !doneStatus.done }; // Toggle "done" status
    setDoneStatus(updatedDone);
    onDone(id, updatedDone.done); // Trigger callback
    setTimeout(() => setIsButtonDisabled(false), 500); // Re-enable button after 0.5 seconds
  };

  return (
    <div className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      {/* Video Title */}
      <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">
        {title}
      </h2>

      {/* Video Embed */}
      <iframe
        className="w-full h-80 rounded-lg"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Video Category and Level */}
      <p className="mt-4 text-lg text-black dark:text-white">
        Category: {category}, Level: {level}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4 items-center">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded transition-all duration-300 flex items-center space-x-2 ${
            likeData.liked
              ? "bg-red-500 text-white hover:bg-red-600" // Liked button styles
              : "bg-blue-500 text-white hover:bg-blue-600" // Unliked button styles
          }`}
        >
          <i className="fas fa-heart"></i> {/* Heart icon */}
          <span>{likeData.liked ? "Liked" : "Like"}</span> {/* Like status */}
          <span className="ml-2">{likeData.likeCount}</span> {/* Like count */}
        </button>

        {/* Done Button */}
        {showDoneButton && (
          <button
            onClick={handleDone}
            className={`px-4 py-2 rounded transition-all duration-300 flex items-center space-x-2 ${
              doneStatus.done
                ? "bg-green-500 text-white hover:bg-green-600" // Done button styles
                : "bg-gray-400 text-white hover:bg-gray-500" // Not done button styles
            }`}
          >
            <i
              className={`fas ${
                doneStatus.done ? "fa-check-circle" : "fa-circle"
              }`}
            ></i> {/* Check/Circle icon */}
            <span>{doneStatus.done ? "Done" : "Mark as Done"}</span> {/* Done status */}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;
