// SIMPLIFIED LOGIN SCRIPT - GUARANTEED TO WORK ON VERCEL

// Form Switching - Simple and Reliable
function showRegister() {
    console.log('showRegister called');
    
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.style.display = 'none';
        console.log('Login form hidden');
    }
    
    if (registerForm) {
        registerForm.style.display = 'block';
        console.log('Register form shown');
    }
    
    return false;
}

function showLogin() {
    console.log('showLogin called');
    
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.style.display = 'none';
        console.log('Register form hidden');
    }
    
    if (loginForm) {
        loginForm.style.display = 'block';
        console.log('Login form shown');
    }
    
    return false;
}

// Role-based Fields
function handleRoleChange() {
    console.log('handleRoleChange called');
    
    var role = document.getElementById('regRole').value;
    console.log('Selected role:', role);
    
    // Hide all role fields
    var allFields = ['studentFields', 'facultyFields', 'alumniFields', 'departmentFields'];
    
    for (var i = 0; i < allFields.length; i++) {
        var field = document.getElementById(allFields[i]);
        if (field) {
            field.style.display = 'none';
        }
    }
    
    // Show selected role fields
    var targetField = null;
    
    if (role === 'student') {
        targetField = document.getElementById('studentFields');
    } else if (role === 'faculty') {
        targetField = document.getElementById('facultyFields');
    } else if (role === 'alumni') {
        targetField = document.getElementById('alumniFields');
    } else if (role === 'department') {
        targetField = document.getElementById('departmentFields');
    }
    
    if (targetField) {
        targetField.style.display = 'block';
        console.log('Showing fields for:', role);
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    console.log('handleLogin called');
    
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', email);
    
    // Check for admin credentials
    if (email === 'admin@jit.ac.in' && password === 'admin123') {
        console.log('Admin login');
        
        var userData = {
            email: email,
            name: 'Admin User',
            role: 'admin',
            isLoggedIn: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'admin-new.html';
        return;
    }
    
    // Regular user login
    var userData = {
        email: email,
        name: 'Demo Student',
        role: 'student',
        branch: 'CSE',
        year: '3rd Year',
        isLoggedIn: true
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = 'dashboard.html';
}

// Register Handler
function handleRegister(event) {
    event.preventDefault();
    console.log('handleRegister called');
    
    var name = document.getElementById('regName').value;
    var email = document.getElementById('regEmail').value;
    var password = document.getElementById('regPassword').value;
    var role = document.getElementById('regRole').value;
    
    console.log('Registration attempt:', email, role);
    
    // Basic validation
    if (!name || !email || !password || !role) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    var additionalData = {};
    
    // Collect role-specific data
    if (role === 'student') {
        var usn = document.getElementById('usn');
        var branch = document.getElementById('branch');
        var year = document.getElementById('year');
        
        additionalData = {
            usn: usn ? usn.value : '',
            branch: branch ? branch.value : '',
            year: year ? year.value : ''
        };
    } else if (role === 'faculty') {
        var department = document.getElementById('department');
        var designation = document.getElementById('designation');
        var experience = document.getElementById('experience');
        
        additionalData = {
            department: department ? department.value : '',
            designation: designation ? designation.value : '',
            experience: experience ? experience.value : ''
        };
    } else if (role === 'alumni') {
        var batch = document.getElementById('batch');
        var alumniBranch = document.getElementById('alumniBranch');
        var company = document.getElementById('company');
        var alumniDesignation = document.getElementById('alumniDesignation');
        
        additionalData = {
            batch: batch ? batch.value : '',
            branch: alumniBranch ? alumniBranch.value : '',
            company: company ? company.value : '',
            designation: alumniDesignation ? alumniDesignation.value : ''
        };
    } else if (role === 'department') {
        var deptName = document.getElementById('deptName');
        var deptDescription = document.getElementById('deptDescription');
        
        additionalData = {
            deptName: deptName ? deptName.value : '',
            description: deptDescription ? deptDescription.value : ''
        };
    }
    
    var userData = {
        name: name,
        email: email,
        role: role,
        isLoggedIn: true,
        registeredAt: new Date().toISOString()
    };
    
    // Merge additional data
    for (var key in additionalData) {
        userData[key] = additionalData[key];
    }
    
    try {
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved');
        
        alert('Account created successfully! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - initializing forms');
    
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.style.display = 'block';
        console.log('Login form visible');
    }
    
    if (registerForm) {
        registerForm.style.display = 'none';
        console.log('Register form hidden');
    }
});

console.log('Login script loaded successfully');
