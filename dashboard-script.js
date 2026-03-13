// Load announcements from localStorage
function loadAnnouncements() {
    const announcementsSection = document.getElementById('announcementsSection');
    if (!announcementsSection) return;

    // Get announcements from localStorage (posted by admin)
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    
    // Filter announcements based on user role
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userRole = userData.role || 'student';
    
    const filteredAnnouncements = announcements.filter(ann => {
        if (ann.target === 'all') return true;
        if (ann.target === 'students' && userRole === 'student') return true;
        if (ann.target === 'faculty' && userRole === 'faculty') return true;
        if (ann.target === 'alumni' && userRole === 'alumni') return true;
        return false;
    });

    if (filteredAnnouncements.length === 0) {
        announcementsSection.innerHTML = '';
        return;
    }

    // Sort by date (newest first)
    filteredAnnouncements.sort((a, b) => b.id - a.id);

    // Display announcements
    announcementsSection.innerHTML = `
        <div class="announcements-header">
            <h2>
                <span>📢</span> Announcements
                <span class="announcements-count">${filteredAnnouncements.length}</span>
            </h2>
        </div>
        ${filteredAnnouncements.map(ann => `
            <div class="announcement-card ${ann.priority}">
                <div class="announcement-header">
                    <div class="announcement-title">
                        <span class="announcement-icon">${getPriorityIcon(ann.priority)}</span>
                        ${ann.title}
                    </div>
                    <span class="announcement-priority ${ann.priority}">${ann.priority}</span>
                </div>
                <div class="announcement-message">${ann.message}</div>
                <div class="announcement-meta">
                    <span>👤 ${ann.author}</span>
                    <span>📅 ${ann.date} ${ann.time}</span>
                    <span class="announcement-target">🎯 ${formatTarget(ann.target)}</span>
                </div>
            </div>
        `).join('')}
    `;
}

// Get priority icon
function getPriorityIcon(priority) {
    switch(priority) {
        case 'urgent': return '🚨';
        case 'important': return '⚠️';
        case 'normal': return 'ℹ️';
        default: return '📢';
    }
}

// Format target audience
function formatTarget(target) {
    switch(target) {
        case 'all': return 'All Users';
        case 'students': return 'Students Only';
        case 'faculty': return 'Faculty Only';
        case 'alumni': return 'Alumni Only';
        default: return target;
    }
}

// Sample posts data
const samplePosts = [
    {
        id: 1,
        author: 'Rajesh Kumar',
        role: 'Student - CSE',
        content: '🎉 Excited to share that I got placed at Google! Thank you JIT for the amazing opportunities and support. #Placements2024 #Google',
        timestamp: '2 hours ago',
        likes: 234,
        comments: 45,
        category: 'placement'
    },
    {
        id: 2,
        author: 'Dr. Priya Sharma',
        role: 'Faculty - ISE',
        content: '📚 New research paper published in IEEE on Machine Learning applications in Healthcare. Proud of our research team! #Research #ML',
        timestamp: '5 hours ago',
        likes: 156,
        comments: 23,
        category: 'research'
    },
    {
        id: 3,
        author: 'Arun Patel',
        role: 'Alumni - CSE 2020',
        content: '💼 Looking for talented interns at Microsoft for Summer 2024. DM me if interested! #Internship #Microsoft',
        timestamp: '1 day ago',
        likes: 189,
        comments: 67,
        category: 'internship'
    },
    {
        id: 4,
        author: 'CSE Department',
        role: 'Department',
        content: '🚀 Tech Fest 2024 registrations are now open! Amazing prizes and opportunities await. Register now! #TechFest #JIT',
        timestamp: '2 days ago',
        likes: 312,
        comments: 89,
        category: 'event'
    },
    {
        id: 5,
        author: 'Sneha Reddy',
        role: 'Student - ECE',
        content: '🏆 Won first prize in National Level Hackathon! Grateful for the support from JIT faculty. #Achievement #Hackathon',
        timestamp: '3 days ago',
        likes: 267,
        comments: 34,
        category: 'general'
    }
];

// Sample suggested connections
const suggestedConnections = [
    { name: 'Vikram Singh', role: 'Student - CSE', mutual: 12 },
    { name: 'Divya Iyer', role: 'Student - ISE', mutual: 8 },
    { name: 'Karthik Menon', role: 'Student - CSE', mutual: 15 }
];

