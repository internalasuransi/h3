/**
 * File: public/js/utils/data_manager.js
 * Description: Utility for managing data fetching and caching (LocalStorage).
 */

const DataManager = {
  /**
   * Get data with caching strategy.
   * @param {string} key - LocalStorage key.
   * @param {Function} fetchFn - Function to fetch data if not in cache (must return Promise).
   * @param {number} ttlMinutes - Time to live in minutes (default: 1440 = 24h).
   * @returns {Promise<any>}
   */
  async get(key, fetchFn, ttlMinutes = 1440) {
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const record = JSON.parse(cached);
        const now = new Date().getTime();
        // Check if expired
        if (now < record.expiry) {
          console.log(`[DataManager] Serving ${key} from cache.`);
          return record.data;
        } else {
          console.log(`[DataManager] Cache expired for ${key}.`);
        }
      } catch (e) {
        console.error(`[DataManager] Error parsing cache for ${key}`, e);
        localStorage.removeItem(key);
      }
    }

    // Fetch fresh data
    console.log(`[DataManager] Fetching fresh data for ${key}.`);
    try {
      const data = await fetchFn();
      const expiry = new Date().getTime() + ttlMinutes * 60 * 1000;
      const record = { data, expiry };
      localStorage.setItem(key, JSON.stringify(record));
      return data;
    } catch (error) {
      console.error(`[DataManager] Fetch failed for ${key}`, error);
      throw error;
    }
  },

  /**
   * Clear specific cache key.
   * @param {string} key
   */
  clear(key) {
    localStorage.removeItem(key);
  },

  /**
   * Clear all app specific cache (optional: filter by prefix if needed).
   */
  clearAll() {
    localStorage.clear();
  },
};

// Expose globally
window.DataManager = DataManager;
