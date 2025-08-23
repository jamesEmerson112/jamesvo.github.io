<script>
  import { currentTheme, themes, darkMode } from '../stores/theme.js';
  import { Briefcase, Square, Type, Sun, Moon } from 'lucide-svelte';

  // Icon mapping for each theme
  const themeIcons = {
    professional: Briefcase,
    minimal: Square,
    serif: Type
  };

  function handleThemeChange(themeId) {
    // Add theme-switching class to prevent transition flicker
    document.documentElement.classList.add('theme-switching');
    
    // Set the theme
    currentTheme.setTheme(themeId);
    
    // Remove the class after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-switching');
    }, 50);
  }

  function toggleDarkMode() {
    // Add theme-switching class to prevent transition flicker
    document.documentElement.classList.add('theme-switching');
    
    // Toggle dark mode
    darkMode.toggle();
    
    // Remove the class after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-switching');
    }, 50);
  }
</script>

<div class="theme-switcher">
  <div class="switcher-header">
    <h2 class="switcher-title">Choose Your Style</h2>
    <button 
      class="dark-mode-toggle"
      on:click={toggleDarkMode}
      title={$darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {#if $darkMode}
        <Sun size={20} />
        <span>Light</span>
      {:else}
        <Moon size={20} />
        <span>Dark</span>
      {/if}
    </button>
  </div>
  
  <div class="theme-buttons">
    {#each Object.values(themes) as theme (theme.id)}
      <button 
        class="theme-button"
        class:active={$currentTheme === theme.id}
        on:click={() => handleThemeChange(theme.id)}
        data-theme={theme.id}
      >
        <div class="icon-container">
          <svelte:component this={themeIcons[theme.id]} size={24} />
        </div>
        <div class="theme-info">
          <div class="theme-name">{theme.name}</div>
          <div class="theme-description">{theme.description}</div>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .theme-switcher {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 3em auto;
    text-align: center;
  }

  .switcher-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
    flex-wrap: wrap;
    gap: 1em;
  }

  .switcher-title {
    font-size: 2.2em;
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin: 0;
    font-family: var(--font-family-primary);
    flex: 1;
  }

  .dark-mode-toggle {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.8em 1.2em;
    background: var(--bg-card);
    border: 2px solid var(--border-primary);
    border-radius: var(--card-border-radius);
    color: var(--text-primary);
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: var(--backdrop-blur);
  }

  .dark-mode-toggle:hover {
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
    border-color: var(--text-primary);
  }

  .theme-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2em;
    width: 100%;
  }

  .theme-button {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1.5em 2em;
    background: var(--bg-card);
    border: 2px solid var(--border-primary);
    border-radius: var(--card-border-radius);
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: var(--backdrop-blur);
    font-family: var(--font-family-primary);
    color: var(--text-secondary);
    text-align: left;
    width: 100%;
    box-sizing: border-box;
  }

  .theme-button:hover {
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-hover);
    transform: translateY(-3px);
    border-color: var(--text-primary);
  }

  .theme-button.active {
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-card);
    border-color: var(--text-primary);
    transform: translateY(-2px);
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: var(--bg-secondary);
    border-radius: 50%;
    border: 1px solid var(--border-secondary);
    color: var(--text-primary);
    flex-shrink: 0;
  }

  .theme-info {
    flex: 1;
  }

  .theme-name {
    font-size: 1.3em;
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin-bottom: 0.3em;
  }

  .theme-description {
    font-size: 0.95em;
    color: var(--text-muted);
    font-weight: var(--font-weight-normal);
  }

  /* Theme-specific button previews */
  .theme-button[data-theme="professional"]:hover {
    background: rgba(248, 250, 252, 0.8);
    border-color: #475569;
  }

  .theme-button[data-theme="minimal"]:hover {
    background: rgba(250, 250, 250, 0.8);
    border-color: #333333;
  }

  .theme-button[data-theme="serif"]:hover {
    background: rgba(250, 250, 250, 0.8);
    border-color: #333333;
  }

  @media (max-width: 768px) {
    .theme-switcher {
      margin-bottom: 2em;
    }

    .switcher-title {
      font-size: 1.8em;
      margin-bottom: 1.5em;
    }

    .theme-buttons {
      grid-template-columns: 1fr;
      gap: 1em;
    }

    .theme-button {
      padding: 1.2em 1.5em;
    }

    .theme-name {
      font-size: 1.2em;
    }

    .theme-description {
      font-size: 0.9em;
    }
  }

  @media (max-width: 480px) {
    .switcher-title {
      font-size: 1.5em;
    }

    .theme-button {
      padding: 1em;
      gap: 0.8em;
    }

    .icon-container {
      width: 40px;
      height: 40px;
    }
  }
</style>
