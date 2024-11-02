import React, { useEffect } from 'react'
import useStatsStore from '../../store/stats.store';

function RecentVisitors() {
    const { recentVisitors, loading, error, fetchRecentVisitors } = useStatsStore();
    useEffect(() => {
        fetchRecentVisitors();
    }, [])
    return (
        <div className='shadow-md bg-white rounded flex-1 min-h-96 p-8'>
            <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold'>Recent Visitor Logs</h2>  
            <button className='text-emerald-700'>View Visitors</button>
            </div>
            
            <div className='max-h-64 overflow-y-auto'>
                <table className='min-w-full'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Name</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Agency</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Address</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Person to Visit</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Purpose</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Number</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Date</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Time In</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Time Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentVisitors?.map((visitor, index) => {
                            const timeIn = new Date(visitor.timeIn);
                            const formattedTimeIn = timeIn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                            let formattedTimeOut = "N/A";
                            const logDate = new Date(visitor.timeIn);
                            const formattedDate = logDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            if(visitor.timeOut){
                                const timeOut = new Date(visitor.timeOut);
                                formattedTimeOut = timeOut.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                            }
                            return (
                                <tr key={index} className='hover:bg-gray-50'>
                                    <td className='px-4 py-2 text-gray-700'>{visitor.name}</td>
                                    <td className='px-4 py-2 text-gray-700'>{visitor.agency}</td>
                                    <td className='px-4 py-2 text-gray-700'>{visitor.address}</td>
                                    <td className='px-4 py-2 text-gray-700'>{visitor.personToVisit}</td>
                                    <td className='px-4 py-2 text-gray-700'>{visitor.purpose}</td>
                                    <td className='px-4 py-2 text-gray-700'>{visitor.number}</td>
                                    <td className='px-4 py-2 text-gray-700'>{formattedDate}</td>
                                    <td className='px-4 py-2 text-gray-700'>{formattedTimeIn}</td>
                                    <td className='px-4 py-2 text-gray-700'>{formattedTimeOut}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    {
                        loading ? <tr><td colSpan="8" className="text-center">Loading...</td></tr> :
                        error ? <tr><td colSpan="8" className="text-center text-red-500">{error}</td></tr> : null
                    }
                </table>
            </div>
        </div>
    )
}

export default RecentVisitors