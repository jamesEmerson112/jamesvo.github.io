import { writable, derived } from 'svelte/store';
import { fetchPortfolioIndex } from '../utils/dataLoader.js';

/**
 * Portfolio Store
 * Manages portfolio metrics state
 */

// Create a writable store for the portfolio data
function createPortfolioStore() {
  const { subscribe, set, update } = writable({
    data: null,
    loading: true,
    error: null
  });

  return {
    subscribe,

    // Load portfolio data from the API
    async load() {
      update(state => ({ ...state, loading: true, error: null }));

      try {
        const data = await fetchPortfolioIndex();
        set({ data, loading: false, error: null });
      } catch (error) {
        set({ data: null, loading: false, error: error.message });
      }
    },

    // Reset the store
    reset() {
      set({ data: null, loading: false, error: null });
    }
  };
}

export const portfolio = createPortfolioStore();

// Derived stores for easy access to specific data
export const portfolioTotals = derived(
  portfolio,
  $portfolio => $portfolio.data?.portfolioTotals || null
);

export const repos = derived(
  portfolio,
  $portfolio => $portfolio.data?.repos || []
);

export const languages = derived(
  portfolio,
  $portfolio => $portfolio.data?.portfolioTotals?.languages || {}
);

export const isLoading = derived(
  portfolio,
  $portfolio => $portfolio.loading
);

export const hasError = derived(
  portfolio,
  $portfolio => $portfolio.error
);
