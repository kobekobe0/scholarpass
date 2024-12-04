import React,{useState, useEffect, useCallback} from 'react'
import debounce from '../../helper/debounce'
import useViolationStore from '../../store/violation.store'
import { Link } from 'react-router-dom'
import printTableData from '../../helper/printAllViolation'

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

    const handlePrint = () => {
        printTableData(violations, "Student Violations")
    }

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
                    <button
                      onClick={handlePrint}
                      className='bg-green-600 hover:bg-green-700 transition text-white px-2 py-2 rounded-md'
                    ><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M16 16a1 1 0 0 1 .993.883L17 17v4a1 1 0 0 1-.883.993L16 22H8a1 1 0 0 1-.993-.883L7 21v-4a1 1 0 0 1 .883-.993L8 16zm3-9a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2h-1v-3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3H4a2 2 0 0 1-2-2v-7a3 3 0 0 1 3-3zm-2 2h-2a1 1 0 0 0-.117 1.993L15 11h2a1 1 0 0 0 .117-1.993zm0-7a1 1 0 0 1 1 1v2H6V3a1 1 0 0 1 1-1z"/></g></svg></button>


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