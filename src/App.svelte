<script>
  import { onMount } from 'svelte';
  import { darkMode } from './stores/theme.js';
  import ThemeSwitcher from './components/ThemeSwitcher.svelte';
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

  <div class="hero">
    <h1>Hello, I'm {name}! 👋</h1>
    <p class="subtitle">Full Stack Developer & Creative Technologist</p>
    <p class="description">Welcome to my personal website built with Svelte and deployed on GitHub Pages ✨</p>
    <div class="time">Current time: {currentTime}</div>
  </div>

  <div class="features">
    <div class="feature-card">
      <div class="emoji">🚀</div>
      <h3>Modern Tech Stack</h3>
      <p>Built with Svelte, Vite, and deployed via GitHub Actions</p>
    </div>

    <div class="feature-card">
      <div class="emoji">⚡</div>
      <h3>Lightning Fast</h3>
      <p>Optimized for performance with modern build tools</p>
    </div>

    <div class="feature-card">
      <div class="emoji">🎨</div>
      <h3>Beautiful Design</h3>
      <p>Clean, responsive design with smooth animations</p>
    </div>
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

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2em;
    max-width: 900px;
    width: 100%;
    animation: fadeIn 1.8s ease-in;
  }

  .feature-card {
    background: var(--bg-card);
    padding: 2em 1.5em;
    border-radius: var(--card-border-radius);
    border: 1px solid var(--border-primary);
    transition: all 0.3s ease;
    backdrop-filter: var(--backdrop-blur);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-hover);
  }

  .emoji {
    font-size: 3em;
    margin-bottom: 0.5em;
    animation: bounce 2s infinite;
  }

  .feature-card h3 {
    font-size: 1.3em;
    margin: 0.5em 0;
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
  }

  .feature-card p {
    font-size: 1em;
    margin: 0;
    color: var(--text-secondary);
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

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
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

    .features {
      grid-template-columns: 1fr;
      gap: 1.5em;
    }

    .feature-card {
      padding: 1.5em 1em;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2em;
    }

    .subtitle {
      font-size: 1.1em;
    }

    .emoji {
      font-size: 2.5em;
    }
  }
</style>
