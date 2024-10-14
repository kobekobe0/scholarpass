import React, { useEffect } from 'react'
import useStatsStore from '../../store/stats.store';
import abbrev from '../../helper/abbrev';

function RecentLogs() {
    const { recentLogs, loading, error, fetchRecentLogs } = useStatsStore();
    useEffect(() => {
        fetchRecentLogs();
    }, [])
    useEffect(() => {
        console.log(recentLogs)
    }, [recentLogs])
    return (
        <div className='shadow-md bg-white rounded flex-1 min-h-96 p-8'>
            <h2 className='text-xl font-semibold mb-4'>Recent Student Logs</h2>
            <div className='max-h-64 overflow-y-auto'>
                <table className='min-w-full'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Name</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Department</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Date</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Time In</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Time Out</th>
                            <th className='px-4 py-3 text-lg font-medium text-gray-800 text-left'>Vehicle Model</th>
                        </tr>
                    </thead>
                    {
                        loading ? <tr><td colSpan="6" className="text-center">Loading...</td></tr> :
                        error ? <tr><td colSpan="6" className="text-center text-red-500">{error}</td></tr> :
                        <tbody>
                            {recentLogs?.map((log, index) => {
                                const logDate = new Date(log.logDate);
                                const formattedDate = logDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                                const timeIn = new Date(log.timeIn);
                                const formattedTimeIn = timeIn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                let formattedTimeOut = "N/A";
                                if(log.timeOut){
                                    const timeOut = new Date(log.timeOut);
                                    formattedTimeOut = timeOut.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                }
                                

                                return (
                                    <tr key={index} className='hover:bg-gray-50'>
                                        <td className='px-4 py-2 text-gray-700'>{log.studentID.name}</td>
                                        <td className='px-4 py-2 text-gray-700'>{abbrev(log.studentID.department)}</td>
                                        <td className='px-4 py-2 text-gray-700'>{formattedDate}</td>
                                        <td className='px-4 py-2 text-gray-700'>{formattedTimeIn}</td>
                                        <td className='px-4 py-2 text-gray-700'>{formattedTimeOut}</td>
                                        <td className='px-4 py-2 text-gray-700'>{log.vehicle ? log.vehicle.model : 'Walk-in'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    }
                </table>
            </div>
        </div>
  )
}

export default RecentLogs