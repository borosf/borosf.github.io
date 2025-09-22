# Boril Koralski Portfolio Website

This is a static portfolio website built with pure HTML5, CSS3, and vanilla JavaScript. The site showcases Boril Koralski's personal portfolio with home, blog, and contact sections, deployed on GitHub Pages with a custom domain.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Quick Setup and Development
- No build process required - this is a pure static website
- **Local development server**: `python3 -m http.server 8000` - starts instantly (< 2 seconds)
- **Access the site**: Open `http://localhost:8000` in a browser
- **File structure**: 
  - `index.html` - Main portfolio page (single-page application)
  - `css/style.css` - All styling and responsive design
  - `js/main.js` - Navigation, blog management, and animations
  - `CNAME` - GitHub Pages custom domain configuration

### Testing and Validation
- **NEVER CANCEL**: No long-running builds or tests - everything is instant
- **Manual testing required**: Always test the website by opening it in a browser
- **Test all navigation**: Click HOME, BLOG, and CONTACT sections to verify smooth transitions
- **Test responsiveness**: Resize browser window to test mobile/tablet layouts
- **Validate JavaScript**: Check browser console for any errors (F12 developer tools)

## Validation Scenarios

**CRITICAL**: After making any changes, ALWAYS run through these complete validation scenarios:

### Complete User Journey Testing
1. **Start local server**: `python3 -m http.server 8000`
2. **Open website**: Navigate to `http://localhost:8000`
3. **Test navigation flow**:
   - Start on HOME section (default)
   - Click BLOG - verify smooth transition and blog posts display
   - Click CONTACT - verify contact information displays correctly
   - Click HOME - verify return to home section works
4. **Test responsive design**: Resize browser to mobile width (< 768px) and repeat navigation
5. **Test keyboard navigation**: Use arrow keys to navigate between sections (ArrowUp/ArrowLeft for previous, ArrowDown/ArrowRight for next)
6. **Test external links**: Verify email and GitHub links work correctly
7. **Check console**: Ensure no JavaScript errors appear in browser console (F12 developer tools)
8. **Validate JavaScript**: Run `node -c js/main.js` to check for syntax errors

### Code Quality Validation
- **No linting tools** - manually review code for consistency with existing style
- **No automated tests** - manual testing is the primary validation method
- **HTML validation**: Ensure proper HTML5 semantic structure
- **CSS validation**: Check for responsive design and animation consistency
- **JavaScript validation**: Verify no console errors and smooth functionality

## Common Development Tasks

### Adding Blog Posts
Edit `js/main.js` and add new entries to the `blogPosts` array:
```javascript
{
    title: "Your Post Title",
    date: "YYYY-MM-DD",
    excerpt: "Brief description of the post...",
    content: "Full content (optional)",
    slug: "url-friendly-slug"
}
```

### Modifying Styles
- Edit `css/style.css` for visual changes
- **Test animations**: The site uses CSS animations - verify they work smoothly
- **Test responsive breakpoints**: 768px (tablet) and 480px (mobile)

### JavaScript Changes
- Edit `js/main.js` for functionality changes
- **Main class**: `PortfolioApp` handles all site functionality
- **Key methods**: `setupNavigation()`, `switchSection()`, `loadBlogPosts()`

## Deployment Information

### GitHub Pages Setup
- **Deployment**: Automatic via GitHub Pages from main branch
- **Custom domain**: Configured via `CNAME` file (koralski.works)
- **No build step**: Direct deployment of static files
- **Deploy time**: Instant (< 1 minute) after push to main branch

### File Management
- **Keep files minimal**: Only commit source files, no build artifacts
- **Images**: Store in root or create `images/` directory if needed
- **External dependencies**: Uses Google Fonts CDN, no local dependencies

## Troubleshooting

### Common Issues
- **Fonts not loading**: External Google Fonts may be blocked in some environments
- **Navigation not working**: Check JavaScript console for errors in `main.js`. Use `node -c js/main.js` to validate JavaScript syntax.
- **Responsive issues**: Test CSS media queries at different screen sizes
- **GitHub Pages not updating**: Check repository Settings > Pages configuration
- **JavaScript syntax errors**: Always validate with `node -c js/main.js` before testing. The repository had syntax issues that have been fixed.

### Code Quality Checks
- **JavaScript validation**: Run `node -c js/main.js` to check for syntax errors
- **No automated linting**: Manually review code for consistency
- **Browser console**: Always check for runtime errors when testing

### Development Environment
- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Server**: Python's built-in HTTP server works perfectly
- **No dependencies**: No npm, pip, or other package managers needed
- **No build tools**: No webpack, gulp, or other build systems

## Important File Locations

### Frequently Modified Files
- `js/main.js` - Lines 1-18: Blog posts data array
- `js/main.js` - Lines 34-84: Navigation setup and section switching
- `css/style.css` - Lines 127-200: Animations and responsive design
- `index.html` - Lines 96-149: Contact information and navigation structure

### Configuration Files
- `CNAME` - Custom domain configuration for GitHub Pages
- `.github/copilot-instructions.md` - This file

## Performance Notes

### Timing Expectations
- **Server startup**: Instant (< 2 seconds)
- **Page load**: Instant (static files)
- **Navigation**: Smooth CSS transitions (0.4s)
- **No waiting required**: All operations complete immediately

### Optimization
- **Images**: Optimize any images before adding (use WebP when possible)
- **CSS**: Already optimized with performance considerations
- **JavaScript**: Minimal and optimized for performance
- **Fonts**: Preconnected to Google Fonts for faster loading

## Content Guidelines

### Personal Information
- **Contact details**: Update in `index.html` contact section
- **Professional info**: Update in `index.html` home section
- **Social links**: Currently includes GitHub, email

### Blog Content
- **Content strategy**: Focus on FOSS advocacy, finance, and technology
- **Example topics**: Open source finance, right to repair, digital applications
- **Tone**: Professional, informative, advocacy-focused

Remember: This is a showcase portfolio website that should reflect high quality, clean design, and smooth user experience. Always test thoroughly and maintain the minimalist, professional aesthetic.