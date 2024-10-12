import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useStudentStatsStore = create((set) => ({
  violations: null,
  pendingCardRequest: null,
  registeredVehicles: null,
  entryLogs: null,
  loading: false,
  error: null,

  fetchStudentStats: async (studentID) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', violations: null, pendingCardRequest: null, registeredVehicles: null, entryLogs: null });
      return;
    }

    set({ loading: true, error: null });

    try {
      // Fetch violations
      const violationResponse = await axios.get(`${API_URL}student-statistic/violation-count/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      // Fetch pending card request count
      const pendingCardRequestResponse = await axios.get(`${API_URL}student-statistic/pending-card-request-count/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      // Fetch registered vehicles
      const registeredVehiclesResponse = await axios.get(`${API_URL}student-statistic/registered-vehicles/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      // Fetch recent entry logs
      const entryLogsResponse = await axios.get(`${API_URL}student-statistic/recent-logs/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      set({
        violations: violationResponse.data,
        pendingCardRequest: pendingCardRequestResponse.data,
        registeredVehicles: registeredVehiclesResponse.data,
        entryLogs: entryLogsResponse.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch student statistics',
        loading: false,
        violations: null,
        pendingCardRequest: null,
        registeredVehicles: null,
        entryLogs: null,
      });
    }
  },

  clearStats: () => {
    set({ 
      violations: null, 
      pendingCardRequest: null, 
      registeredVehicles: null, 
      entryLogs: null, 
      error: null 
    });
  },
}));

export default useStudentStatsStore;
