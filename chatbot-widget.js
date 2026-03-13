// Chatbot Widget Controller

class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.isFullscreen = false;
        this.currentUser = this.checkAuth();
        this.conversationState = {
            interest: null,
            branch: null,
            skills: [],
            companies: [],
            careerGoal: null
        };
        
        if (this.currentUser) {
            this.init();
        }
    }

    checkAuth() {
        const userData = localStorage.getItem('userData');
        if (!userData) return null;
        
        const user = JSON.parse(userData);
        // Only show widget for students
        if (user.role !== 'student') return null;
        
        return user;
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.showWelcomeTooltip();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chatbot-widget';
        widget.innerHTML = `
            <div class="chatbot-tooltip">Need help finding alumni? 💬</div>
            <button class="chatbot-fab" id="chatbotFab">
                🤖
                <span class="chatbot-badge">!</span>
            </button>
            
            <div class="chatbot-modal" id="chatbotModal">
                <div class="chatbot-modal-header">
                    <div class="chatbot-modal-header-content">
                        <div class="chatbot-modal-avatar">🤖</div>
                        <div class="chatbot-modal-title">
                            <h3>Alumni Matcher</h3>
                            <p>Online • Ready to help</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <button class="chatbot-expand-btn" id="chatbotExpand" title="Expand">
                            ⛶
                        </button>
                        <button class="chatbot-close-btn" id="chatbotClose">
                            ×
                        </button>
                    </div>
                </div>
                
                <div class="chatbot-modal-messages" id="chatbotMessages">
                    <div class="chatbot-welcome">
                        <div class="chatbot-welcome-icon">👋</div>
                        <h3>Hi ${this.currentUser.name}!</h3>
                        <p>I'm your Alumni Matcher Assistant. I can help you connect with alumni based on your interests and career goals.</p>
                        <div class="chatbot-welcome-actions">
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('career')">
                                🎯 Career Guidance
                            </button>
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('internship')">
                                💼 Internship Advice
                            </button>
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('skills')">
                                📚 Skill Development
                            </button>
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('company')">
                                🏢 Company Insights
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-modal-input-area">
                    <input 
                        type="text" 
                        class="chatbot-modal-input" 
                        id="chatbotInput"
                        placeholder="Type your message..."
                    >
                    <button class="chatbot-modal-send-btn" id="chatbotSend">
                        ➤
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    attachEventListeners() {
        const fab = document.getElementById('chatbotFab');
        const modal = document.getElementById('chatbotModal');
        const closeBtn = document.getElementById('chatbotClose');
        const expandBtn = document.getElementById('chatbotExpand');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        fab.addEventListener('click', () => this.toggleModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        expandBtn.addEventListener('click', () => this.toggleFullscreen());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Remove badge on first open
        fab.addEventListener('click', () => {
            const badge = document.querySelector('.chatbot-badge');
            if (badge) badge.style.display = 'none';
        }, { once: true });
    }

    showWelcomeTooltip() {
        setTimeout(() => {
            const tooltip = document.querySelector('.chatbot-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateY(10px)';
                }, 5000);
            }
        }, 2000);
    }

    toggleModal() {
        this.isOpen = !this.isOpen;
        const modal = document.getElementById('chatbotModal');
        
        if (this.isOpen) {
            modal.classList.add('active');
            document.getElementById('chatbotInput').focus();
        } else {
            modal.classList.remove('active');
        }
    }

    closeModal() {
        this.isOpen = false;
        const modal = document.getElementById('chatbotModal');
        modal.classList.add('minimizing');
        
        setTimeout(() => {
            modal.classList.remove('active', 'minimizing');
        }, 300);
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        const modal = document.getElementById('chatbotModal');
        const expandBtn = document.getElementById('chatbotExpand');
        
        if (this.isFullscreen) {
            modal.classList.add('fullscreen');
            expandBtn.textContent = '⛶';
            expandBtn.title = 'Minimize';
        } else {
            modal.classList.remove('fullscreen');
            expandBtn.textContent = '⛶';
            expandBtn.title = 'Expand';
        }
    }

    startConversation(interest) {
        this.conversationState.interest = interest;
        
        // Clear welcome screen
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.innerHTML = '';
        
        // Add user message
        this.addMessage(`I'm interested in ${interest}`, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            
            let response = '';
            let followUp = null;
            
            switch(interest) {
                case 'career':
                    response = "Great! I can help you connect with alumni who can guide your career path. What field are you interested in?";
                    followUp = ['Software Development', 'Data Science', 'Product Management', 'Hardware Engineering'];
                    break;
                case 'internship':
                    response = "Looking for internship advice? Perfect! Which companies or domains interest you?";
                    followUp = ['Tech Giants', 'Startups', 'Product Companies', 'Service Companies'];
                    break;
                case 'skills':
                    response = "Skill development is key! What skills are you looking to learn or improve?";
                    followUp = ['Programming', 'Cloud Computing', 'Machine Learning', 'Web Development'];
                    break;
                case 'company':
                    response = "I can connect you with alumni working at top companies. Which companies are you curious about?";
                    followUp = ['Google', 'Microsoft', 'Amazon', 'Adobe'];
                    break;
            }
            
            this.addMessage(response, 'bot', followUp);
        }, 1500);
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage("That's interesting! Let me find the best alumni matches for you. You can also visit the full Alumni Matcher page for more detailed matching.", 'bot', ['Open Full Matcher', 'Continue Here']);
        }, 1500);
    }

    addMessage(text, sender, quickReplies = null) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'bot' ? '🤖' : '👤';
        
        let quickReplyHTML = '';
        if (quickReplies) {
            quickReplyHTML = `
                <div class="quick-replies">
                    ${quickReplies.map(reply => {
                        if (reply === 'Open Full Matcher') {
                            return `<button class="quick-reply-btn" onclick="window.location.href='chatbot.html'">${reply}</button>`;
                        }
                        return `<button class="quick-reply-btn" onclick="chatbotWidget.handleQuickReply('${reply}')">${reply}</button>`;
                    }).join('')}
                </div>
            `;
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${text}</p>
                ${quickReplyHTML}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    handleQuickReply(reply) {
        this.addMessage(reply, 'user');
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            if (reply === 'Continue Here') {
                this.addMessage("Great! Tell me more about what you're looking for, or click below to open the full Alumni Matcher for detailed matching.", 'bot', ['Open Full Matcher']);
            } else {
                this.addMessage(`Excellent choice! I'm finding alumni who specialize in ${reply}. For the best experience with detailed profiles and matching, I recommend opening the full Alumni Matcher.`, 'bot', ['Open Full Matcher', 'Ask Another Question']);
            }
        }, 1500);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }
}

