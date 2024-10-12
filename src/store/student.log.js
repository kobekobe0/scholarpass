import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useStudentLogStore = create((set) => ({
  studentLogs: [],
  violations: [],
  loading: false,
  error: null,

  fetchStudentLogs: async (studentID) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', studentLogs: [] });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}log/student/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });
      set({ studentLogs: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch student logs',
        loading: false,
      });
    }
  },

  fetchStudentViolations: async (studentID) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', violations: [] });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}violation/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });
      set({ violations: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch student violations',
        loading: false,
      });
    }
  },

  clearData: () => set({ studentLogs: [], violations: [], error: null }),
}));

export default useStudentLogStore;
