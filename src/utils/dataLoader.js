/**
 * Data Loader Utility
 * Fetches and parses portfolio metrics JSON files
 */

/**
 * Load the master index containing all repository summaries
 * @returns {Promise<Object>} Master index data
 */
export async function loadMasterIndex() {
  try {
    const response = await fetch('/metrics/index.json');
    if (!response.ok) {
      throw new Error(`Failed to load index: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading master index:', error);
    throw error;
  }
}

/**
 * Load detailed metrics for a specific repository
 * @param {string} repoId - Repository ID
 * @returns {Promise<Object>} Detailed repository metrics
 */
export async function loadRepoDetails(repoId) {
  try {
    const response = await fetch(`/metrics/repos/${repoId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load repo ${repoId}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading repo ${repoId}:`, error);
    throw error;
  }
}

/**
 * Format large numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount) {
  return `$${amount.toLocaleString()}`;
}

/**
 * Format duration in months to human-readable string
 * @param {number} months - Duration in months
 * @returns {string} Human-readable duration
 */
export function formatDuration(months) {
  if (months < 1) {
    const weeks = Math.round(months * 4.33);
    return `${weeks} week${weeks !== 1 ? 's' : ''}`;
  } else if (months < 12) {
    return `${months.toFixed(1)} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = (months / 12).toFixed(1);
    return `${years} year${years !== '1.0' ? 's' : ''}`;
  }
}

/**
 * Get color for a programming language
 * @param {string} language - Programming language name
 * @returns {string} Hex color code
 */
export function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Jupyter': '#DA5B0B',
    'Cuda': '#3A4E3A',
    'Markdown': '#083fa1'
  };
  
  return colors[language] || '#8b949e'; // Default gray for unknown languages
}

/**
 * Sort repositories by a given field
 * @param {Array} repos - Array of repositories
 * @param {string} sortBy - Field to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted repositories
 */
export function sortRepos(repos, sortBy, order = 'desc') {
  const sorted = [...repos].sort((a, b) => {
    let aVal, bVal;
    
    switch (sortBy) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        return order === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      
      case 'lines':
        aVal = a.summary.lines;
        bVal = b.summary.lines;
        break;
      
      case 'cost':
        aVal = a.summary.aiCost;
        bVal = b.summary.aiCost;
        break;
      
      case 'updated':
        aVal = new Date(a.lastUpdated);
        bVal = new Date(b.lastUpdated);
        break;
      
      default:
        return 0;
    }
    
    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });
  
  return sorted;
}

/**
 * Filter repositories by search term and language
 * @param {Array} repos - Array of repositories
 * @param {string} searchTerm - Search term
 * @param {string} languageFilter - Language to filter by
 * @returns {Array} Filtered repositories
 */
export function filterRepos(repos, searchTerm, languageFilter) {
  let filtered = repos;
  
  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(repo =>
      repo.name.toLowerCase().includes(term) ||
      (repo.description && repo.description.toLowerCase().includes(term))
    );
  }
  
  // Filter by language
  if (languageFilter && languageFilter !== 'all') {
    filtered = filtered.filter(repo =>
      repo.primaryLanguage === languageFilter
    );
  }
  
  return filtered;
}
