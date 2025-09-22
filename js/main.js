/**
 * Portfolio Website - Main JavaScript Module
 * 
 * This module handles all interactive functionality for the portfolio website
 * including navigation, accessibility features, animations, and performance optimizations.
 * 
 * Key Features:
 * - Accessible navigation with keyboard support
 * - Section switching with smooth transitions
 * - Dynamic blog post loading
 * - Performance optimizations for animations
 * - Screen reader compatibility
 * 
 * @author Boril Koralski
 * @version 2.0
 */

// Blog posts data - Add your posts here
const blogPosts = [
    {
        title: "The Future of Open Source Finance",
        date: "2024-01-15",
        excerpt: "Exploring how FOSS principles are revolutionizing the financial sector and creating more transparent, accessible financial tools for everyone.",
        content: "Your full blog post content goes here...", // Optional: for full post view
        slug: "future-of-open-source-finance" // Optional: for URL routing
    },
    {
        title: "Right to Repair in Digital Age",
        date: "2024-01-10",
        excerpt: "Why device longevity matters more than ever in our digital economy, and how the right to repair movement is shaping sustainable technology practices.",
        content: "Your full blog post content goes here...",
        slug: "right-to-repair-digital-age"
    }
    // Add more posts here as needed
];

/**
 * Main Portfolio Application Class
 * 
 * Handles all website functionality including navigation, animations,
 * accessibility features, and performance optimizations.
 */
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    /**
     * Initialize the application
     * Sets up navigation, animations, blog posts, and performance optimizations
     */
    init() {
        this.setupNavigation();
        this.initializeAnimations();
        this.loadBlogPosts();
        this.optimizePerformance();
    }

    /**
     * Set up navigation functionality
     * 
     * Handles both top navigation and navigation dots with full accessibility support
     * including keyboard navigation, focus management, and ARIA attributes
     */
    setupNavigation() {
        // Top navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.switchSection(section);
            });
        });

        // Side navigation dots - Enhanced accessibility
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            // Click event
            dot.addEventListener('click', () => {
                const section = dot.getAttribute('data-section');
                this.switchSection(section);
            });

            // Keyboard support for dots
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const section = dot.getAttribute('data-section');
                    this.switchSection(section);
                }
            });

            // Focus management
            dot.addEventListener('focus', () => {
                dot.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
                dot.style.outlineOffset = '2px';
            });

            dot.addEventListener('blur', () => {
                dot.style.outline = 'none';
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const sections = ['home', 'blog', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            switch(e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        this.switchSection(sections[currentIndex - 1]);
                    }
                    break;
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentIndex < sections.length - 1) {
                        this.switchSection(sections[currentIndex + 1]);
                    }
                    break;
            }
        });
    }

    /**
     * Switch between different sections (home, blog, contact)
     * 
     * Handles smooth transitions, accessibility announcements, focus management,
     * and updates navigation states and page titles
     * 
     * @param {string} section - The section to switch to ('home', 'blog', 'contact')
     */
    switchSection(section) {
        if (section === this.currentSection) return;

        // Update navigation states with accessibility attributes
        document.querySelectorAll('.nav-link').forEach(link => {
            const isActive = link.getAttribute('href') === `#${section}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        document.querySelectorAll('.dot').forEach(dot => {
            const isActive = dot.getAttribute('data-section') === section;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-pressed', isActive.toString());
        });

        // Update page title for screen readers
        const sectionTitles = {
            'home': 'Home - Boril Koralski | Portfolio',
            'blog': 'Blog - Boril Koralski | Portfolio', 
            'contact': 'Contact - Boril Koralski | Portfolio'
        };
        document.title = sectionTitles[section] || 'Boril Koralski | Portfolio';

        // Switch content with smooth transition
        const currentContent = document.getElementById(`${this.currentSection}-content`);
        const targetContent = document.getElementById(`${section}-content`);

        if (currentContent && targetContent) {
            // Accessibility: announce section change
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Navigated to ${section} section`;
            document.body.appendChild(announcement);

            currentContent.style.transform = 'scale(0.95)';
            currentContent.style.opacity = '0';
            
            setTimeout(() => {
                currentContent.classList.add('hidden');
                targetContent.classList.remove('hidden');
                
                // Reset and animate new content
                requestAnimationFrame(() => {
                    targetContent.style.transform = 'scale(1)';
                    targetContent.style.opacity = '1';
                    
                    // Focus management - focus the main element
                    targetContent.focus();
                    
                    // Remove announcement after a delay
                    setTimeout(() => {
                        document.body.removeChild(announcement);
                    }, 1000);
                });
            }, 200);
        }

        this.currentSection = section;
    }

    /**
     * Load and display blog posts dynamically
     * 
     * Sorts posts by date, generates accessible HTML with proper ARIA labels,
     * and handles the case when no posts are available
     */
    loadBlogPosts() {
        const blogPostsContainer = document.getElementById('blog-posts');
        const blogPlaceholder = document.getElementById('blog-placeholder');
        
        if (blogPosts.length === 0) {
            // Show placeholder if no posts
            blogPostsContainer.style.display = 'none';
            blogPlaceholder.style.display = 'block';
            return;
        }

        // Hide placeholder and show posts
        blogPlaceholder.style.display = 'none';
        blogPostsContainer.style.display = 'block';

        // Sort posts by date (newest first)
        const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Generate HTML for posts with enhanced accessibility and security
        const postsHTML = sortedPosts.map(post => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Escape HTML to prevent XSS attacks
            const escapeHtml = (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };

            const safeTitle = escapeHtml(post.title);
            const safeExcerpt = escapeHtml(post.excerpt);
            const safeSlug = escapeHtml(post.slug || post.title);

            return `
                <article class="blog-post" data-date="${post.date}">
                    <h3 class="post-title">${safeTitle}</h3>
                    <p class="post-date"><time datetime="${post.date}">${formattedDate}</time></p>
                    <p class="post-excerpt">${safeExcerpt}</p>
                    <a href="#" class="read-more" onclick="portfolioApp.openPost('${safeSlug}')" aria-label="Read more about ${safeTitle}">Read More</a>
                </article>
            `;
        }).join('');

        blogPostsContainer.innerHTML = postsHTML;
    }

    /**
     * Handle opening individual blog posts
     * 
     * @param {string} slug - The slug or identifier of the post to open
     */
    openPost(slug) {
        // This function handles opening individual blog posts
        // You can implement this to show full post content or redirect to a dedicated post page
        console.log('Opening post:', slug);
        
        // Example: You could implement a modal or navigate to a separate page
        // For now, this just logs the action
        alert('Blog post functionality - you can implement full post viewing here!');
    }

    /**
     * Initialize scroll-based animations using Intersection Observer
     * 
     * Provides smooth fade-in animations for content elements with accessibility considerations
     */
    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up');
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });

        document.querySelectorAll('.info-item').forEach(item => {
            observer.observe(item);
        });
    }

    /**
     * Optimize performance for better user experience
     * 
     * Includes accessibility features for reduced motion preferences,
     * responsive optimizations, and efficient resize handling
     */
    optimizePerformance() {
        // Reduce motion for accessibility
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        }

        // Optimize geometric shapes on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.optimizeShapes();
            }, 150);
        });

        // Initial shape optimization
        this.optimizeShapes();
    }

    /**
     * Optimize geometric shapes for performance
     * 
     * Adjusts animation duration and opacity based on screen size
     * to improve performance on mobile devices
     */
    optimizeShapes() {
        const shapes = document.querySelectorAll('.shape');
        const isMobile = window.innerWidth <= 768;
        
        shapes.forEach(shape => {
            if (isMobile) {
                shape.style.animationDuration = '16s';
                shape.style.opacity = '0.03';
            } else {
                shape.style.animationDuration = '12s';
                shape.style.opacity = '0.05';
            }
        });
    }

    /**
     * Add a new blog post dynamically
     * 
     * @param {Object} post - Post object with title, excerpt, content, and slug
     */
    addBlogPost(post) {
        blogPosts.unshift(post); // Add to beginning of array
        this.loadBlogPosts(); // Reload the blog posts
    }

    /**
     * Remove a blog post by slug
     * 
     * @param {string} slug - The slug or title of the post to remove
     */
    removeBlogPost(slug) {
        const index = blogPosts.findIndex(post => (post.slug || post.title) === slug);
        if (index > -1) {
            blogPosts.splice(index, 1);
            this.loadBlogPosts();
        }
    }
}

