<script>
  import { onMount } from 'svelte';
  import { loading, error, loadPortfolioData, selectedRepo, clearSelectedRepo } from './stores/portfolioStore.js';
  import ThemeSwitcher from './components/ThemeSwitcher.svelte';
  import ProfileHeader from './components/profile/ProfileHeader.svelte';
  import ProfileSidebar from './components/profile/ProfileSidebar.svelte';
  import TechDomainSpider from './components/profile/TechDomainSpider.svelte';
  import ProjectShowcase from './components/profile/ProjectShowcase.svelte';
  import RepoDetail from './components/portfolio/RepoDetail.svelte';
  import './styles/themes.css';

  // Load portfolio data on mount
  onMount(() => {
    loadPortfolioData();
  });
</script>

<ThemeSwitcher />

<main>
  {#if $loading}
    <!-- Loading State -->
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading portfolio...</p>
    </div>
  {:else if $error}
    <!-- Error State -->
    <div class="error-state">
      <span class="error-icon">⚠️</span>
      <h3>Failed to load portfolio</h3>
      <p>{$error}</p>
      <button class="retry-button" on:click={loadPortfolioData}>
        Try Again
      </button>
    </div>
  {:else}
    <!-- Profile Header -->
    <ProfileHeader />

    <!-- Main Content: Two-Column Layout -->
    <div class="content-container">
      <!-- Left Sidebar (33%) -->
      <aside class="sidebar">
        <ProfileSidebar />
      </aside>

      <!-- Right Content Area (67%) -->
      <div class="main-content">
        <TechDomainSpider />
        <ProjectShowcase />
      </div>
    </div>
  {/if}
</main>

<!-- Repository Detail Modal -->
{#if $selectedRepo}
  <RepoDetail
    repoId={$selectedRepo}
    closeHandler={clearSelectedRepo}
  />
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--font-family-primary);
    transition: var(--theme-transition);
  }

  main {
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: var(--theme-transition);
  }

  /* Loading & Error States */
  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    gap: 1.5rem;
    text-align: center;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(59, 130, 246, 0.2);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-state p {
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  .error-icon {
    font-size: 4rem;
  }

  .error-state h3 {
    font-size: 1.5rem;
    margin: 0;
    color: var(--text-primary);
  }

  .error-state p {
    color: var(--text-secondary);
    max-width: 400px;
  }

  .retry-button {
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 0.5rem;
  }

  .retry-button:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  /* Main Content Container */
  .content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: start;
  }

  /* Sidebar (33%) */
  .sidebar {
    position: sticky;
    top: 2rem;
  }

  /* Main Content Area (67%) */
  .main-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Desktop First - No mobile styles yet */
  @media (min-width: 1200px) {
    .content-container {
      max-width: 1400px;
    }
  }
</style>
