// Smooth loading and performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Setup navigation
    setupNavigation();
    
    // Setup top navigation
    setupTopNavigation();
    
    // Add keyboard navigation
    setupKeyboardNavigation();
    
    // Optimize performance
    optimizePerformance();
});

// Setup top navigation functionality
function setupTopNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contents = document.querySelectorAll('.content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nl => nl.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all content sections
            contents.forEach(content => content.classList.add('hidden'));
            
            // Show selected content
            const targetId = link.getAttribute('href').substring(1) + '-content';
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                setTimeout(() => {
                    targetContent.classList.remove('hidden');
                }, 250);
            }
            
            // Update page transition
            triggerPageTransition();
        });
    });
}

// Initialize fade-up animations for info items
function initializeAnimations() {
    const infoItems = document.querySelectorAll('.info-item');
    
    // Add intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    infoItems.forEach(item => observer.observe(item));
}

// Setup navigation dots functionality
function setupNavigation() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Trigger page transition effect
            triggerPageTransition(index);
        });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const dots = document.querySelectorAll('.dot');
        const activeDot = document.querySelector('.dot.active');
        const activeIndex = Array.from(dots).indexOf(activeDot);
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (activeIndex > 0) {
                    dots[activeIndex].classList.remove('active');
                    dots[activeIndex - 1].classList.add('active');
                    triggerPageTransition(activeIndex - 1);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (activeIndex < dots.length - 1) {
                    dots[activeIndex].classList.remove('active');
                    dots[activeIndex + 1].classList.add('active');
                    triggerPageTransition(activeIndex + 1);
                }
                break;
        }
    });
}

// Page transition effect
function triggerPageTransition(index = null) {
    const activeContent = document.querySelector('.content:not(.hidden)');
    
    if (activeContent) {
        // Add subtle transition effect
        activeContent.style.transform = 'scale(0.98)';
        activeContent.style.opacity = '0.8';
        
        setTimeout(() => {
            activeContent.style.transform = 'scale(1)';
            activeContent.style.opacity = '1';
            
            // Change content based on index (for side navigation)
            if (index !== null) {
                updateContent(index);
            }
        }, 200);
    }
}

// Update content based on navigation (placeholder for future expansion)
function updateContent(index) {
    // This function can be expanded to show different sections
    // For now, it just adds a subtle visual feedback
    const statusText = document.querySelector('.status-text');
    
    switch(index) {
        case 0:
            statusText.textContent = 'AVAILABLE FOR OPPORTUNITIES';
            break;
        case 1:
            statusText.textContent = 'EXPLORING NEW PROJECTS';
            break;
        case 2:
            statusText.textContent = 'CONTINUOUS LEARNING';
            break;
    }
}

// Performance optimizations
function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize optimizations
            optimizeGeometricShapes();
        }, 150);
    });
}

// Optimize geometric shapes for mobile
function optimizeGeometricShapes() {
    const shapes = document.querySelectorAll('.geometric-bg > *');
    const isMobile = window.innerWidth <= 768;
    
    shapes.forEach(shape => {
        if (isMobile) {
            shape.style.animationDuration = '12s';
        } else {
            shape.style.animationDuration = '8s';
        }
    });
}

// Add subtle mouse movement parallax effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateParallax() {
    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;
    
    const shapes = document.querySelectorAll('.geometric-bg > *');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (targetX - window.innerWidth / 2) * speed * 0.01;
        const y = (targetY - window.innerHeight / 2) * speed * 0.01;
        
        shape.style.transform = `translate(${x}px, ${y}px) ${shape.style.transform || ''}`;
    });
    
    requestAnimationFrame(updateParallax);
}

// Only enable parallax on desktop for performance
if (window.innerWidth > 768) {
    requestAnimationFrame(updateParallax);
}

// Add loading optimization
window.addEventListener('load', () => {
    // Mark page as fully loaded
    document.body.classList.add('loaded');
    
    // Preload any additional resources if needed
    preloadResources();
});

function preloadResources() {
    // Preload any additional assets for future sections
    // This keeps the site fast and responsive
}
