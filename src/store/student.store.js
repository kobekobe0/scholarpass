import { create } from 'zustand';
import axios from 'axios';
import API_URL from '../constants/api';

const useStudentStore = create((set) => ({
    students: [],             
    totalDocs: 0,           
    totalPages: 0,         
    loading: false,    
    error: null,        

    fetchStudents: async (page = 1, limit = 50, search = '') => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            set({ error: 'No auth token found', students: [], loading: false });
            return;
        }

        set({ loading: true, error: null });


        try {
            const response = await axios.get(`${API_URL}student/all`, {
                params: {
                    page,
                    limit,
                    search,
                },
                headers: {
                    Authorization: `${authToken}`,
                },
            });

            set({
                students: response.data.docs,
                totalDocs: response.data.totalDocs,
                totalPages: response.data.totalPages,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch students', loading: false });
        }
    },

    reset: () => {
        set({ students: [], totalDocs: 0, totalPages: 0, error: null });
    },
}));

export default useStudentStore;
