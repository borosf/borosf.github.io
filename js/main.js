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

// Optimized and streamlined JavaScript
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.initializeAnimations();
        this.loadBlogPosts();
        this.optimizePerformance();

        // Handle deep links like /index.html#contact on load and when hash changes
        this.handleHashNavigation();
        window.addEventListener('hashchange', () => this.handleHashNavigation());
    }

    setupNavigation() {
        // Top navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only prevent default for hash links (contact)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const section = href.substring(1);
                    this.switchSection(section);
                }
                // Let regular links (/, /blog.html) work normally
            });
        });

        // Side navigation dots (now buttons)
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const section = dot.getAttribute('data-section');
                this.switchSection(section);
            });
            
            // Add keyboard support for Enter and Space
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const section = dot.getAttribute('data-section');
                    this.switchSection(section);
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const sections = ['home', 'contact'];
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

    // Deep-link handling for #home and #contact
    handleHashNavigation() {
        try {
            const raw = window.location.hash || '';
            const hash = raw.startsWith('#') ? raw.slice(1) : raw;
            if (!hash) return;

            const allowed = ['home', 'contact'];
            if (!allowed.includes(hash)) return;

            // Switch to the requested section and then scroll to it
            // Use a short delay to ensure DOM and transitions are ready
            setTimeout(() => {
                this.switchSection(hash);
                // After the transition starts, give it a moment before scrolling
                setTimeout(() => {
                    const target = document.getElementById(`${hash}-content`) || document.getElementById(hash);
                    if (target && typeof target.scrollIntoView === 'function') {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 250);
            }, 0);
        } catch {
            // no-op
        }
    }

    switchSection(section) {
        if (section === this.currentSection) return;

        // Update navigation states
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
            if (isActive) {
                dot.setAttribute('aria-current', 'page');
            } else {
                dot.removeAttribute('aria-current');
            }
        });

        // Switch content with smooth transition
        const currentContent = document.getElementById(`${this.currentSection}-content`);
        const targetContent = document.getElementById(`${section}-content`);

        if (currentContent && targetContent) {
            currentContent.style.transform = 'scale(0.95)';
            currentContent.style.opacity = '0';
            
            setTimeout(() => {
                currentContent.classList.add('hidden');
                targetContent.classList.remove('hidden');
                
                // Reset and animate new content
                requestAnimationFrame(() => {
                    targetContent.style.transform = 'scale(1)';
                    targetContent.style.opacity = '1';
                });
                
                // Announce section change to screen readers
                this.announceToScreenReader(`Switched to ${section} section`);
            }, 200);
        }

        this.currentSection = section;
    }

    loadBlogPosts() {
        const blogPostsContainer = document.getElementById('blog-posts');
        const blogPlaceholder = document.getElementById('blog-placeholder');
        
        // Error handling for missing elements
        if (!blogPostsContainer) {
            // Not a page with a blog list
            return;
        }
        
        if (blogPosts.length === 0) {
            // Show placeholder if no posts
            blogPostsContainer.style.display = 'none';
            if (blogPlaceholder) {
                blogPlaceholder.style.display = 'block';
            }
            return;
        }

        // Hide placeholder and show posts
        if (blogPlaceholder) {
            blogPlaceholder.style.display = 'none';
        }
        blogPostsContainer.style.display = 'block';

        // Sort posts by date (newest first)
        const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Generate HTML for posts (link to per-post pages)
        const postsHTML = sortedPosts.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const safeTitle = this.escapeHtml(post.title);
            const safeExcerpt = this.escapeHtml(post.excerpt);
            const safeSlug = this.escapeHtml(post.slug || post.title);

            return `
                <article class="blog-post card" data-date="${post.date}">
                    <h3 class="post-title">${safeTitle}</h3>
                    <p class="post-date"><time datetime="${post.date}">${formattedDate}</time></p>
                    <p class="post-excerpt" id="post-${index + 1}-excerpt">${safeExcerpt}</p>
                    <a href="/blog/${safeSlug}/" class="read-more interactive-link" aria-describedby="post-${index + 1}-excerpt">Read More</a>
                </article>
            `;
        }).join('');

        blogPostsContainer.innerHTML = postsHTML;
    }

    // Helper method to escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Screen reader announcement helper
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // For backward compatibility if called from elsewhere
    openPost(slug) {
        try {
            const safeSlug = String(slug || '').toLowerCase().replace(/[^a-z0-9\-]+/g, '-');
            if (safeSlug) {
                window.location.href = `/blog/${safeSlug}/`;
            } else {
                console.warn('Invalid slug:', slug);
            }
        } catch (error) {
            console.error('Error opening post:', error);
            alert('An error occurred while trying to open the blog post.');
        }
    }

    initializeAnimations() {
        try {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-up');
                    }
                });
            }, { threshold: 0.1, rootMargin: '50px' });

            const elementsToObserve = document.querySelectorAll('.info-item, .blog-post, .contact-item');
            elementsToObserve.forEach(item => {
                observer.observe(item);
            });
        } catch (error) {
            // Fallback: Add fade-up class immediately
            document.querySelectorAll('.info-item, .blog-post, .contact-item').forEach(item => {
                item.classList.add('fade-up');
            });
        }
    }

    optimizePerformance() {
        try {
            // Reduce motion for accessibility
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01s');
                
                // Disable shape animations for motion-sensitive users
                const shapes = document.querySelectorAll('.shape');
                shapes.forEach(shape => {
                    shape.style.animation = 'none';
                });
            }

            // Optimize geometric shapes on resize with debouncing
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.optimizeShapes();
                }, 150);
            });

            // Initial shape optimization
            this.optimizeShapes();
            
            // Preload critical resources
            this.preloadCriticalResources();
            
        } catch (error) {
            // swallow
        }
    }

    preloadCriticalResources() {
        // Placeholder for future resource preloading
        const criticalResources = [];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.url;
            link.as = resource.type;
            document.head.appendChild(link);
        });
    }

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

    // Method to add new blog posts dynamically
    addBlogPost(post) {
        blogPosts.unshift(post); // Add to beginning of array
        this.loadBlogPosts(); // Reload the blog posts
    }

    // Method to remove blog posts
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

