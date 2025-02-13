import { useEffect } from "preact/hooks";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import VideoContainer from "../components/VideoContainer";
import { useDiscover2PageLogic } from "../utils/Discover2PageLogic";
import DropdownMenu from "../components/DropdownMenu";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const Discover2Page = () => {
  const {
    workouts,
    likeArray,
    handleLike,
    selectedSortParam,
    setSelectedSort,
    errorMessage,
    loading,
    userName,
    bodyArea,
    loadUserData,
    isSorting,
    changeVideosOrderAfterSort,
  } = useDiscover2PageLogic();

  // Fetch user data when the user's name or selected body area changes.
  useEffect(() => {
    loadUserData();
  }, [userName, bodyArea]);

  // Update the order of videos when the sort parameter changes.  
  useEffect(() => {
    changeVideosOrderAfterSort();
  }, [selectedSortParam]);
  
  // Display a loading spinner if the data is still being fetched.
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text={`Our ${bodyArea} Exercises`} />
        <Subtitle text={`Discover all our exercises to train ${bodyArea}!`} />

        {/* Display Error Message */}
        {errorMessage && <Message message={errorMessage} type="error" />}

        {/* Dropdown Menu for Sorting Options */}
        <div className="w-full max-w-4xl flex justify-center">
          <DropdownMenu
            options={[
              "Title (A->Z)",
              "Title (Z->A)",
              "Most Liked",
              "Least Liked",
              "Most Difficult",
              "Least Difficult",
            ]}
            selected={selectedSortParam}
            onSelect={(value) => {
              setSelectedSort(value);// Update selected sorting parameter.
            }}
            disabled={!!errorMessage} // Disable when errorMessage is active
          />
        </div>

        {/* Sorting Spinner */}
        {isSorting && <LoadingSpinner />}

        {/* Workout Cards by selected body area */}
        <div className="space-y-8 w-full max-w-4xl">
          {workouts.map((workout, index) => (
            <VideoContainer
              id={index}
              title={workout.title}
              videoUrl={workout.url}
              category={workout.bodyPart}
              level={workout.difficulty}
              numOfLikes={workout.likeCount}
              liked={likeArray[index]}
              onLike={handleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover2Page;
