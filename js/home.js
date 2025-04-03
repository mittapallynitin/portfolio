// Function to render featured blogs
async function renderFeaturedBlogs() {
    try {
        const featuredContainer = document.getElementById('featured-blogs');
        if (!featuredContainer) return;

        // Fetch blogs from GitHub
        const blogData = await fetchBlogs();

        // Render only featured blogs
        featuredContainer.innerHTML = blogData.featured.map(createBlogCard).join('');

        // Add click event listeners to blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const blogId = card.dataset.blog;
                window.location.href = `reader.html?type=blog&id=${blogId}`;
            });
        });
    } catch (error) {
        console.error('Error rendering featured blogs:', error);
    }
}

// Function to fetch and display resume summary
async function fetchResumeSummary() {
    try {
        const response = await fetch('data/resume.yaml');
        if (!response.ok) {
            throw new Error('Failed to fetch resume data');
        }
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        const summaryElement = document.getElementById('resume-summary');
        if (summaryElement && data.summary) {
            summaryElement.textContent = data.summary;
        } else {
            console.error('Summary element or data not found:', { element: summaryElement, summary: data.summary });
        }
    } catch (error) {
        console.error('Error fetching resume summary:', error);
    }
}

// Function to render featured projects
async function renderFeaturedProjects() {
    try {
        const featuredContainer = document.getElementById('featured-projects');
        if (!featuredContainer) return;

        // Fetch projects from GitHub
        const projectData = await fetchProjects();

        // Render only featured projects
        featuredContainer.innerHTML = projectData.featured.map(createProjectCard).join('');

        // Add click event listeners to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectName = card.querySelector('h3').textContent;
                window.location.href = `reader.html?type=project&id=${projectName}`;
            });
        });
    } catch (error) {
        console.error('Error rendering featured projects:', error);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for a short delay to ensure all scripts are loaded
    renderFeaturedBlogs();
    fetchResumeSummary();
    renderFeaturedProjects();
}); 