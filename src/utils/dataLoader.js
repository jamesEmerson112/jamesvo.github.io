/**
 * Data Loader Utility
 * Fetches portfolio metrics from the generated JSON files
 */

/**
 * Fetch the master portfolio index
 * @returns {Promise<Object>} Portfolio index data
 */
export async function fetchPortfolioIndex() {
  try {
    const response = await fetch('/metrics/index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio index: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading portfolio index:', error);
    throw error;
  }
}

/**
 * Fetch detailed metrics for a specific repository
 * @param {string} detailsFile - Path to the repo details file (e.g., "repos/repo-001.json")
 * @returns {Promise<Object>} Repository details
 */
export async function fetchRepoDetails(detailsFile) {
  try {
    const response = await fetch(`/metrics/${detailsFile}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repo details: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading repo details from ${detailsFile}:`, error);
    throw error;
  }
}

/**
 * Format large numbers with commas for readability
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toLocaleString('en-US');
}

/**
 * Format currency values
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency (e.g., "$2.8M")
 */
export function formatCurrency(amount) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

/**
 * Format time periods
 * @param {number} years - Years to format
 * @returns {string} Formatted time period
 */
export function formatYears(years) {
  if (years >= 1) {
    return `${Math.round(years)} year${years !== 1 ? 's' : ''}`;
  }
  const months = Math.round(years * 12);
  return `${months} month${months !== 1 ? 's' : ''}`;
}

/**
 * Get top N languages by percentage
 * @param {Object} languages - Languages object from portfolio data
 * @param {number} count - Number of top languages to return
 * @returns {Array} Array of language objects sorted by percentage
 */
export function getTopLanguages(languages, count = 8) {
  return Object.entries(languages)
    .map(([name, data]) => ({
      name,
      ...data
    }))
    .sort((a, b) => b.percentOfTotal - a.percentOfTotal)
    .slice(0, count);
}
