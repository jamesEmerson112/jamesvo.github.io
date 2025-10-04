<script>
  import { techDomainFilteredRepos, featuredProjects, selectedTechDomain } from '../../stores/portfolioStore.js';
  import { projectEnhancements } from '../../data/projectEnhancements.js';
  import { TECH_DOMAINS } from '../../data/techDomains.js';
  import RepoCard from '../portfolio/RepoCard.svelte';

  // Separate featured and regular projects
  $: featured = $featuredProjects;
  $: regularProjects = $techDomainFilteredRepos.filter(repo => {
    const enhancement = projectEnhancements[repo.id];
    return !(enhancement && enhancement.isFeatured);
  });

  // Get active domain for display
  $: activeDomain = $selectedTechDomain !== 'all'
    ? TECH_DOMAINS.find(d => d.id === $selectedTechDomain)
    : null;
</script>

<section class="project-showcase">
  <!-- Section Header -->
  <div class="showcase-header">
    <h2>
      {#if activeDomain}
        <span style="color: {activeDomain.color};">{activeDomain.icon} {activeDomain.label}</span> Projects
      {:else}
        ⭐ Featured Projects
      {/if}
    </h2>
    <p class="showcase-subtitle">
      {#if activeDomain}
        Showing {$techDomainFilteredRepos.length} {activeDomain.label.toLowerCase()} {$techDomainFilteredRepos.length === 1 ? 'project' : 'projects'}
      {:else}
        Top projects across all technical domains
      {/if}
    </p>
  </div>

  <!-- Featured Projects Grid -->
  {#if featured.length > 0}
    <div class="featured-grid">
      {#each featured as repo (repo.id)}
        {@const enhancement = projectEnhancements[repo.id]}
        <div class="featured-card">
          <!-- Thumbnail -->
          <div class="featured-thumbnail">
            <div class="thumbnail-gradient">
              {#if enhancement?.techDomains && enhancement.techDomains.length > 0}
                {@const firstDomain = TECH_DOMAINS.find(d => d.id === enhancement.techDomains[0])}
                {#if firstDomain}
                  <span class="thumbnail-icon" style="color: {firstDomain.color};">
                    {firstDomain.icon}
                  </span>
                {/if}
              {:else}
                <span class="thumbnail-icon">📁</span>
              {/if}
              <span class="thumbnail-name">{repo.name}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="featured-content">
            <h3 class="featured-title">{repo.name}</h3>

            <!-- Tech Domain Tags -->
            {#if enhancement?.techDomains}
              <div class="tech-tags">
                {#each enhancement.techDomains as domainId}
                  {@const domain = TECH_DOMAINS.find(d => d.id === domainId)}
                  {#if domain}
                    <span class="tech-tag" style="background: {domain.color}20; color: {domain.color}; border-color: {domain.color}40;">
                      {domain.icon} {domain.label}
                    </span>
                  {/if}
                {/each}
              </div>
            {/if}

            <!-- Description -->
            <p class="featured-desc">
              {enhancement?.shortDescription || repo.description || 'No description available'}
            </p>

            <!-- Meta info -->
            <div class="featured-meta">
              {#if enhancement?.hoursInvested}
                <span class="meta-item">⏱️ {enhancement.hoursInvested} hours</span>
              {/if}
              <span class="meta-item">📝 {repo.summary?.lines.toLocaleString() || 0} lines</span>
              <span class="meta-item">🔧 {repo.summary?.complexity || 0} complexity</span>
            </div>

            <!-- View Details Button -->
            <button class="view-details" on:click={() => window.open(repo.url, '_blank')}>
              View on GitHub →
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- All Projects Section -->
  {#if regularProjects.length > 0 || ($selectedTechDomain !== 'all' && featured.length === 0)}
    <div class="all-projects-section">
      <h3 class="section-title">
        {#if $selectedTechDomain === 'all'}
          All Projects
        {:else}
          More {activeDomain?.label || ''} Projects
        {/if}
      </h3>

      {#if regularProjects.length > 0}
        <div class="projects-grid">
          {#each regularProjects as repo (repo.id)}
            <RepoCard {repo} />
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          <p>No additional projects in this domain</p>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Empty State -->
  {#if $techDomainFilteredRepos.length === 0}
    <div class="empty-state large">
      <span class="empty-icon">🔍</span>
      <h3>No projects found</h3>
      <p>Try selecting a different tech domain</p>
    </div>
  {/if}
</section>

<style>
  .project-showcase {
    width: 100%;
  }

  /* Header */
  .showcase-header {
    margin-bottom: 2rem;
  }

  .showcase-header h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }

  .showcase-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
  }

  /* Featured Projects Grid */
  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .featured-card {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .featured-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    border-color: #3b82f6;
  }

  /* Thumbnail */
  .featured-thumbnail {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
  }

  .thumbnail-gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .thumbnail-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    opacity: 0.6;
  }

  .featured-card:hover .thumbnail-gradient {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25));
  }

  .thumbnail-icon {
    font-size: 4rem;
    opacity: 0.8;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    z-index: 1;
    transition: transform 0.3s ease;
  }

  .featured-card:hover .thumbnail-icon {
    transform: scale(1.1);
  }

  .thumbnail-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
    padding: 0 1rem;
    opacity: 0.7;
    z-index: 1;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .featured-card:hover .thumbnail-name {
    opacity: 1;
  }

  /* Content */
  .featured-content {
    padding: 1.5rem;
  }

  .featured-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: var(--text-primary);
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .tech-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    border: 1px solid;
    transition: all 0.2s ease;
  }

  .tech-tag:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px currentColor;
  }

  .featured-desc {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-secondary);
    margin: 0 0 1rem 0;
  }

  .featured-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-primary);
  }

  .meta-item {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .view-details {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .view-details:hover {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  /* All Projects Section */
  .all-projects-section {
    margin-top: 3rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    color: var(--text-primary);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--text-muted);
  }

  .empty-state.large {
    padding: 4rem 2rem;
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
  }

  .empty-icon {
    font-size: 4rem;
    opacity: 0.3;
    display: block;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }

  .empty-state p {
    margin: 0;
    color: var(--text-secondary);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .showcase-header h2 {
      font-size: 1.5rem;
    }

    .featured-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .featured-thumbnail {
      height: 160px;
    }

    .featured-content {
      padding: 1rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .all-projects-section {
      margin-top: 2rem;
    }
  }
</style>
