import React, { useEffect, useState, useCallback } from 'react';
import useStudentStore from '../../store/student.store';
import StudentCard from '../../components/admin/StudentCard';
import debounce from '../../helper/debounce';

function Students() {
    const [limit, setLimit] = useState('50');
    const [search, setSearch] = useState('');
    const { students, loading, error, fetchStudents } = useStudentStore();

    useEffect(() => {
        fetchStudents(1, limit, search); // Pass the current state of limit and search
    }, [limit, search]); // Fetch when either limit or search changes

    const debouncedSetQuery = useCallback(
        debounce((newQuery) => {
            setSearch(newQuery);
        }, 300),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        debouncedSetQuery(value);
    };

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between items-center my-8 mx-4'>
                <h2 className='text-xl'>Students</h2>
                <div>
                    <select value={limit} onChange={e => setLimit(e.target.value)}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="200">200</option>
                    </select>
                    <input 
                        type="text" 
                        className='border border-black/20 px-4 py-2 rounded' 
                        placeholder='Student Name' 
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className='flex overflow-y-scroll gap-8 flex-col mx-12 h-[75vh]'>
                {students.map((student) => (
                    <StudentCard key={student._id} student={student} />
                ))}
            </div>
        </div>
    );
}

export default Students;
