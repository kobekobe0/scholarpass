import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useViolationStore = create((set) => ({
  violations: [],
  total: 0,
  page: 1,
  limit: 100,
  totalPages: 0,
  loading: false,
  error: null,

  fetchViolations: async ({ studentName = '', severity = '', startDate = null, endDate = null, page = 1, limit = 100 }) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', violations: [], total: 0, totalPages: 0 });
      return;
    }

    set({ loading: true, error: null });

    try {
      const url = `${API_URL}violation`;
      let params = {
        page,
        limit,
      };

      // Add filters to params if provided
      if (studentName) params.studentName = studentName;
      if (severity) params.severity = severity;
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const { total, data, totalPages } = response.data;

      set({
        violations: data,
        total,
        page,
        limit,
        totalPages,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch violations',
        loading: false,
      });
    }
  },

  clearViolations: () => set({ violations: [], total: 0, totalPages: 0, error: null }),
}));

export default useViolationStore;
