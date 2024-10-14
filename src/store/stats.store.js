import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useStatsStore = create((set) => ({
  statistics: null,          // Holds statistics data
  recentLogs: [],            // Holds recent logs
  recentVisitors: [],        // Holds recent visitors
  loading: false,            // Loading state for the requests
  error: null,               // Error state

  // Fetch today's statistics
  fetchStatisticsToday: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}log/statistics`);
      set({ statistics: response.data, loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch statistics', loading: false });
    }
  },

  // Fetch recent student logs
  fetchRecentLogs: async (limit = 50) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}log/recent-logs?limit=${limit}`);
      set({ recentLogs: response.data, loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch recent logs', loading: false });
    }
  },

  // Fetch recent visitors
  fetchRecentVisitors: async (limit = 50) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}log/recent-visitor?limit=${limit}`);
      set({ recentVisitors: response.data, loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch recent visitors', loading: false });
    }
  },
}));

export default useStatsStore;
