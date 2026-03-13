// Check authentication
function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

const currentUser = checkAuth();

// Mock Jobs Database
const jobsDatabase = [
    {
        id: 1,
        title: 'Software Development Engineer',
        company: 'Amazon',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹15-25 LPA',
        experience: '0-2 years',
        applicants: 45,
        postedTime: '2 days ago',
        description: 'Join Amazon as an SDE and work on cutting-edge technologies. Build scalable systems that impact millions of customers worldwide.',
        skills: ['Java', 'Python', 'AWS', 'System Design'],
        requirements: ['B.Tech/B.E in CS/IT', 'Strong problem-solving skills', 'Knowledge of data structures'],
        oncampus: true
    },
    {
        id: 2,
        title: 'Frontend Developer Intern',
        company: 'Google',
        location: 'Hyderabad, India',
        type: 'internship',
        salary: '₹80,000/month',
        experience: 'Internship',
        applicants: 120,
        postedTime: '1 day ago',
        description: 'Work with Google\'s world-class engineering team. Build user interfaces that are used by billions of people.',
        skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
        requirements: ['Currently pursuing B.Tech', 'Strong JavaScript fundamentals', 'Portfolio of projects'],
        oncampus: false
    },
    {
        id: 3,
        title: 'Data Science Intern',
        company: 'Microsoft',
        location: 'Bangalore, India',
        type: 'internship',
        salary: '₹75,000/month',
        experience: 'Internship',
        applicants: 89,
        postedTime: '3 days ago',
        description: 'Join Microsoft\'s AI team and work on machine learning projects. Gain hands-on experience with real-world data.',
        skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        requirements: ['B.Tech 3rd/4th year', 'Knowledge of ML algorithms', 'Python proficiency'],
        oncampus: true
    },
    {
        id: 4,
        title: 'Full Stack Developer',
        company: 'Flipkart',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹12-18 LPA',
        experience: '0-1 years',
        applicants: 67,
        postedTime: '5 days ago',
        description: 'Build end-to-end features for India\'s leading e-commerce platform. Work with modern tech stack and agile methodologies.',
        skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
        requirements: ['B.Tech/B.E in CS/IT', 'Full stack development experience', 'Strong coding skills'],
        oncampus: true
    },
    {
        id: 5,
        title: 'Cloud Engineer',
        company: 'Adobe',
        location: 'Noida, India',
        type: 'fulltime',
        salary: '₹18-28 LPA',
        experience: '1-3 years',
        applicants: 34,
        postedTime: '1 week ago',
        description: 'Design and implement cloud infrastructure for Adobe\'s creative cloud services. Work with AWS, Azure, and GCP.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
        requirements: ['B.Tech in CS/IT', 'Cloud certification preferred', 'DevOps experience'],
        oncampus: false
    },
    {
        id: 6,
        title: 'Product Management Intern',
        company: 'Swiggy',
        location: 'Bangalore, India',
        type: 'internship',
        salary: '₹50,000/month',
        experience: 'Internship',
        applicants: 156,
        postedTime: '4 days ago',
        description: 'Learn product management from industry experts. Work on features that impact millions of food delivery customers.',
        skills: ['Product Strategy', 'Analytics', 'Communication', 'SQL'],
        requirements: ['MBA/B.Tech final year', 'Analytical mindset', 'Passion for products'],
        oncampus: false
    },
    {
        id: 7,
        title: 'Backend Developer',
        company: 'Razorpay',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹15-22 LPA',
        experience: '0-2 years',
        applicants: 78,
        postedTime: '3 days ago',
        description: 'Build robust payment systems that process billions in transactions. Work with cutting-edge fintech technologies.',
        skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
        requirements: ['B.Tech in CS/IT', 'Strong backend fundamentals', 'Database knowledge'],
        oncampus: true
    },
    {
        id: 8,
        title: 'UI/UX Design Intern',
        company: 'Zomato',
        location: 'Gurugram, India',
        type: 'internship',
        salary: '₹40,000/month',
        experience: 'Internship',
        applicants: 92,
        postedTime: '2 days ago',
        description: 'Design delightful user experiences for millions of food lovers. Work with product and engineering teams.',
        skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
        requirements: ['Design portfolio required', 'Figma proficiency', 'Creative thinking'],
        oncampus: false
    },
    {
        id: 9,
        title: 'Software Engineer - AI/ML',
        company: 'NVIDIA',
        location: 'Pune, India',
        type: 'fulltime',
        salary: '₹25-35 LPA',
        experience: '0-2 years',
        applicants: 45,
        postedTime: '1 week ago',
        description: 'Work on AI and deep learning projects at the forefront of technology. Build solutions for autonomous vehicles and robotics.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'CUDA'],
        requirements: ['B.Tech/M.Tech in CS', 'Strong ML fundamentals', 'Research experience preferred'],
        oncampus: true
    },
    {
        id: 10,
        title: 'Cybersecurity Analyst',
        company: 'Cisco',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹12-20 LPA',
        experience: '0-1 years',
        applicants: 56,
        postedTime: '5 days ago',
        description: 'Protect enterprise networks and systems from cyber threats. Work with cutting-edge security technologies.',
        skills: ['Network Security', 'Ethical Hacking', 'Linux', 'Python'],
        requirements: ['B.Tech in CS/IT', 'Security certifications preferred', 'Analytical skills'],
        oncampus: false
    }
];

