// Workout Category Selection for FocusArea
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.flex button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.querySelector('span').textContent.trim();
      localStorage.setItem('selectedCategory', category);
      window.location.href = 'Discover.html';
    });
  });

  // Reference the HTML root element and the theme toggle button
  const html = document.documentElement;
  const themeToggleButton = document.getElementById('change-theme');

  // Tailwind's dark mode configuration
  tailwind.config = {
    darkMode: 'class',
  };

  // Set the initial theme based on localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }

  // Add an event listener for the theme toggle button
  themeToggleButton.addEventListener('click', () => {
    html.classList.toggle('dark');

    // Save the selected theme in localStorage
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Discover Page Video Loading
  const videoListElement = document.getElementById('video-list');
  const categoryTitleElement = document.getElementById('category-title');

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


  const validCategories = ["Hands", "Chest", "Shoulders", "Legs", "Stomach", "Full Body"];
  const category = new URLSearchParams(window.location.search).get("category") || localStorage.getItem('selectedCategory');
  const selectedCategory = validCategories.includes(category) ? category : "Hands";
  const videos = videoData[selectedCategory] || {};

  if (categoryTitleElement) categoryTitleElement.textContent = selectedCategory;

  Object.entries(videos).forEach(([level, videoList]) => {
    let currentIndex = 0;

    const videoContainer = document.createElement('div');
    videoContainer.classList.add(
      'p-4', 'rounded-lg', 'shadow-lg', 'dark:bg-gray-800',
      'hover:shadow-2xl', 'transition-shadow', 'duration-300', 'mb-4'
    );

    const title = document.createElement('h2');
    title.classList.add('text-2xl', 'font-semibold', 'mb-2', 'dark:text-white');
    title.textContent = `${videoList[currentIndex].title} - ${level}`;

    const iframe = document.createElement('iframe');
    iframe.classList.add('w-full', 'h-60', 'rounded-lg');
    iframe.src = videoList[currentIndex].url;
    iframe.frameBorder = '0';
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    const levelText = document.createElement("p");
    levelText.classList.add("mt-4", "text-lg", "dark:text-gray-300");
    levelText.textContent = `Level: ${level}`;

    const likeCountDisplay = document.createElement("span");
    likeCountDisplay.classList.add("ml-4", "text-lg", "dark:text-white");

    const likeButton = document.createElement("button");
    likeButton.classList.add(
      "bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg",
      "hover:bg-blue-600", "mt-4", "like-button"
    );

    // Function to update like button and count
    const updateLikeState = () => {
      const likesStorageKey = `likes_${selectedCategory}_${level}_${currentIndex}`;
      const currentVideoLikeData = JSON.parse(localStorage.getItem(likesStorageKey)) || { liked: false, likeCount: 0 };
      likeButton.textContent = currentVideoLikeData.liked ? "❤ Liked" : "🤍 Like";
      likeCountDisplay.textContent = `Likes: ${currentVideoLikeData.likeCount}`;
      likeButton.classList.toggle("bg-red-500", currentVideoLikeData.liked);
      likeButton.classList.toggle("bg-blue-500", !currentVideoLikeData.liked);
    };

    likeButton.addEventListener('click', () => {
      const likesStorageKey = `likes_${selectedCategory}_${level}_${currentIndex}`;
      const currentVideoLikeData = JSON.parse(localStorage.getItem(likesStorageKey)) || { liked: false, likeCount: 0 };

      if (currentVideoLikeData.liked) {
        currentVideoLikeData.liked = false;
        currentVideoLikeData.likeCount = Math.max(0, currentVideoLikeData.likeCount - 1);
      } else {
        currentVideoLikeData.liked = true;
        currentVideoLikeData.likeCount++;
      }

      // Save updated likes data
      localStorage.setItem(likesStorageKey, JSON.stringify(currentVideoLikeData));

      // Update UI
      updateLikeState();
    });

    const controls = document.createElement("div");
    controls.classList.add("flex", "items-center", "justify-between", "mt-4");

    const prevButton = document.createElement("button");
    prevButton.classList.add(
      "bg-gray-300", "text-black", "px-4", "py-2", "rounded-lg", "hover:bg-gray-400"
    );
    prevButton.textContent = "Previous";
    prevButton.disabled = currentIndex === 0;

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        iframe.src = videoList[currentIndex].url;
        title.textContent = `${videoList[currentIndex].title} - ${level}`;
        updateLikeState();
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = false;
      }
    });

    const nextButton = document.createElement("button");
    nextButton.classList.add(
      "bg-gray-300", "text-black", "px-4", "py-2", "rounded-lg", "hover:bg-gray-400"
    );
    nextButton.textContent = "Next";

    nextButton.addEventListener("click", () => {
      if (currentIndex < videoList.length - 1) {
        currentIndex++;
        iframe.src = videoList[currentIndex].url;
        title.textContent = `${videoList[currentIndex].title} - ${level}`;
        updateLikeState();
        nextButton.disabled = currentIndex === videoList.length - 1;
        prevButton.disabled = false;
      }
    });

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    videoContainer.appendChild(title);
    videoContainer.appendChild(iframe);
    videoContainer.appendChild(levelText);
    videoContainer.appendChild(likeButton);
    videoContainer.appendChild(likeCountDisplay);
    videoContainer.appendChild(controls);

    if (videoListElement) videoListElement.appendChild(videoContainer);

    // Initial like state setup
    updateLikeState();
  });
});
