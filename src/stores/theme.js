// Theme configurations
export const themes = {
  professional: {
    id: 'professional', 
    name: 'Professional Clean',
    description: 'Clean corporate design with serif typography'
  },
  minimal: {
    id: 'minimal',
    name: 'Professional Minimal',
    description: 'Ultra-clean minimal with sans-serif'
  },
  serif: {
    id: 'serif',
    name: 'Professional Serif',
    description: 'Minimal design with elegant serif typography'
  }
};

// Simple reactive theme store
class ThemeStore {
  constructor() {
    this.subscribers = new Set();
    this.value = typeof window !== 'undefined' ? localStorage.getItem('selectedTheme') || 'professional' : 'professional';
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.value);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  setTheme(themeId) {
    this.value = themeId;
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTheme', themeId);
    }
    
    // Notify subscribers
    this.subscribers.forEach(callback => callback(this.value));
  }

  reset() {
    this.setTheme('professional');
  }
}

// Simple reactive dark mode store
class DarkModeStore {
  constructor() {
    this.subscribers = new Set();
    this.value = typeof window !== 'undefined' ? localStorage.getItem('darkMode') === 'true' : true; // Default to dark mode
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.value);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  toggle() {
    this.value = !this.value;
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', this.value.toString());
    }
    
    // Notify subscribers
    this.subscribers.forEach(callback => callback(this.value));
  }

  setMode(isDark) {
    this.value = isDark;
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', this.value.toString());
    }
    
    // Notify subscribers
    this.subscribers.forEach(callback => callback(this.value));
  }
}

export const currentTheme = new ThemeStore();
export const darkMode = new DarkModeStore();
