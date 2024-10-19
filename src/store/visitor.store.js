import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useVisitorLogStore = create((set) => ({
    visitorLogs: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 100,
    totalPages: 0,

    fetchVisitorLogs: async (pageParam = 1, limitParam = 100, name = '', fromDate = null, toDate = null) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            set({ error: 'No auth token found', visitorLogs: [] });
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}visitor/logs`, {
                params: { 
                    page: pageParam, 
                    limit: limitParam, 
                    name, 
                    fromDate, 
                    toDate 
                },
                headers: {
                    Authorization: `${authToken}`,
                },
            });
            const { total, page, limit, totalPages, data } = response.data;
            set({ 
                visitorLogs: data,
                total,
                page,
                limit,
                totalPages,
                loading: false 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch visitor logs',
                loading: false,
            });
        }
    },

    clearData: () => set({ visitorLogs: [], error: null, total: 0, page: 1, limit: 100, totalPages: 0 }),
}));

export default useVisitorLogStore;
