// ===========================
// COUNTDOWN TIMER
// ===========================

// Set target date to 30 days from now
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 30);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement && hoursElement && minutesElement && secondsElement) {
        // Add smooth number transition
        updateWithAnimation(daysElement, days.toString().padStart(2, '0'));
        updateWithAnimation(hoursElement, hours.toString().padStart(2, '0'));
        updateWithAnimation(minutesElement, minutes.toString().padStart(2, '0'));
        updateWithAnimation(secondsElement, seconds.toString().padStart(2, '0'));
    }

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';
    }
}

function updateWithAnimation(element, newValue) {
    if (element.textContent !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
        }, 100);
    }
}

// Initialize countdown immediately and update every second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// ===========================
// EMAIL FORM VALIDATION
// ===========================

const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email-input');
const errorMessage = document.getElementById('error-message');

function validateEmail(email) {
    // Enhanced email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    emailInput.classList.add('error');
}

function hideError() {
    errorMessage.classList.remove('show');
    emailInput.classList.remove('error');
}

// Real-time validation on input
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    
    if (email === '') {
        hideError();
    } else if (!validateEmail(email)) {
        showError('Please enter a valid email address');
    } else {
        hideError();
    }
});

// Form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (email === '') {
        showError('Email address is required');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Success! Show confirmation
    hideError();
    emailInput.value = '';
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #5175FF 0%, #3E5BCC 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(81, 117, 255, 0.3);
        z-index: 1000;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;
    successMsg.innerHTML = `
        <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">🎉 Success!</h3>
        <p>You're on the waitlist! We'll notify you at <strong>${email}</strong> when we launch.</p>
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove success message after 4 seconds
    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => successMsg.remove(), 300);
    }, 4000);
});

// ===========================
// INTERACTIVE PRICING CARDS
// ===========================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click handlers to "Try for Free" buttons
const tryButtons = document.querySelectorAll('.btn-secondary');

tryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the plan name
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('.plan-name').textContent;
        
        // Scroll to signup form
        const signupSection = document.querySelector('.countdown-section');
        signupSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus on email input after scroll
        setTimeout(() => {
            emailInput.focus();
            emailInput.placeholder = `Get started with ${planName} plan - Enter your email`;
        }, 500);
    });
});

// ===========================
// HERO CTA BUTTON
// ===========================

const heroCTA = document.getElementById('hero-cta');

if (heroCTA) {
    heroCTA.addEventListener('click', function() {
        const signupSection = document.querySelector('.countdown-section');
        signupSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            emailInput.focus();
        }, 500);
    });
}

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

document.documentElement.style.scrollBehavior = 'smooth';

// ===========================
// ADD CSS ANIMATIONS DYNAMICALLY
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe pricing cards
pricingCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add pulse animation to countdown on page load
window.addEventListener('load', () => {
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach((unit, index) => {
        setTimeout(() => {
            unit.style.animation = 'fadeInUp 0.5s ease forwards';
        }, index * 100);
    });
});

console.log('✨ Officelite landing page initialized!');
console.log(`🎯 Countdown target: ${targetDate.toLocaleDateString()}`);
