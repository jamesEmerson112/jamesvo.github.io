# PORTFOLIO REDESIGN: LINKEDIN-STYLE LAYOUT
## Implementation Plan Document

---

## 📋 Overview

Redesigning portfolio website with a professional, recruiter-friendly layout inspired by LinkedIn's familiar interface pattern. The design emphasizes personal brand, credentials, and technical expertise through an interactive tech domain spider chart.

---

## 🎯 Layout Structure

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────┐
│  Header: James Vo + Navigation                          │
├───────────────────────┬─────────────────────────────────┤
│  LEFT COLUMN (33%)    │  RIGHT COLUMN (67%)             │
│  ──────────────────   │  ──────────────────             │
│  • Profile Photo      │  • Interactive Spider Chart     │
│  • Name & Title       │  • Tech Domain Filter           │
│  • Social Links       │  • Current Filter Display       │
│  • Summary Section    │                                 │
│  • Achievements       │                                 │
│  • Education          │                                 │
│  • Experience         │                                 │
├───────────────────────┴─────────────────────────────────┤
│  FULL WIDTH: Featured Projects Section                  │
│  • Grid of project cards (3 columns)                    │
│  • Filtered based on spider chart selection             │
└─────────────────────────────────────────────────────────┘
```

### Mobile View (<768px)

```
┌─────────────────────────────┐
│  Header + Mobile Menu       │
├─────────────────────────────┤
│  Profile Photo + Name       │
│  Social Links               │
├─────────────────────────────┤
│  Tab Navigation             │
│  [About][Expertise][Work]   │
├─────────────────────────────┤
│  Tab Content (stacked):     │
│  • Summary                  │
│  • Achievements             │
│  • Education                │
│  • Experience               │
│  OR                         │
│  • Spider Chart             │
│  OR                         │
│  • Project Cards            │
└─────────────────────────────┘
```

---

## 🏗️ Component Architecture

### New Components to Create

1. **`ProfileHeader.svelte`**
   - Profile photo
   - Name, title, location
   - Social links (LinkedIn, GitHub, Email)
   - Download Resume button

2. **`ProfileSidebar.svelte`**
   - Summary section
   - Achievements list
   - Education timeline
   - Experience timeline
   - Contact information

3. **`TechDomainSpider.svelte`**
   - Interactive polygonal spider chart
   - Shows project distribution across domains
   - Click axes to filter projects
   - Display current filter state
   - Domain labels: AI, Frontend, Backend, AR/VR, Robotics, Blockchain, Games, etc.

4. **`ProjectShowcase.svelte`**
   - Featured projects grid
   - Responds to spider chart filter
   - Project cards with thumbnails
   - Tech tags and hour investment display

### Components to Refactor

1. **`App.svelte`**
   - New layout structure
   - Remove old hero section
   - Integrate new profile-based layout

2. **`PortfolioOverview.svelte`**
   - Simplify to just project showcase
   - Remove redundant stats/filters
   - Focus on filtered project display

3. **`RepoCard.svelte`**
   - Add tech domain tags
   - Display hour investment if available
   - Show project thumbnail/image

---

## 📊 Data Structure Requirements

### Profile Data (`profileData.js`)

```javascript
{
  name: "James Vo",
  title: "Full Stack Developer & AI Specialist",
  location: "San Francisco Bay Area",
  photo: "/assets/profile-photo.jpg",

  summary: "Versatile developer building innovative solutions...",

  socialLinks: {
    linkedin: "https://linkedin.com/in/jamesvo",
    github: "https://github.com/jamesemerson112",
    email: "james@example.com",
    resume: "/assets/james-vo-resume.pdf"
  },

  achievements: [
    { year: 2024, title: "SF10x Hackathon Winner", icon: "🏆" },
    { year: 2024, title: "Published 3 AI Research Papers", icon: "📝" },
    { year: 2023, title: "Hackathon Top 3 (x3)", icon: "🥇" }
  ],

  education: [
    {
      degree: "BS Computer Science",
      institution: "University Name",
      year: "2018-2022"
    },
    {
      degree: "AI/ML Certification",
      institution: "Stanford Online",
      year: "2023"
    }
  ],

  experience: [
    {
      title: "Senior Developer",
      company: "Company X",
      period: "2022-Present",
      description: "Leading AI integration projects..."
    },
    {
      title: "Software Engineer",
      company: "Company Y",
      period: "2020-2022",
      description: "Full stack development..."
    }
  ]
}
```

### Tech Domain Classification

Update repo metadata to include:
```javascript
{
  id: "chartrag",
  name: "ChartRAG",
  techDomains: ["AI", "Backend"],  // NEW
  hoursInvested: 100,              // NEW
  isFeatured: true,                // NEW
  thumbnail: "/assets/chartrag-thumb.jpg",  // NEW
  // ... existing metrics
}
```

### Tech Domain Definitions

```javascript
const TECH_DOMAINS = [
  { id: "ai", label: "AI/ML", color: "#FF6B6B" },
  { id: "frontend", label: "Frontend", color: "#4ECDC4" },
  { id: "backend", label: "Backend", color: "#45B7D1" },
  { id: "arvr", label: "AR/VR", color: "#96CEB4" },
  { id: "robotics", label: "Robotics", color: "#FFEAA7" },
  { id: "blockchain", label: "Blockchain", color: "#DFE6E9" },
  { id: "gaming", label: "Gaming", color: "#74B9FF" },
  { id: "mobile", label: "Mobile", color: "#A29BFE" }
];
```

---

## 🎨 Visual Design Specifications

### Color Palette
- Primary: LinkedIn Blue `#0A66C2`
- Secondary: Professional Gray `#666666`
- Accent: Success Green `#057642`
- Background: Clean White/Light Gray

