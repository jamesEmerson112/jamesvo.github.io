
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

export const darkMode = new DarkModeStore();
