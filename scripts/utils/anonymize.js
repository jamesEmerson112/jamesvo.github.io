/**
 * Private Repository Anonymization Utility
 * Sanitizes private repository data while preserving metrics
 */

/**
 * Anonymize a private repository's metadata
 * @param {object} repo - Repository object from GitHub API
 * @param {number} index - Index number for naming (e.g., "Private Project 5")
 * @returns {object} Anonymized repository metadata
 */
export function anonymizePrivateRepo(repo, index) {
  // If not private, return original metadata
  if (!repo.private) {
    return {
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      url: repo.html_url,
      homepage: repo.homepage || null,
      topics: repo.topics || [],
      lastUpdated: repo.updated_at,
      createdAt: repo.created_at,
      stars: repo.stargazers_count || 0,
      language: repo.language || 'Unknown',
      isPrivate: false,
      isFork: repo.fork,
      isArchived: repo.archived,
      isAnonymized: false
    };
  }
  
  // Anonymize private repository
  return {
    name: `Private Project ${index}`,
    fullName: null,
    description: 'Private repository',
    url: null,
    homepage: null,
    topics: [],
    lastUpdated: repo.updated_at, // Keep this for incremental scanning
    createdAt: null,
    stars: 0,
    language: repo.language || 'Unknown', // Keep language for filtering
    isPrivate: true,
    isFork: repo.fork,
    isArchived: repo.archived,
    isAnonymized: true
  };
}

/**
 * Check if a repository should be included in scanning
 * @param {object} repo - Repository object from GitHub API
 * @returns {boolean} True if repo should be scanned
 */
export function shouldIncludeRepo(repo) {
  // Exclude forks and archived repos
  if (repo.fork || repo.archived) {
    return false;
  }
  
  // Include all other repos (both public and private)
  return true;
}

/**
 * Generate a safe repository ID for filenames
 * @param {object} repo - Repository object
 * @param {number} privateIndex - Index for private repos
 * @returns {string} Safe filename-compatible ID
 */
export function generateRepoId(repo, privateIndex = 0) {
  if (repo.private) {
    return `private-${String(privateIndex).padStart(3, '0')}`;
  }
  
  // For public repos, use sanitized name
  return repo.name
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Get display name for a repository
 * @param {object} metadata - Repository metadata (anonymized or not)
 * @returns {string} Display name
 */
export function getDisplayName(metadata) {
  return metadata.isAnonymized 
    ? metadata.name // "Private Project 5"
    : metadata.name; // Original name
}

/**
 * Check if repository details should be publicly visible
 * @param {object} metadata - Repository metadata
 * @returns {object} Visibility flags
 */
export function getVisibility(metadata) {
  return {
    showName: !metadata.isAnonymized,
    showDescription: !metadata.isAnonymized,
    showUrl: !metadata.isAnonymized && metadata.url !== null,
    showHomepage: !metadata.isAnonymized && metadata.homepage !== null,
    showTopics: !metadata.isAnonymized && metadata.topics.length > 0,
    showStars: !metadata.isAnonymized && metadata.stars > 0,
    showMetrics: true // Always show metrics
  };
}
