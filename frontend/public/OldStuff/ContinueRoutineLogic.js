document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const changeThemeBtn = document.getElementById('change-theme');
  const workoutCategories = ['Hands', 'Chest', 'Legs', 'Shoulders', 'Stomach', 'Full Body'];
  const workoutLevels = ['Beginner', 'Intermediate', 'Hard'];
  const workoutCardsContainer = document.getElementById('workout-cards');
  const submitWorkoutButton = document.getElementById('submit-workout');

  // Tailwind's dark mode configuration
  tailwind.config = {
      darkMode: 'class',
  };

  // Set initial theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
  }

  // Function to update theme classes on video cards
  function updateVideoCardThemes() {
      const videoContainers = workoutCardsContainer.querySelectorAll('div');
      const isDarkMode = html.classList.contains('dark');

      videoContainers.forEach(videoContainer => {
          videoContainer.classList.toggle('bg-gray-800', isDarkMode);
          videoContainer.classList.toggle('fixed-dark-bg', !isDarkMode);

          const titles = videoContainer.querySelectorAll('h2');
          titles.forEach(title => {
              title.classList.toggle('text-white', isDarkMode);
              title.classList.toggle('fixed-dark-text', !isDarkMode);
          });

          const labels = videoContainer.querySelectorAll('label');
          labels.forEach(label => {
              label.classList.toggle('text-white', isDarkMode);
              label.classList.toggle('fixed-dark-text', !isDarkMode);
          });

          const levelTexts = videoContainer.querySelectorAll('p');
          levelTexts.forEach(levelText => {
              levelText.classList.toggle('text-white', isDarkMode);
              levelText.classList.toggle('fixed-dark-text', !isDarkMode);
          });
      });
  }

  // Theme Change Button Logic
  if (changeThemeBtn) {
      changeThemeBtn.addEventListener('click', () => {
          html.classList.toggle('dark');

          // Save theme preference to localStorage
          if (html.classList.contains('dark')) {
              localStorage.setItem('theme', 'dark');
          } else {
              localStorage.setItem('theme', 'light');
          }

          // Update video card themes
          updateVideoCardThemes();
      });
  }

  // Ensure that video cards are updated initially
  updateVideoCardThemes();

  function getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
  }

  function generateWorkout() {
      const isDarkMode = html.classList.contains('dark');
      workoutCardsContainer.innerHTML = '';

      // Select 3 unique categories
      const selectedCategories = [];
      while (selectedCategories.length < 3) {
          const category = getRandomItem(workoutCategories);
          if (!selectedCategories.includes(category)) {
              selectedCategories.push(category);
          }
      }

      selectedCategories.forEach(category => {
          let currentIndex = 0;
          const level = getRandomItem(workoutLevels);
          const videos = videoData[category][level];

          const videoContainer = document.createElement("div");
          videoContainer.classList.add(
              isDarkMode ? "bg-gray-800" : "fixed-dark-bg",
              "p-4",
              "rounded-lg",
              "shadow-lg",
              "hover:shadow-2xl",
              "transition-shadow",
              "duration-300"
          );

          const title = document.createElement("h2");
          title.classList.add(
              "text-2xl",
              "font-semibold",
              "mb-2",
              isDarkMode ? "text-white" : "fixed-dark-text"
          );
          title.textContent = videos[currentIndex].title;

          const iframe = document.createElement("iframe");
          iframe.classList.add("w-full", "h-80", "rounded-lg");
          iframe.src = videos[currentIndex].url;
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;

          const levelText = document.createElement("p");
          levelText.classList.add(
              "mt-4",
              "text-lg",
              isDarkMode ? "text-white" : "fixed-dark-text"
          );
          levelText.textContent = `Category: ${category}, Level: ${level}`;

          const likeButton = document.createElement("button");
          likeButton.classList.add(
              "px-4",
              "py-2",
              "rounded",
              "mt-4",
              "transition-colors",
              "duration-300"
          );

          const likeCountDisplay = document.createElement("span");
          likeCountDisplay.classList.add("ml-2", "text-lg");

          const likesStorageKey = `likes_${category}_${level}_${currentIndex}`;
          const updateLikeState = () => {
              const currentVideoLikeData = JSON.parse(localStorage.getItem(likesStorageKey)) || { liked: false, likeCount: 0 };
              likeButton.textContent = currentVideoLikeData.liked ? "❤ Liked" : "🤍 Like";
              likeCountDisplay.textContent = `Likes: ${currentVideoLikeData.likeCount}`;
              likeButton.classList.toggle("bg-red-500", currentVideoLikeData.liked);
              likeButton.classList.toggle("bg-blue-500", !currentVideoLikeData.liked);
          };

          likeButton.addEventListener('click', () => {
              const currentVideoLikeData = JSON.parse(localStorage.getItem(likesStorageKey)) || { liked: false, likeCount: 0 };

              if (currentVideoLikeData.liked) {
                  currentVideoLikeData.liked = false;
                  currentVideoLikeData.likeCount = Math.max(0, currentVideoLikeData.likeCount - 1);
              } else {
                  currentVideoLikeData.liked = true;
                  currentVideoLikeData.likeCount++;
              }

              localStorage.setItem(likesStorageKey, JSON.stringify(currentVideoLikeData));
              updateLikeState();
          });

          // Initialize like state
          updateLikeState();

          const checkboxContainer = document.createElement("div");
          checkboxContainer.classList.add("flex", "items-center", "justify-center", "w-full", "mt-4");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("workout-checkbox", "w-6", "h-6", "mr-2");

          const checkboxLabel = document.createElement("label");
          checkboxLabel.classList.add(
              "text-lg",
              isDarkMode ? "text-white" : "fixed-dark-text"
          );
          checkboxLabel.textContent = "Complete Workout";

          checkboxContainer.appendChild(checkbox);
          checkboxContainer.appendChild(checkboxLabel);

          videoContainer.appendChild(title);
          videoContainer.appendChild(iframe);
          videoContainer.appendChild(levelText);
          videoContainer.appendChild(likeButton);
          videoContainer.appendChild(likeCountDisplay);
          videoContainer.appendChild(checkboxContainer);

          workoutCardsContainer.appendChild(videoContainer);
    
      });
  }

  submitWorkoutButton.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('.workout-checkbox');
      const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
      const errorMessage = document.getElementById('error-message');
      if (allChecked) {
          errorMessage.style.display = 'none';
          window.location.href = "HomePage.html";
      } else {
          errorMessage.style.display = 'block';
      }
  });

     // Video Data
