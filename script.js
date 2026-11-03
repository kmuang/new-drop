const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email-input');
const signupStatus = document.getElementById('signup-status');
const signupSection = document.getElementById('signup');

if (signupForm && emailInput && signupStatus) {
    const submitButton = signupForm.querySelector('button[type="submit"]');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!signupForm.reportValidity()) return;

        if (submitButton) submitButton.disabled = true;
        signupStatus.textContent = 'Sending your request…';
        signupStatus.classList.remove('is-error');

        try {
            const response = await fetch(signupForm.action, {
                method: 'POST',
                body: new FormData(signupForm),
                headers: { Accept: 'application/json' }
            });

            if (!response.ok) {
                signupStatus.textContent = 'We couldn’t submit your request. Please try again.';
                signupStatus.classList.add('is-error');
                return;
            }

            signupStatus.textContent = 'Thanks for your interest! Your early access request has been received.';
            emailInput.value = '';
        } catch {
            signupStatus.textContent = 'We couldn’t reach the signup service. Check your connection and try again.';
            signupStatus.classList.add('is-error');
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

document.querySelectorAll('.pricing-card .btn-secondary').forEach((button) => {
    button.addEventListener('click', () => {
        if (!signupSection || !emailInput) return;

        const planName = button.closest('.pricing-card')?.querySelector('.plan-name')?.textContent?.trim();
        emailInput.placeholder = planName
            ? `Email for ${planName} waitlist`
            : 'Enter your email address';
        const planInput = document.getElementById('plan-input');
        if (planInput) planInput.value = planName ? `${planName} plan` : 'Early access';
        signupSection.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
        emailInput.focus({ preventScroll: true });
    });
});

const pricingCards = document.querySelectorAll('.pricing-card');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    pricingCards.forEach((card) => observer.observe(card));
} else {
    pricingCards.forEach((card) => card.classList.add('is-visible'));
}
