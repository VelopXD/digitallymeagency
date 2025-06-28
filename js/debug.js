// Debug script to help diagnose navigation issues

document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug script loaded on page:', window.location.pathname);
    
    // Log all link clicks
    document.addEventListener('click', function(event) {
        const target = event.target.closest('a');
        if (target && target.getAttribute('href')) {
            console.log('Link clicked:', target.getAttribute('href'));
        }
    });
    
    // Check if page is fully loaded
    window.addEventListener('load', function() {
        console.log('Page fully loaded');
        
        // Check if all scripts are loaded
        const scripts = document.querySelectorAll('script');
        console.log('Scripts loaded:', scripts.length);
        scripts.forEach(script => {
            if (script.src) {
                console.log('- Script:', script.src);
            }
        });
        
        // Check if all stylesheets are loaded
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        console.log('Stylesheets loaded:', stylesheets.length);
        stylesheets.forEach(stylesheet => {
            console.log('- Stylesheet:', stylesheet.href);
        });
    });
    
    // Monitor for navigation errors
    window.addEventListener('error', function(event) {
        console.error('Error detected:', event.message);
    });
});