import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useConfigStore = create((set) => ({
    config: null,
    loading: false,
    error: null,

    fetchConfig: async () => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            set({ error: 'No auth token found', config: null });
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}config/`, {
                headers: {
                    Authorization: `${authToken}`,
                },
            });
            set({ config: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch config',
                loading: false,
            });
        }
    },

    clearData: () => set({ config: null, error: null }),
}));

export default useConfigStore;