// Load posts
function loadPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    // Get posts from localStorage or use sample posts
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const posts = savedPosts.length > 0 ? savedPosts : samplePosts;
    
    // Initialize comments array if not exists
    if (!localStorage.getItem('postComments')) {
        localStorage.setItem('postComments', JSON.stringify({}));
    }
    
    // Initialize likes array if not exists
    if (!localStorage.getItem('postLikes')) {
        localStorage.setItem('postLikes', JSON.stringify({}));
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}');
    const postComments = JSON.parse(localStorage.getItem('postComments') || '{}');

    container.innerHTML = posts.map(post => {
        const userLiked = postLikes[post.id]?.includes(userData.email);
        const comments = postComments[post.id] || [];
        const likeCount = postLikes[post.id]?.length || 0;
        
        return `
        <div class="post-card" id="post-${post.id}">
            <div class="post-header">
                <div class="post-author-info">
                    <div class="post-avatar">${post.author.charAt(0)}</div>
                    <div>
                        <div class="post-author">${post.author}</div>
                        <div class="post-meta">${post.role} • ${post.timestamp}</div>
                    </div>
                </div>
                <button class="post-menu-btn">⋮</button>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-stats">
                <span id="like-count-${post.id}">${likeCount} ${likeCount === 1 ? 'like' : 'likes'}</span>
                <span>${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}</span>
            </div>
            <div class="post-actions">
                <button class="post-action-btn ${userLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ${userLiked ? '❤️' : '🤍'} Like
                </button>
                <button class="post-action-btn" onclick="toggleComments(${post.id})">
                    💬 Comment
                </button>
                <button class="post-action-btn" onclick="sharePost(${post.id})">
                    🔗 Share
                </button>
            </div>
            <div class="comments-section" id="comments-${post.id}" style="display: none;">
                <div class="comments-list" id="comments-list-${post.id}">
                    ${comments.length > 0 ? comments.map(comment => `
                        <div class="comment-item">
                            <div class="comment-avatar">${comment.author.charAt(0)}</div>
                            <div class="comment-content">
                                <div class="comment-author">${comment.author}</div>
                                <div class="comment-text">${comment.text}</div>
                                <div class="comment-time">${comment.timestamp}</div>
                            </div>
                        </div>
                    `).join('') : '<div class="no-comments">No comments yet. Be the first to comment!</div>'}
                </div>
                <div class="comment-input-container">
                    <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="Write a comment..." onkeypress="handleCommentKeyPress(event, ${post.id})">
                    <button class="comment-submit-btn" onclick="addComment(${post.id})">Post</button>
                </div>
            </div>
        </div>
    `}).join('');
}

// Load suggested connections
function loadSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    if (!container) return;

    container.innerHTML = suggestedConnections.map(conn => `
        <div class="suggestion-item">
            <div class="suggestion-avatar">${conn.name.charAt(0)}</div>
            <div class="suggestion-info">
                <div class="suggestion-name">${conn.name}</div>
                <div class="suggestion-role">${conn.role}</div>
                <div class="suggestion-mutual">${conn.mutual} mutual connections</div>
            </div>
            <button class="btn-connect">CONNECT</button>
        </div>
    `).join('');
}

