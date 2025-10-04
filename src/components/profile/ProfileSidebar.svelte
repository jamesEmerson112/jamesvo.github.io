<script>
  import { profileData } from '../../stores/portfolioStore.js';

  // Mobile collapsible state
  let expandedSections = {
    summary: true,
    achievements: true,
    education: true,
    experience: true
  };

  function toggleSection(section) {
    expandedSections[section] = !expandedSections[section];
  }
</script>

<aside class="profile-sidebar">
  <!-- Summary Section -->
  <section class="sidebar-section">
    <button
      class="section-header"
      on:click={() => toggleSection('summary')}
      aria-expanded={expandedSections.summary}
    >
      <h3>📝 About</h3>
      <span class="toggle-icon">{expandedSections.summary ? '▼' : '▶'}</span>
    </button>
    {#if expandedSections.summary}
      <div class="section-content">
        {#if $profileData.summary && $profileData.summary !== '<missing data>'}
          <p class="summary-text">{$profileData.summary}</p>
        {:else}
          <p class="placeholder-text">
            <em>Professional summary will appear here...</em>
          </p>
        {/if}
      </div>
    {/if}
  </section>

  <!-- Achievements Section -->
  <section class="sidebar-section">
    <button
      class="section-header"
      on:click={() => toggleSection('achievements')}
      aria-expanded={expandedSections.achievements}
    >
      <h3>🏆 Achievements</h3>
      <span class="toggle-icon">{expandedSections.achievements ? '▼' : '▶'}</span>
    </button>
    {#if expandedSections.achievements}
      <div class="section-content">
        <ul class="achievements-list">
          {#each $profileData.achievements as achievement}
            <li class="achievement-item">
              <span class="achievement-icon">{achievement.icon}</span>
              <div class="achievement-content">
                <span class="achievement-year">{achievement.year}</span>
                <p class="achievement-title">{achievement.title}</p>
                {#if achievement.description && achievement.description !== '<missing data>'}
                  <p class="achievement-desc">{achievement.description}</p>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>

  <!-- Education Section -->
  <section class="sidebar-section">
    <button
      class="section-header"
      on:click={() => toggleSection('education')}
      aria-expanded={expandedSections.education}
    >
      <h3>🎓 Education</h3>
      <span class="toggle-icon">{expandedSections.education ? '▼' : '▶'}</span>
    </button>
    {#if expandedSections.education}
      <div class="section-content">
        <ul class="timeline-list">
          {#each $profileData.education as edu}
            <li class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                {#if edu.degree && edu.degree !== '<missing data>'}
                  <p class="timeline-title">{edu.degree}</p>
                {:else}
                  <p class="placeholder-text"><em>Degree placeholder</em></p>
                {/if}
                {#if edu.institution && edu.institution !== '<missing data>'}
                  <p class="timeline-subtitle">{edu.institution}</p>
                {:else}
                  <p class="placeholder-text"><em>Institution placeholder</em></p>
                {/if}
                {#if edu.year && edu.year !== '<missing data>'}
                  <p class="timeline-date">{edu.year}</p>
                {/if}
                {#if edu.description}
                  <p class="timeline-desc">{edu.description}</p>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>

  <!-- Experience Section -->
  <section class="sidebar-section">
    <button
      class="section-header"
      on:click={() => toggleSection('experience')}
      aria-expanded={expandedSections.experience}
    >
      <h3>💼 Experience</h3>
      <span class="toggle-icon">{expandedSections.experience ? '▼' : '▶'}</span>
    </button>
    {#if expandedSections.experience}
      <div class="section-content">
        <ul class="timeline-list">
          {#each $profileData.experience as exp}
            <li class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                {#if exp.title && exp.title !== '<missing data>'}
                  <p class="timeline-title">{exp.title}</p>
                {:else}
                  <p class="placeholder-text"><em>Job title placeholder</em></p>
                {/if}
                {#if exp.company && exp.company !== '<missing data>'}
                  <p class="timeline-subtitle">{exp.company}</p>
                {:else}
                  <p class="placeholder-text"><em>Company placeholder</em></p>
                {/if}
                {#if exp.period && exp.period !== '<missing data>'}
                  <p class="timeline-date">{exp.period}</p>
                {/if}
                {#if exp.description && exp.description !== '<missing data>'}
                  <p class="timeline-desc">{exp.description}</p>
                {/if}
                {#if exp.highlights && exp.highlights.length > 0}
                  <ul class="highlights">
                    {#each exp.highlights as highlight}
                      <li>{highlight}</li>
                    {/each}
                  </ul>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>
</aside>

<style>
  .profile-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Section Structure */
  .sidebar-section {
    background: var(--bg-card);
    border-radius: 8px;
    border: 1px solid var(--border-primary);
    overflow: hidden;
    transition: var(--theme-transition);
  }

  .section-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .section-header:hover {
    background: var(--bg-card-hover);
  }

  .section-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);
  }

  .toggle-icon {
    font-size: 0.8rem;
    color: var(--text-muted);
    transition: transform 0.2s ease;
  }

  .section-content {
    padding: 0 1.25rem 1.25rem 1.25rem;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Summary */
  .summary-text {
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0;
  }

  .placeholder-text {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0;
  }

  /* Achievements */
  .achievements-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .achievement-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .achievement-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .achievement-content {
    flex: 1;
  }

  .achievement-year {
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
    background: var(--bg-secondary);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.25rem;
  }

  .achievement-title {
    font-weight: 600;
    color: var(--text-primary);
    margin: 0.25rem 0 0.25rem 0;
  }

  .achievement-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0.25rem 0 0 0;
  }

  /* Timeline (Education & Experience) */
  .timeline-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
  }

  .timeline-list::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: var(--border-primary);
  }

  .timeline-item {
    display: flex;
    gap: 1rem;
    position: relative;
  }

  .timeline-marker {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 3px solid #3b82f6;
    flex-shrink: 0;
    margin-top: 4px;
    z-index: 1;
  }

  .timeline-content {
    flex: 1;
  }

  .timeline-title {
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }

  .timeline-subtitle {
    color: var(--text-secondary);
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
  }

  .timeline-date {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin: 0 0 0.5rem 0;
  }

  .timeline-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0.5rem 0 0 0;
  }

  .highlights {
    list-style: disc;
    padding-left: 1.25rem;
    margin: 0.5rem 0 0 0;
  }

  .highlights li {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 0.25rem;
  }

  /* Desktop: Hide toggle icon */
  @media (min-width: 769px) {
    .toggle-icon {
      display: none;
    }

    .section-header {
      cursor: default;
    }

    .section-header:hover {
      background: transparent;
    }
  }

  /* Mobile: Show toggle functionality */
  @media (max-width: 768px) {
    .profile-sidebar {
      gap: 1rem;
    }

    .section-header {
      padding: 0.875rem 1rem;
    }

    .section-header h3 {
      font-size: 1.1rem;
    }

    .section-content {
      padding: 0 1rem 1rem 1rem;
    }
  }
</style>
