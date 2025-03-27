// Cache DOM elements
let footerYear;

// Update footer year
function updateFooterYear() {
    try {
        // Initialize DOM element if not already cached
        if (!footerYear) {
            footerYear = document.querySelector('.footer-year');
        }

        if (footerYear) {
            footerYear.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Error updating footer year:', error);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded');
    updateFooterYear();
}); 