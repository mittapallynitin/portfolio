// Project data
const projectData = {
    "featured": [
        {
            "id": "docuanswer",
            "title": "DocuAnswer – LangChain RAG App",
            "description": "RAG system using FAISS + GPT-4o-mini. Deployed with Streamlit and Flask.",
            "github": "https://github.com/mittapallynitin/DocuAnswer",
            "isFeatured": true
        },
        {
            "id": "emotion-detection",
            "title": "Emotion Detection",
            "description": "Text classification using TinyBERT. Achieved >98% F1 on imbalanced data.",
            "github": "https://github.com/mittapallynitin/EmotionDetection",
            "isFeatured": true
        },
        {
            "id": "causal-language-modeling",
            "title": "Causal Language Modeling",
            "description": "Custom tokenizer & GPT-2 model trained on CodeSearchNet for Python generation.",
            "github": "https://github.com/mittapallynitin/casual-languge-modeling",
            "isFeatured": true
        }
    ],
    "all": [
        {
            "id": "sentiment-analysis",
            "title": "Sentiment Analysis API",
            "description": "RESTful API for sentiment analysis using BERT. Containerized with Docker.",
            "github": "#",
            "isFeatured": false
        },
        {
            "id": "image-classification",
            "title": "Image Classification",
            "description": "CNN model for image classification using PyTorch. Achieved 95% accuracy.",
            "github": "#",
            "isFeatured": false
        },
        {
            "id": "time-series",
            "title": "Time Series Forecasting",
            "description": "LSTM model for time series prediction with TensorFlow.",
            "github": "#",
            "isFeatured": false
        }
    ]
};

// Cache DOM elements
let featuredContainer;
let allProjectsContainer;

// Function to create a project card
function createProjectCard(project) {
    return `
        <div class="project-card p-6 rounded-xl cursor-pointer" data-github="${project.github}">
            <h3 class="text-xl font-semibold mb-3">${project.title}</h3>
            <p class="text-gray-600 mb-4">${project.description}</p>
            <div class="flex items-center justify-between">
                <a href="${project.github}" class="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">View Code →</a>
                ${project.isFeatured ? '<span class="text-sm text-gray-500">Featured</span>' : ''}
            </div>
        </div>
    `;
}

// Function to render projects
function renderProjects() {
    try {
        // Initialize DOM elements if not already cached
        if (!featuredContainer) {
            featuredContainer = document.getElementById('featured-projects');
            allProjectsContainer = document.getElementById('all-projects');
        }

        // Render featured projects
        if (featuredContainer) {
            featuredContainer.innerHTML = projectData.featured.map(createProjectCard).join('');
        }

        // Render all projects
        if (allProjectsContainer) {
            allProjectsContainer.innerHTML = [...projectData.featured, ...projectData.all].map(createProjectCard).join('');
        }

        // Add click event listeners to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const githubUrl = card.dataset.github;
                if (githubUrl && githubUrl !== '#') {
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