<script>
  import { darkMode } from '../stores/theme.js';
  import { Sun, Moon } from 'lucide-svelte';

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

<div class="mode-switcher">
  <button 
    class="mode-toggle"
    on:click={toggleDarkMode}
    title={$darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  >
    <div class="icon-container">
      {#if $darkMode}
        <Sun size={24} />
      {:else}
        <Moon size={24} />
      {/if}
    </div>
    <div class="mode-info">
      <div class="mode-name">
        {$darkMode ? 'Light Mode' : 'Dark Mode'}
      </div>
      <div class="mode-description">
        {$darkMode ? 'Serif typography with light colors' : 'Sans-serif typography with dark colors'}
      </div>
    </div>
  </button>
</div>

<style>
  .mode-switcher {
    width: 100%;
    max-width: 400px;
    margin: 0 auto 3em auto;
    text-align: center;
  }

  .mode-toggle {
    display: flex;
    align-items: center;
    gap: 1.2em;
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

  .mode-toggle:hover {
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-hover);
    transform: translateY(-3px);
    border-color: var(--text-primary);
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

  .mode-info {
    flex: 1;
  }

  .mode-name {
    font-size: 1.3em;
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin-bottom: 0.3em;
  }

  .mode-description {
    font-size: 0.95em;
    color: var(--text-muted);
    font-weight: var(--font-weight-normal);
  }

  @media (max-width: 768px) {
    .mode-switcher {
      margin-bottom: 2em;
    }

    .mode-toggle {
      padding: 1.2em 1.5em;
    }

    .mode-name {
      font-size: 1.2em;
    }

    .mode-description {
      font-size: 0.9em;
    }
  }

  @media (max-width: 480px) {
    .mode-toggle {
      padding: 1em;
      gap: 0.8em;
    }

    .icon-container {
      width: 40px;
      height: 40px;
    }
  }
</style>
