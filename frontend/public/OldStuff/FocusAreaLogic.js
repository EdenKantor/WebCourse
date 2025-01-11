document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeToggleButton = document.getElementById('toggle-theme');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Tailwind's CDN configuration to enable dark mode
    tailwind.config = {
        darkMode: 'class',
    };

    // Set the initial theme based on localStorage if it exists
    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
    }

    // Theme Switching Function
    themeToggleButton.addEventListener('click', () => {
        html.classList.toggle('dark');

        // Save the theme preference to localStorage
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Category Navigation
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            navigateToDiscover(category);
        });
    });

    // Navigate to Discover with category
    function navigateToDiscover(category) {
        const url = `Discover.html?category=${encodeURIComponent(category)}`;
        window.location.href = url;
    }
});
