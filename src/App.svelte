<script>
  import { onMount } from 'svelte';
  import { darkMode } from './stores/theme.js';
  import ThemeSwitcher from './components/ThemeSwitcher.svelte';
  import GamingCharacterDemo from './components/GamingCharacterDemo.svelte';
  import CodeMetrics from './components/CodeMetrics.svelte';
  import PortfolioOverview from './components/portfolio/PortfolioOverview.svelte';
  import './styles/themes.css';

  let name = 'James Vo';
  let currentTime = new Date().toLocaleString();

  // Component mount - no longer need to manually set data-dark as store handles this
  onMount(() => {
    // Store now handles data-dark attribute initialization
  });

  // Update time every second
  setInterval(() => {
    currentTime = new Date().toLocaleString();
  }, 1000);

  // Data-light attribute is now handled automatically by the theme store
</script>

<main>
  <ThemeSwitcher />

  <GamingCharacterDemo />

  <div class="hero">
    <h1>Hello, I'm {name}! 👋</h1>
    <p class="subtitle">Full Stack Developer & Creative Technologist</p>
    <p class="description">Welcome to my personal website built with Svelte and deployed on GitHub Pages ✨</p>
    <div class="time">Current time: {currentTime}</div>
  </div>

  <CodeMetrics />

  <PortfolioOverview />

  <div class="animation">✨</div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--font-family-primary);
    transition: var(--theme-transition);
  }

  main {
    text-align: center;
    padding: 2em;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--bg-primary);
    color: var(--text-primary);
    gap: 3em;
    transition: var(--theme-transition);
  }

  .hero {
    max-width: 800px;
    animation: fadeIn 1s ease-in;
  }

  h1 {
    font-size: 3.5em;
    font-weight: var(--font-weight-normal);
    margin: 0.2em 0;
    animation: fadeIn 1s ease-in;
    color: var(--text-primary);
  }

  .subtitle {
    font-size: 1.4em;
    font-weight: var(--font-weight-medium);
    margin: 0.5em 0;
    animation: fadeIn 1.2s ease-in;
    color: var(--text-secondary);
  }

  .description {
    font-size: 1.1em;
    margin: 1em 0;
    animation: fadeIn 1.4s ease-in;
    color: var(--text-muted);
  }

  .time {
    font-size: 1em;
    margin-top: 1.5em;
    padding: 0.5em 1em;
    background: var(--bg-secondary);
    border-radius: var(--card-border-radius);
    border: 1px solid var(--border-primary);
    animation: fadeIn 1.6s ease-in;
    color: var(--text-muted);
  }

  .animation {
    font-size: 3em;
    animation: spin 3s linear infinite;
    margin-top: 1em;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    main {
      padding: 1.5em;
      gap: 2em;
    }

    h1 {
      font-size: 2.5em;
    }

    .subtitle {
      font-size: 1.2em;
    }

    .description {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2em;
    }

    .subtitle {
      font-size: 1.1em;
    }
  }
</style>
