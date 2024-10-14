import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useLogTrendsStore = create((set) => ({
  logTrends: [],                  // To store the fetched log trends data
  loading: false,                 // To indicate loading state
  error: null,                    // To store any error messages

  fetchLogTrends: async () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      set({ error: 'No auth token found', logTrends: [] });
      return;
    }

    set({ loading: true, error: null });  // Set loading state and clear any previous errors

    try {
      const response = await axios.post(`${API_URL}log/log-trend`, {
        headers: {
          Authorization: `${authToken}`,  // Include the auth token in the headers
        },
      });

      set({ logTrends: response.data, loading: false }); // Store the fetched data and set loading to false
    } catch (error) {
      set({ error: error.message || 'Failed to fetch log trends', loading: false }); // Handle error
    }
  },
}));

export default useLogTrendsStore;