// Initialize widget when DOM is ready
let chatbotWidget;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        chatbotWidget = new ChatbotWidget();
    });
} else {
    chatbotWidget = new ChatbotWidget();
}


// ========================================
// ENHANCED CHATBOT FEATURES
// ========================================

// Smart Response Suggestions
class SmartResponseEngine {
    constructor() {
        this.responses = {
            greeting: [
                "Hello! How can I help you today?",
                "Hi there! Ready to find your perfect alumni match?",
                "Welcome! Let's connect you with amazing alumni."
            ],
            career: [
                "Career guidance is crucial! Let me connect you with alumni who've been in your shoes.",
                "Great choice! Our alumni have incredible career insights to share.",
                "I'll find alumni who can guide you on your career path."
            ],
            internship: [
                "Internships are a great way to start! Let me find alumni who can help.",
                "Looking for internship advice? I know just the right alumni for you.",
                "Our alumni have amazing internship experiences to share!"
            ],
            skills: [
                "Skill development is key to success! Let's find the right mentors.",
                "I'll connect you with alumni who excel in those skills.",
                "Great focus on learning! Our alumni can guide you."
            ],
            company: [
                "Company insights from alumni are invaluable! Let me help.",
                "I'll find alumni working at your target companies.",
                "Our alumni network spans amazing companies!"
            ]
        };
    }
    
    getResponse(category) {
        const responses = this.responses[category] || this.responses.greeting;
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

const smartEngine = new SmartResponseEngine();

// Enhanced Message with Typing Effect
ChatbotWidget.prototype.addMessageWithTyping = function(text, sender, quickReplies = null) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p class="typing-text"></p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Typing effect
    const textElement = messageDiv.querySelector('.typing-text');
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            clearInterval(typeInterval);
            
            // Add quick replies after typing completes
            if (quickReplies) {
                const quickReplyHTML = `
                    <div class="quick-replies">
                        ${quickReplies.map(reply => {
                            if (reply === 'Open Full Matcher') {
                                return `<button class="quick-reply-btn" onclick="window.location.href='chatbot.html'">${reply}</button>`;
                            }
                            return `<button class="quick-reply-btn" onclick="chatbotWidget.handleQuickReply('${reply}')">${reply}</button>`;
                        }).join('')}
                    </div>
                `;
                messageDiv.querySelector('.message-content').insertAdjacentHTML('beforeend', quickReplyHTML);
            }
        }
    }, 30);
};

// Conversation History
ChatbotWidget.prototype.saveConversation = function() {
    const messages = Array.from(document.querySelectorAll('.message')).map(msg => ({
        sender: msg.classList.contains('user-message') ? 'user' : 'bot',
        text: msg.querySelector('p').textContent,
        timestamp: new Date().toISOString()
    }));
    
    localStorage.setItem('chatbotHistory', JSON.stringify(messages));
};

