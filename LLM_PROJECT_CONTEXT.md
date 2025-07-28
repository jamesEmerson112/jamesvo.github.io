# LLM Project Context: James Vo's Personal Website

## Project Overview
This is James Vo's personal website repository hosted on GitHub Pages. It's a modern Svelte-based web application with automated deployment via GitHub Actions.

**Repository**: `jamesEmerson112/jamesvo.github.io.git`
**Live URL**: `https://jamesemerson112.github.io/` (GitHub Pages standard URL)
**Project Type**: Personal portfolio/website
**Current Status**: Basic "Hello World" implementation ready for expansion

## Technology Stack & Architecture

### Frontend
- **Framework**: Svelte 4.2.0
- **Build Tool**: Vite 5.0.0
- **Language**: JavaScript (ES Modules)
- **Styling**: Component-scoped CSS with global styles

### Deployment & CI/CD
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions workflow
- **Build Output**: `dist/` directory (automatically generated)
- **Deployment Trigger**: Push to `main` branch or manual workflow dispatch

## File Structure Analysis

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── App.svelte             # Main Svelte component
│   └── main.js                # Application entry point
├── index.html                 # HTML template with Vite integration
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── vite.config.js             # Vite configuration
├── .gitignore                 # Git ignore patterns
└── README.md                  # Project documentation
```

## Current Implementation Details

### Main Application (`src/App.svelte`)
- **Content**: Simple "Hello World" greeting with personalized message
- **Styling**:
  - Purple-to-blue gradient background
  - Modern typography (system font stack)
  - Responsive design with mobile breakpoints
  - CSS animations (fade-in, spinning sparkle emoji)
- **Interactivity**: Minimal (just visual animations)

### Build Configuration
- **Development**: `npm run dev` (Vite dev server)
- **Production Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview` (preview production build)

### Deployment Workflow
- **Trigger**: Push to main branch or manual dispatch
- **Process**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (`npm ci`)
  4. Build project (`npm run build`)
  5. Upload `dist/` folder to GitHub Pages
  6. Deploy to live site

## Development Environment Considerations

### Node.js Setup
- **Required Version**: Node.js 20 (as specified in GitHub Actions)
- **Package Manager**: npm (lockfile present)
- **User Environment Note**: Due to nvm conflicts, run `nvm use node` when opening new terminals

### Local Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## LLM-Specific Instructions

### When Working on This Project:

1. **File Editing Preferences**:
   - Use `replace_in_file` for small, targeted changes
   - Use `write_to_file` for major restructuring or new files
   - Always consider the existing CSS animations and styling when making changes

2. **Development Workflow**:
   - Test changes locally using `npm run dev` before deployment
   - The site auto-deploys on push to main, so changes go live immediately
   - Use browser_action tool to visually verify changes when needed

3. **Project Conventions**:
   - Maintain the modern, clean aesthetic
   - Keep responsive design principles
   - Preserve smooth animations and transitions
   - Use semantic HTML and accessible practices

4. **Common Enhancement Tasks**:
   - Adding new sections/pages (portfolio, about, contact)
   - Implementing navigation
   - Adding interactive components
   - Integrating external APIs or services
   - SEO improvements
   - Performance optimizations

5. **Deployment Considerations**:
   - All builds output to `dist/` directory
   - GitHub Pages serves from root of deployed content
   - Assets should use relative paths for proper loading
   - Consider GitHub Pages limitations (static hosting only)

### Project Extension Patterns:

**For Adding New Pages:**
- Consider client-side routing (e.g., svelte-spa-router)
- Maintain consistent styling and animations
- Update navigation structure

**For Portfolio Additions:**
- Create reusable components in `src/components/`
- Use responsive grid layouts
- Implement smooth transitions between sections

**For External Integrations:**
- APIs should be called client-side (no server-side rendering)
- Consider CORS limitations with external services
- Use environment variables for API keys (if needed)

## Current Limitations & Expansion Opportunities

### Limitations:
- Single page application (no routing)
- Static content only
- No backend/database integration
- Limited interactivity

### Ready for Enhancement:
- Portfolio showcase
- Project gallery
- Contact forms (via third-party services)
- Blog/writing section
- Resume/CV display
- Social media integration
- Advanced animations and micro-interactions

## Testing & Quality Assurance

### Manual Testing Checklist:
- [ ] Responsive design across devices
- [ ] Animation performance
- [ ] Load times and optimization
- [ ] Cross-browser compatibility
- [ ] Accessibility compliance
- [ ] SEO meta tags and structure

### Automated Checks:
- Build process validates syntax
- GitHub Actions ensures deployment success
- Consider adding: Lighthouse CI, accessibility testing

## Contact & Ownership

**Owner**: James Vo
**Repository**: Public GitHub repository
**Maintenance**: Active development expected

---

*This document serves as comprehensive context for LLMs working on James Vo's personal website project. Update this file when significant changes are made to project structure or development practices.*
