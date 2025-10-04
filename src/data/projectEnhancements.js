/**
 * Project Enhancements
 * Additional metadata for portfolio projects including tech domains,
 * hours invested, featured status, and thumbnails
 *
 * NOTE: This contains demo/placeholder data.
 * Refine classifications and hours based on actual project details.
 */

export const projectEnhancements = {
  "jamesvo-github-io": {
    techDomains: ["frontend"],
    hoursInvested: 120,
    isFeatured: false,
    thumbnail: "/assets/projects/portfolio-thumb.jpg",
    shortDescription: "Personal portfolio website with metrics dashboard"
  },

  "sglang-and-dynamo-example": {
    techDomains: ["ai", "backend"],
    hoursInvested: 75,
    isFeatured: false,
    thumbnail: "/assets/projects/sglang-thumb.jpg",
    shortDescription: "SGLang and PyTorch Dynamo integration examples"
  },

  "jiraoptimizer": {
    techDomains: ["frontend", "backend"],
    hoursInvested: 90,
    isFeatured: false,
    thumbnail: "/assets/projects/jira-thumb.jpg",
    shortDescription: "Jira workflow optimization tool"
  },

  "eye-to-home": {
    techDomains: ["arvr", "mobile"],
    hoursInvested: 85,
    isFeatured: true,
    thumbnail: "/assets/projects/eye2home-thumb.jpg",
    shortDescription: "AR home automation controlled by eye tracking"
  },

  "sf10x-hackathon": {
    techDomains: ["ai", "backend", "frontend"],
    hoursInvested: 150,
    isFeatured: true,
    thumbnail: "/assets/projects/sf10x-thumb.jpg",
    shortDescription: "Award-winning AI hackathon project"
  },

  "virtual-cursor": {
    techDomains: ["ai"],
    hoursInvested: 65,
    isFeatured: false,
    thumbnail: "/assets/projects/cursor-thumb.jpg",
    shortDescription: "AI-powered virtual cursor control system"
  },

  "samdu-news": {
    techDomains: ["frontend", "backend"],
    hoursInvested: 55,
    isFeatured: false,
    thumbnail: "/assets/projects/news-thumb.jpg",
    shortDescription: "News aggregation platform"
  },

  "las-vegas-hackathon-august-12": {
    techDomains: ["ai", "backend"],
    hoursInvested: 80,
    isFeatured: false,
    thumbnail: "/assets/projects/vegas-thumb.jpg",
    shortDescription: "Las Vegas hackathon AI project"
  },

  "shopify-hackathon-backend": {
    techDomains: ["backend"],
    hoursInvested: 50,
    isFeatured: false,
    thumbnail: "/assets/projects/shopify-thumb.jpg",
    shortDescription: "Shopify hackathon backend service"
  },

  "3d-objects-for-threejs": {
    techDomains: ["frontend"],
    hoursInvested: 30,
    isFeatured: false,
    thumbnail: "/assets/projects/threejs-thumb.jpg",
    shortDescription: "3D object library for Three.js"
  },

  "openglassbox-python": {
    techDomains: ["ai", "backend"],
    hoursInvested: 140,
    isFeatured: true,
    thumbnail: "/assets/projects/glassbox-thumb.jpg",
    shortDescription: "Python implementation of OpenGlassBox ML framework"
  },

  "robotic-ai-a-start-search-and-drone-slam": {
    techDomains: ["robotics", "ai"],
    hoursInvested: 95,
    isFeatured: false,
    thumbnail: "/assets/projects/robotics-thumb.jpg",
    shortDescription: "Robotic AI with A* search and drone SLAM"
  },

  "deepmind-portfolio": {
    techDomains: ["ai"],
    hoursInvested: 40,
    isFeatured: false,
    thumbnail: "/assets/projects/deepmind-thumb.jpg",
    shortDescription: "DeepMind research portfolio documentation"
  },

  "chartrag": {
    techDomains: ["ai", "backend"],
    hoursInvested: 100,
    isFeatured: true,
    thumbnail: "/assets/projects/chartrag-thumb.jpg",
    shortDescription: "RAG-based chart analysis and generation system"
  },

  "test-framework-with-aurelia": {
    techDomains: ["frontend"],
    hoursInvested: 35,
    isFeatured: false,
    thumbnail: "/assets/projects/aurelia-thumb.jpg",
    shortDescription: "Testing framework built with Aurelia"
  },

  "jamesemerson112": {
    techDomains: ["frontend"],
    hoursInvested: 10,
    isFeatured: false,
    thumbnail: "/assets/projects/readme-thumb.jpg",
    shortDescription: "GitHub profile README"
  },

  "deep-learning-james": {
    techDomains: ["ai"],
    hoursInvested: 60,
    isFeatured: false,
    thumbnail: "/assets/projects/dl-thumb.jpg",
    shortDescription: "Deep learning projects and experiments"
  },

  "system-design-interview-demos": {
    techDomains: ["backend"],
    hoursInvested: 45,
    isFeatured: false,
    thumbnail: "/assets/projects/sysdesign-thumb.jpg",
    shortDescription: "System design interview preparation demos"
  },

  "jiraoptimizernext": {
    techDomains: ["frontend", "backend"],
    hoursInvested: 70,
    isFeatured: false,
    thumbnail: "/assets/projects/jiranext-thumb.jpg",
    shortDescription: "Next-gen Jira optimizer with React"
  },

  "eye-to-home-server": {
    techDomains: ["backend", "arvr"],
    hoursInvested: 55,
    isFeatured: false,
    thumbnail: "/assets/projects/eye2home-server-thumb.jpg",
    shortDescription: "Backend server for Eye2Home AR system"
  }
};

/**
 * Get enhancement data for a project
 */
export function getProjectEnhancement(projectId) {
  return projectEnhancements[projectId] || null;
}

/**
 * Get all featured projects
 */
export function getFeaturedProjectIds() {
  return Object.keys(projectEnhancements).filter(
    id => projectEnhancements[id].isFeatured
  );
}

/**
 * Get projects by tech domain
 */
export function getProjectsByDomain(domainId) {
  return Object.keys(projectEnhancements).filter(
    id => projectEnhancements[id].techDomains.includes(domainId)
  );
}

/**
 * Calculate total hours per domain
 */
export function getTotalHoursByDomain() {
  const hoursByDomain = {};

  Object.values(projectEnhancements).forEach(project => {
    project.techDomains.forEach(domain => {
      hoursByDomain[domain] = (hoursByDomain[domain] || 0) + project.hoursInvested;
    });
  });

  return hoursByDomain;
}
