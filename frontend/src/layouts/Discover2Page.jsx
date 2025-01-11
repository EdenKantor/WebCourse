import { useEffect} from "preact/hooks"; 
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import VideoContainer from "../components/VideoContainer"; 
import { signedUserData } from "./LoginPage"; // Import username from login page
import { bodyAreaChoice}from "./Discover1Page";
import { useDiscover2PageLogic } from "../utils/Discover2PageLogic";
import DropdownMenu from "../components/DropdownMenu";


const Discover2Page = () => {
  const { 
    workouts ,
    likeArray , 
    fetchBodyPartVideos,
    handleLike,
    selectedSortParam,
    setSelectedSort,
    fetchSortedVideos,
  } = useDiscover2PageLogic(); // Get workouts from logic

  let firstTimeInPage = true;
  // Fetch the exercise by body part info when the page loads the first time
  useEffect(() => {
    const loadUserData = async () => {
      if (signedUserData && signedUserData.userName && firstTimeInPage) {
        await fetchBodyPartVideos(signedUserData.userName,bodyAreaChoice.bodyArea); 
        firstTimeInPage=false;
      }
    };
    loadUserData(); // Fetch user data
  }, []);

  
  // After sort choice fetch again videos by the sorted choice
  useEffect(() => {
      const changeVideosOrderAfterSort = async () => {
        if (selectedSortParam!= "- Sort by -") { // Ensure it runs only when an option is picked
        await fetchSortedVideos();
      };
    }
    changeVideosOrderAfterSort();

  }, [selectedSortParam]);


  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text={`Our ${bodyAreaChoice.bodyArea} Exercises`} />
        <Subtitle text={`Discover all our exercises to train ${bodyAreaChoice.bodyArea}! `} />

        {/* Dropdown Menu */}
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
            onSelect={setSelectedSort}
          />
        </div>
        {/* Workout Cards */}
        <div className="space-y-8 w-full max-w-4xl">
          {workouts.map((workout, index) => (
            <VideoContainer
              id={index}
              title={workout.title}
              videoUrl={workout.url}
              category={workout.bodyPart}
              level={workout.difficulty}
              numOfLikes = {workout.likeCount}
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