// Create post
function createPost() {
    const content = document.getElementById('postContent').value;
    const category = document.getElementById('postCategory').value;

    if (!content.trim()) {
        alert('Please write something to post!');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    const newPost = {
        id: Date.now(),
        author: userData.name || 'Anonymous',
        role: userData.role || 'Student',
        content: content,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        category: category
    };

    // Save to localStorage
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear form
    document.getElementById('postContent').value = '';
    document.getElementById('postCategory').value = 'general';

    // Reload posts
    loadPosts();
}

// Toggle like on post
function toggleLike(postId) {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userEmail = userData.email || 'anonymous@jit.ac.in';
    
    // Get current likes
    const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}');
    
    // Initialize likes array for this post if not exists
    if (!postLikes[postId]) {
        postLikes[postId] = [];
    }
    
    // Toggle like
    const likeIndex = postLikes[postId].indexOf(userEmail);
    if (likeIndex > -1) {
        // Unlike
        postLikes[postId].splice(likeIndex, 1);
    } else {
        // Like
        postLikes[postId].push(userEmail);
    }
    
    // Save likes
    localStorage.setItem('postLikes', JSON.stringify(postLikes));
    
    // Update the like count display immediately without full reload
    const likeCountElement = document.getElementById(`like-count-${postId}`);
    const newCount = postLikes[postId].length;
    if (likeCountElement) {
        likeCountElement.textContent = `${newCount} ${newCount === 1 ? 'like' : 'likes'}`;
    }
    
    // Update the button state
    const postCard = document.getElementById(`post-${postId}`);
    if (postCard) {
        const likeButton = postCard.querySelector('.post-action-btn');
        if (likeButton) {
            if (likeIndex > -1) {
                // Was liked, now unliked
                likeButton.classList.remove('liked');
                likeButton.innerHTML = '🤍 Like';
            } else {
                // Was not liked, now liked
                likeButton.classList.add('liked');
                likeButton.innerHTML = '❤️ Like';
            }
        }
    }
}

// Toggle comments section
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        if (commentsSection.style.display === 'none') {
            commentsSection.style.display = 'block';
            // Focus on comment input
            setTimeout(() => {
                document.getElementById(`comment-input-${postId}`)?.focus();
            }, 100);
        } else {
            commentsSection.style.display = 'none';
        }
    }
}

// Add comment to post
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput?.value.trim();
    
    if (!commentText) {
        alert('Please write a comment!');
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    const newComment = {
        id: Date.now(),
        author: userData.name || 'Anonymous',
        text: commentText,
        timestamp: 'Just now'
    };
    
    // Get existing comments
    const postComments = JSON.parse(localStorage.getItem('postComments') || '{}');
    
    // Initialize comments array for this post if not exists
    if (!postComments[postId]) {
        postComments[postId] = [];
    }
    
    // Add new comment
    postComments[postId].push(newComment);
    
    // Update posts
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = postComments[postId].length;
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    // Save comments
    localStorage.setItem('postComments', JSON.stringify(postComments));
    
    // Clear input
    commentInput.value = '';
    
    // Reload posts
    loadPosts();
    
    // Show comments section
    setTimeout(() => {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection) {
            commentsSection.style.display = 'block';
        }
    }, 100);
}

// Handle Enter key press in comment input
function handleCommentKeyPress(event, postId) {
    if (event.key === 'Enter') {
        addComment(postId);
    }
}

// Share post
function sharePost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        // Copy post link to clipboard
        const postUrl = `${window.location.origin}/dashboard.html#post-${postId}`;
        navigator.clipboard.writeText(postUrl).then(() => {
            alert('Post link copied to clipboard!');
        }).catch(() => {
            alert('Share this post: ' + postUrl);
        });
    }
}

// Like post (old function - keeping for compatibility)
function likePost(postId) {
    toggleLike(postId);
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    // Show page loader
    const pageLoader = document.getElementById('pageLoader');
    
    // Load all content with staggered animation
    setTimeout(() => {
        loadAnnouncements();
    }, 100);
    
    setTimeout(() => {
        loadPosts();
    }, 200);
    
    setTimeout(() => {
        loadSuggestions();
    }, 300);
    
    // Hide page loader after content loads
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
    }, 800);

    // Refresh announcements every 30 seconds
    setInterval(loadAnnouncements, 30000);
    
    // Add lazy loading for images
    lazyLoadImages();
    
    // Add smooth scroll behavior
    enableSmoothScroll();
    
    // Initialize tooltips
    initializeTooltips();
});


// Toast Notification System
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
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Enhanced create post with toast
const originalCreatePost = createPost;
createPost = function() {
    const content = document.getElementById('postContent').value;
    
    if (!content.trim()) {
        showToast('Please write something to post!', 'warning');
        return;
    }
    
    originalCreatePost();
    showToast('Post created successfully!', 'success');
};

// Enhanced comment with toast
const originalAddComment = addComment;
addComment = function(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput?.value.trim();
    
    if (!commentText) {
        showToast('Please write a comment!', 'warning');
        return;
    }
    
    originalAddComment(postId);
    showToast('Comment added!', 'success');
};