const videoData = {
    Hands: {
      Beginner: [
        { url: "https://www.youtube.com/embed/onLTHQ1KE50", title: "Gentle Hand Warmup for Fitness Beginners" },
        { url: "https://www.youtube.com/embed/dx5kfO77Znw", title: "Easy Hand Exercises to Start Your Fitness Journey" }
      ],
      Intermediate: [
        { url: "https://www.youtube.com/embed/euMKqvdc89I", title: "Moderate Hand Strength Training for Intermediate Fitness" },
        { url: "https://www.youtube.com/embed/ME0cj3FTbms", title: "Challenging Hand Workout for Growing Strength" }
      ],
      Hard: [
        { url: "https://www.youtube.com/embed/L-OnkY8a6AY", title: "Advanced Hand Strength Intensive Workout" },
        { url: "https://www.youtube.com/embed/j64BBgBGNIU", title: "Extreme Hand Power and Endurance Challenge" }
      ],
    },
    Chest: {
      Beginner: [
        { url: "https://www.youtube.com/embed/a9vL6BsgkPg", title: "First Steps to Chest Muscle Development" },
        { url: "https://www.youtube.com/embed/n69-eVLtevc", title: "Introductory Chest Workout for Newbies" }
      ],
      Intermediate: [
        { url: "https://www.youtube.com/embed/7KSNmziMqog", title: "Progressive Chest Muscle Building Routine" },
        { url: "https://www.youtube.com/embed/ZyjQar-XgBc", title: "Intermediate Chest Strength and Definition" }
      ],
      Hard: [
        { url: "https://www.youtube.com/embed/MxnzcssW-tk", title: "Advanced Chest Muscle Hypertrophy Workout" },
        { url: "https://www.youtube.com/embed/fGm-ef-4PVk", title: "Intense Chest Muscle Power Training" }
      ],
    },
    Stomach: {
      Beginner: [
        { url: "https://www.youtube.com/embed/svdPTfOpAyQ", title: "Gentle Core Activation for Beginners" },
        { url: "https://www.youtube.com/embed/tfL4g3l2X4Y", title: "Easy Stomach Muscle Introduction" }
      ],
      Intermediate: [
        { url: "https://www.youtube.com/embed/1TgfjOnY_7U", title: "Core Strength Building for Intermediate Level" },
        { url: "https://www.youtube.com/embed/jE11JG2Et7s", title: "Progressive Abdominal Muscle Development" }
      ],
      Hard: [
        { url: "https://www.youtube.com/embed/_ikzZyiwsGU", title: "Advanced Core Muscle Intensive Workout" },
        { url: "https://www.youtube.com/embed/aUHabt61HDY", title: "Extreme Stomach Muscle Endurance Challenge" }
      ],
    },
    Shoulders: {
      Beginner: [
        { url: "https://www.youtube.com/embed/FkNFctqPmis", title: "Shoulder Mobility and Light Strength Training" },
        { url: "https://www.youtube.com/embed/riS89biXH7E", title: "Introductory Shoulder Muscle Exercises" }
      ],
      Intermediate: [
        { url: "https://www.youtube.com/embed/w8cSjkXkYRc", title: "Moderate Shoulder Muscle Building Routine" },
        { url: "https://www.youtube.com/embed/djWz9xQmiWw", title: "Progressive Shoulder Strength Training" }
      ],
      Hard: [
        { url: "https://www.youtube.com/embed/plPdke9SHFg", title: "Advanced Shoulder Muscle Power Workout" },
        { url: "https://www.youtube.com/embed/jXm0y-csiuE", title: "Intense Shoulder Muscle Endurance Challenge" }
      ],
    },
    Legs: {
      Beginner: [
        { url: "https://www.youtube.com/embed/uVwNVEQS_uo", title: "Gentle Lower Body Introduction for Beginners" },
        { url: "https://www.youtube.com/embed/2_lCvBvHRFI", title: "Easy Leg Muscle Activation Workout" }
      ],
      Intermediate: [
        { url: "https://www.youtube.com/embed/pT8YHR0G_CU", title: "Moderate Leg Strength and Conditioning" },
        { url: "https://www.youtube.com/embed/h9uZVP_qLVo", title: "Progressive Lower Body Muscle Building" }
      ],
      Hard: [
        { url: "https://www.youtube.com/embed/ZZI__bqlBkQ", title: "Advanced Leg Muscle Power and Endurance" },
        { url: "https://www.youtube.com/embed/GAlD5USVVvg", title: "Extreme Lower Body Muscle Challenge" }
      ],
    },
    "Full Body": {
      Beginner: [
        { url: "https://www.youtube.com/embed/cbKkB3POqaY", title: "Complete Body Workout for Fitness Novices" },
        { url: "https://www.youtube.com/embed/l9_SoClAO5g", title: "Comprehensive Beginner Full Body Training" }
      ],
      Intermediate: [
        { url: "https://www.youtube.com/embed/C2HX2pNbUCM", title: "Balanced Full Body Strength and Conditioning" },
        { url: "https://www.youtube.com/embed/kbS0sRGfQFs", title: "Progressive Full Body Muscle Development" }
      ],
      Hard: [
        { url: "https://www.youtube.com/embed/ScInpT_5dIQ", title: "Advanced Full Body Muscle Hypertrophy Workout" },
        { url: "https://www.youtube.com/embed/GViX8riaHX4", title: "Extreme Full Body Endurance and Power Challenge" }
      ],
    }
  };

    // Initial workout generation
    generateWorkout();
  });

  