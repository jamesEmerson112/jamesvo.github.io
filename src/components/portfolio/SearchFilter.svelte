<script>
  import { searchTerm, languageFilter, sortBy, sortOrder, availableLanguages, resetFilters, toggleSortOrder } from '../../stores/portfolioStore.js';
  
  const sortOptions = [
    { value: 'lines', label: 'Lines of Code' },
    { value: 'cost', label: 'Cost (AI)' },
    { value: 'name', label: 'Name' },
    { value: 'updated', label: 'Last Updated' }
  ];
</script>

<div class="search-filter">
  <!-- Search Input -->
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      placeholder="Search repositories..."
      bind:value={$searchTerm}
      class="search-input"
    />
    {#if $searchTerm}
      <button class="clear-button" on:click={() => searchTerm.set('')} title="Clear search">
        ✕
      </button>
    {/if}
  </div>
  
  <!-- Filters -->
  <div class="filters">
    <!-- Language Filter -->
    <div class="filter-group">
      <label for="language-filter" class="filter-label">Language:</label>
      <select id="language-filter" bind:value={$languageFilter} class="filter-select">
        <option value="all">All Languages</option>
        {#each $availableLanguages as language}
          <option value={language}>{language}</option>
        {/each}
      </select>
    </div>
    
    <!-- Sort By -->
    <div class="filter-group">
      <label for="sort-by" class="filter-label">Sort by:</label>
      <select id="sort-by" bind:value={$sortBy} class="filter-select">
        {#each sortOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
    
    <!-- Sort Order Toggle -->
    <button class="sort-toggle" on:click={toggleSortOrder} title="Toggle sort order">
      {#if $sortOrder === 'desc'}
        <span class="toggle-icon">↓</span>
        <span class="toggle-label">Desc</span>
      {:else}
        <span class="toggle-icon">↑</span>
        <span class="toggle-label">Asc</span>
      {/if}
    </button>
    
    <!-- Reset Button -->
    <button class="reset-button" on:click={resetFilters} title="Reset all filters">
      <span class="reset-icon">↻</span>
      <span class="reset-label">Reset</span>
    </button>
  </div>
</div>

<style>
  .search-filter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--card-bg, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    border-radius: 12px;
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    font-size: 1.25rem;
    opacity: 0.5;
  }

  .search-input {
    flex: 1;
    padding: 0.75rem 3rem 0.75rem 3rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    border-radius: 8px;
    font-size: 1rem;
    color: inherit;
    transition: all 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .search-input::placeholder {
    opacity: 0.5;
  }

  .clear-button {
    position: absolute;
    right: 1rem;
    padding: 0.25rem;
    background: none;
    border: none;
    color: inherit;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .clear-button:hover {
    opacity: 1;
  }

  .filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-label {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.7;
    white-space: nowrap;
  }

  .filter-select {
    padding: 0.5rem 0.75rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    border-radius: 6px;
    color: inherit;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-select:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }

  .filter-select:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .sort-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 6px;
    color: #3b82f6;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .sort-toggle:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }

  .toggle-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .toggle-label {
    font-size: 0.75rem;
  }

  .reset-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 6px;
    color: #ef4444;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    margin-left: auto;
  }

  .reset-button:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);
  }

  .reset-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .reset-label {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    .search-filter {
      padding: 1rem;
    }

    .filters {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }

    .filter-group {
      justify-content: space-between;
      width: 100%;
    }

    .filter-select {
      flex: 1;
    }

    .sort-toggle,
    .reset-button {
      width: 100%;
      justify-content: center;
      margin-left: 0;
    }
  }
</style>
