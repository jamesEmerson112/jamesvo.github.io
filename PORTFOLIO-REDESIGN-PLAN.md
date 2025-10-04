# PORTFOLIO REDESIGN: LINKEDIN-STYLE LAYOUT
## Implementation Plan - Reorganized

---

## 📋 EXECUTIVE SUMMARY

### What We're Building
Transforming the current metrics-focused portfolio into a professional, recruiter-friendly LinkedIn-style layout that emphasizes personal brand, credentials, and technical expertise.

### Current State → New State

**FROM (Current System):**
```
✅ Working metrics dashboard
├─ Technical focus (code stats, COCOMO)
├─ Language-based spider charts per repo
├─ 20 repos displayed (10 at a time)
└─ Good for: Engineers, technical audiences
```

**TO (LinkedIn-Style Redesign):**
```
🎯 Professional portfolio
├─ Personal brand focus (profile, achievements)
├─ Tech domain spider chart (AI, Web, AR, etc.)
├─ Featured projects showcase
└─ Good for: Recruiters, hiring managers, job seeking
```

### Why This Change?
- **Current system:** Shows technical depth but lacks personal branding
- **Recruiter needs:** Quick assessment of skills, experience, and achievements
- **Career goal:** Position as versatile full-stack developer across multiple domains
- **Competitive edge:** Professional presentation while maintaining technical credibility

### Project Scope
- **Backend:** No changes (scanning, metrics calculation stays same)
- **Frontend:** Complete UI overhaul (components, layout, styling)
- **Data:** Minimal additions (profile info, tech domain tags)
- **Timeline:** 8-12 hours implementation

### Success Definition
Portfolio that enables a recruiter to:
1. Understand who you are in 30 seconds (profile section)
2. See technical breadth in 1 minute (spider chart domains)
3. Identify relevant projects in 2 minutes (filtered showcase)
4. Make contact decision in 3 minutes (complete assessment)

---

## 🚨 CRITICAL DECISIONS REQUIRED

### Profile Content (Needed for Phase 1)

**1. Profile Photo**
- Status: `<missing data>`
- Requirement: Professional headshot, square format, ~400x400px
- Action: Provide photo file or path

**2. Location**
- Current: `<missing data>`
- Example: "San Francisco Bay Area" or "Remote, USA"
- Action: Confirm location to display

**3. Professional Summary**
- Current: `<missing data>`
- Requirement: 2-3 sentences about expertise and passion
- Example: "Versatile full-stack developer with expertise across AI, web development, and AR/VR. Passionate about building innovative solutions through focused 100-hour deep-dive projects. Proven track record in hackathons and open-source contributions."
- Action: Write or approve summary

**4. Achievements**
- Current: `<missing data>`
- Examples needed:
  - 🏆 Hackathon wins (SF10x mentioned in repos)
  - 📝 Publications or presentations
  - 🥇 Competition placements
  - ⚡ Significant project milestones
- Action: List 3-5 top achievements with years

**5. Education**
- Current: `<missing data>`
- Need:
  - Degree(s), institution(s), year(s)
  - Certifications or special training
- Action: Provide education history

**6. Work Experience**
- Current: `<missing data>`
- Need:
  - Job title(s), company/companies, dates
  - Brief description of role/accomplishments
- Action: Provide work history (or indicate if focusing on projects only)

**7. Contact Information**
- GitHub: `https://github.com/jamesemerson112` (confirmed)
- LinkedIn: `<missing data>`
- Email: `<missing data>`
- Resume PDF: `<missing data>`
- Action: Provide missing links

### Tech Domain Strategy

**8. Domain Categories**
Proposed 8 domains for spider chart:
- ✅ **AI/ML** - Machine learning, LLMs, data science projects
- ✅ **Frontend** - React, Svelte, UI/UX development
- ✅ **Backend** - APIs, servers, databases
- ✅ **AR/VR** - Augmented/virtual reality (Eye-to-home project)
- ✅ **Robotics** - Autonomous systems, SLAM
- ⚠️ **Blockchain** - (do you have blockchain projects?)
- ⚠️ **Gaming** - (do you have game dev projects?)
- ⚠️ **Mobile** - iOS/Android development

