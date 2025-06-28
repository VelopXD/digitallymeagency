// ===== CURSOR.JS =====
// This file contains the custom cursor implementation

class CustomCursor {
    constructor() {
        // Create cursor elements if they don't exist
        this.createCursorElements();
        
        // Initialize properties
        // Note: cursor-dot element has been removed from the design
        this.cursor = null; // We keep this property but set it to null
        this.cursorOutline = document.querySelector('.cursor-outline');
        this.cursorRing = document.querySelector('.cursor-ring');
        
        // Mouse position with lerp smoothing
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        // Speed factors for smooth movement - optimized for better responsiveness
        this.cursorSpeed = 1.0;  // We keep this for calculation purposes
        this.outlineSpeed = 0.2; // Slightly faster for better responsiveness
        this.ringSpeed = 0.1;   // Faster trailing effect but still smooth
        
        // State tracking
        this.isVisible = false;
        this.isActive = false;
        this.isHovering = false;
        this.lastFrameTime = 0;
        
        // Initialize the cursor
        this.init();
    }
    
    createCursorElements() {
        // Create a fragment to batch DOM operations for better performance
        const fragment = document.createDocumentFragment();
        let elementsCreated = false;
        
        // We no longer create the cursor-dot element as it's been removed from the design
        
        if (!document.querySelector('.cursor-outline')) {
            const cursorOutline = document.createElement('div');
            cursorOutline.className = 'cursor-outline';
            // Set initial transform to prevent layout shifts
            cursorOutline.style.transform = 'translate3d(0, 0, 0) translate(-50%, -50%)';
            fragment.appendChild(cursorOutline);
            elementsCreated = true;
        }
        
        if (!document.querySelector('.cursor-ring')) {
            const cursorRing = document.createElement('div');
            cursorRing.className = 'cursor-ring';
            // Set initial transform to prevent layout shifts
            cursorRing.style.transform = 'translate3d(0, 0, 0) translate(-50%, -50%)';
            fragment.appendChild(cursorRing);
            elementsCreated = true;
        }
        
        // Only append to DOM if new elements were created
        if (elementsCreated) {
            document.body.appendChild(fragment);
        }
    }
    
    init() {
        // More robust detection of touch devices and mobile browsers
        if ('ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            navigator.msMaxTouchPoints > 0 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Hide custom cursor on touch devices and restore default cursor
            this.hideCursor();
            document.body.style.cursor = 'auto';
            return;
        }
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Set initial positions to current mouse position if available
        if (typeof window.mouseX !== 'undefined' && typeof window.mouseY !== 'undefined') {
            this.mouseX = window.mouseX;
            this.mouseY = window.mouseY;
            this.cursorX = window.mouseX;
            this.cursorY = window.mouseY;
            this.outlineX = window.mouseX;
            this.outlineY = window.mouseY;
            this.ringX = window.mouseX;
            this.ringY = window.mouseY;
        }
        
        // Show custom cursor elements
        this.showCursor();
        
        // Add event listeners
        this.addEventListeners();
        
        // Start animation loop with high performance settings
        requestAnimationFrame(this.update.bind(this));
    }
    
