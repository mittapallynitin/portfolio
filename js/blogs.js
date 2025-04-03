let featuredBlogsContainer;
let allBlogsContainer;
// Function to create a blog card
function createBlogCard(blog) {
    if (!blog.tags) {
        blog.tags = [];
    }
    return `
        <div class="blog-card p-6 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div class="flex-grow">
                <h3 class="text-xl font-semibold mb-3">${blog.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${truncateText(blog.description || 'No description available.')}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${blog.tags.map(tag => `
                            <span class="px-2 py-1 bg-gray-100 rounded-full text-sm">${tag}</span>
                        `).join('')}
                    </div>
            </div>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <a href="reader.html?type=blog&id=${blog.id}" class="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                </a>
                <span class="text-sm text-gray-500">${blog.date}</span>
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
        // Separate featured and non-featured blogs
        return {
            featured: blogData.blogs.filter(blog => blog.featured),
            all: blogData.blogs.filter(blog => !blog.featured)
        };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

// Function to render blogs
async function renderBlogs() {
    try {
        // Get DOM elements
        if (!featuredBlogsContainer) {
            featuredBlogsContainer = document.getElementById('featured-blogs');
            allBlogsContainer = document.getElementById('all-blogs');
        }

        // Fetch blogs from GitHub
        const blogData = await fetchBlogs();

        // Render featured blogs
        if (featuredBlogsContainer) {
            featuredBlogsContainer.innerHTML = blogData.featured.map(createBlogCard).join('');
        }

        // Render all blogs
        if (allBlogsContainer) {
            allBlogsContainer.innerHTML = blogData.all.map(createBlogCard).join('');
        }

        // Add click event listeners to blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const blogId = card.dataset.blog;
                window.location.href = `reader.html?type=blog&id=${blogId}`;
            });
        });
    } catch (error) {
        console.error('Error rendering blogs:', error);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', renderBlogs); 