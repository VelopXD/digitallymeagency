// ===== ANIMATIONS.JS =====
// This file contains advanced animations using GSAP and ScrollTrigger

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initGsapAnimations();
    } else {
        console.warn('GSAP or ScrollTrigger not loaded. Advanced animations will not work.');
    }

    // Initialize text splitting for advanced text animations
    initTextSplitting();

    // Initialize magnetic effect for buttons
    initMagneticEffect();
});

// GSAP Animations
function initGsapAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    animateHeroSection();

    // Scroll-triggered animations
    initScrollAnimations();

    // Stats counter animation
    animateStatsCounter();

    // Service cards staggered animation
    animateServiceCards();

    // Team members staggered animation
    animateTeamMembers();

    // Parallax effects
    createParallaxEffects();
}

// Hero Section Animations
function animateHeroSection() {
    // Hero title animation with character splitting
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.text-reveal');
        
        // Make sure text is visible immediately
        titleLines.forEach(line => {
            line.style.opacity = '1';
            line.style.visibility = 'visible';
        });
        
        // Split text into characters
        titleLines.forEach(line => {
            const text = line.textContent;
            line.textContent = '';
            
            // Create spans for each character
            [...text].forEach((char, charIndex) => {
                if (char === ' ') {
                    line.appendChild(document.createTextNode(' '));
                } else {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.style.opacity = '1'; // Make characters visible immediately
                    charSpan.style.transform = 'translateY(0)'; // Reset position
                    charSpan.style.setProperty('--char-index', charIndex);
                    charSpan.textContent = char;
                    line.appendChild(charSpan);
                }
            });
        });
        
        // Set the highlight class to animated immediately
        titleLines.forEach(line => {
            if (line.classList.contains('highlight')) {
                line.classList.add('animated');
            }
        });
        
        // Skip the animations that might be causing the black screen
        // Just set final values directly
        titleLines.forEach(line => {
            line.style.setProperty('--before-scale', '0');
            line.style.setProperty('--after-scale', '0');
        });
        
        // Animate each character with minimal animation
        const chars = document.querySelectorAll('.hero-title .char');
            // Set all characters to be visible immediately instead of animating
            chars.forEach(char => {
                char.style.opacity = '1';
                char.style.transform = 'translateY(0)';
            });
            
            // Add animated class to highlight element if this is a highlight
            if (line && line.classList.contains('highlight')) {
                line.classList.add('animated');
            }
        });
    }

    // Hero subtitle animation
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power2.out",
                delay: 1.2 // Start after title animation
            }
        );
    }

    // Hero CTA buttons animation
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        const buttons = heroCta.querySelectorAll('.btn');
        
        gsap.fromTo(buttons,
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                stagger: 0.2, 
                duration: 0.8, 
                ease: "back.out(1.7)",
                delay: 1.5 // Start after subtitle animation
            }
        );
    }

    // Hero background shapes animation
    const shapes = document.querySelectorAll('.hero-bg-shapes .shape');
    if (shapes.length) {
        gsap.fromTo(shapes,
            { scale: 0.5, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                stagger: 0.2, 
                duration: 1.5, 
                ease: "elastic.out(1, 0.3)",
                delay: 0.8
            }
        );
    }
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        gsap.fromTo(title,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        gsap.fromTo(step,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                delay: index * 0.2, // Stagger effect
                ease: "power2.out",
                scrollTrigger: {
                    trigger: step.parentElement,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Testimonial section animation
    const testimonialSection = document.querySelector('.testimonials-inner');
    if (testimonialSection) {
        gsap.fromTo(testimonialSection,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: testimonialSection,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    // CTA section animation
    const ctaSection = document.querySelector('.cta-inner');
    if (ctaSection) {
        gsap.fromTo(ctaSection,
            { scale: 0.95, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaSection,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    // FAQ items animation
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        gsap.fromTo(item,
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                delay: index * 0.1, // Stagger effect
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item.parentElement,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Contact section animation
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-wrapper');
    
    if (contactInfo && contactForm) {
        gsap.fromTo(contactInfo,
            { x: -50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contactInfo.parentElement,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
        
        gsap.fromTo(contactForm,
            { x: 50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contactForm.parentElement,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
}

// Stats Counter Animation
function animateStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        const statNumber = item.querySelector('.stat-number');
        if (!statNumber) return;
        
        // Get the target number
        let target = statNumber.textContent;
        
        // Remove any non-numeric characters except decimal point
        target = target.replace(/[^0-9.]/g, '');
        
        // Convert to number
        const targetNum = parseFloat(target);
        
        // Store the original text format (with any prefix/suffix)
        const format = statNumber.textContent.replace(target, '{value}');
        
        // Set initial value to 0
        statNumber.textContent = format.replace('{value}', '0');
        
        // Create the counter animation
        ScrollTrigger.create({
            trigger: item,
            start: "top 80%",
            onEnter: () => {
                gsap.to({
                    val: 0
                }, {
                    val: targetNum,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function() {
                        // Format the number based on whether it's an integer or has decimals
                        let formattedValue;
                        if (Number.isInteger(targetNum)) {
                            formattedValue = Math.floor(this.targets()[0].val).toLocaleString();
                        } else {
                            formattedValue = this.targets()[0].val.toFixed(1);
                        }
                        
                        statNumber.textContent = format.replace('{value}', formattedValue);
                    }
                });
            },
            once: true
        });
    });
}

// Service Cards Animation
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length) {
        gsap.fromTo(serviceCards,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                stagger: 0.1, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: serviceCards[0].parentElement,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
}

// Team Members Animation
function animateTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    if (teamMembers.length) {
        gsap.fromTo(teamMembers,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                stagger: 0.1, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: teamMembers[0].parentElement,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
}

// Parallax Effects
function createParallaxEffects() {
    // Hero section parallax
    const heroShapes = document.querySelectorAll('.hero-bg-shapes .shape');
    
    if (heroShapes.length) {
        heroShapes.forEach(shape => {
            const speed = 0.1 + Math.random() * 0.1; // Random speed between 0.1 and 0.2
            
            gsap.to(shape, {
                y: `${Math.random() * 100 - 50}px`, // Random movement between -50px and 50px
                x: `${Math.random() * 100 - 50}px`,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    ease: "none"
                }
            });
        });
    }
    
    // Section backgrounds parallax
    const sections = document.querySelectorAll('.parallax');
    
    sections.forEach(section => {
        const bg = section.querySelector('.parallax-bg');
        if (!bg) return;
        
        gsap.fromTo(bg,
            { y: '-20%' },
            {
                y: '20%',
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });
}

// Text Splitting for Character Animations
function initTextSplitting() {
    const textElements = document.querySelectorAll('.split-text');
    
    textElements.forEach(element => {
        // Get the original text
        const text = element.textContent;
        element.textContent = '';
        
        // Split text into characters and create spans
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.className = 'split-text-char';
            span.textContent = char === ' ' ? '\u00A0' : char; // Replace space with non-breaking space
            element.appendChild(span);
        }
        
        // Animate characters when in viewport
        const chars = element.querySelectorAll('.split-text-char');
        
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                chars.forEach((char, index) => {
                    setTimeout(() => {
                        char.classList.add('visible');
                    }, 30 * index);
                });
            },
            once: true
        });
    });
}

// Magnetic Effect for Buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', e => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate distance from center (0-1)
            const distance = Math.sqrt(x * x + y * y) / (rect.width / 2);
            const strength = Math.min(distance * 0.5, 0.5); // Limit strength
            
            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}