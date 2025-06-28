// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get contact form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Set up FormSubmit endpoint
        contactForm.setAttribute('action', 'https://formsubmit.co/digitallymeweb@gmail.com');
        contactForm.setAttribute('method', 'POST');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            const consentInput = document.getElementById('consent');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                markInvalid(emailInput, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                markInvalid(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                markInvalid(subjectInput, 'Please enter a subject');
                isValid = false;
            } else {
                markValid(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                markInvalid(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (!consentInput.checked) {
                markInvalid(consentInput, 'Please agree to the privacy policy');
                isValid = false;
            } else {
                markValid(consentInput);
            }
            
            // If form is valid, submit it to Formspree
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                // Prepare form data
                const formData = new FormData(contactForm);
                
                // Submit form using fetch API
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Show success message
                    const formContent = contactForm.innerHTML;
                    contactForm.innerHTML = '<div class="form-success"><i class="fas fa-check-circle"></i><h3>Thank you for your message!</h3><p>We\'ve received your inquiry and will get back to you as soon as possible.</p></div>';
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        contactForm.innerHTML = formContent;
                        contactForm.reset();
                        
                        // Re-attach event listeners
                        setupFormListeners();
                    }, 5000);
                })
                .catch(error => {
                    // Show error message
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    
                    // Create notification message element if it doesn't exist
                    let errorEl = document.querySelector('.form-notification');
                    if (!errorEl) {
                        errorEl = document.createElement('div');
                        errorEl.className = 'form-notification';
                        contactForm.prepend(errorEl);
                    }
                    
                    errorEl.innerHTML = '<i class="fas fa-info-circle"></i> We\'ll be in touch soon with more details.';
                    errorEl.style.display = 'block';
                    
                    // Hide error after 5 seconds
                    setTimeout(() => {
                        errorEl.style.display = 'none';
                    }, 5000);
                });
            }
        });
        
        // Set up form input listeners
        setupFormListeners();
    }
    
    // FAQ Accordion Functionality
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            
            // Check if this FAQ item is already active
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Helper functions
    function setupFormListeners() {
        const formInputs = document.querySelectorAll('.form-control');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('is-invalid');
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    function markInvalid(input, message) {
        input.classList.add('is-invalid');
        
        // Remove any existing error message
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        
        // Append error message to the form group (after the label)
        formGroup.appendChild(errorMessage);
    }
    
    function markValid(input) {
        input.classList.remove('is-invalid');
        
        // Remove any existing error message
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});