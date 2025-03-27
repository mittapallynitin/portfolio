// Cache DOM elements
let featuredContainer;
let allBlogsContainer;

// Function to create a blog card
function createBlogCard(blog) {
    return `
        <div class="blog-card p-6 rounded-xl cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow" data-blog="${blog.id}">
            <h3 class="text-xl font-semibold mb-3">${blog.title}</h3>
            <p class="text-gray-600 mb-4">${blog.description}</p>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">${blog.date}</span>
                ${blog.featured ? '<span class="text-sm text-blue-600">Featured</span>' : ''}
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
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', () => {
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