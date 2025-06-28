// ===== MAIN.JS =====
// This file contains all the main JavaScript functionality for the website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page loader removed for improved performance
    // Initialize page load immediately
    initPageLoad();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize form validation
    initFormValidation();
});

// Page Loader function removed for improved performance
// Directly trigger animations on page load
function initPageLoad() {
    // Enable scrolling on body
    document.body.style.overflow = 'auto';
    // Make sure body is visible
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    // Trigger initial animations immediately
    triggerInitialAnimations();
    
    // Force all text-reveal elements to be visible
    document.querySelectorAll('.text-reveal').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
    });
    
    // Force all characters to be visible
    document.querySelectorAll('.char').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Trigger initial animations after page load
function triggerInitialAnimations() {
    // Add animation classes to elements that should animate on page load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) heroTitle.classList.add('visible');
    if (heroSubtitle) heroSubtitle.classList.add('visible');
    if (heroCta) heroCta.classList.add('visible');
    
    // Trigger scroll animations for elements in viewport
    triggerScrollAnimations();
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Handle header scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle menu icon
            const menuLines = menuToggle.querySelectorAll('.menu-line');
            menuLines.forEach(line => line.classList.toggle('active'));
        });
        
        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset menu icon
                const menuLines = menuToggle.querySelectorAll('.menu-line');
                menuLines.forEach(line => line.classList.remove('active'));
            });
        });
    }
    
    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Add scroll event listener
    window.addEventListener('scroll', throttle(triggerScrollAnimations, 100));
    
    // Also trigger on resize
    window.addEventListener('resize', throttle(triggerScrollAnimations, 100));
    
    // Initial trigger
    triggerScrollAnimations();
}

function triggerScrollAnimations() {
    // Elements with fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .reveal-on-scroll');
    
    fadeElements.forEach(element => {
        if (isElementInViewport(element, 0.2)) {
            element.classList.add('visible');
        }
    });
    
    // Staggered animations for lists
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        if (isElementInViewport(container, 0.2)) {
            const items = container.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 100 * index);
            });
        }
    });
    
    // Counter animations
    const counterElements = document.querySelectorAll('.counter-animation');
    
    counterElements.forEach(element => {
        if (isElementInViewport(element, 0.2) && !element.classList.contains('counted')) {
            element.classList.add('visible', 'counted');
            const target = parseInt(element.getAttribute('data-target'), 10);
            animateCounter(element, target);
        }
    });
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
    
    // Update scroll progress indicator
    updateScrollProgress();
}

// Check if element is in viewport
function isElementInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Element is considered in viewport if it's top is below threshold and bottom is above threshold from bottom
    return (
        rect.top <= windowHeight * (1 - threshold) &&
        rect.bottom >= windowHeight * threshold
    );
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const counter = setInterval(() => {
        current += increment;
        if (current > target) current = target;
        
        // Format the number (add commas for thousands)
        element.textContent = Math.floor(current).toLocaleString();
        
        if (current === target) clearInterval(counter);
    }, stepTime);
}

// Update scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = `${progress}%`;
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Event listeners for arrows
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentSlide - 1;
            if (index < 0) index = slides.length - 1;
            showSlide(index);
        });
        
        nextBtn.addEventListener('click', () => {
            let index = currentSlide + 1;
            if (index >= slides.length) index = 0;
            showSlide(index);
        });
    }
    
    // Auto slide change
    let slideInterval = setInterval(() => {
        let index = currentSlide + 1;
        if (index >= slides.length) index = 0;
        showSlide(index);
    }, 5000);
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                let index = currentSlide + 1;
                if (index >= slides.length) index = 0;
                showSlide(index);
            }, 5000);
        });
    }
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    // Custom cursor is now handled by cursor.js
    // This function is kept for backward compatibility
    // but doesn't do anything as the cursor is initialized in cursor.js
    return;
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or use default dark theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save theme preference
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Get form fields
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        
        // Simple validation
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        // If form is valid, simulate form submission
        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.appendChild(successMessage);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        }
    });
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Utility Functions

// Throttle function to limit how often a function can be called
function throttle(func, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = new Date().getTime();
        
        if (now - lastCall < delay) {
            return;
        }
        
        lastCall = now;
        return func(...args);
    };
}