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

<button
  class="theme-toggle"
  on:click={toggleDarkMode}
  title={$darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  aria-label={$darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
>
  {#if $darkMode}
    <Sun size={20} />
  {:else}
    <Moon size={20} />
  {/if}
</button>

<style>
  .theme-toggle {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-card);
    border: 2px solid var(--border-primary);
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: var(--bg-card-hover);
    border-color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .theme-toggle:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .theme-toggle {
      top: 1rem;
      right: 1rem;
      width: 44px;
      height: 44px;
    }
  }

  @media (max-width: 480px) {
    .theme-toggle {
      width: 40px;
      height: 40px;
    }
  }
</style>
