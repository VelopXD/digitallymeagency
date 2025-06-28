// Blog Category Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all category buttons and blog posts
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category value
            const categoryValue = this.getAttribute('data-category');
            
            // Filter blog posts
            blogPosts.forEach(post => {
                if (categoryValue === 'all') {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.classList.add('fade-in-active');
                    }, 50);
                } else {
                    if (post.getAttribute('data-category') === categoryValue) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.classList.add('fade-in-active');
                        }, 50);
                    } else {
                        post.classList.remove('fade-in-active');
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Pagination Functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all pagination buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would load the next page of blog posts
            // For this demo, we'll just scroll to the top of the blog grid
            const blogGrid = document.querySelector('.blog-grid');
            if (blogGrid) {
                window.scrollTo({
                    top: blogGrid.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email input value
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple validation
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            
            // In a real implementation, this would submit the form to a server
            // For this demo, we'll just show a success message
            this.innerHTML = '<div class="form-success"><i class="fas fa-check-circle"></i><h3>Thank you for subscribing!</h3><p>You\'ll receive our latest updates and articles directly to your inbox.</p></div>';
        });
    }
});