### Typography
- Headings: System font stack (like LinkedIn)
- Body: 16px, 1.5 line-height
- Professional, readable spacing

### Spider Chart
- Use existing polygonal spider implementation
- 8 axes for tech domains
- Single metric: project count per domain
- Interactive click on axis labels
- Highlight active filter

---

## ⚙️ Implementation Phases

### Phase 1: Data Preparation ✓ Start Here
- [ ] Create `profileData.js` with personal information
- [ ] Add tech domain tags to existing repos
- [ ] Add hours invested data (estimate if needed)
- [ ] Select/prepare featured project thumbnails
- [ ] Calculate project counts per domain

### Phase 2: Component Development
- [ ] Create `ProfileHeader.svelte`
- [ ] Create `ProfileSidebar.svelte`
- [ ] Create `TechDomainSpider.svelte` (adapt from `LanguageSpider`)
- [ ] Update `RepoCard.svelte` with new fields
- [ ] Create filtering logic for tech domains

### Phase 3: Layout Integration
- [ ] Refactor `App.svelte` with new structure
- [ ] Implement responsive breakpoints
- [ ] Create mobile tab navigation
- [ ] Test filtering functionality

### Phase 4: Polish & Deploy
- [ ] Add animations/transitions
- [ ] Optimize images
- [ ] Test on multiple devices
- [ ] Deploy to GitHub Pages

---

## 🔧 Technical Considerations

### State Management
```javascript
// New stores needed
export const selectedTechDomain = writable('all');
export const profileData = writable(null);

// Update existing filteredRepos to consider tech domain
export const filteredRepos = derived(
  [portfolioData, selectedTechDomain],
  ([$data, $domain]) => {
    if ($domain === 'all') return $data.repos;
    return $data.repos.filter(r =>
      r.techDomains?.includes($domain)
    );
  }
);
```

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Performance
- Lazy load project images
- Optimize spider chart rendering
- Minimize initial bundle size

---

## 📝 Content Needed from You

Before implementation, we need:
1. **Profile photo** (square, ~400x400px)
2. **Resume PDF** file
3. **Project thumbnails** (16:9 ratio recommended)
4. **Actual achievements** (replace placeholders)
5. **Education details** (degrees, schools, years)
6. **Work experience** (titles, companies, dates)
7. **Hours invested** per project (estimates OK)
8. **Tech domain** classification for each project

---

## 🚀 Next Steps

1. Review this plan and provide feedback
2. Gather required content (profile photo, achievements, etc.)
3. Decide on tech domain categories for projects
4. Begin Phase 1: Data Preparation
5. Iteratively build components
6. Test and refine

---

## 💭 Questions to Address

### About Profile Content
1. Do we have a professional profile photo ready?
2. What's the current location to display (city/region)?
3. What should the summary/bio say? (2-3 sentences)
4. What are the actual top achievements/milestones to showcase?
5. Education background details?
6. Current and past work experience?

### About Projects
7. Which projects should be "featured" (highlighted at top)?
8. How should we estimate hours invested for older projects?
9. Should we create placeholder thumbnails or use screenshots?
10. How many tech domain categories do we want? (6-8 recommended)

### About Tech Domains
11. Proposed domains: AI/ML, Frontend, Backend, AR/VR, Robotics, Blockchain, Gaming, Mobile. Add/remove any?
12. Should some projects have multiple domains? (e.g., ChartRAG = AI + Backend)
13. Should the spider chart show project count or total hours per domain?

### About Implementation
14. Should we keep the existing "Code Metrics" section or replace it entirely?
15. Keep dark/light theme switcher?
16. Any specific animations or transitions preferred?
17. Should mobile view have a different experience or just stack desktop layout?

---

## 📌 Notes

- This redesign maintains the existing polygonal spider chart aesthetic
- All current project data will be preserved and enhanced
- The goal is recruiter-friendly while showcasing technical depth
- Mobile-first approach with progressive enhancement for desktop

---

*Document created: October 3, 2025*
*Status: Planning Phase - Awaiting Content & Decisions*