// State
let currentFilter = 'all';
let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadJobs();
    loadRecommendedJobs();
    updateStats();
});

// Load Jobs
function loadJobs(filter = 'all', searchQuery = '') {
    const container = document.getElementById('jobsContainer');
    container.innerHTML = '';
    
    let filteredJobs = jobsDatabase;
    
    // Apply filter
    if (filter !== 'all') {
        filteredJobs = filteredJobs.filter(job => {
            if (filter === 'oncampus') return job.oncampus;
            return job.type === filter;
        });
    }
    
    // Apply search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.skills.some(skill => skill.toLowerCase().includes(query))
        );
    }
    
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="jobs-empty-state">
                <div class="jobs-empty-state-icon">🔍</div>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    filteredJobs.forEach(job => {
        const jobCard = createJobCard(job);
        container.appendChild(jobCard);
    });
}

// Create Job Card
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.setAttribute('data-job-id', job.id);
    
    const companyInitial = job.company.charAt(0);
    const isSaved = savedJobs.includes(job.id);
    const isApplied = appliedJobs.includes(job.id);
    
    let typeBadge = '';
    if (job.type === 'internship') {
        typeBadge = '<span class="job-type-badge internship">Internship</span>';
    } else if (job.type === 'fulltime') {
        typeBadge = '<span class="job-type-badge fulltime">Full-Time</span>';
    }
    
    if (job.oncampus) {
        typeBadge += ' <span class="job-type-badge oncampus">On-Campus</span>';
    }
    
    card.innerHTML = `
        <div class="job-card-header">
            <div class="job-company-logo">${companyInitial}</div>
            <div class="job-header-info">
                <h3 class="job-title">${job.title}</h3>
                <p class="job-company">${job.company}</p>
                <p class="job-location">📍 ${job.location}</p>
            </div>
            <div class="job-card-actions">
                <button class="job-action-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveJob(${job.id})" title="Save job">
                    ${isSaved ? '⭐' : '☆'}
                </button>
                <button class="job-action-btn" onclick="shareJob(${job.id})" title="Share job">
                    🔗
                </button>
            </div>
        </div>
        
        <div class="job-details">
            ${typeBadge}
            <div class="job-detail-item">
                <span>💰</span> ${job.salary}
            </div>
            <div class="job-detail-item">
                <span>📊</span> ${job.experience}
            </div>
            <div class="job-detail-item">
                <span>👥</span> ${job.applicants} applicants
            </div>
        </div>
        
        <div class="job-description">
            ${job.description}
        </div>
        
        <div class="job-tags">
            ${job.skills.map(skill => `<span class="job-tag">${skill}</span>`).join('')}
        </div>
        
        <div class="job-card-footer">
            <span class="job-posted-time">Posted ${job.postedTime}</span>
            <button class="job-apply-btn ${isApplied ? 'applied' : ''}" 
                    onclick="applyJob(${job.id})" 
                    ${isApplied ? 'disabled' : ''}>
                ${isApplied ? '✓ Applied' : 'Apply Now'}
            </button>
        </div>
    `;
    
    return card;
}

// Filter Jobs
function filterJobs(filter) {
    currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const searchQuery = document.getElementById('jobSearch').value;
    loadJobs(filter, searchQuery);
}

// Search Jobs
function searchJobs() {
    const searchQuery = document.getElementById('jobSearch').value;
    loadJobs(currentFilter, searchQuery);
}

