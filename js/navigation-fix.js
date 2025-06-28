// Navigation Fix Script

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href]');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Get the href attribute
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (HTML file)
            if (href.endsWith('.html')) {
                console.log('Navigating to:', href);
                // Prevent the default behavior
                event.preventDefault();
                
                // Manually navigate to the page
                window.location.href = href;
            }
        });
    });
    
    console.log('Navigation fix script loaded');
});