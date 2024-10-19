import React,{useState, useEffect, useCallback} from 'react'
import debounce from '../../helper/debounce'
import useViolationStore from '../../store/violation.store'
import { Link } from 'react-router-dom'

function Violation() {
    const [fromDate, setFromDate] = React.useState('')
    const [toDate, setToDate] = React.useState('')
    const [limit, setLimit] = React.useState(50)
    const [studentName, setStudentName] = React.useState('')
    const [severity, setSeverity] = React.useState('')

    const {
        violations,
        total,
        page,
        totalPages,
        loading,
        error,
        fetchViolations,
        clearViolations,
    } = useViolationStore();

     const debouncedSetQuery = React.useCallback(
        debounce((newQuery) => {
            setStudentName(newQuery); 
        }, 300),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        debouncedSetQuery(value); // Call the debounced state setter
    };

    React.useEffect(() => {
        //fetchLogs({ limit, page: currentPage, studentName, from: fromDate || '', to: toDate || '' });
    }, [studentName, fromDate, toDate]);

    useEffect(() => {
        const filters = {
            studentName,
            severity,
            page: 1,
            limit,
        };
        
        fetchViolations(filters);

        return () => {
            clearViolations();
        };
    }, [fetchViolations, clearViolations]);

    useEffect(() => {
        const filters = {
            studentName,
            severity,
            page,
            limit,
            startDate: fromDate,
            endDate: toDate,
        };

        fetchViolations(filters);
    }, [studentName, limit, severity, fromDate, toDate]);
    return (
      <div className=' rounded flex-1 p-8'>
            <div className='flex justify-between items-center mb-4 p-4 rounded-md'>
                <h2 className='text-lg font-semibold text-gray-800'>Violations</h2>
                <div className='flex items-center space-x-4'>
                    <label htmlFor="">From</label>
                    <input 
                        type="date" 
                        onChange={e => setFromDate(e.target.value)} 
                        className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <label htmlFor="">To</label>
                    <input 
                        type="date" 
                        onChange={e => setToDate(e.target.value)} 
                        className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <select 
                        name="" 
                        id="" 
                        value={severity} 
                        onChange={e => setSeverity(e.target.value)} 
                        className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700'
                    >
                        <option value="">All</option>
                        <option value="MINOR">Minor</option>
                        <option value="MAJOR">Major</option>
                        <option value="SEVERE">Severe</option>
                    </select>
                    <select 
                        name="" 
                        id="" 
                        value={limit} 
                        onChange={e => setLimit(e.target.value)} 
                        className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700'
                    >
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                    </select>

                    <input 
                        type="text" 
                        className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder='Student Name' 
                        onChange={handleChange} 
                    /> 

                </div>
            </div>
            <div className='h-[70vh] overflow-y-auto shadow-md bg-white p-4 rounded'>
                <table className="min-w-full text-left">
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Violation</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Severity</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                        <tr>
                            <td colSpan="4" className="text-center mt-4">Loading...</td>
                        </tr>
                        </tbody>
                    ) : error ? (
                        <tbody>
                        <tr>
                            <td colSpan="4" className="text-center text-red-500">{error}</td>
                        </tr>
                        </tbody>
                    ) : (
                        <tbody>
                        {violations?.map((violation, index) => {
                            const createdAtDate = new Date(violation.createdAt);
                            const formattedDate = createdAtDate.toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            });

                            return (
                            <tr
                                key={index}
                                className="border-b last:border-none hover:bg-gray-50 odd:bg-white even:bg-gray-100"
                            >
                                <td className="px-4 py-3 text-gray-700">
                                <Link to={`/admin/students/${violation.studentID._id}`}>
                                    {violation.studentID.name}
                                </Link>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{violation.violation}</td>
                                <td className="px-4 py-3 text-gray-700">{violation.severity}</td>
                                <td className="px-4 py-3 text-gray-700">{formattedDate}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    )}
                </table>

            </div>
        </div>
    )
}

export default Violation