/**
 * Tech Domain Definitions
 * Defines the technical domains for portfolio categorization
 * Used by TechDomainSpider chart and project filtering
 */

export const TECH_DOMAINS = [
  {
    id: "ai",
    label: "AI/ML",
    color: "#FF6B6B",
    description: "Machine Learning, LLMs, Data Science",
    icon: "🤖"
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#4ECDC4",
    description: "React, Svelte, UI/UX Development",
    icon: "🎨"
  },
  {
    id: "backend",
    label: "Backend",
    color: "#45B7D1",
    description: "APIs, Servers, Databases",
    icon: "⚙️"
  },
  {
    id: "arvr",
    label: "AR/VR",
    color: "#96CEB4",
    description: "Augmented & Virtual Reality",
    icon: "🥽"
  },
  {
    id: "robotics",
    label: "Robotics",
    color: "#FFEAA7",
    description: "Autonomous Systems, SLAM, Control",
    icon: "🤖"
  },
  {
    id: "mobile",
    label: "Mobile",
    color: "#A29BFE",
    description: "iOS & Android Development",
    icon: "📱"
  }
];

/**
 * Get domain by ID
 */
export function getDomainById(id) {
  return TECH_DOMAINS.find(d => d.id === id);
}

/**
 * Get all domain IDs
 */
export function getAllDomainIds() {
  return TECH_DOMAINS.map(d => d.id);
}

/**
 * Validate if a domain ID exists
 */
export function isValidDomain(id) {
  return TECH_DOMAINS.some(d => d.id === id);
}
