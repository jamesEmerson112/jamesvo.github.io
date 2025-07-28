<script>
  let name = 'James Vo';
  let currentTime = new Date().toLocaleString();

  // Update time every second
  setInterval(() => {
    currentTime = new Date().toLocaleString();
  }, 1000);
</script>

<main>
  <div class="hero">
    <h1>Hello, I'm {name}! 👋</h1>
    <p class="subtitle">Full Stack Developer & Creative Technologist</p>
    <p class="description">Welcome to my personal website built with Svelte and deployed on GitHub Pages</p>
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
    gap: 3em;
  }

  .hero {
    max-width: 800px;
    animation: fadeIn 1s ease-in;
  }

  h1 {
    font-size: 3.5em;
    font-weight: 300;
    margin: 0.2em 0;
    animation: fadeIn 1s ease-in;
  }

  .subtitle {
    font-size: 1.4em;
    font-weight: 500;
    margin: 0.5em 0;
    opacity: 0.9;
    animation: fadeIn 1.2s ease-in;
  }

  .description {
    font-size: 1.1em;
    opacity: 0.8;
    margin: 1em 0;
    animation: fadeIn 1.4s ease-in;
  }

  .time {
    font-size: 1em;
    opacity: 0.7;
    margin-top: 1.5em;
    padding: 0.5em 1em;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeIn 1.6s ease-in;
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
    background: rgba(255, 255, 255, 0.1);
    padding: 2em 1.5em;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .emoji {
    font-size: 3em;
    margin-bottom: 0.5em;
    animation: bounce 2s infinite;
  }

  .feature-card h3 {
    font-size: 1.3em;
    margin: 0.5em 0;
    font-weight: 600;
  }

  .feature-card p {
    font-size: 1em;
    opacity: 0.9;
    margin: 0;
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