**Decision Needed:** Keep all 8 or modify? Add/remove any domains?

**9. Project Classification**
Each of 20 repos needs tech domain tag(s). Examples:

- `chartrag` → AI, Backend
- `sf10x-hackathon` → AI, Backend, Frontend
- `Eye-to-home` → AR/VR, Mobile
- `jamesvo.github.io` → Frontend
- `virtual-cursor` → AI, Computer Vision
- `OpenGlassBox-Python` → AI, Data Science
- etc.

**Decision Needed:** Should we auto-classify based on languages or manually tag each?

**10. Featured Projects**
Which 3-4 projects to highlight at top? Candidates:
- SF10x Hackathon (hackathon winner, comprehensive)
- ChartRAG (AI/RAG focus)
- Eye-to-Home (AR/VR innovation)
- OpenGlassBox-Python (significant codebase)
- Virtual-Cursor (unique concept)

**Decision Needed:** Select 3-4 featured projects

**11. Hours Invested**
Spider chart can show either:
- **Option A:** Project count per domain (e.g., "5 AI projects")
- **Option B:** Total hours per domain (e.g., "500 hours in AI")

For Option B, we need hour estimates per project.

**Decision Needed:** Use project count or hours? If hours, provide estimates.

### UI/UX Decisions

**12. Keep or Replace?**
- **CodeMetrics section** (current COCOMO stats): Keep, Replace, or Move to detail view?
- **Theme switcher** (dark/light mode): Keep (recommended) or remove?
- **Hero section** (Hello, I'm James Vo!): Replace with profile header?

**Decision Needed:** Confirm what to keep from current design

**13. Mobile Experience**
- **Option A:** Tab-based navigation (About | Expertise | Work)
- **Option B:** Single scroll with collapsed sections
- **Option C:** Simplified single-column layout

**Decision Needed:** Preferred mobile approach

---

## 🎨 DESIGN SPECIFICATION

### Desktop Layout (1200px+)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: James Vo                [Resume][GitHub][LinkedIn]│
├───────────────────────┬─────────────────────────────────┤
│  LEFT SIDEBAR (33%)   │  RIGHT CONTENT (67%)            │
│  ───────────────────  │  ───────────────────            │
│                       │                                 │
│  ┌─────────────────┐  │   ┌──────────────────────────┐ │
│  │                 │  │   │                          │ │
│  │  [PROFILE PIC]  │  │   │   Tech Domain Expertise  │ │
│  │                 │  │   │                          │ │
│  └─────────────────┘  │   │   [SPIDER CHART]         │ │
│                       │   │   8 axes showing:        │ │
│  James Vo             │   │   • AI/ML                │ │
│  Full Stack Developer │   │   • Frontend             │ │
│  San Francisco, CA    │   │   • Backend              │ │
│                       │   │   • AR/VR                │ │
│  [LinkedIn][GitHub]   │   │   • Robotics             │ │
│  [Email][Resume]      │   │   • etc.                 │ │
│                       │   │                          │ │
│  ─────────────────    │   │  Click axis to filter ↓  │ │
│                       │   └──────────────────────────┘ │
│  📝 About             │                                 │
│  [Summary paragraph]  │   Currently: All Projects (10)  │
│                       │                                 │
│  🏆 Achievements      │                                 │
│  • SF10x Winner 2024  │                                 │
│  • [Achievement 2]    │                                 │
│  • [Achievement 3]    │                                 │
│                       │                                 │
│  🎓 Education         │                                 │
│  • [Degree]           │                                 │
│  • [Certification]    │                                 │
│                       │                                 │
│  💼 Experience        │                                 │
│  • [Job Title]        │                                 │
│    [Company], [Date]  │                                 │
│  • [Job Title 2]      │                                 │
│                       │                                 │
├───────────────────────┴─────────────────────────────────┤
│                                                          │
│  ⭐ Featured Projects                                    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ [Thumbnail]  │  │ [Thumbnail]  │  │ [Thumbnail]  │ │
│  │              │  │              │  │              │ │
│  │ SF10x Hack   │  │ ChartRAG     │  │ Eye2Home     │ │
│  │ AI • Web     │  │ AI • Backend │  │ AR • Mobile  │ │
│  │ 100 hours    │  │ 85 hours     │  │ 60 hours     │ │
│  │ [View →]     │  │ [View →]     │  │ [View →]     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ──────────────── All Projects ────────────────────     │
│                                                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                   │
│  │P4  │ │P5  │ │P6  │ │P7  │ │P8  │                   │
│  └────┘ └────┘ └────┘ └────┘ └────┘                   │
│  ┌────┐ ┌────┐                                          │
│  │P9  │ │P10 │                                          │
│  └────┘ └────┘                                          │
│                                                          │
│  [Show More Projects] or [View All 20 →]                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (<768px)

```
┌─────────────────────────────┐
│  James Vo         ☰ Menu    │
├─────────────────────────────┤
│  [PROFILE PHOTO]            │
│  James Vo                   │
│  Full Stack Developer       │
│  [LinkedIn][GitHub][Email]  │
├─────────────────────────────┤
│  ┏━━━━━━┓┌──────┐┌──────┐  │
│  ┃ About ┃│Skills││Work  │  │ ← Tabs
│  ┗━━━━━━┛└──────┘└──────┘  │
├─────────────────────────────┤
│                             │
│  📝 Professional Summary    │
│  [Summary text...]          │
│                             │
│  🏆 Achievements            │
│  • SF10x Winner             │
│  • [Achievement 2]          │
│                             │
│  🎓 Education               │
│  • [Degree details]         │
│                             │
│  💼 Experience              │
│  • [Job details]            │
│                             │
│  [Contact Info]             │
│                             │
└─────────────────────────────┘

Tab 2: Skills
┌─────────────────────────────┐
│  Tech Expertise             │
│  ┌──────────────────────┐   │
│  │  [Spider Chart]      │   │
│  │  Responsive view     │   │
│  └──────────────────────┘   │
│  Tap domain to filter        │
└─────────────────────────────┘

Tab 3: Work
┌─────────────────────────────┐
│  Featured Projects          │
│  ┌──────────────────────┐   │
│  │ Project Card         │   │
│  │ (swipeable carousel) │   │
│  └──────────────────────┘   │
│  ● ○ ○                      │
│                             │
│  All Projects               │
│  [Compact list view]        │
└─────────────────────────────┘
```

### Visual Design System

**Color Palette:**
```
Primary:   #0A66C2  (LinkedIn Blue)
Secondary: #666666  (Professional Gray)
Accent:    #057642  (Success Green)
Background Light: #FFFFFF / #F3F2EF
Background Dark: #1B1F23 / #2D333B (keep existing theme)
```

**Typography:**
```css
Headings: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui
Body: 16px / 1.5 line-height
Sizes:
  - h1: 2.5rem (profile name)
  - h2: 2rem (section headers)
  - h3: 1.5rem (subsections)
  - body: 1rem
```

**Spacing & Layout:**
```
Container max-width: 1200px
Sidebar: 33% width (400px max)
Content: 67% width
Gaps: 2rem between sections
Cards: 1rem padding, 8px border-radius
```

**Spider Chart Styling:**
```
Size: 400x400px desktop, 300x300px mobile
Axes: 8 total
Colors: Match tech domain definitions
Opacity: 0.25 default, 0.5 on hover
Interactive: Click axis label to filter
```

---

## 📊 DATA REQUIREMENTS

### Profile Data Structure

**File:** `src/data/profileData.js`

```javascript
export const profileData = {
  // Basic Info
  name: "James Vo",
  title: "Full Stack Developer & AI Specialist",
  location: "<missing data>",  // e.g., "San Francisco Bay Area"
  photo: "<missing data>",      // Path to photo file

  // Summary
  summary: "<missing data>",    // 2-3 sentence bio

  // Contact & Links
  socialLinks: {
    linkedin: "<missing data>",
    github: "https://github.com/jamesemerson112",
    email: "<missing data>",
    resume: "<missing data>"    // Path to PDF
  },

  // Achievements (3-5 items)
  achievements: [
    {
      year: 2024,
      title: "SF10x Hackathon Winner",
      icon: "🏆",
      description: "<missing data>"  // Optional detail
    },
    {
      year: "<missing data>",
      title: "<missing data>",
      icon: "📝"
    },
    // Add more...
  ],

  // Education
  education: [
    {
      degree: "<missing data>",      // e.g., "BS Computer Science"
      institution: "<missing data>", // e.g., "Stanford University"
      year: "<missing data>",        // e.g., "2018-2022"
      description: ""                // Optional
    },
    // Add more...
  ],

  // Work Experience
  experience: [
    {
      title: "<missing data>",       // e.g., "Senior Developer"
      company: "<missing data>",     // e.g., "Tech Company Inc"
      period: "<missing data>",      // e.g., "2022-Present"
      description: "<missing data>", // Brief role summary
      highlights: []                 // Optional bullet points
    },
    // Add more...
  ]
};
```

### Tech Domain Definitions

**File:** `src/data/techDomains.js`

```javascript
export const TECH_DOMAINS = [
  {
    id: "ai",
    label: "AI/ML",
    color: "#FF6B6B",
    description: "Machine Learning, LLMs, Data Science"
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#4ECDC4",
    description: "React, Svelte, UI/UX"
  },
  {
    id: "backend",
    label: "Backend",
    color: "#45B7D1",
    description: "APIs, Servers, Databases"
  },
  {
    id: "arvr",
    label: "AR/VR",
    color: "#96CEB4",
    description: "Augmented & Virtual Reality"
  },
  {
    id: "robotics",
    label: "Robotics",
    color: "#FFEAA7",
    description: "Autonomous Systems, SLAM"
  },
  {
    id: "blockchain",
    label: "Blockchain",
    color: "#DFE6E9",
    description: "Web3, Smart Contracts"
  },
  {
    id: "gaming",
    label: "Gaming",
    color: "#74B9FF",
    description: "Game Development"
  },
  {
    id: "mobile",
    label: "Mobile",
    color: "#A29BFE",
    description: "iOS & Android Apps"
  }
];
```

### Project Enhancements

**File:** `src/data/projectEnhancements.js`

Each project needs these additional fields:

```javascript
export const projectEnhancements = {
  "sf10x-hackathon": {
    techDomains: ["ai", "backend", "frontend"],
    hoursInvested: 100,
    isFeatured: true,
    thumbnail: "<missing data>",  // Path or placeholder
    shortDescription: "AI-powered hackathon project winner"
  },

  "chartrag": {
    techDomains: ["ai", "backend"],
    hoursInvested: 85,
    isFeatured: true,
    thumbnail: "<missing data>",
    shortDescription: "RAG-based chart analysis system"
  },

  "eye-to-home": {
    techDomains: ["arvr", "mobile"],
    hoursInvested: 60,
    isFeatured: true,
    thumbnail: "<missing data>",
    shortDescription: "AR home automation via eye tracking"
  },

  // Continue for remaining 17 repos...
  // Can be auto-generated with defaults and refined later
};
```

### Asset Checklist

Files needed for complete implementation:

**Images:**
- [ ] Profile photo: `public/assets/profile-photo.jpg` (400x400px)
- [ ] Featured project thumbnails: `public/assets/projects/*.jpg` (16:9 ratio)
- [ ] Placeholder image for projects without thumbnails

**Documents:**
- [ ] Resume PDF: `public/assets/james-vo-resume.pdf`

**Data:**
- [ ] Profile information (see profileData.js structure above)
- [ ] Tech domain tags for all 20 repos
- [ ] Hour estimates per project (or use project count metric)

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Data Preparation (2-3 hours)

**Goal:** Create all data structures and content before building components

**Tasks:**

1.1. **Create Profile Data File**
   - [ ] Create `src/data/profileData.js`
   - [ ] Fill in all known information
   - [ ] Mark missing data with `<missing data>` placeholders
   - [ ] Commit for review

1.2. **Create Tech Domain Definitions**
   - [ ] Create `src/data/techDomains.js`
   - [ ] Define all 8 domains (or adjusted list)
   - [ ] Set colors and descriptions

1.3. **Tag Projects with Tech Domains**
   - [ ] Create `src/data/projectEnhancements.js`
   - [ ] Review each of 20 repos
   - [ ] Assign 1-3 tech domains per project
   - [ ] Identify 3-4 featured projects
   - [ ] Estimate hours invested (rough estimates OK)

1.4. **Prepare Assets**
   - [ ] Create `public/assets/` directory structure
   - [ ] Add profile photo (or placeholder)
   - [ ] Add resume PDF (or placeholder)
   - [ ] Create project thumbnails (or use placeholders)

1.5. **Update Portfolio Store**
   - [ ] Add `selectedTechDomain` store to `portfolioStore.js`
   - [ ] Add `profileData` store
   - [ ] Update `filteredRepos` derived store to consider tech domains
   - [ ] Add helper functions for domain filtering

**Deliverable:** All data structures in place, ready for component development

---

### Phase 2: Component Development (3-4 hours)

**Goal:** Build all new components following design spec

**Tasks:**

2.1. **Create ProfileHeader Component**
   - [ ] Create `src/components/profile/ProfileHeader.svelte`
   - [ ] Display name, title, location
   - [ ] Add profile photo
   - [ ] Add social links (LinkedIn, GitHub, Email)
   - [ ] Add resume download button
   - [ ] Style according to design spec
   - [ ] Make responsive

2.2. **Create ProfileSidebar Component**
   - [ ] Create `src/components/profile/ProfileSidebar.svelte`
   - [ ] Summary section with bio text
   - [ ] Achievements list with icons
   - [ ] Education timeline
   - [ ] Experience timeline
   - [ ] Collapsible sections for mobile
   - [ ] Style with cards/sections

2.3. **Create TechDomainSpider Component**
   - [ ] Create `src/components/profile/TechDomainSpider.svelte`
   - [ ] Adapt from existing `LanguageSpider.svelte`
   - [ ] Change from language data to tech domain data
   - [ ] Calculate project counts per domain
   - [ ] Make axes clickable for filtering
   - [ ] Show active filter state
   - [ ] Add legend/labels
   - [ ] Match design colors

2.4. **Create ProjectShowcase Component**
   - [ ] Create `src/components/profile/ProjectShowcase.svelte`
   - [ ] Featured projects section (3-4 large cards)
   - [ ] All projects grid (remaining projects)
   - [ ] Filter by selected tech domain
   - [ ] Show tech domain tags on cards
   - [ ] Show hours invested
   - [ ] Add thumbnails
   - [ ] Click to view details

2.5. **Update RepoCard Component**
   - [ ] Modify `src/components/portfolio/RepoCard.svelte`
   - [ ] Add tech domain tag display
   - [ ] Add hours invested display
   - [ ] Add thumbnail/image support
   - [ ] Update styling for new layout
   - [ ] Add featured project variant

**Deliverable:** All components built and tested in isolation

---

### Phase 3: Layout Integration (2-3 hours)

**Goal:** Integrate components into main app with new layout

**Tasks:**

3.1. **Refactor App.svelte**
   - [ ] Remove old hero section
   - [ ] Replace with ProfileHeader at top
   - [ ] Create two-column layout (sidebar + content)
   - [ ] Left: ProfileSidebar
   - [ ] Right: TechDomainSpider + ProjectShowcase
   - [ ] Keep ThemeSwitcher
   - [ ] Decide on CodeMetrics section (keep/remove/move)
   - [ ] Add proper spacing and containers

3.2. **Implement Responsive Breakpoints**
   - [ ] Desktop (1200px+): Two-column layout
   - [ ] Tablet (768-1199px): Adjusted column widths
   - [ ] Mobile (<768px): Single column with tabs or stacked
   - [ ] Test all breakpoints
   - [ ] Ensure spider chart scales properly
   - [ ] Test touch interactions

3.3. **Wire Up State Management**
   - [ ] Connect TechDomainSpider to store
   - [ ] Connect ProjectShowcase to filtered repos
   - [ ] Test domain filtering interaction
   - [ ] Ensure filter persistence
   - [ ] Add "clear filter" functionality
   - [ ] Test all user flows

3.4. **Mobile Tab Navigation** (if chosen)
   - [ ] Create tab component
   - [ ] About tab: Profile info
   - [ ] Skills tab: Spider chart
   - [ ] Work tab: Projects
   - [ ] Smooth tab transitions
   - [ ] Mobile-friendly touch targets

**Deliverable:** Fully integrated LinkedIn-style layout with working interactions

---

### Phase 4: Polish & Deploy (1-2 hours)

**Goal:** Final refinements, testing, and deployment

**Tasks:**

4.1. **Visual Polish**
   - [ ] Add loading states
   - [ ] Add smooth transitions/animations
   - [ ] Ensure consistent spacing
   - [ ] Polish typography
   - [ ] Verify color contrast (accessibility)
   - [ ] Add hover states
   - [ ] Test dark/light themes

4.2. **Content Review**
   - [ ] Review all text for typos
   - [ ] Ensure all links work
   - [ ] Check image quality
   - [ ] Verify data accuracy
   - [ ] Fill in any remaining `<missing data>` placeholders

4.3. **Cross-Browser Testing**
   - [ ] Test in Chrome
   - [ ] Test in Firefox
   - [ ] Test in Safari
   - [ ] Test on mobile devices (iOS/Android)
   - [ ] Fix any browser-specific issues

4.4. **Performance Optimization**
   - [ ] Lazy load images
   - [ ] Optimize spider chart rendering
   - [ ] Minimize bundle size
   - [ ] Test page load speed (<3 seconds)
   - [ ] Optimize for mobile

4.5. **Deploy to Production**
   - [ ] Build production bundle
   - [ ] Test build locally
   - [ ] Deploy to GitHub Pages
   - [ ] Verify live site
   - [ ] Test all features on live site

**Deliverable:** Production-ready LinkedIn-style portfolio

---

## 🔧 TECHNICAL ARCHITECTURE

### Component Tree

```
App.svelte
├── ThemeSwitcher.svelte
├── ProfileHeader.svelte
│   ├── Profile photo
│   ├── Name, title, location
│   └── Social links
├── Main Content (two columns)
│   ├── ProfileSidebar.svelte (left 33%)
│   │   ├── Summary section
│   │   ├── Achievements list
│   │   ├── Education timeline
│   │   └── Experience timeline
│   └── Content Area (right 67%)
│       ├── TechDomainSpider.svelte
│       │   ├── Polygonal chart
│       │   ├── 8 domain axes
│       │   ├── Click handlers
│       │   └── Filter state display
│       └── ProjectShowcase.svelte
│           ├── Featured projects (3-4)
│           │   └── RepoCard.svelte (enhanced)
│           └── All projects grid
│               └── RepoCard.svelte (enhanced)
└── (Optional) CodeMetrics.svelte
```

### State Management Strategy

**New Stores to Add:**

```javascript
// src/stores/portfolioStore.js

// Profile data
export const profileData = writable(null);

// Tech domain filtering
export const selectedTechDomain = writable('all');

// Derived: repos filtered by tech domain
export const techDomainFilteredRepos = derived(
  [filteredRepos, selectedTechDomain],
  ([$repos, $domain]) => {
    if ($domain === 'all') return $repos;
    return $repos.filter(repo =>
      repo.techDomains?.includes($domain)
    );
  }
);

// Derived: featured projects
export const featuredProjects = derived(
  techDomainFilteredRepos,
  ($repos) => $repos.filter(r => r.isFeatured)
);

// Derived: project counts per domain
export const domainCounts = derived(
  portfolioData,
  ($data) => {
    if (!$data) return {};
    const counts = {};
    TECH_DOMAINS.forEach(domain => {
      counts[domain.id] = $data.repos.filter(r =>
        r.techDomains?.includes(domain.id)
      ).length;
    });
    return counts;
  }
);
```

### File Structure

```
src/
├── data/
│   ├── profileData.js          # NEW: Profile information
│   ├── techDomains.js          # NEW: Domain definitions
│   └── projectEnhancements.js  # NEW: Project metadata
├── components/
│   ├── profile/                # NEW: Profile components
│   │   ├── ProfileHeader.svelte
│   │   ├── ProfileSidebar.svelte
│   │   ├── TechDomainSpider.svelte
│   │   └── ProjectShowcase.svelte
│   ├── portfolio/              # EXISTING: Keep for now
│   │   ├── RepoCard.svelte     # MODIFY: Add enhancements
│   │   └── (other existing components)
│   └── (existing components)
├── stores/
│   └── portfolioStore.js       # MODIFY: Add new stores
└── App.svelte                  # MODIFY: New layout

public/
└── assets/                     # NEW: Static assets
    ├── profile-photo.jpg
    ├── james-vo-resume.pdf
    └── projects/
        ├── (project thumbnails)
        └── placeholder.jpg
```

### Performance Considerations

1. **Lazy Loading:**
   - Load project images on scroll
   - Defer non-critical content

2. **Code Splitting:**
   - Dynamic imports for large components
   - Separate chunks for different sections

3. **Spider Chart Optimization:**
   - Memoize calculations
   - Debounce filter changes
   - Use requestAnimationFrame for animations

4. **Data Loading:**
   - Profile data loads immediately (small)
   - Project data loads from existing system
   - No additional API calls needed

---

## ✅ SUCCESS CRITERIA & TESTING

### Definition of Done

**Functional Requirements:**
- [ ] Profile section displays all information (or shows `<missing data>`)
- [ ] Spider chart shows project counts across 8 tech domains
- [ ] Clicking spider chart axis filters projects correctly
- [ ] Featured projects display (3-4) with enhanced cards
- [ ] All projects grid shows remaining projects
- [ ] Tech domain tags visible on all project cards
- [ ] Social links (GitHub, LinkedIn, Email, Resume) all work
- [ ] Theme switcher works in new layout
- [ ] Mobile responsive on all screen sizes
- [ ] No console errors

**Visual Requirements:**
- [ ] Matches design specification
- [ ] Professional, recruiter-friendly appearance
- [ ] Consistent spacing and alignment
- [ ] Smooth animations and transitions
- [ ] Dark/light theme both look good
- [ ] Images load properly (or show placeholders)
- [ ] Typography hierarchy clear

**Performance Requirements:**
- [ ] Page loads in <3 seconds
- [ ] Spider chart renders smoothly
- [ ] No layout shifts on load
- [ ] Filters respond instantly (<100ms)
- [ ] Works well on mobile devices

### Testing Checklist

**Desktop Testing (Chrome, Firefox, Safari):**
- [ ] Profile section displays correctly
- [ ] Spider chart interactive and responsive
- [ ] Two-column layout renders properly
- [ ] Project filtering works
- [ ] All links clickable
- [ ] Theme switching works
- [ ] No visual bugs

**Mobile Testing (iOS & Android):**
- [ ] Single column or tab layout works
- [ ] Touch targets appropriate size (44px min)
- [ ] Spider chart readable and interactive
- [ ] Projects displayed appropriately
- [ ] Navigation easy to use
- [ ] No horizontal scroll
- [ ] Performance acceptable

**Content Testing:**
- [ ] All `<missing data>` placeholders identified
- [ ] Profile information accurate
- [ ] Project classifications correct
- [ ] Links all functional
- [ ] No typos in text
- [ ] Images appropriate quality

**Edge Cases:**
- [ ] No profile photo: shows placeholder
- [ ] No featured projects: shows all normally
- [ ] Filter shows 0 projects: displays empty state
- [ ] Long project names: don't break layout
- [ ] Many tech domain tags: handle overflow

### Rollout Strategy

**Phase 1: Soft Launch**
1. Deploy to staging/preview URL
2. Test all functionality
3. Gather feedback from 2-3 people
4. Fix any critical issues

**Phase 2: Production Deploy**
1. Final content review
2. Replace `<missing data>` with real content
3. Deploy to production (GitHub Pages)
4. Monitor for issues
5. Quick fixes if needed

**Phase 3: Iterate**
1. Collect feedback
2. A/B test if possible
3. Refine based on usage
4. Scale to full 200+ repos once stable

---

## 📚 REFERENCES & RESOURCES

### Design Inspiration
- LinkedIn profile pages (professional layout reference)
- Modern portfolio examples (Dribbble, Awwwards)
- Developer portfolio best practices

### Technical References
- Svelte 5 documentation
- Existing LanguageSpider component (adapt for TechDomainSpider)
- Current portfolioStore.js (extend for new features)
- POLYGONAL-SPIDER-CHART-GUIDE.md (implementation details)

### Content Resources
- Current 20 repos in `public/metrics/index.json`
- GitHub profile: https://github.com/jamesemerson112
- Existing project descriptions and metadata

---

## 🎯 NEXT IMMEDIATE ACTIONS

### For User (Content Gathering):
1. **Review this reorganized plan** - Confirm structure makes sense
2. **Answer critical decisions** (Section 2: profile, domains, UI choices)
3. **Gather assets** - Profile photo, resume, project screenshots
4. **Write content** - Professional summary, achievements, education, experience
5. **Classify projects** - Assign tech domains to each repo

### For Implementation (Once Content Ready):
1. **Toggle to Act Mode** to begin Phase 1
2. **Create data files** with provided content (or `<missing data>` placeholders)
3. **Build components** following detailed task lists
4. **Integrate and test** step by step
5. **Deploy** when ready

---

## 📝 APPENDIX: QUICK START GUIDE

### Minimum Viable Data (to start building)

Even with incomplete content, we can start by creating placeholder files:

```javascript
// src/data/profileData.js (with placeholders)
export const profileData = {
  name: "James Vo",
  title: "Full Stack Developer & AI Specialist",
  location: "<missing data>",
  photo: "/assets/profile-placeholder.jpg",
  summary: "<missing data>",
  socialLinks: {
    linkedin: "<missing data>",
    github: "https://github.com/jamesemerson112",
    email: "<missing data>",
    resume: "<missing data>"
  },
  achievements: [
    { year: 2024, title: "SF10x Hackathon Winner", icon: "🏆" },
    { year: "<missing>", title: "<missing data>", icon: "📝" }
  ],
  education: [
    { degree: "<missing data>", institution: "<missing data>", year: "<missing data>" }
  ],
  experience: [
    { title: "<missing data>", company: "<missing data>", period: "<missing data>", description: "<missing data>" }
  ]
};
```

This allows development to proceed while real content is being gathered.

---

## 📞 QUESTIONS OR ISSUES?

**During Implementation:**
- Reference this plan document
- Check existing components for patterns
- Test incrementally
- Commit frequently

**If Stuck:**
- Review relevant section of this plan
- Check technical architecture section
- Look at existing similar components
- Test in isolation before integrating

---

*Document Status: Complete & Ready for Implementation*
*Last Updated: October 3, 2025 4:37 PM*
*Version: 2.0 (Reorganized)*
