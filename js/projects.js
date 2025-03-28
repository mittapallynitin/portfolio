// List of featured repository names
const featuredRepos = [
    'docuanswer',
    'transformers',
    'causal-languge-modeling'
];

// Cache DOM elements
let featuredContainer;
let allProjectsContainer;

// Function to truncate text
function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Function to create a project card
function createProjectCard(project) {
    return `
        <div class="project-card p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div class="flex-grow">
                <h3 class="text-xl font-semibold mb-3">${project.name}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${truncateText(project.description || 'No description available.')}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies?.map(tech => `
                        <span class="px-2 py-1 bg-gray-100 rounded-full text-sm">${tech}</span>
                    `).join('') || ''}
                </div>
            </div>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <a href="reader.html?type=project&id=${project.name}" class="text-blue-600 hover:text-blue-800">Read More →</a>
                <a href="${project.html_url}" class="text-gray-600 hover:text-gray-800" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
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
                const projectName = card.querySelector('h3').textContent;
                window.location.href = `reader.html?type=project&id=${projectName}`;
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