// Global variable to access the app instance
let portfolioApp;

/**
 * Initialize application when DOM is ready
 * 
 * Handles both scenarios: DOM already loaded or still loading
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        portfolioApp = new PortfolioApp();
    });
} else {
    portfolioApp = new PortfolioApp();
}

/**
 * Performance optimization: Fade in body when page is fully loaded
 * This prevents flash of unstyled content (FOUC)
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== UTILITY FUNCTIONS FOR BLOG MANAGEMENT =====

/**
 * Add a new blog post (can be called from browser console or integrated into workflow)
 * 
 * @param {string} title - The title of the blog post
 * @param {string} excerpt - Short description/excerpt
 * @param {string} content - Full blog post content (optional)
 * @param {string} slug - URL-friendly identifier (optional, auto-generated if not provided)
 */
function addNewPost(title, excerpt, content = '', slug = '') {
    const today = new Date().toISOString().split('T')[0];
    const newPost = {
        title: title,
        date: today,
        excerpt: excerpt,
        content: content,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    
    portfolioApp.addBlogPost(newPost);
    console.log('New post added:', newPost);
}

/**
 * Remove a blog post by slug
 * 
 * @param {string} slug - The slug or identifier of the post to remove
 */
function removePost(slug) {
    portfolioApp.removeBlogPost(slug);
    console.log('Post removed:', slug);
}
