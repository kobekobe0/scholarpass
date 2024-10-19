import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useStudentLogStore = create((set) => ({
  studentLogs: [],
  violations: [],
  loading: false,
  error: null,

  fetchStudentLogs: async (studentID, startDate=null, endDate=null) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', studentLogs: [] });
      return;
    }

    set({ loading: true, error: null });

    try {
      const url = `${API_URL}log/student/${studentID}`;
      let params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `${authToken}`,
        },
      });
      console.log(response.data.docs)
      set({ studentLogs: response.data.docs, loading: false });
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
      const response = await axios.get(`${API_URL}violation/student/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });
      console.log(response.data)
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
