<script>
  import { onMount } from 'svelte';
  import { loadRepoDetails, formatNumber, formatCurrency, formatDuration } from '../../utils/dataLoader.js';
  import LanguageSpider from './LanguageSpider.svelte';
  import RepoMetricsTable from './RepoMetricsTable.svelte';

  export let repoId = '';
  export let closeHandler = null;

  let repoData = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      repoData = await loadRepoDetails(repoId);
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
      console.error('Failed to load repo details:', err);
    }
  });

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget && closeHandler) {
      closeHandler();
    }
  }

  function handleClose() {
    if (closeHandler) closeHandler();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && closeHandler) {
      closeHandler();
    }
  }

  function handleBackdropKeydown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget && closeHandler) {
      e.preventDefault();
      closeHandler();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Modal Backdrop -->
<div
  class="modal-backdrop"
  role="button"
  tabindex="0"
  on:click={handleBackdropClick}
  on:keydown={handleBackdropKeydown}
  aria-label="Close modal"
>
  <div class="modal-container">
    <!-- Close Button -->
    <button class="close-btn" on:click={handleClose} aria-label="Close">
      ✕
    </button>

    {#if loading}
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading repository details...</p>
      </div>
    {:else if error}
      <div class="error-state">
        <span class="error-icon">⚠️</span>
        <h3>Failed to load repository</h3>
        <p>{error}</p>
        <button class="retry-btn" on:click={handleClose}>Close</button>
      </div>
    {:else if repoData}
      <div class="modal-content">
        <!-- Header Section -->
        <header class="repo-header">
          <div class="header-main">
            <h2>{repoData.metadata.name}</h2>
            {#if repoData.metadata.isAnonymized}
              <span class="badge private">Private</span>
            {:else if repoData.metadata.isPrivate}
              <span class="badge private">Private</span>
            {:else}
              <span class="badge public">Public</span>
            {/if}
          </div>
          {#if repoData.metadata.description}
            <p class="description">{repoData.metadata.description}</p>
          {/if}
          <div class="meta-tags">
            {#if repoData.metadata.language}
              <span class="tag">{repoData.metadata.language}</span>
            {/if}
            {#if repoData.metadata.stars > 0}
              <span class="tag stars">⭐ {repoData.metadata.stars}</span>
            {/if}
            {#if repoData.metadata.lastUpdated}
              <span class="tag">Updated: {new Date(repoData.metadata.lastUpdated).toLocaleDateString()}</span>
            {/if}
          </div>
        </header>

        <!-- Summary Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{formatNumber(repoData.computed.summary.totalCode)}</div>
            <div class="stat-label">Lines of Code</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{formatNumber(repoData.computed.summary.totalFiles)}</div>
            <div class="stat-label">Files</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{repoData.computed.summary.totalLanguages}</div>
            <div class="stat-label">Languages</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{formatNumber(repoData.computed.summary.totalComplexity)}</div>
            <div class="stat-label">Complexity</div>
          </div>
        </div>

        <!-- COCOMO Comparison Section -->
        <div class="cocomo-section">
          <h3>💰 Development Estimates (COCOMO)</h3>
          <div class="cocomo-comparison">
            <div class="cocomo-column traditional">
              <h4>Traditional Development</h4>
              <div class="cocomo-stats">
                <div class="cocomo-stat">
                  <span class="label">Cost:</span>
                  <span class="value">{formatCurrency(repoData.computed.cocomo.traditional.cost)}</span>
                </div>
                <div class="cocomo-stat">
                  <span class="label">Time:</span>
                  <span class="value">{repoData.computed.cocomo.traditional.time} months</span>
                </div>
                <div class="cocomo-stat">
                  <span class="label">People:</span>
                  <span class="value">{repoData.computed.cocomo.traditional.people}</span>
                </div>
                <div class="cocomo-stat">
                  <span class="label">Solo Dev:</span>
                  <span class="value">{repoData.computed.cocomo.singleDeveloper.traditional.fullTime.months.toFixed(1)} months</span>
                </div>
              </div>
            </div>

            <div class="vs-divider">
              <span>VS</span>
            </div>

            <div class="cocomo-column ai-assisted">
              <h4>AI-Assisted Development</h4>
              <div class="cocomo-stats">
                <div class="cocomo-stat">
                  <span class="label">Cost:</span>
                  <span class="value">{formatCurrency(repoData.computed.cocomo.aiAssisted.cost)}</span>
                </div>
                <div class="cocomo-stat">
                  <span class="label">Time:</span>
                  <span class="value">{repoData.computed.cocomo.aiAssisted.time} months</span>
                </div>
                <div class="cocomo-stat">
                  <span class="label">People:</span>
                  <span class="value">{repoData.computed.cocomo.aiAssisted.people}</span>
                </div>
                <div class="cocomo-stat">
                  <span class="label">Solo Dev:</span>
                  <span class="value">{repoData.computed.cocomo.singleDeveloper.aiAssisted.fullTime.months.toFixed(1)} months</span>
                </div>
              </div>
              <div class="savings">
                💵 Saves {repoData.computed.cocomo.comparison.costReduction} cost • {repoData.computed.cocomo.comparison.speedup} faster
              </div>
            </div>
          </div>
        </div>

        <!-- Language Visualizations: Side-by-Side -->
        <div class="languages-section">
          <h3>📊 Language Analysis</h3>
          <div class="visualization-container">
            <!-- Spider Chart (Left) -->
            <div class="spider-container">
              <h4>Distribution Radar</h4>
              <LanguageSpider
                languages={repoData.computed.languages}
                size={400}
                showLabels={true}
                animationDuration={750}
              />
            </div>

            <!-- Metrics Table (Right) -->
            <div class="table-container">
              <h4>Detailed Metrics</h4>
              <RepoMetricsTable
                languages={repoData.sccRaw}
                showTotals={true}
                sortable={true}
              />
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    overflow-y: auto;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-container {
    position: relative;
    background: var(--bg-card, rgba(20, 20, 30, 0.95));
    border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.1));
    border-radius: 16px;
    max-width: 1400px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .close-btn {
    position: sticky;
    top: 1rem;
    right: 1rem;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--text-primary, white);
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .modal-content {
    padding: 2rem;
    clear: both;
  }

  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1.5rem;
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

  /* Error State */
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1rem;
    text-align: center;
  }

  .error-icon {
    font-size: 4rem;
  }

  .retry-btn {
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

  .retry-btn:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  /* Header Section */
  .repo-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-primary, rgba(255, 255, 255, 0.1));
  }

  .header-main {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .repo-header h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary, white);
  }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .badge.public {
    background: rgba(34, 197, 94, 0.2);
    color: rgb(34, 197, 94);
    border: 1px solid rgba(34, 197, 94, 0.4);
  }

  .badge.private {
    background: rgba(251, 191, 36, 0.2);
    color: rgb(251, 191, 36);
    border: 1px solid rgba(251, 191, 36, 0.4);
  }

  .description {
    font-size: 1.1rem;
    color: var(--text-secondary, rgba(255, 255, 255, 0.7));
    margin: 0.5rem 0;
  }

  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .tag {
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.875rem;
    color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  }

  .tag.stars {
    background: rgba(251, 191, 36, 0.1);
    border-color: rgba(251, 191, 36, 0.3);
    color: rgb(251, 191, 36);
  }

  /* Summary Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.1));
    text-align: center;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary, white);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--text-muted, rgba(255, 255, 255, 0.5));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* COCOMO Section */
  .cocomo-section {
    margin-bottom: 2rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.1));
  }

  .cocomo-section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    color: var(--text-primary, white);
  }

  .cocomo-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
  }

  .cocomo-column {
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .cocomo-column h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: var(--text-secondary, rgba(255, 255, 255, 0.8));
  }

  .cocomo-column.traditional {
    border-left: 3px solid rgba(255, 255, 255, 0.3);
  }

  .cocomo-column.ai-assisted {
    border-left: 3px solid rgb(59, 130, 246);
  }

  .cocomo-stats {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .cocomo-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .cocomo-stat:last-child {
    border-bottom: none;
  }

  .cocomo-stat .label {
    font-size: 0.9rem;
    color: var(--text-muted, rgba(255, 255, 255, 0.6));
  }

  .cocomo-stat .value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary, white);
  }

  .vs-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-muted, rgba(255, 255, 255, 0.4));
  }

  .savings {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgb(59, 130, 246);
  }

  /* Language Analysis Section */
  .languages-section {
    margin-bottom: 2rem;
  }

  .languages-section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    color: var(--text-primary, white);
  }

  .visualization-container {
    display: grid;
    grid-template-columns: 450px 1fr;
    gap: 2rem;
    align-items: start;
  }

  .spider-container,
  .table-container {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.1));
    padding: 1.5rem;
  }

  .spider-container h4,
  .table-container h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: var(--text-secondary, rgba(255, 255, 255, 0.8));
  }

  @media (max-width: 1200px) {
    .visualization-container {
      grid-template-columns: 1fr;
    }

    .spider-container {
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    .modal-backdrop {
      padding: 1rem;
    }

    .modal-content {
      padding: 1rem;
    }

    .cocomo-comparison {
      grid-template-columns: 1fr;
    }

    .vs-divider {
      transform: rotate(90deg);
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
</style>
