# Svelte Hello World - GitHub Pages

A simple Svelte "Hello World" application deployed to GitHub Pages using GitHub Actions.

## 🚀 Live Demo

Once deployed, the site will be available at: https://jamesvo.github.io

## 📦 Features

- ⚡️ Svelte + Vite for fast development
- 🎨 Beautiful gradient background with animations
- 📱 Responsive design
- 🚀 Automated deployment with GitHub Actions
- 🌐 Hosted on GitHub Pages

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## 🏗️ Building for Production

To build the app for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📝 Deployment Setup

### GitHub Pages Configuration

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select "GitHub Actions" as the source

### Automatic Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- Triggers on every push to the `main` branch
- Builds the Svelte application
- Deploys it to GitHub Pages

### Manual Deployment

You can also trigger the deployment manually:

1. Go to the "Actions" tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── src/
│   ├── App.svelte         # Main Svelte component
│   └── main.js            # App entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## 🔧 Technologies Used

- [Svelte](https://svelte.dev/) - Cybernetically enhanced web apps
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [GitHub Pages](https://pages.github.com/) - Static site hosting
- [GitHub Actions](https://github.com/features/actions) - CI/CD automation

## 📄 License

This project is open source and available under the MIT License.
