<script>
  import { SpiderChart } from 'svelte-spider-chart';
  import PolygonalSpiderChart from './PolygonalSpiderChart.svelte';
  import { onMount } from 'svelte';

  let visible = false;

  const characterStats = [
    {
      axis: "Strength",
      value: 85,
      description: "Physical power and melee damage",
      rationale: "Trained as a warrior from youth"
    },
    {
      axis: "Agility",
      value: 78,
      description: "Speed and evasion capability",
      rationale: "Acrobatic training and quick reflexes"
    },
    {
      axis: "Intelligence",
      value: 92,
      description: "Magic power and mana pool",
      rationale: "Master of arcane studies"
    },
    {
      axis: "Endurance",
      value: 70,
      description: "Health points and stamina",
      rationale: "Battle-hardened from countless fights"
    },
    {
      axis: "Dexterity",
      value: 88,
      description: "Accuracy and critical hit chance",
      rationale: "Expert archer and precision striker"
    },
    {
      axis: "Charisma",
      value: 65,
      description: "Leadership and influence",
      rationale: "Natural leader with commanding presence"
    }
  ];

  const config = {
    color: '#ff3e00',
    opacity: 0.6,
    strokeWidth: 3,
    levels: 5,
    animationDuration: 800,
    showAxisLabels: true,
    showLevelLabels: true
  };

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<section class="hero-section" class:visible>
  <div class="hero-content">
    <div class="character-info">
      <div class="character-header">
        <div class="level-badge">Level 45</div>
        <h1 class="character-name">Eldrin the Arcane Warrior</h1>
        <p class="character-class">⚔️ Battlemage • 🎯 Specialist</p>
      </div>

      <div class="stats-summary">
        <div class="stat-pill">
          <span class="stat-icon">💪</span>
          <span class="stat-text">Strength: 85</span>
        </div>
        <div class="stat-pill">
          <span class="stat-icon">⚡</span>
          <span class="stat-text">Agility: 78</span>
        </div>
        <div class="stat-pill">
          <span class="stat-icon">🧠</span>
          <span class="stat-text">Intelligence: 92</span>
        </div>
        <div class="stat-pill">
          <span class="stat-icon">❤️</span>
          <span class="stat-text">Endurance: 70</span>
        </div>
        <div class="stat-pill">
          <span class="stat-icon">🎯</span>
          <span class="stat-text">Dexterity: 88</span>
        </div>
        <div class="stat-pill">
          <span class="stat-icon">✨</span>
          <span class="stat-text">Charisma: 65</span>
        </div>
      </div>

      <div class="character-description">
        <p>
          A legendary warrior who mastered both blade and spell, Eldrin combines raw physical prowess
          with devastating magical abilities. His journey from a simple village guard to an arcane
          battlemage has shaped him into one of the realm's most formidable champions.
        </p>
      </div>
    </div>

    <div class="charts-comparison">
      <div class="chart-section">
        <h3 class="chart-type-label">Circular Grid</h3>
        <div class="chart-wrapper">
          <SpiderChart
            data={characterStats}
            {config}
            width="400px"
            height="400px"
            title="Character Attributes"
            description="Traditional circular grid visualization"
            min={0}
            max={100}
            titleClass="chart-title"
            descriptionClass="chart-description"
          />
        </div>
      </div>

      <div class="chart-section">
        <h3 class="chart-type-label">Polygonal Grid</h3>
        <div class="chart-wrapper polygonal">
          <PolygonalSpiderChart
            data={characterStats}
            size={400}
            levels={5}
            color="#2196F3"
            showLabels={true}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  </div>

  <div class="demo-badge">
    <span class="badge-icon">🎮</span>
    <span class="badge-text">Interactive Demo</span>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    background: linear-gradient(135deg, rgba(20, 10, 40, 0.95), rgba(40, 20, 60, 0.9));
    border-radius: 24px;
    padding: 3rem;
    margin-bottom: 3rem;
    border: 2px solid rgba(255, 62, 0, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
                0 0 40px rgba(255, 62, 0, 0.1) inset;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 62, 0, 0.1) 0%, transparent 70%);
    animation: pulse 8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.5; }
  }

  .hero-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    z-index: 1;
  }

  .character-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .character-header {
    position: relative;
  }

  .level-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ff3e00, #ff6b35);
    color: white;
    padding: 0.5rem 1.25rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    box-shadow: 0 4px 12px rgba(255, 62, 0, 0.4);
    margin-bottom: 1rem;
    animation: glow 2s ease-in-out infinite;
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 4px 12px rgba(255, 62, 0, 0.4); }
    50% { box-shadow: 0 4px 20px rgba(255, 62, 0, 0.8); }
  }

  .character-name {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff, #ff3e00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 0 30px rgba(255, 62, 0, 0.3);
  }

  .character-class {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-weight: 500;
  }

  .stats-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  .stat-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .stat-pill:hover {
    background: rgba(255, 62, 0, 0.1);
    border-color: rgba(255, 62, 0, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 62, 0, 0.2);
  }

  .stat-icon {
    font-size: 1.25rem;
    filter: drop-shadow(0 0 4px rgba(255, 62, 0, 0.5));
  }

  .stat-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  .character-description {
    background: rgba(0, 0, 0, 0.3);
    border-left: 3px solid #ff3e00;
    padding: 1.25rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .character-description p {
    margin: 0;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
  }

  .charts-comparison {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;
    margin-top: 1rem;
  }

  .chart-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chart-type-label {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ff3e00;
    text-align: center;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px rgba(255, 62, 0, 0.5);
  }

  .chart-wrapper {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 450px;
  }

  .chart-wrapper.polygonal {
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(255, 62, 0, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(255, 62, 0, 0.2) inset;
  }

  .demo-badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 62, 0, 0.2);
    border: 1px solid rgba(255, 62, 0, 0.4);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    z-index: 2;
  }

  .badge-icon {
    font-size: 1.25rem;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  .badge-text {
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Chart customization */
  :global(.chart-title) {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #ff3e00 !important;
    text-align: center !important;
    margin-bottom: 0.5rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
  }

  :global(.chart-description) {
    font-size: 0.875rem !important;
    color: rgba(255, 255, 255, 0.7) !important;
    text-align: center !important;
    margin-bottom: 1.5rem !important;
    font-style: italic !important;
  }

  @media (max-width: 1200px) {
    .charts-comparison {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .chart-wrapper {
      min-height: 400px;
    }
  }

  @media (max-width: 1024px) {
    .hero-section {
      padding: 2rem;
    }

    .character-name {
      font-size: 2rem;
    }

    .stats-summary {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .hero-section {
      padding: 1.5rem;
    }

    .character-name {
      font-size: 1.5rem;
    }

    .stats-summary {
      grid-template-columns: 1fr;
    }

    .demo-badge {
      top: 1rem;
      right: 1rem;
      padding: 0.375rem 0.75rem;
    }

    .badge-text {
      display: none;
    }
  }
</style>