// Add CSS for slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// ========================================
// ENHANCED UX FEATURES
// ========================================

// Lazy Load Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth Scroll
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                this.setAttribute('aria-label', tooltip);
            }
        });
    });
}

// Debounce Function for Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function for Performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced Post Visibility Tracking
function trackPostVisibility() {
    const posts = document.querySelectorAll('.post-card');
    
    const postObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Track view analytics here if needed
            }
        });
    }, {
        threshold: 0.5
    });
    
    posts.forEach(post => postObserver.observe(post));
}

// Auto-save Draft Posts
let draftSaveTimeout;
function autoSaveDraft() {
    const postContent = document.getElementById('postContent');
    
    if (postContent) {
        postContent.addEventListener('input', debounce(function() {
            const content = this.value;
            if (content.trim()) {
                localStorage.setItem('postDraft', content);
                showToast('Draft saved', 'info');
            }
        }, 2000));
        
        // Load draft on page load
        const savedDraft = localStorage.getItem('postDraft');
        if (savedDraft) {
            postContent.value = savedDraft;
            showToast('Draft restored', 'info');
        }
    }
}

// Clear draft after posting
const originalCreatePostEnhanced = createPost;
createPost = function() {
    originalCreatePostEnhanced();
    localStorage.removeItem('postDraft');
};

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) searchInput.focus();
    }
    
    // Ctrl/Cmd + N for new post
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const postTextarea = document.getElementById('postContent');
        if (postTextarea) postTextarea.focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

// Enhanced Like Animation
function enhancedLikeAnimation(postId) {
    const likeButton = document.querySelector(`#post-${postId} .post-action-btn`);
    if (likeButton) {
        // Create heart particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'heart-particle';
            particle.textContent = '❤️';
            particle.style.cssText = `
                position: absolute;
                font-size: 12px;
                pointer-events: none;
                animation: heartFloat 1s ease-out forwards;
                left: ${Math.random() * 40 - 20}px;
                opacity: 1;
            `;
            
            likeButton.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
}

// Add heart float animation
const heartFloatStyle = document.createElement('style');
heartFloatStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartFloatStyle);

// Enhanced toggle like with animation
const originalToggleLike = toggleLike;
toggleLike = function(postId) {
    originalToggleLike(postId);
    enhancedLikeAnimation(postId);
};

// Infinite Scroll for Posts
let isLoadingMore = false;
function enableInfiniteScroll() {
    window.addEventListener('scroll', throttle(function() {
        if (isLoadingMore) return;
        
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.scrollHeight - 500;
        
        if (scrollPosition >= threshold) {
            isLoadingMore = true;
            loadMorePosts();
        }
    }, 200));
}

function loadMorePosts() {
    // Simulate loading more posts
    setTimeout(() => {
        showToast('All posts loaded', 'info');
        isLoadingMore = false;
    }, 1000);
}

// Real-time Character Counter for Posts
function addCharacterCounter() {
    const postContent = document.getElementById('postContent');
    if (!postContent) return;
    
    const maxChars = 500;
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 12px;
        color: #888;
        margin-top: 8px;
    `;
    
    postContent.parentElement.appendChild(counter);
    
    postContent.addEventListener('input', function() {
        const remaining = maxChars - this.value.length;
        counter.textContent = `${remaining} characters remaining`;
        
        if (remaining < 50) {
            counter.style.color = '#ef4444';
        } else if (remaining < 100) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = '#888';
        }
    });
}

// Enhanced Comment Threading
function enhanceCommentThreading() {
    // Add reply functionality to comments
    document.querySelectorAll('.comment-item').forEach(comment => {
        const replyBtn = document.createElement('button');
        replyBtn.className = 'comment-reply-btn';
        replyBtn.textContent = 'Reply';
        replyBtn.style.cssText = `
            font-size: 12px;
            color: #8b5cf6;
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px 8px;
            margin-top: 4px;
        `;
        
        comment.querySelector('.comment-content').appendChild(replyBtn);
    });
}

// Initialize enhanced features
setTimeout(() => {
    trackPostVisibility();
    autoSaveDraft();
    enableInfiniteScroll();
    addCharacterCounter();
    enhanceCommentThreading();
}, 1000);

// Performance Monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}

// Service Worker Registration for Offline Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
