// List of featured repository names
const featuredRepos = [
    'docuanswer',
    'transformers',
    'causal-languge-modeling'
];

// Cache DOM elements
let featuredContainer;
let allProjectsContainer;

// Function to create a project card
function createProjectCard(project) {
    return `
        <div class="project-card p-6 rounded-xl cursor-pointer" data-github="${project.html_url}">
            <h3 class="text-xl font-semibold mb-3">${project.name}</h3>
            <p class="text-gray-600 mb-4">${project.description || 'No description available.'}</p>
            <div class="flex items-center justify-between">
                <a href="${project.html_url}" class="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">View Code →</a>
                ${project.isFeatured ? '<span class="text-sm text-gray-500">Featured</span>' : ''}
            </div>
        </div>
    `;
}

// Function to fetch projects from GitHub
async function fetchProjects() {
    try {
        const response = await fetch('https://api.github.com/users/mittapallynitin/repos');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const projects = await response.json();

        // Filter out specific repositories and sort by stars
        const filteredProjects = projects
            .filter(project =>
                project.name.toLowerCase() !== 'mittapallynitin' &&
                project.name.toLowerCase() !== 'blogs' &&
                project.name.toLowerCase() !== 'scikit-learn' &&
                project.name.toLowerCase() !== 'portfolio'
            )
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Mark projects as featured based on the featuredRepos list
        const projectsWithFeatured = filteredProjects.map(project => ({
            ...project,
            isFeatured: featuredRepos.includes(project.name.toLowerCase())
        }));

        // Separate featured and non-featured projects
        return {
            featured: projectsWithFeatured.filter(project => project.isFeatured),
            all: projectsWithFeatured.filter(project => !project.isFeatured)
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

// Function to render projects
async function renderProjects() {
    try {
        // Initialize DOM elements if not already cached
        if (!featuredContainer) {
            featuredContainer = document.getElementById('featured-projects');
            allProjectsContainer = document.getElementById('all-projects');
        }

        // Fetch projects from GitHub
        const projectData = await fetchProjects();

        // Render featured projects
        if (featuredContainer) {
            featuredContainer.innerHTML = projectData.featured.map(createProjectCard).join('');
        }

        // Render all projects
        if (allProjectsContainer) {
            allProjectsContainer.innerHTML = projectData.all.map(createProjectCard).join('');
        }

        // Add click event listeners to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const githubUrl = card.dataset.github;
                if (githubUrl) {
                    window.open(githubUrl, '_blank');
                }
            });
        });
    } catch (error) {
        console.error('Error rendering projects:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'text-red-600 text-center p-4';
        errorMessage.textContent = 'Error loading projects. Please try again later.';
        document.querySelector('.container')?.appendChild(errorMessage);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', renderProjects); 