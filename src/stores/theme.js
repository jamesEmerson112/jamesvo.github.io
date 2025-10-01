
// Simple reactive dark mode store
class DarkModeStore {
  constructor() {
    this.subscribers = new Set();
    // Check localStorage first, then default to dark mode (true)
    this.value = typeof window !== 'undefined' ? 
      (localStorage.getItem('darkMode') !== null ? 
        localStorage.getItem('darkMode') === 'true' : 
        true) : 
      true;
    
    // Immediately set the data-light attribute with inverted logic
    // darkMode true = data-light="false", darkMode false = data-light="true"
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-light', (!this.value).toString());
    }
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
    
    // Persist to localStorage and update data-light attribute
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', this.value.toString());
      document.documentElement.setAttribute('data-light', (!this.value).toString());
    }
    
    // Notify subscribers
    this.subscribers.forEach(callback => callback(this.value));
  }

  setMode(isDark) {
    this.value = isDark;
    
    // Persist to localStorage and update data-light attribute
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', this.value.toString());
      document.documentElement.setAttribute('data-light', (!this.value).toString());
    }
    
    // Notify subscribers
    this.subscribers.forEach(callback => callback(this.value));
  }
}

export const darkMode = new DarkModeStore();
