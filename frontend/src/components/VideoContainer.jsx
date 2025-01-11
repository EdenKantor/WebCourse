import { useLocation } from 'wouter'; 
import { useState, useEffect } from "preact/hooks";

const VideoContainer = ({
  id,
  title,
  videoUrl,
  category,
  level,
  numOfLikes,
  done,
  liked,
  onLike,
  onDone,
}) => {
  // Like State
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

  let showDoneButton = true; // Default is to show the Done button
  const [doneStatus, setDoneStatus] = useState({ done: done });

  const location = window.location.pathname;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  switch (location) {
    case "/discover2":
      showDoneButton = false;
      break;
  }

  const handleLike = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);

    const updatedLike = {
      liked: !likeData.liked,
      likeCount: likeData.liked
        ? Math.max(0, likeData.likeCount - 1)
        : likeData.likeCount + 1,
    };
    setLikeData(updatedLike);
    onLike(videoUrl, updatedLike.liked);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500); // 0.5-second delay
  };

  const handleDone = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);

    const updatedDone = { done: !doneStatus.done };
    setDoneStatus(updatedDone);
    onDone(id, updatedDone.done);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500); // 0.5-second delay
  };

  return (
    <div className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">
        {title}
      </h2>
      <iframe
        className="w-full h-80 rounded-lg"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className="mt-4 text-lg text-black dark:text-white">
        Category: {category}, Level: {level}
      </p>
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded transition-all duration-300 flex items-center space-x-2 ${
            likeData.liked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <i className="fas fa-heart"></i>
          <span>{likeData.liked ? "Liked" : "Like"}</span>
          <span className="ml-2">{likeData.likeCount}</span>
        </button>
        {showDoneButton && (
          <button
            onClick={handleDone}
            className={`px-4 py-2 rounded transition-all duration-300 flex items-center space-x-2 ${
              doneStatus.done
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-white hover:bg-gray-500"
            }`}
          >
            <i
              className={`fas ${
                doneStatus.done ? "fa-check-circle" : "fa-circle"
              }`}
            ></i>
            <span>{doneStatus.done ? "Done" : "Mark as Done"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;
