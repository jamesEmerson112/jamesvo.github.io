/**
 * Portfolio Store
 * Manages portfolio metrics state using Svelte stores
 */

import { writable, derived } from 'svelte/store';
import { loadMasterIndex } from '../utils/dataLoader.js';
import { filterRepos, sortRepos } from '../utils/dataLoader.js';

// Core data stores
export const portfolioData = writable(null);
export const loading = writable(true);
export const error = writable(null);

// UI state stores
export const searchTerm = writable('');
export const languageFilter = writable('all');
export const sortBy = writable('lines'); // 'name', 'lines', 'cost', 'updated'
export const sortOrder = writable('desc'); // 'asc' or 'desc'
export const selectedRepo = writable(null);
export const displayLimit = writable(10); // Number of repos to display

/**
 * Select a repository to view details
 */
export function selectRepo(repoId) {
  selectedRepo.set(repoId);
}

/**
 * Clear selected repository
 */
export function clearSelectedRepo() {
  selectedRepo.set(null);
}

/**
 * Load portfolio data from JSON files
 */
export async function loadPortfolioData() {
  loading.set(true);
  error.set(null);

  try {
    const data = await loadMasterIndex();
    portfolioData.set(data);
    loading.set(false);
  } catch (err) {
    error.set(err.message);
    loading.set(false);
    console.error('Failed to load portfolio data:', err);
  }
}

/**
 * Derived store: Filtered and sorted repositories
 */
export const filteredRepos = derived(
  [portfolioData, searchTerm, languageFilter, sortBy, sortOrder, displayLimit],
  ([$portfolioData, $searchTerm, $languageFilter, $sortBy, $sortOrder, $displayLimit]) => {
    if (!$portfolioData || !$portfolioData.repos) return [];

    // Filter repositories (includes minimum lines filter of 500)
    let repos = filterRepos($portfolioData.repos, $searchTerm, $languageFilter);

    // Sort repositories
    repos = sortRepos(repos, $sortBy, $sortOrder);

    // Limit displayed repositories
    if ($displayLimit && $displayLimit > 0) {
      repos = repos.slice(0, $displayLimit);
    }

    return repos;
  }
);

/**
 * Derived store: Available languages for filtering
 */
export const availableLanguages = derived(
  portfolioData,
  ($portfolioData) => {
    if (!$portfolioData || !$portfolioData.repos) return [];

    const languages = new Set();
    $portfolioData.repos.forEach(repo => {
      if (repo.primaryLanguage) {
        languages.add(repo.primaryLanguage);
      }
    });

    return Array.from(languages).sort();
  }
);

/**
 * Derived store: Portfolio statistics
 */
export const portfolioStats = derived(
  portfolioData,
  ($portfolioData) => {
    if (!$portfolioData) return null;

    const totals = $portfolioData.portfolioTotals;

    return {
      totalRepos: $portfolioData.totalRepos,
      publicRepos: $portfolioData.totalPublicRepos,
      privateRepos: $portfolioData.totalPrivateRepos,
      totalLines: totals.totalLines,
      totalCode: totals.totalCode,
      totalFiles: totals.totalFiles,
      totalComplexity: totals.totalComplexity,
      languages: totals.languages,
      estimatedValue: totals.estimatedValue,
      soloDeveloper: totals.soloDeveloper
    };
  }
);

/**
 * Reset all filters
 */
export function resetFilters() {
  searchTerm.set('');
  languageFilter.set('all');
  sortBy.set('lines');
  sortOrder.set('desc');
}

/**
 * Toggle sort order
 */
export function toggleSortOrder() {
  sortOrder.update(order => order === 'asc' ? 'desc' : 'asc');
}
