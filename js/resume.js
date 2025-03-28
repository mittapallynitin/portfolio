// Function to fetch and parse YAML data
async function fetchResumeData() {
    try {
        console.log('Attempting to fetch resume data...');
        const response = await fetch('./data/resume.yaml');
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`Failed to fetch resume data: ${response.status} ${response.statusText}`);
        }

        const yamlText = await response.text();
        console.log('YAML data received:', yamlText);

        if (!window.jsyaml) {
            throw new Error('jsyaml library not loaded');
        }

        const data = jsyaml.load(yamlText);
        console.log('Parsed data:', data);
        return data;
    } catch (error) {
        console.error('Error in fetchResumeData:', error);
        throw error;
    }
}

// Function to render personal info
function renderPersonalInfo(data) {
    const { personal_info } = data;
    document.getElementById('resume-name').textContent = personal_info.name;
    document.getElementById('resume-title').textContent = personal_info.title;
}

// Function to render summary
function renderSummary(data) {
    document.getElementById('resume-summary').textContent = data.summary;
}

// Function to render experience
function renderExperience(data) {
    const container = document.getElementById('resume-experience');
    container.innerHTML = data.experience.map(exp => {
        return `
            <div class="experience-item">
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
                <div class="duration">${exp.duration}</div>
                <ul class="task-list">
                    ${exp.description.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

// Function to render education
function renderEducation(data) {
    const container = document.getElementById('resume-education');
    container.innerHTML = data.education.map(edu => `
        <div class="experience-item">
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.institution}</div>
            <div class="duration">${edu.duration}</div>
            <div class="text-sm text-gray-600 mb-2">GPA: ${edu.gpa}</div>
            <div class="text-sm text-gray-600">
                <span class="font-medium">Relevant Coursework:</span><br>
                ${edu.relevant_coursework.join(' • ')}
            </div>
        </div>
    `).join('');
}

// Function to render skills
function renderSkills(data) {
    const { skills } = data;
    const container = document.getElementById('resume-technical-skills');

    const skillsHtml = skills.technical.map(category => `
        <div class="skill-category">
            <div class="skill-category-title">${category.category}</div>
            <div class="skill-list">${category.items.join(' • ')}</div>
        </div>
    `).join('');

    // Add soft skills at the end
    container.innerHTML = skillsHtml + `
        <div class="skill-category">
            <div class="skill-category-title">Soft Skills</div>
            <div class="skill-list">${skills.soft.join(' • ')}</div>
        </div>
    `;
}

// Function to render certifications
function renderCertifications(data) {
    const container = document.getElementById('resume-certifications');
    container.innerHTML = data.certifications.map(cert => `
        <div class="experience-item">
            <div class="job-title">${cert.name}</div>
            <div class="company">${cert.issuer}</div>
            <div class="duration">${cert.date}</div>
            <div class="text-sm text-gray-600">
                <span class="font-medium">Credential ID:</span> ${cert.credential_id}
            </div>
        </div>
    `).join('');
}

// Main function to initialize the resume
async function initResume() {
    try {
        const data = await fetchResumeData();
        renderPersonalInfo(data);
        renderSummary(data);
        renderExperience(data);
        renderEducation(data);
        renderSkills(data);
        renderCertifications(data);
    } catch (error) {
        console.error('Error initializing resume:', error);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initResume); 