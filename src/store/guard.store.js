import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useGuardStore = create((set) => ({
    guards: [],
    loading: false,
    error: null,

    fetchGuards: async () => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
        set({ error: 'No auth token found', guards: [] });
        return;
        }

        set({ loading: true, error: null });

        try {
        const response = await axios.get(`${API_URL}guard/`, {
            headers: {
            Authorization: `${authToken}`,
            },
        });
        set({ guards: response.data, loading: false });
        } catch (error) {
        set({
            error: error.response?.data?.message || 'Failed to fetch security guards',
            loading: false,
        });
        }
    },

    toggleGuardActiveStatus: async (id, newStatus) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
        set({ error: 'No auth token found' });
        return;
        }

        set({ loading: true, error: null });

        try {
        const response = await axios.post(`${API_URL}guard/toggle/${id}`, null, {
            headers: {
            Authorization: `${authToken}`,
            },
        });
        set({ loading: false });
        //update guard status without fetching all guards
        set((state) => ({
            guards: state.guards.map((guard) => {
            if (guard._id === id) {
                return { ...guard, active: newStatus };
            }
            return guard;
            }),
        }));
        } catch (error) {
            console.log(error)
            set({
                error: error.response?.data?.message || 'Failed to toggle security guard account',
                loading: false,
            });
        }
    },

    clearData: () => set({ guards: [], error: null }),
}));

export default useGuardStore;
