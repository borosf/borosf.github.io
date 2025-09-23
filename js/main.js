// Blog posts data - Add your posts here
const blogPosts = [
  ...
];

// Optimized and streamlined JavaScript
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        // Switch immediately based on the URL hash, before anything else
        const initial = (window.location.hash || '').replace('#', '');
        if (['home', 'contact'].includes(initial)) {
            this.setInitialSection(initial);
        }

        this.setupNavigation();
        this.initializeAnimations();
        this.loadBlogPosts();
        this.optimizePerformance();

        // Handle deep links like /index.html#contact after load and when hash changes
        this.handleHashNavigation();
        window.addEventListener('hashchange', () => this.handleHashNavigation());
    }

    // Instantly render the correct section on first paint (no transition delay)
    setInitialSection(section) {
        const current = document.getElementById(`${this.currentSection}-content`);
        const target = document.getElementById(`${section}-content`);
        if (current && target) {
            current.classList.add('hidden');
            target.classList.remove('hidden');
        }

        // Update nav states
        document.querySelectorAll('.nav-link').forEach(link => {
            const isActive = link.getAttribute('href') === `#${section}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        // Update dot states
        document.querySelectorAll('.dot').forEach(dot => {
            const isActive = dot.getAttribute('data-section') === section;
            dot.classList.toggle('active', isActive);
            if (isActive) {
                dot.setAttribute('aria-current', 'page');
            } else {
                dot.removeAttribute('aria-current');
            }
        });

        this.currentSection = section;
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

        // Side navigation dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const section = dot.getAttribute('data-section');
                this.switchSection(section);
            });

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

            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) this.switchSection(sections[currentIndex - 1]);
                    break;
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentIndex < sections.length - 1) this.switchSection(sections[currentIndex + 1]);
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
            setTimeout(() => {
                this.switchSection(hash);
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

                requestAnimationFrame(() => {
                    targetContent.style.transform = 'scale(1)';
                    targetContent.style.opacity = '1';
                });

                this.announceToScreenReader(`Switched to ${section} section`);
            }, 200);
        }

        this.currentSection = section;
    }

    loadBlogPosts() { ... }
    escapeHtml(text) { ... }
    announceToScreenReader(message) { ... }
    openPost(slug) { ... }
    initializeAnimations() { ... }
    optimizePerformance() { ... }
    preloadCriticalResources() { ... }
    optimizeShapes() { ... }
    addBlogPost(post) { ... }
    removeBlogPost(slug) { ... }
}

// Global initialization
let portfolioApp;
function initializeApp() {
    try {
        portfolioApp = new PortfolioApp();
        console.log('Portfolio app initialized successfully');
    } catch (error) {
        console.error('Failed to initialize portfolio app:', error);
        document.body.classList.add('app-init-failed');
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
window.addEventListener('load', () => {
    try {
        document.body.classList.add('loaded');
        console.log('Page load optimization completed');
    } catch (error) {
        document.body.style.opacity = '1';
    }
});

// Helper functions for blog management ...
