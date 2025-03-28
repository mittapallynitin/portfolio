// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        type: params.get('type'), // 'project' or 'blog'
        id: params.get('id')      // project name or blog slug
    };
}

// Function to fetch project README
async function fetchProjectReadme(projectName) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/mittapallynitin/${projectName}/main/README.md`);
        if (!response.ok) {
            throw new Error('Failed to fetch project README');
        }
        const markdown = await response.text();
        return {
            content: marked.parse(markdown),
            title: projectName,
            date: new Date().toLocaleDateString(),
            tags: ['Project', 'GitHub']
        };
    } catch (error) {
        console.error('Error fetching project README:', error);
        throw error;
    }
}

// Function to fetch blog content
async function fetchBlogContent(blogSlug) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/mittapallynitin/blogs/main/blogs.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog data');
        }
        const blogData = await response.json();
        const blog = blogData.blogs.find(b => b.slug === blogSlug);

        if (!blog) {
            throw new Error('Blog not found');
        }

        const contentResponse = await fetch(blog.fullUrl);
        if (!contentResponse.ok) {
            throw new Error('Failed to fetch blog content');
        }
        const markdown = await contentResponse.text();

        return {
            content: marked.parse(markdown),
            title: blog.title,
            date: blog.date,
            tags: blog.tags || []
        };
    } catch (error) {
        console.error('Error fetching blog content:', error);
        throw error;
    }
}

// Function to render tags
function renderTags(tags) {
    const container = document.getElementById('article-tags');
    container.innerHTML = tags.map(tag => `
        <span class="article-tag">${tag}</span>
    `).join('');
}

// Function to render article
function renderArticle(data) {
    document.getElementById('article-title').textContent = data.title;
    document.getElementById('article-date').textContent = data.date;
    renderTags(data.tags);
    document.getElementById('article-content').innerHTML = data.content;
}

// Main function to initialize the reader
async function initReader() {
    try {
        const { type, id } = getUrlParams();

        if (!type || !id) {
            throw new Error('Missing type or id parameter');
        }

        let data;
        if (type === 'project') {
            data = await fetchProjectReadme(id);
        } else if (type === 'blog') {
            data = await fetchBlogContent(id);
        } else {
            throw new Error('Invalid type parameter');
        }

        renderArticle(data);
    } catch (error) {
        console.error('Error initializing reader:', error);
        // Show error message to user
        document.getElementById('article-content').innerHTML = `
            <div class="text-center py-12">
                <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
                <p class="text-gray-600">${error.message}</p>
                <a href="index.html" class="btn-primary inline-block mt-4">Return to Home</a>
            </div>
        `;
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initReader); 