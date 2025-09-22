# Personal Portfolio Website - Boril Koralski

This is a modern, static HTML/CSS/JavaScript personal portfolio website deployed via GitHub Pages. The site features a dark theme with animated geometric background and smooth section navigation.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- No build process required - this is a static website that serves files directly
- Run `python3 -m http.server 8000` to serve the site locally for development and testing
- NEVER CANCEL the server - let it run in the background for testing
- Access the site at `http://localhost:8000` during development

### File Structure and Key Components
```
.
├── index.html          # Main HTML file with all content
├── css/style.css       # All styling and animations
├── js/main.js         # JavaScript for navigation and blog functionality
├── CNAME              # Custom domain configuration (1.www.koralski.works)
└── .github/           # GitHub configuration (created by this instruction)
```

### Development Workflow
- Make changes to HTML, CSS, or JavaScript files directly
- Test changes using `python3 -m http.server 8000` - server starts in ~1 second
- Navigate to sections (HOME, BLOG, CONTACT) to test functionality
- ALWAYS test the "Read More" blog functionality after JavaScript changes
- The site uses GitHub Pages for deployment - changes pushed to main branch are automatically deployed

### Validation and Testing
- JavaScript syntax validation: `node -c js/main.js` - takes ~1 second
- ALWAYS validate JavaScript syntax after making changes to js/main.js
- ALWAYS manually test all three navigation sections: HOME, BLOG, CONTACT
- ALWAYS test the "Read More" blog post functionality (should show an alert dialog)
- Test the website in a browser to ensure:
  - Navigation between sections works smoothly
  - Animated geometric background displays correctly
  - Blog posts load and "Read More" buttons function
  - Contact information displays properly
  - Site is responsive on different screen sizes

## Common Tasks

### Testing the Complete Website
1. Start local server: `python3 -m http.server 8000`
2. Navigate to `http://localhost:8000`
3. Test navigation: Click HOME, BLOG, CONTACT in the top navigation
4. Test blog functionality: Click "Read More" on any blog post (should show alert)
5. Verify animations and styling are working correctly

### Adding New Blog Posts
- Edit the `blogPosts` array at the top of `js/main.js`
- Add new post objects with: title, date, excerpt, content, slug
- Format: `{ title: "Post Title", date: "YYYY-MM-DD", excerpt: "Brief description", content: "Full content", slug: "url-friendly-name" }`
- Posts are automatically sorted by date (newest first)

### Modifying Styling
- All styles are in `css/style.css`
- Uses CSS animations for geometric shapes and fade effects
- Dark theme with green accent color (#00ff88)
- Responsive design with mobile breakpoints at 768px

### JavaScript Functionality
- Main app class: `PortfolioApp` handles navigation and blog loading
- Navigation switching between HOME, BLOG, CONTACT sections
- Blog post management and display
- Intersection Observer for scroll animations
- Performance optimizations for mobile devices

## Validation Requirements

### Before Committing Changes
- Run `node -c js/main.js` to validate JavaScript syntax
- Start local server and manually test all three sections
- Test blog "Read More" functionality 
- Ensure navigation works smoothly between sections
- Verify no console errors in browser developer tools (except Google Fonts loading errors which are expected)

### Manual Testing Scenarios
ALWAYS perform these complete user scenarios after making changes:
1. **Home Section**: Verify personal information displays correctly (age, location, university, field)
2. **Blog Section**: Confirm blog posts load, dates format correctly, and "Read More" shows alert dialog
3. **Contact Section**: Check email, GitHub links, and location information are accurate
4. **Navigation**: Test clicking between all three sections using top navigation
5. **Animations**: Confirm geometric background shapes animate and page transitions are smooth

## Important Details

### Timing Expectations
- Local server startup: ~1 second - NEVER CANCEL
- JavaScript validation: ~1 second
- Site loading in browser: ~2-3 seconds (includes font loading)
- No build process or compilation required

### GitHub Pages Deployment
- Site automatically deploys when changes are pushed to main branch
- Custom domain: 1.www.koralski.works (configured via CNAME file)
- No special build configuration needed - GitHub Pages serves static files directly

### Known Issues and Limitations
- Google Fonts may fail to load in some testing environments (shows console error but doesn't break functionality)
- "Read More" blog functionality currently shows placeholder alert - can be extended for full blog post viewing

### Key File Contents
The following are common file contents to reference quickly:

#### index.html structure
- Single-page application with three main sections: home-content, blog-content, contact-content
- Uses semantic HTML with proper meta tags and accessibility features
- Includes navigation, animated background, and content containers

#### css/style.css features
- Dark theme with animated geometric shapes
- Smooth transitions and fade animations
- Responsive grid layouts for content
- CSS custom properties for consistent styling

#### js/main.js structure
- PortfolioApp class managing all functionality
- Blog post data array at the top of file
- Navigation, animations, and blog post management
- Global portfolioApp instance for browser console access

### Development Best Practices
- Keep the dark aesthetic and green accent color (#00ff88)
- Maintain responsive design principles
- Use semantic HTML elements
- Follow existing animation and transition patterns
- Test changes across different viewport sizes
- Preserve existing functionality while adding new features