    addEventListeners() {
        // Store mouse position globally for initial positioning
        window.mouseX = 0;
        window.mouseY = 0;
        
        // Track mouse movement with passive event for better performance
        document.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
        
        // Handle mouse entering/leaving the window
        document.addEventListener('mouseenter', this.onMouseEnter.bind(this), { passive: true });
        document.addEventListener('mouseleave', this.onMouseLeave.bind(this), { passive: true });
        
        // Handle mouse clicks
        document.addEventListener('mousedown', this.onMouseDown.bind(this), { passive: true });
        document.addEventListener('mouseup', this.onMouseUp.bind(this), { passive: true });
        
        // Add hover effects for interactive elements
        this.addHoverEffects();
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.hideCursor();
            } else {
                this.showCursor();
            }
        }, { passive: true });
    }
    
    addHoverEffects() {
        // Use event delegation for better performance
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            
            // Check if the target is an interactive element
            if (target.matches('a, button, .btn, input, textarea, select, .card, .service-card, .team-member, .portfolio-item, .faq-question, .nav-link, .social-icon, [data-cursor="pointer"]')) {
                this.onElementHover(target);
            }
        }, { passive: true });
        
        document.addEventListener('mouseout', (e) => {
            const target = e.target;
            
            // Check if the target is an interactive element
            if (target.matches('a, button, .btn, input, textarea, select, .card, .service-card, .team-member, .portfolio-item, .faq-question, .nav-link, .social-icon, [data-cursor="pointer"]')) {
                this.onElementLeave();
            }
        }, { passive: true });
    }
    
    onMouseMove(e) {
        // Store mouse position globally for initial positioning
        window.mouseX = e.clientX;
        window.mouseY = e.clientY;
        
        // Update cursor position
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Ensure cursor is visible when mouse moves
        if (!this.isVisible) {
            this.showCursor();
        }
    }
    
    onMouseEnter() {
        this.showCursor();
    }
    
    onMouseLeave() {
        this.hideCursor();
    }
    
    onMouseDown() {
        // Add active state
        this.isActive = true;
        
        // Only add class if element exists
        // Note: cursor-dot element has been removed from the design
        if (this.cursorOutline) this.cursorOutline.classList.add('active');
        if (this.cursorRing) this.cursorRing.classList.add('active');
    }
    
    onMouseUp() {
        // Remove active state
        this.isActive = false;
        
        // Note: cursor-dot element has been removed from the design
        if (this.cursorOutline) this.cursorOutline.classList.remove('active');
        if (this.cursorRing) this.cursorRing.classList.remove('active');
    }
    
    onElementHover(element) {
        // Add hovering state
        this.isHovering = true;
        
        // Get custom cursor attributes if available
        const cursorType = element.getAttribute('data-cursor-type') || 'pointer';
        const cursorText = element.getAttribute('data-cursor-text') || '';
        
        // Add hover class to cursor elements
        // Note: cursor-dot element has been removed from the design
        if (this.cursorOutline) this.cursorOutline.classList.add('hover', `cursor-${cursorType}`);
        if (this.cursorRing) this.cursorRing.classList.add('hover', `cursor-${cursorType}`);
        
        // Add text if specified
        if (cursorText && this.cursorOutline) {
            this.cursorOutline.setAttribute('data-text', cursorText);
            this.cursorOutline.classList.add('has-text');
        }
    }
    
    onElementLeave() {
        // Remove hovering state
        this.isHovering = false;
        
        // Remove all hover-related classes
        // Note: cursor-dot element has been removed from the design
        
        if (this.cursorOutline) {
            this.cursorOutline.className = 'cursor-outline';
            if (this.isActive) this.cursorOutline.classList.add('active');
            this.cursorOutline.removeAttribute('data-text');
        }
        
        if (this.cursorRing) {
            this.cursorRing.className = 'cursor-ring';
            if (this.isActive) this.cursorRing.classList.add('active');
        }
    }
    
    showCursor() {
        this.isVisible = true;
        
        // Note: cursor-dot element has been removed from the design
        if (this.cursorOutline) this.cursorOutline.style.opacity = '1';
        if (this.cursorRing) this.cursorRing.style.opacity = '1';
    }
    
    hideCursor() {
        this.isVisible = false;
        
        // Note: cursor-dot element has been removed from the design
        if (this.cursorOutline) this.cursorOutline.style.opacity = '0';
        if (this.cursorRing) this.cursorRing.style.opacity = '0';
    }
    
    update(currentTime) {
        // Calculate delta time for frame-rate independent animation
        if (!this.lastFrameTime) this.lastFrameTime = currentTime;
        const deltaTime = (currentTime - this.lastFrameTime) / 16.67; // Normalize to 60fps
        this.lastFrameTime = currentTime;
        
        // Calculate smooth movement using linear interpolation (lerp)
        if (this.isVisible) {
            // We still track cursor position for internal calculations
            // even though the cursor-dot element has been removed
            this.cursorX = this.mouseX;
            this.cursorY = this.mouseY;
            
            // Update outline position (smooth follow) with delta time adjustment
            const outlineSpeedAdjusted = Math.min(1, this.outlineSpeed * deltaTime);
            this.outlineX += (this.mouseX - this.outlineX) * outlineSpeedAdjusted;
            this.outlineY += (this.mouseY - this.outlineY) * outlineSpeedAdjusted;
            
            // Update ring position (even smoother follow for trailing effect)
            const ringSpeedAdjusted = Math.min(1, this.ringSpeed * deltaTime);
            this.ringX += (this.mouseX - this.ringX) * ringSpeedAdjusted;
            this.ringY += (this.mouseY - this.ringY) * ringSpeedAdjusted;
            
            // Apply positions using transform with translateX/Y for better performance
            // Note: cursor-dot element has been removed from the design
            
            if (this.cursorOutline) {
                this.cursorOutline.style.transform = `translate3d(${this.outlineX}px, ${this.outlineY}px, 0) translate(-50%, -50%)`;
            }
            
            if (this.cursorRing) {
                this.cursorRing.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
            }
        }
        
        // Continue animation loop with high priority
        requestAnimationFrame(this.update.bind(this));
    }
}

// Initialize cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor instance
    window.customCursor = new CustomCursor();
});