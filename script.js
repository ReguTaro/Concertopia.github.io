// Handle the loading screen transition
window.addEventListener('load', function () {
    setTimeout(function () {
        // Fade out loading screen
        document.querySelector('.loading-overlay').style.opacity = '0';
        // After the fade-out transition, change to the next page
        setTimeout(function () {
            window.location.href = "home.html"; // Change to your homepage URL
        }, 1000); // Match the duration of the fade-out effect
    }, 3000); // 3-second delay before transition begins
});

function toggleMenu() {
    const navbarRight = document.querySelector('.navbar-right'); // Target dropdown
    const hamburger = document.querySelector('.hamburger'); // Target hamburger icon

    // Toggle active state
    if (navbarRight.classList.contains('active')) {
        // Closing: Fold up
        navbarRight.classList.remove('active');
    } else {
        // Opening: Fold down
        navbarRight.classList.add('active');
    }

    // Toggle hamburger "X" animation
    hamburger.classList.toggle('active');
}

// Function to go to a specific featured slide
let currentSlide = 0;

// Array of text colors for <h3> tags
const featuredHeaderColors = ['#e2e2ef', '#A60B0B', 'skyblue', '#D6C0B3', '#6BCADA']; // Header colors
// Array of text colors for <p> tags
const featuredParagraphColors = ['#a5845e', 'white', 'white', 'white', '#ff9800']; // Paragraph colors
// Array of background colors for each slide
const featuredCardColors = ['#000000', '#0B0500', '#1f1f1f', '#BC7C7C', '#084D75']; // Background colors

function goToFeaturedSlide(index) {
    const slides = document.querySelectorAll('.featured-card'); // Get all slides
    const dots = document.querySelectorAll('.featured-dot'); // Get all dots
    const slider = document.querySelector('.featured-slider'); // The slider element

    // Ensure the index is within bounds
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Update slider position
    slider.style.transform = `translateX(-${index * 100}%)`; // Move to the selected slide

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active')); // Remove "active" class from all dots
    dots[index].classList.add('active'); // Add "active" class to the current dot

    // Change background color, header color, and paragraph color for the current slide
    slides.forEach((slide, i) => {
        if (i === index) {
            // Apply background color
            slide.style.backgroundColor = featuredCardColors[index % featuredCardColors.length];

            // Apply styles to the <h3> tag
            const featuredTitle = slide.querySelector('h3');
            if (featuredTitle) {
                featuredTitle.style.color = featuredHeaderColors[index % featuredHeaderColors.length];
                featuredTitle.style.fontFamily = 'Fantasy, sans-serif';
            }

            // Apply styles to the <p> tag
            const featuredParagraph = slide.querySelector('p');
            if (featuredParagraph) {
                featuredParagraph.style.color = featuredParagraphColors[index % featuredParagraphColors.length];
                featuredParagraph.style.fontFamily = 'Fantasy';
            }
        } else {
            // Reset background for other slides
            slide.style.backgroundColor = 'transparent';
        }
    });

    // Update current slide index
    currentSlide = index;
}

// Add click event listeners for dots
document.querySelectorAll('.featured-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToFeaturedSlide(index));
});

// Optionally, implement auto-slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % document.querySelectorAll('.featured-card').length; // Increment slide index
    goToFeaturedSlide(currentSlide); // Go to the next slide
}, 4000); // Change slide every 3 seconds

// Utility function for setting up sliders
function setupSlider(containerId) {
    let currentSlide = 0;
    const slider = document.querySelector(`${containerId} .box-slider`);
    const boxes = document.querySelectorAll(`${containerId} .box`);
    const prevBtn = document.querySelector(`${containerId} .prev-btn`);
    const nextBtn = document.querySelector(`${containerId} .next-btn`);

    if (!slider || boxes.length === 0) return;

    // Dynamically calculate the box width
    let boxWidth = boxes[0].offsetWidth + 15; // 15px gap (adjust if necessary)

    // Function to move slider
    function moveSlider() {
        slider.style.transform = `translateX(-${currentSlide * boxWidth}px)`;
        slider.style.transition = 'transform 0.3s ease'; // Add smooth transition
    }

    // Recalculate box width on window resize
    function updateBoxWidth() {
        boxWidth = boxes[0].offsetWidth + 15; // Recalculate box width
    }

    // Next button logic
    nextBtn?.addEventListener('click', () => {
        if (currentSlide < boxes.length - 1) { // Check if not at the last box
            currentSlide++;
            moveSlider();
        }
    });

    // Previous button logic
    prevBtn?.addEventListener('click', () => {
        if (currentSlide > 0) { // Check if not at the first box
            currentSlide--;
            moveSlider();
        }
    });

    // Adjust slider position and box width on resize
    window.addEventListener('resize', () => {
        updateBoxWidth();
        moveSlider(); // Keep the slider in sync after resizing
    });
}

// Set up sliders for different sections
setupSlider('#trending');
setupSlider('#concert-this-month');
setupSlider('#upcoming-concert');

