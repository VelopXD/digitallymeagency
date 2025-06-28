// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and portfolio items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Initialize all portfolio items to be visible with fade-in effect
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        setTimeout(() => {
            item.classList.add('fade-in-active');
        }, 50);
    });
    
    // Set 'All' filter as active by default
    const allFilterBtn = document.querySelector('[data-filter="all"]');
    if (allFilterBtn) {
        allFilterBtn.classList.add('active');
    }
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in-active');
                    }, 50);
                } else {
                    if (item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('fade-in-active');
                        }, 50);
                    } else {
                        item.classList.remove('fade-in-active');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Project Modal Functionality
    const portfolioLinks = document.querySelectorAll('.portfolio-view');
    const projectModals = document.querySelectorAll('.project-modal');
    const modalCloseButtons = document.querySelectorAll('.project-modal-close');
    
    // Open modal when portfolio item is clicked
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModal = document.querySelector(this.getAttribute('href'));
            if (targetModal) {
                document.body.classList.add('modal-open');
                targetModal.classList.add('active');
            }
        });
    });
    
    // Close modal when close button is clicked
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.body.classList.remove('modal-open');
            this.closest('.project-modal').classList.remove('active');
        });
    });
    
    // Close modal when clicking outside of modal content
    projectModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                document.body.classList.remove('modal-open');
                this.classList.remove('active');
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.body.classList.remove('modal-open');
            projectModals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
});