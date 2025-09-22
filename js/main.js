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
    }

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

        // Side navigation dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const section = dot.getAttribute('data-section');
                this.switchSection(section);
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

    switchSection(section) {
        if (section === this.currentSection) return;

        // Update navigation states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${section}`);
        });

        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-section') === section);
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
            }, 200);
        }

        this.currentSection = section;
    }

    loadBlogPosts() {
        const blogPostsContainer = document.getElementById('blog-posts');
        const blogPlaceholder = document.getElementById('blog-placeholder');
        
        if (blogPosts.length === 0) {
            // Show placeholder if no posts
            blogPlaceholder.style.display = 'block';
            return;
        }

        // Generate blog posts HTML
        const postsHTML = blogPosts.map(post => `
            <article class="blog-post" data-date="${post.date}">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-date">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more" data-slug="${post.slug}">Read More</a>
            </article>
        `).join('');
        
        blogPostsContainer.innerHTML = postsHTML;
    }

    openPost(slug) {
        // This function handles opening individual blog posts
        // You can implement this to show full post content or redirect to a dedicated post page
        console.log('Opening post:', slug);
        
        // Example: You could implement a modal or navigate to a separate page
        // For now, this just logs the action
        alert('Blog post functionality - you can implement full post viewing here!');
    }

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

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        portfolioApp = new PortfolioApp();
    });
} else {
    portfolioApp = new PortfolioApp();
}

// Preload optimization
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Helper functions for blog management
// You can call these from the browser console or integrate them into your workflow

// Example: Add a new blog post
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

// Example usage (call this in browser console):
// addNewPost("My New Blog Post", "This is the excerpt for my new post", "Full content here", "my-new-post");

// Example: Remove a blog post
function removePost(slug) {
    portfolioApp.removeBlogPost(slug);
    console.log('Post removed:', slug);
}