// Toggle Save Job
function toggleSaveJob(jobId) {
    const index = savedJobs.indexOf(jobId);
    
    if (index > -1) {
        savedJobs.splice(index, 1);
    } else {
        savedJobs.push(jobId);
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    loadJobs(currentFilter, document.getElementById('jobSearch').value);
    updateStats();
}

// Apply Job
function applyJob(jobId) {
    if (appliedJobs.includes(jobId)) return;
    
    appliedJobs.push(jobId);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    
    const job = jobsDatabase.find(j => j.id === jobId);
    alert(`✅ Application submitted for ${job.title} at ${job.company}!\n\nYou'll receive updates via email.`);
    
    loadJobs(currentFilter, document.getElementById('jobSearch').value);
    updateStats();
}

// Share Job
function shareJob(jobId) {
    const job = jobsDatabase.find(j => j.id === jobId);
    const shareText = `Check out this job: ${job.title} at ${job.company}\nSalary: ${job.salary}\nLocation: ${job.location}`;
    
    if (navigator.share) {
        navigator.share({
            title: job.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert('Job details copied to clipboard!');
    }
}

// Load Recommended Jobs
function loadRecommendedJobs() {
    const container = document.getElementById('recommendedJobs');
    const recommended = jobsDatabase.slice(0, 3);
    
    container.innerHTML = recommended.map(job => `
        <div class="recommended-job-item" onclick="scrollToJob(${job.id})">
            <h4 class="recommended-job-title">${job.title}</h4>
            <p class="recommended-job-company">${job.company}</p>
            <p class="recommended-job-salary">${job.salary}</p>
        </div>
    `).join('');
}

// Scroll to Job
function scrollToJob(jobId) {
    const jobCard = document.querySelector(`[data-job-id="${jobId}"]`);
    if (jobCard) {
        jobCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        jobCard.style.animation = 'pulse 0.5s ease';
    }
}

// Update Stats
function updateStats() {
    document.getElementById('appliedCount').textContent = appliedJobs.length;
    document.getElementById('savedCount').textContent = savedJobs.length;
    
    // Count viewed jobs (all jobs in database for now)
    document.getElementById('viewedCount').textContent = jobsDatabase.length;
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('jobSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });
    }
});


// ========================================
// ENHANCED JOBS FEATURES
// ========================================

// Advanced Search with Filters
function advancedJobSearch() {
    const searchQuery = document.getElementById('jobSearch').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter')?.value || 'all';
    const salaryFilter = document.getElementById('salaryFilter')?.value || 'all';
    
    let filteredJobs = jobsDatabase;
    
    // Apply current filter
    if (currentFilter !== 'all') {
        filteredJobs = filteredJobs.filter(job => {
            if (currentFilter === 'oncampus') return job.oncampus;
            return job.type === currentFilter;
        });
    }
    
    // Apply search
    if (searchQuery) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchQuery) ||
            job.company.toLowerCase().includes(searchQuery) ||
            job.location.toLowerCase().includes(searchQuery) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchQuery))
        );
    }
    
    // Apply location filter
    if (locationFilter !== 'all') {
        filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
    }
    
    // Apply salary filter
    if (salaryFilter !== 'all') {
        filteredJobs = filteredJobs.filter(job => {
            const salary = parseInt(job.salary.match(/\d+/)[0]);
            switch(salaryFilter) {
                case 'low': return salary < 15;
                case 'medium': return salary >= 15 && salary < 25;
                case 'high': return salary >= 25;
                default: return true;
            }
        });
    }
    
    displayFilteredJobs(filteredJobs);
}

function displayFilteredJobs(jobs) {
    const container = document.getElementById('jobsContainer');
    container.innerHTML = '';
    
    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="jobs-empty-state">
                <div class="jobs-empty-state-icon">🔍</div>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        container.appendChild(jobCard);
    });
}

// Job Recommendations based on user profile
function getPersonalizedRecommendations() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userBranch = userData.branch || 'CSE';
    
    // Filter jobs based on user's branch and interests
    const recommended = jobsDatabase.filter(job => {
        // Prioritize on-campus jobs
        if (job.oncampus) return true;
        
        // Match branch-related skills
        const branchSkills = {
            'CSE': ['Java', 'Python', 'JavaScript', 'React', 'Node.js'],
            'ISE': ['Python', 'SQL', 'Analytics', 'Cloud'],
            'ECE': ['Embedded', 'IoT', 'Hardware', 'VLSI']
        };
        
        const relevantSkills = branchSkills[userBranch] || [];
        return job.skills.some(skill => 
            relevantSkills.some(rs => skill.toLowerCase().includes(rs.toLowerCase()))
        );
    });
    
    return recommended.slice(0, 5);
}