// Enhanced initialization with error handling
function initializeApp() {
    try {
        portfolioApp = new PortfolioApp();
        console.log('Portfolio app initialized successfully');
    } catch (error) {
        console.error('Failed to initialize portfolio app:', error);
        // Provide basic fallback functionality
        document.body.classList.add('app-init-failed');
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Preload optimization with error handling
window.addEventListener('load', () => {
    try {
        document.body.classList.add('loaded');
        console.log('Page load optimization completed');
    } catch (error) {
        // Fallback: ensure body is visible
        document.body.style.opacity = '1';
    }
});

// Helper functions for blog management with enhanced error handling
// You can call these from the browser console or integrate them into your workflow

/**
 * Add a new blog post to the portfolio
 * @param {string} title - The title of the blog post
 * @param {string} excerpt - The excerpt/summary of the post
 * @param {string} content - Full content (optional)
 * @param {string} slug - URL slug (optional, will be generated from title if not provided)
 */
function addNewPost(title, excerpt, content = '', slug = '') {
    try {
        if (!title || !excerpt) {
            throw new Error('Title and excerpt are required');
        }
        
        const today = new Date().toISOString().split('T')[0];
        const newPost = {
            title: title.trim(),
            date: today,
            excerpt: excerpt.trim(),
            content: content.trim(),
            slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        };
        
        if (portfolioApp && typeof portfolioApp.addBlogPost === 'function') {
            portfolioApp.addBlogPost(newPost);
            console.log('New post added successfully:', newPost);
            return newPost;
        } else {
            throw new Error('Portfolio app not initialized or addBlogPost method not available');
        }
    } catch (error) {
        console.error('Failed to add new post:', error);
        return null;
    }
}

/**
 * Remove a blog post by slug
 * @param {string} slug - The slug of the post to remove
 */
function removePost(slug) {
    try {
        if (!slug) {
            throw new Error('Slug is required');
        }
        
        if (portfolioApp && typeof portfolioApp.removeBlogPost === 'function') {
            portfolioApp.removeBlogPost(slug);
            console.log('Post removed successfully:', slug);
            return true;
        } else {
            throw new Error('Portfolio app not initialized or removeBlogPost method not available');
        }
    } catch (error) {
        console.error('Failed to remove post:', error);
        return false;
    }
}
