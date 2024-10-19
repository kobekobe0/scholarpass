import React, {useEffect, useState, useCallback} from 'react'
import useVisitorLogStore from '../../store/visitor.store';
import debounce from '../../helper/debounce';

function Visitor() {
    const { visitorLogs, fetchVisitorLogs, loading, error, total, page, totalPages } = useVisitorLogStore();
    const [selectedLimit, setLimit] = useState("100");
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [name, setName] = useState('');

    const debouncedSetQuery = useCallback(
        debounce((newQuery) => {
            setName(newQuery); 
        }, 300),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        debouncedSetQuery(value); // Call the debounced state setter
    };

    useEffect(() => {
        fetchVisitorLogs(page, selectedLimit)
    },[])

    useEffect(() => {
        fetchVisitorLogs(page, selectedLimit, name, fromDate, toDate);
    }, [name, fromDate, toDate, selectedLimit]);

    useEffect(()=>{
        fetchVisitorLogs(page, selectedLimit, name, fromDate, toDate);
    }, [selectedLimit])

    useEffect(()=>{
        console.log(visitorLogs)
    }, [visitorLogs])

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between gap-4 flex-col'>
                <div className='rounded flex-1 p-8'>
                    <div className='flex justify-between items-center mb-4 p-4 rounded-md'>
                        <h2 className='text-xl font-semibold text-gray-800'>Visitors</h2>
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
                                value={selectedLimit} 
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
                                placeholder='Visitor Name' 
                                onChange={handleChange}
                            /> 
                        </div>
                    </div>
                    <div className='h-[70vh] overflow-y-auto shadow-md bg-white p-4 rounded'>
                        <table className="min-w-full text-left">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Time In</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Time Out</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Agency</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Address</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Person to Visit</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Contact Number</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitorLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center mt-4 p-4">No visitor logs available.</td>
                                    </tr>
                                ) : visitorLogs.map((log) => (
                                    <tr key={log._id} className="border-b last:border-none hover:bg-gray-50 odd:bg-white even:bg-gray-100">
                                        <td className="px-4 py-3 text-gray-700">{log.name}</td>
                                        <td className="px-4 py-3 text-gray-700">
                                            {new Date(log.timeIn).toLocaleString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">
                                            {log.timeOut 
                                                ? new Date(log.timeOut).toLocaleString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                }) 
                                                : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{log.agency}</td>
                                        <td className="px-4 py-3 text-gray-700">{log.address}</td>
                                        <td className="px-4 py-3 text-gray-700">{log.personToVisit}</td>
                                        <td className="px-4 py-3 text-gray-700">{log.number}</td>
                                        <td className="px-4 py-3 text-gray-700">{log.purpose}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Visitor