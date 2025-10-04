/**
 * Portfolio Store
 * Manages portfolio metrics state using Svelte stores
 */

import { writable, derived } from 'svelte/store';
import { loadMasterIndex } from '../utils/dataLoader.js';
import { filterRepos, sortRepos } from '../utils/dataLoader.js';
import { profileData as profileDataImport } from '../data/profileData.js';
import { TECH_DOMAINS } from '../data/techDomains.js';
import { projectEnhancements } from '../data/projectEnhancements.js';

// Core data stores
export const portfolioData = writable(null);
export const loading = writable(true);
export const error = writable(null);

// Profile data store
export const profileData = writable(profileDataImport);

// UI state stores
export const searchTerm = writable('');
export const languageFilter = writable('all');
export const sortBy = writable('lines'); // 'name', 'lines', 'cost', 'updated'
export const sortOrder = writable('desc'); // 'asc' or 'desc'
export const selectedRepo = writable(null);
export const displayLimit = writable(10); // Number of repos to display

// Tech domain filtering (new for LinkedIn-style redesign)
export const selectedTechDomain = writable('all');

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

/**
 * Set tech domain filter
 */
export function setTechDomainFilter(domainId) {
  selectedTechDomain.set(domainId);
}

/**
 * Clear tech domain filter
 */
export function clearTechDomainFilter() {
  selectedTechDomain.set('all');
}

/**
 * Derived store: Repos filtered by tech domain
 * Merges existing filteredRepos with tech domain filtering
 */
export const techDomainFilteredRepos = derived(
  [filteredRepos, selectedTechDomain],
  ([$repos, $domain]) => {
    if ($domain === 'all') return $repos;

    // Filter repos that match the selected tech domain
    return $repos.filter(repo => {
      const enhancement = projectEnhancements[repo.id];
      return enhancement && enhancement.techDomains.includes($domain);
    });
  }
);

/**
 * Derived store: Featured projects only
 */
export const featuredProjects = derived(
  techDomainFilteredRepos,
  ($repos) => {
    return $repos.filter(repo => {
      const enhancement = projectEnhancements[repo.id];
      return enhancement && enhancement.isFeatured;
    });
  }
);

/**
 * Derived store: Project counts per tech domain
 * Calculates how many projects belong to each domain
 */
export const domainCounts = derived(
  portfolioData,
  ($data) => {
    if (!$data || !$data.repos) return {};

    const counts = {};

    // Initialize all domains with 0
    TECH_DOMAINS.forEach(domain => {
      counts[domain.id] = 0;
    });

    // Count projects per domain
    $data.repos.forEach(repo => {
      const enhancement = projectEnhancements[repo.id];
      if (enhancement && enhancement.techDomains) {
        enhancement.techDomains.forEach(domainId => {
          counts[domainId] = (counts[domainId] || 0) + 1;
        });
      }
    });

    return counts;
  }
);

/**
 * Derived store: Enriched repos with enhancement data
 * Merges repo data with projectEnhancements metadata
 */
export const enrichedRepos = derived(
  portfolioData,
  ($data) => {
    if (!$data || !$data.repos) return [];

    return $data.repos.map(repo => {
      const enhancement = projectEnhancements[repo.id];
      return {
        ...repo,
        techDomains: enhancement?.techDomains || [],
        hoursInvested: enhancement?.hoursInvested || 0,
        isFeatured: enhancement?.isFeatured || false,
        thumbnail: enhancement?.thumbnail || '/assets/projects/placeholder.jpg',
        shortDescription: enhancement?.shortDescription || repo.description
      };
    });
  }
);