ChatbotWidget.prototype.loadConversation = function() {
    const history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
    
    if (history.length > 0) {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.innerHTML = '';
        
        history.forEach(msg => {
            this.addMessage(msg.text, msg.sender);
        });
    }
};

// Voice Input Support
ChatbotWidget.prototype.enableVoiceInput = function() {
    if (!('webkitSpeechRecognition' in window)) return;
    
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-input-btn';
    voiceBtn.innerHTML = '🎤';
    voiceBtn.style.cssText = `
        position: absolute;
        right: 60px;
        bottom: 12px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.innerHTML = '🔴';
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chatbotInput').value = transcript;
        voiceBtn.innerHTML = '🎤';
    };
    
    recognition.onerror = () => {
        voiceBtn.innerHTML = '🎤';
    };
    
    const inputArea = document.querySelector('.chatbot-modal-input-area');
    if (inputArea) {
        inputArea.style.position = 'relative';
        inputArea.appendChild(voiceBtn);
    }
};

// Sentiment Analysis for Better Responses
ChatbotWidget.prototype.analyzeSentiment = function(text) {
    const positiveWords = ['great', 'awesome', 'excellent', 'good', 'thanks', 'perfect'];
    const negativeWords = ['bad', 'poor', 'terrible', 'hate', 'worst', 'confused'];
    
    const words = text.toLowerCase().split(' ');
    let sentiment = 'neutral';
    
    if (words.some(word => positiveWords.includes(word))) {
        sentiment = 'positive';
    } else if (words.some(word => negativeWords.includes(word))) {
        sentiment = 'negative';
    }
    
    return sentiment;
};

// Enhanced Send Message with Sentiment
const originalSendMessage = ChatbotWidget.prototype.sendMessage;
ChatbotWidget.prototype.sendMessage = function() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const sentiment = this.analyzeSentiment(message);
    
    this.addMessage(message, 'user');
    input.value = '';
    
    this.showTypingIndicator();
    
    setTimeout(() => {
        this.hideTypingIndicator();
        
        let response = "That's interesting! Let me find the best alumni matches for you.";
        
        if (sentiment === 'positive') {
            response = "I'm glad you're excited! Let me connect you with amazing alumni who can help.";
        } else if (sentiment === 'negative') {
            response = "I understand your concerns. Let me find alumni who can provide guidance and support.";
        }
        
        this.addMessageWithTyping(response, 'bot', ['Open Full Matcher', 'Continue Here']);
    }, 1500);
    
    this.saveConversation();
};

// Chatbot Analytics
ChatbotWidget.prototype.trackInteraction = function(action, data = {}) {
    const analytics = JSON.parse(localStorage.getItem('chatbotAnalytics') || '[]');
    
    analytics.push({
        action,
        data,
        timestamp: new Date().toISOString(),
        user: this.currentUser.email
    });
    
    localStorage.setItem('chatbotAnalytics', JSON.stringify(analytics));
};

// Enhanced Start Conversation with Analytics
const originalStartConversation = ChatbotWidget.prototype.startConversation;
ChatbotWidget.prototype.startConversation = function(interest) {
    this.trackInteraction('start_conversation', { interest });
    originalStartConversation.call(this, interest);
};

// Suggested Questions Feature
ChatbotWidget.prototype.showSuggestedQuestions = function() {
    const suggestions = [
        "How do I prepare for interviews?",
        "What skills should I learn?",
        "Tell me about internship opportunities",
        "How to network with alumni?",
        "Career advice for freshers"
    ];
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'suggested-questions';
    suggestionsDiv.style.cssText = `
        padding: 15px;
        background: rgba(139, 92, 246, 0.05);
        border-radius: 12px;
        margin: 10px 0;
    `;
    
    suggestionsDiv.innerHTML = `
        <p style="font-size: 12px; color: #888; margin-bottom: 10px;">Suggested questions:</p>
        ${suggestions.map(q => `
            <button onclick="chatbotWidget.askQuestion('${q}')" style="
                display: block;
                width: 100%;
                text-align: left;
                padding: 8px 12px;
                margin: 5px 0;
                background: white;
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.2s ease;
            ">${q}</button>
        `).join('')}
    `;
    
    return suggestionsDiv;
};

ChatbotWidget.prototype.askQuestion = function(question) {
    document.getElementById('chatbotInput').value = question;
    this.sendMessage();
};

// Initialize enhanced features
setTimeout(() => {
    if (chatbotWidget && chatbotWidget.currentUser) {
        chatbotWidget.enableVoiceInput();
        chatbotWidget.trackInteraction('widget_loaded');
    }
}, 1000);

// Periodic engagement prompts
setInterval(() => {
    if (chatbotWidget && !chatbotWidget.isOpen) {
        const fab = document.getElementById('chatbotFab');
        if (fab) {
            fab.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                fab.style.animation = '';
            }, 500);
        }
    }
}, 60000); // Every minute

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(bounceStyle);
