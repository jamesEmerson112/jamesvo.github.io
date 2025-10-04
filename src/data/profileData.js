/**
 * Profile Data
 * Personal information for portfolio header and sidebar
 *
 * NOTE: This file contains placeholder/demo data.
 * Replace <missing data> placeholders with real information.
 */

export const profileData = {
  // Basic Info
  name: "James Vo",
  title: "Full Stack Developer & AI Specialist",
  location: "<missing data>",  // e.g., "San Francisco Bay Area"
  photo: "/assets/profile-placeholder.jpg",  // Update with real photo path

  // Professional Summary
  summary: "<missing data>",  // 2-3 sentences about expertise and passion

  // Contact & Social Links
  socialLinks: {
    linkedin: "<missing data>",  // LinkedIn profile URL
    github: "https://github.com/jamesemerson112",
    email: "<missing data>",  // Professional email
    resume: "/assets/resume-placeholder.pdf"  // Resume PDF path
  },

  // Key Achievements (3-5 items)
  achievements: [
    {
      year: 2024,
      title: "SF10x Hackathon Winner",
      icon: "🏆",
      description: "Won first place at SF10x hackathon with AI-powered solution"
    },
    {
      year: 2024,
      title: "<missing data>",
      icon: "📝",
      description: "<missing data>"
    },
    {
      year: 2023,
      title: "<missing data>",
      icon: "🥇",
      description: "<missing data>"
    }
  ],

  // Education History
  education: [
    {
      degree: "<missing data>",  // e.g., "BS Computer Science"
      institution: "<missing data>",  // e.g., "Stanford University"
      year: "<missing data>",  // e.g., "2018-2022"
      description: ""  // Optional additional details
    }
  ],

  // Work Experience
  experience: [
    {
      title: "<missing data>",  // e.g., "Senior Software Developer"
      company: "<missing data>",  // e.g., "Tech Company Inc"
      period: "<missing data>",  // e.g., "2022-Present"
      description: "<missing data>",  // Brief summary of role
      highlights: []  // Optional bullet points of achievements
    }
  ]
};

/**
 * Helper function to check if profile data is complete
 * Returns array of missing fields
 */
export function getMissingProfileData() {
  const missing = [];

  if (profileData.location === "<missing data>") missing.push("location");
  if (profileData.summary === "<missing data>") missing.push("summary");
  if (profileData.socialLinks.linkedin === "<missing data>") missing.push("linkedin");
  if (profileData.socialLinks.email === "<missing data>") missing.push("email");

  return missing;
}
