// Cache DOM elements
let featuredContainer;
let allBlogsContainer;

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

        // Separate featured and non-featured blogs
        return {
            featured: blogsWithUrls.filter(blog => blog.featured),
            all: blogsWithUrls.filter(blog => !blog.featured)
        };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

// Function to render blogs
async function renderBlogs() {
    try {
        // Initialize DOM elements if not already cached
        if (!featuredContainer) {
            featuredContainer = document.getElementById('featured-blogs');
            allBlogsContainer = document.getElementById('all-blogs');
        }

        // Fetch blogs from GitHub
        const blogData = await fetchBlogs();

        // Render featured blogs
        if (featuredContainer) {
            featuredContainer.innerHTML = blogData.featured.map(createBlogCard).join('');
        }

        // Render all blogs
        if (allBlogsContainer) {
            allBlogsContainer.innerHTML = blogData.all.map(createBlogCard).join('');
        }

        // Add click event listeners to blog cards
        document.querySelectorAll('#featured-blogs .bg-white, #all-blogs .bg-white').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on the Read More link
                if (!e.target.closest('a')) {
                    const blogId = card.dataset.blog;
                    console.log('Clicked blog ID:', blogId);

                    if (blogId) {
                        const blog = [...blogData.featured, ...blogData.all].find(b => b.id === blogId);
                        console.log('Found blog:', blog);

                        if (blog) {
                            console.log('Redirecting to:', blog.fullUrl);
                            window.open(blog.fullUrl, '_blank');
                        } else {
                            console.error('Blog not found:', blogId);
                        }
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error rendering blogs:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'text-red-600 text-center p-4';
        errorMessage.textContent = 'Error loading blogs. Please try again later.';
        document.querySelector('.container')?.appendChild(errorMessage);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', renderBlogs); 