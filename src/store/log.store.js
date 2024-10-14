import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useLogStore = create((set) => ({
  logs: [],
  totalPages: 1,
  totalDocs: 0,
  currentPage: 1,
  loading: false,
  error: null,

  fetchLogs: async ({ limit = 100, page = 1, studentName = '', from = '', to = '' }) => {
    set({ loading: true, error: null });

    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        set({ error: 'No auth token found', logs: [], loading: false });
        return;
      }

      const formatDateWithOffset = (date) => {
            if (!date) return null;
            const localDate = new Date(date);
            localDate.setHours(localDate.getHours() + 8);
            return localDate.toISOString();
        };

      const response = await axios.get(`${API_URL}log/logs`, {
        params: {
          limit,
          page,
          studentName,
          from: formatDateWithOffset(from),
          to: formatDateWithOffset(to),
        },
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const { docs, totalPages, totalDocs } = response.data;

      console.log(response.data);

      set({
        logs: docs,
        totalPages,
        totalDocs,
        loading: false,
        currentPage: page,
      });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch logs', loading: false });
    }
  },

  setPage: (page) => {
    set({ currentPage: page });
  },

  clearLogs: () => {
    set({ logs: [], totalPages: 1, totalDocs: 0, currentPage: 1, error: null });
  },
}));

export default useLogStore;
