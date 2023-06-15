class LocalStorage {
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting item ${key} to localStorage`, err);
    }
  }

  getItem(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (err) {
      console.error(`Error getting item ${key} from localStorage`, err);
      return null;
    }
  }

  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing item ${key} from localStorage`, err);
    }
  }

  clear() {
    try {
      window.localStorage.clear();
    } catch (err) {
      console.error('Error clearing localStorage', err);
    }
  }
}

export default new LocalStorage();
