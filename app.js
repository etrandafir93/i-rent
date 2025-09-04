// Language switching functionality
let currentLanguage = localStorage.getItem('language') || 'ro';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.className = `scroll-smooth lang-${lang}`;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('text-gray-600');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('text-gray-600');
        }
    });
    
    // Update all translatable elements
    updateTranslations();
}

function updateTranslations() {
    const translations = window.I18N[currentLanguage];
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else if (element.tagName === 'META') {
                element.content = value;
            } else if (element.hasAttribute('title')) {
                element.title = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Update page title and meta description
    document.title = translations.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = translations.meta.description;
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = translations.meta.title;
    if (ogDesc) ogDesc.content = translations.meta.description;
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    
    menu.classList.toggle('hidden');
    
    // Animate hamburger to X
    const icon = btn.querySelector('svg');
    if (menu.classList.contains('hidden')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    }
}

// Smooth scrolling for navigation
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        const menu = document.getElementById('mobile-menu');
        if (!menu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input, textarea');
        if (firstInput) firstInput.focus();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// FAQ accordion functionality
function toggleFAQ(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
        element.setAttribute('aria-expanded', 'false');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
        element.setAttribute('aria-expanded', 'true');
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('span');
    
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toast.querySelector('div').classList.remove('bg-green-500');
        toast.querySelector('div').classList.add('bg-red-500');
    } else {
        toast.querySelector('div').classList.remove('bg-red-500');
        toast.querySelector('div').classList.add('bg-green-500');
    }
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Form submission handlers
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.phone || !data.email) {
        showToast(window.I18N[currentLanguage].toast.error, 'error');
        return;
    }
    
    // For demo purposes, just log the data and show success
    console.log('Contact form data:', data);
    
    // TODO: Send to actual form handler (Formspree, Netlify Forms, etc.)
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // }).then(() => {
    //     showToast(window.I18N[currentLanguage].toast.success);
    //     event.target.reset();
    // }).catch(() => {
    //     showToast(window.I18N[currentLanguage].toast.error, 'error');
    // });
    
    showToast(window.I18N[currentLanguage].toast.success);
    event.target.reset();
}

function handleBikeBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.phone || !data.email || !data.duration) {
        showToast(window.I18N[currentLanguage].toast.error, 'error');
        return;
    }
    
    // For demo purposes, just log the data and show success
    console.log('Bike booking data:', data);
    
    // TODO: Send to actual form handler
    showToast(window.I18N[currentLanguage].toast.success);
    event.target.reset();
    closeModal('bike-modal');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLanguage);
    
    // Setup event listeners
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    
    // Setup navigation click handlers
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                smoothScrollTo(targetId);
            }
        });
    });
    
    // Setup modal close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Setup form handlers
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    const bikeForm = document.getElementById('bike-booking-form');
    if (bikeForm) {
        bikeForm.addEventListener('submit', handleBikeBooking);
    }
    
    // Setup FAQ accordions
    document.querySelectorAll('.faq-button').forEach(button => {
        button.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
    
    // Close mobile menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            const menu = document.getElementById('mobile-menu');
            if (!menu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Setup intersection observer for nav highlighting (optional)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-primary', 'font-semibold');
                    link.classList.add('text-gray-700');
                    
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-primary', 'font-semibold');
                        link.classList.remove('text-gray-700');
                    }
                });
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
});

// Export functions for inline event handlers
window.setLanguage = setLanguage;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleFAQ = toggleFAQ;