// Job Alerts System
function setupJobAlerts() {
    const alertBtn = document.createElement('button');
    alertBtn.className = 'job-alert-btn';
    alertBtn.innerHTML = '🔔 Set Job Alert';
    alertBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        padding: 15px 25px;
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        color: white;
        border: none;
        border-radius: 25px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    alertBtn.addEventListener('click', function() {
        showToast('Job alerts enabled! You\'ll be notified of new opportunities.', 'success');
    });
    
    alertBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.5)';
    });
    
    alertBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
    });
    
    document.body.appendChild(alertBtn);
}

// Job Comparison Feature
let comparisonList = [];

function addToComparison(jobId) {
    if (comparisonList.includes(jobId)) {
        comparisonList = comparisonList.filter(id => id !== jobId);
        showToast('Removed from comparison', 'info');
    } else if (comparisonList.length < 3) {
        comparisonList.push(jobId);
        showToast('Added to comparison', 'success');
    } else {
        showToast('Maximum 3 jobs can be compared', 'warning');
    }
    
    updateComparisonBadge();
}

function updateComparisonBadge() {
    let badge = document.getElementById('comparisonBadge');
    
    if (!badge && comparisonList.length > 0) {
        badge = document.createElement('div');
        badge.id = 'comparisonBadge';
        badge.style.cssText = `
            position: fixed;
            bottom: 140px;
            right: 30px;
            padding: 12px 20px;
            background: #ef4444;
            color: white;
            border-radius: 20px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            z-index: 999;
            animation: bounceIn 0.5s ease;
        `;
        badge.innerHTML = `Compare (${comparisonList.length})`;
        badge.addEventListener('click', showComparison);
        document.body.appendChild(badge);
    } else if (badge) {
        if (comparisonList.length === 0) {
            badge.remove();
        } else {
            badge.innerHTML = `Compare (${comparisonList.length})`;
        }
    }
}

function showComparison() {
    const jobs = comparisonList.map(id => jobsDatabase.find(j => j.id === id));
    
    // Create comparison modal
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 30px; max-width: 1000px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>Job Comparison</h2>
                <button onclick="this.closest('.comparison-modal').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(${jobs.length}, 1fr); gap: 20px;">
                ${jobs.map(job => `
                    <div style="border: 2px solid #8b5cf6; border-radius: 12px; padding: 20px;">
                        <h3>${job.title}</h3>
                        <p><strong>${job.company}</strong></p>
                        <p>📍 ${job.location}</p>
                        <p>💰 ${job.salary}</p>
                        <p>📊 ${job.experience}</p>
                        <div style="margin-top: 15px;">
                            <strong>Skills:</strong>
                            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px;">
                                ${job.skills.map(skill => `<span style="background: rgba(139, 92, 246, 0.1); padding: 4px 8px; border-radius: 8px; font-size: 12px;">${skill}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Enhanced Job Card with More Actions
const originalCreateJobCard = createJobCard;
createJobCard = function(job) {
    const card = originalCreateJobCard(job);
    
    // Add comparison button
    const compareBtn = document.createElement('button');
    compareBtn.className = 'job-action-btn';
    compareBtn.innerHTML = '⚖️';
    compareBtn.title = 'Compare';
    compareBtn.onclick = () => addToComparison(job.id);
    
    const actionsDiv = card.querySelector('.job-card-actions');
    if (actionsDiv) {
        actionsDiv.appendChild(compareBtn);
    }
    
    return card;
};

// Job Application Tracking
function trackApplication(jobId) {
    const applications = JSON.parse(localStorage.getItem('applicationTracking') || '{}');
    
    applications[jobId] = {
        appliedDate: new Date().toISOString(),
        status: 'pending',
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('applicationTracking', JSON.stringify(applications));
}

// Enhanced apply job with tracking
const originalApplyJob = applyJob;
applyJob = function(jobId) {
    originalApplyJob(jobId);
    trackApplication(jobId);
};

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    setupJobAlerts();
    
    // Add toast notification system
    if (!document.getElementById('toastContainer')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
});

// Toast Notification for Jobs Page
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toast.style.cssText = `
        background: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        margin-bottom: 10px;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}
