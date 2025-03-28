// Function to create a blog card
function createBlogCard(blog) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col" data-blog="${blog.id}">
            <div class="p-6 flex-grow">
                <h3 class="text-xl font-semibold mb-2">${blog.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${blog.description}</p>
                ${blog.tags && blog.tags.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${blog.tags.map(tag => `
                            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">${tag}</span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="px-6 py-4 border-t border-gray-100">
                <div class="flex justify-between items-center">
                    <a href="${blog.fullUrl}" target="_blank" class="text-blue-600 hover:text-blue-800 font-medium">
                        Read More
                    </a>
                    <span class="text-sm text-gray-500">${blog.date}</span>
                </div>
            </div>
        </div>
    `;
}

// Function to fetch blogs from GitHub
async function fetchBlogs() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/mittapallynitin/blogs/main/blogs.json');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        const blogData = await response.json();
        console.log('Fetched blog data:', blogData);

        // Add full URL to each blog
        const blogsWithUrls = blogData.blogs.map(blog => ({
            ...blog,
            fullUrl: `${blogData.url_root}${blog.github}`
        }));
        console.log('Blogs with URLs:', blogsWithUrls);

        return blogsWithUrls.filter(blog => blog.featured);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

// Function to render featured blogs
async function renderFeaturedBlogs() {
    try {
        const featuredContainer = document.getElementById('featured-blogs');
        if (featuredContainer) {
            // Fetch blogs from GitHub
            const featuredBlogs = await fetchBlogs();

            // Render featured blogs
            featuredContainer.innerHTML = featuredBlogs.map(createBlogCard).join('');

            // Add click event listeners to blog cards
            document.querySelectorAll('.blog-card').forEach(card => {
                card.addEventListener('click', () => {
                    const blogId = card.dataset.blog;
                    console.log('Clicked blog ID:', blogId);

                    if (blogId) {
                        const blog = featuredBlogs.find(b => b.id === blogId);
                        console.log('Found blog:', blog);

                        if (blog) {
                            console.log('Redirecting to:', blog.fullUrl);
                            window.open(blog.fullUrl, '_blank');
                        } else {
                            console.error('Blog not found:', blogId);
                        }
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error rendering featured blogs:', error);
    }
}

// Function to fetch and display resume summary
async function fetchResumeSummary() {
    try {
        console.log('Fetching resume summary...');
        const response = await fetch('data/resume.yaml');
        if (!response.ok) {
            throw new Error('Failed to fetch resume data');
        }
        const yamlText = await response.text();
        console.log('YAML text:', yamlText);
        const data = jsyaml.load(yamlText);
        console.log('Parsed YAML data:', data);
        const summaryElement = document.getElementById('resume-summary');
        console.log('Summary element:', summaryElement);
        if (summaryElement && data.summary) {
            summaryElement.textContent = data.summary;
            console.log('Updated summary text:', data.summary);
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

        const projectData = await fetchProjects();
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
    renderFeaturedBlogs();
    fetchResumeSummary();
    renderFeaturedProjects();
}); 