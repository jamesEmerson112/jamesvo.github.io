<script>
  import { profileData } from '../../stores/portfolioStore.js';

  // Social link icons
  const icons = {
    github: '⚡',
    linkedin: '💼',
    email: '✉️',
    resume: '📄'
  };
</script>

<header class="profile-header">
  <div class="container">
    <div class="header-content">
      <!-- Profile Photo -->
      <div class="photo-container">
        <div class="profile-photo-placeholder">
          <span class="initials">
            {$profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </span>
        </div>
      </div>

      <!-- Name & Title -->
      <div class="info">
        <h1 class="name">{$profileData.name}</h1>
        <p class="title">{$profileData.title}</p>
        {#if $profileData.location && $profileData.location !== '<missing data>'}
          <p class="location">📍 {$profileData.location}</p>
        {/if}
      </div>

      <!-- Social Links -->
      <div class="social-links">
        {#if $profileData.socialLinks.github}
          <a
            href={$profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            title="GitHub"
          >
            {icons.github} GitHub
          </a>
        {/if}

        {#if $profileData.socialLinks.linkedin && $profileData.socialLinks.linkedin !== '<missing data>'}
          <a
            href={$profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            title="LinkedIn"
          >
            {icons.linkedin} LinkedIn
          </a>
        {/if}

        {#if $profileData.socialLinks.email && $profileData.socialLinks.email !== '<missing data>'}
          <a
            href={`mailto:${$profileData.socialLinks.email}`}
            class="social-link"
            title="Email"
          >
            {icons.email} Email
          </a>
        {/if}

        {#if $profileData.socialLinks.resume && $profileData.socialLinks.resume !== '<missing data>'}
          <a
            href={$profileData.socialLinks.resume}
            download
            class="social-link resume-link"
            title="Download Resume"
          >
            {icons.resume} Resume
          </a>
        {/if}
      </div>
    </div>
  </div>
</header>

<style>
  .profile-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-primary);
    padding: 2rem 0;
    transition: var(--theme-transition);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  /* Photo */
  .photo-container {
    flex-shrink: 0;
  }

  .profile-photo-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    border: 3px solid var(--border-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .profile-photo-placeholder:hover {
    transform: scale(1.05);
  }

  .initials {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Info */
  .info {
    flex: 1;
    min-width: 200px;
  }

  .name {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .title {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin: 0 0 0.25rem 0;
    font-weight: 500;
  }

  .location {
    font-size: 0.95rem;
    color: var(--text-muted);
    margin: 0;
  }

  /* Social Links */
  .social-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .social-link:hover {
    background: var(--bg-card-hover);
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  .resume-link {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    border-color: transparent;
  }

  .resume-link:hover {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }

    .info {
      text-align: center;
    }

    .name {
      font-size: 2rem;
    }

    .title {
      font-size: 1.1rem;
    }

    .social-links {
      justify-content: center;
      width: 100%;
    }

    .social-link {
      flex: 1;
      justify-content: center;
      min-width: 120px;
    }
  }

  @media (max-width: 480px) {
    .profile-photo-placeholder {
      width: 100px;
      height: 100px;
    }

    .initials {
      font-size: 2rem;
    }

    .name {
      font-size: 1.75rem;
    }

    .social-links {
      flex-direction: column;
      width: 100%;
    }

    .social-link {
      width: 100%;
    }
  }
</style>
