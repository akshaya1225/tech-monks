// Form validation for login pages
const validateLoginForm = (email, password, type) => {
    let isValid = true;
    const errors = [];
    
    // Email validation
    if (!email) {
        errors.push('Email is required');
        isValid = false;
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        errors.push('Password is required');
        isValid = false;
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
        isValid = false;
    }
    
    // Demo credentials for testing
    if (isValid && type === 'student') {
        if (email === 'student@university.edu' && password === 'student123') {
            alert('Student login successful! Redirecting to dashboard...');
            window.location.href = 'index.html';
        } else {
            errors.push('Invalid credentials. Use: student@university.edu / student123');
            isValid = false;
        }
    } else if (isValid && type === 'teacher') {
        if (email === 'teacher@university.edu' && password === 'teacher123') {
            alert('Teacher login successful! Redirecting to dashboard...');
            window.location.href = 'index.html';
        } else {
            errors.push('Invalid credentials. Use: teacher@university.edu / teacher123');
            isValid = false;
        }
    }
    
    return { isValid, errors };
};

// Handle login form submission
const setupLoginForm = (formId, type) => {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember')?.checked;
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        
        const { isValid, errors } = validateLoginForm(email, password, type);
        
        if (!isValid) {
            // Display errors
            errors.forEach(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.display = 'block';
                errorDiv.textContent = error;
                form.insertBefore(errorDiv, form.firstChild);
            });
        } else if (rememberMe) {
            // Save to localStorage if remember me is checked
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userType', type);
        }
    });
    
    // Auto-fill saved email if exists
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.value = savedEmail;
        const rememberCheckbox = document.getElementById('remember');
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }
};

// Forgot password handler
const setupForgotPassword = () => {
    const forgotLink = document.querySelector('.forgot-password');
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset link will be sent to your registered email address.');
        });
    }
};

// Initialize login pages
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on
    if (window.location.pathname.includes('login-student.html')) {
        setupLoginForm('loginForm', 'student');
        setupForgotPassword();
    } else if (window.location.pathname.includes('login-teacher.html')) {
        setupLoginForm('loginForm', 'teacher');
        setupForgotPassword();
    }
});