<script>
  let name = 'World';
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Welcome to my Svelte app hosted on GitHub Pages</p>
  <div class="animation">✨</div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 2em;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  h1 {
    font-size: 3em;
    font-weight: 300;
    margin: 0.5em 0;
    animation: fadeIn 1s ease-in;
  }

  p {
    font-size: 1.2em;
    opacity: 0.9;
    animation: fadeIn 1.5s ease-in;
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

  @media (max-width: 640px) {
    h1 {
      font-size: 2em;
    }
    p {
      font-size: 1em;
    }
  }
</style>
