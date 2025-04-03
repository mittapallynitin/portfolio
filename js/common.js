// Common functionality for all pages

// Function to truncate text
function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;

    let truncated = text.substring(0, maxLength);

    // Find the last space within the limit to avoid cutting words
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
        truncated = truncated.substring(0, lastSpaceIndex);
    }

    return truncated + '...';
}

// Function to update footer year
function updateFooterYear() {
    document.querySelector('.footer-year').textContent = new Date().getFullYear();
}

// Function to handle mobile menu
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('show');
            mobileMenuIcon.classList.toggle('hidden');
            mobileMenuClose.classList.toggle('hidden');
        });
    }
}

// Function to set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === '#')) {
            link.classList.add('text-gray-900', 'font-medium');
            link.classList.remove('text-gray-600');
        }
    });
}

// Initialize common functionality when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateFooterYear();
    initMobileMenu();
    setActiveNavLink();
}); 