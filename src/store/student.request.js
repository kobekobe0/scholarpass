import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useCardRequestStore = create((set) => ({
  cardRequests: [],
  loading: false,
  error: null,

  fetchCardRequests: async (studentID) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', cardRequests: [], loading: false });
      return;
    }

    set({ loading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}card-request/student/${studentID}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      set({ cardRequests: response.data, loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch card requests', loading: false });
    }
  },
  clearCardRequests: () => set({ cardRequests: [], error: null, loading: false }),
}));

export default useCardRequestStore;
