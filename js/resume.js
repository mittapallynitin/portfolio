// Function to fetch and parse YAML data
async function fetchResumeData() {
    const response = await fetch('./data/resume.yaml');
    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);
    return data;
}

// Function to render personal info
function renderPersonalInfo(data) {
    const { personal_info } = data;
    const [firstName, ...lastNameParts] = personal_info.name.split(' ');
    const lastName = lastNameParts.join(' ');

    document.getElementById('resume-name').innerHTML = `
        <span class="font-normal">${firstName}</span>
        <span class="font-normal">${lastName}</span>
    `;
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
            <div class="flex justify-between items-center">
                <div class="job-title">${exp.position}</div>
                <div class="duration">${exp.duration}</div>
            </div>
            <div class="company">${exp.company}</div>
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
            <div class="flex justify-between items-center">
                <div class="job-title">${edu.degree}</div> 
                <div class="duration">${edu.duration}</div>
            </div>
            <div class="company">${edu.institution}</div>
        </div>
    `).join('');
}

// Function to render skills
function renderSkills(data) {
    const { skills } = data;
    const container = document.getElementById('resume-technical-skills');

    const skillsHtml = skills.technical.map(category => `
        <div class="skill-category">
            <div class="skill-category-title font-semibold">${category.category}</div>
            <div class="skill-list">${category.items.join(' • ')}</div>
        </div>
    `).join('');

    // Add soft skills at the end
    container.innerHTML = skillsHtml + `
        <div class="skill-category">
            <div class="skill-category-title font-semibold">Soft Skills</div>
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
            <div class="company">${cert.issuer} - ${cert.date}</div>
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