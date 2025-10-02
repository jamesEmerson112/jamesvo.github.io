<script>
  import { portfolioStats } from '../../stores/portfolioStore.js';
  import { formatNumber, formatCurrency, formatDuration } from '../../utils/dataLoader.js';
  
  // Calculate AI vs Traditional comparison
  $: aiSavings = $portfolioStats ? {
    costSaved: $portfolioStats.estimatedValue.standardCost * 0.75,
    timeReduction: '48%',
    speedup: '3.9x'
  } : null;
</script>

{#if $portfolioStats}
  <div class="portfolio-stats">
    <!-- Hero Stats -->
    <div class="hero-stats">
      <div class="stat-card primary">
        <div class="stat-value">{formatNumber($portfolioStats.totalLines)}</div>
        <div class="stat-label">Total Lines of Code</div>
        <div class="stat-sublabel">
          {formatNumber($portfolioStats.totalCode)} code • {formatNumber($portfolioStats.totalFiles)} files
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{$portfolioStats.totalRepos}</div>
        <div class="stat-label">Repositories</div>
        <div class="stat-sublabel">
          {$portfolioStats.publicRepos} public • {$portfolioStats.privateRepos} private
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{Object.keys($portfolioStats.languages).length}</div>
        <div class="stat-label">Languages</div>
        <div class="stat-sublabel">
          {Object.keys($portfolioStats.languages).slice(0, 3).join(', ')}
        </div>
      </div>
    </div>

    <!-- AI Impact Section -->
    <div class="ai-impact">
      <div class="impact-header">
        <span class="ai-badge">🤖 AI-Powered Development</span>
        <h3>Modern Development Reality</h3>
      </div>
      
      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="comparison-label">Traditional Estimate</div>
          <div class="comparison-value traditional">
            {formatCurrency($portfolioStats.estimatedValue.standardCost)}
          </div>
          <div class="comparison-sublabel">
            {formatDuration($portfolioStats.soloDeveloper.fullTimeMonths)}
          </div>
        </div>
        
        <div class="comparison-arrow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        
        <div class="comparison-item">
          <div class="comparison-label">AI-Assisted Reality</div>
          <div class="comparison-value ai">
            {formatCurrency($portfolioStats.estimatedValue.standardCost * 0.255)}
          </div>
          <div class="comparison-sublabel">
            {formatDuration($portfolioStats.soloDeveloper.fullTimeMonths * 0.255)}
          </div>
        </div>
      </div>
      
      <div class="impact-highlights">
        <div class="highlight">
          <span class="highlight-icon">⚡</span>
          <span class="highlight-value">{aiSavings.speedup}</span>
          <span class="highlight-label">faster</span>
        </div>
        <div class="highlight">
          <span class="highlight-icon">💰</span>
          <span class="highlight-value">75%</span>
          <span class="highlight-label">cost reduction</span>
        </div>
        <div class="highlight">
          <span class="highlight-icon">📈</span>
          <span class="highlight-value">~400%</span>
          <span class="highlight-label">productivity gain</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .portfolio-stats {
    margin-bottom: 3rem;
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: var(--card-bg, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    border-radius: 12px;
    padding: 2rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .stat-card.primary {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
    border-color: rgba(79, 70, 229, 0.3);
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    opacity: 0.9;
  }

  .stat-sublabel {
    font-size: 0.875rem;
    opacity: 0.6;
  }

  /* AI Impact Section */
  .ai-impact {
    background: var(--card-bg, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    border-radius: 16px;
    padding: 2rem;
  }

  .impact-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .ai-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .impact-header h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
  }

  .comparison-item {
    text-align: center;
  }

  .comparison-label {
    font-size: 0.875rem;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }

  .comparison-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .comparison-value.traditional {
    color: #ef4444;
    text-decoration: line-through;
    opacity: 0.7;
  }

  .comparison-value.ai {
    background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .comparison-sublabel {
    font-size: 0.875rem;
    opacity: 0.6;
  }

  .comparison-arrow {
    color: #3b82f6;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  .impact-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .highlight {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 8px;
  }

  .highlight-icon {
    font-size: 1.5rem;
  }

  .highlight-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #3b82f6;
  }

  .highlight-label {
    font-size: 0.875rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .comparison-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .comparison-arrow {
      transform: rotate(90deg);
    }

    .stat-value {
      font-size: 2rem;
    }

    .comparison-value {
      font-size: 1.5rem;
    }
  }
</style>
