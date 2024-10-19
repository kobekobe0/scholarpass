import React, { useEffect } from 'react';
import useStudentLogStore from '../../store/student.log';

function StudentProfileLogs({ id }) {
    const { studentLogs, violations, fetchStudentLogs, fetchStudentViolations, loading, error, clearData } = useStudentLogStore();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    useEffect(() => {
        clearData();
        fetchStudentLogs(id);
    }, []);

    return (
        <div className='w-full h-full flex flex-col '>

            <div className="flex gap-4 items-center justify-between my-4">
                <h1 className='text-lg font-semibold'>Entries</h1>
                <div className='flex items-center gap-2'>
                    <div className="flex items-center gap-2">
                        <label htmlFor="startDate" className="text-gray-700 font-medium text-xs">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate || ''}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="endDate" className="text-gray-700 font-medium text-xs">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate || ''}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg text-sm"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="endDate" className="text-white font-medium text-xs">_</label>
                        <button
                            onClick={() => fetchStudentLogs(id, startDate, endDate)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
           <div className="flex-grow overflow-y-scroll border ">
                <table className="w-full border-collapse border border-slate-400 text-xs">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Date</th>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Time-in</th>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Time-Out</th>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentLogs.map((log, index) => (
                            <tr key={log.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200`}>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {new Date(log.timeIn).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {new Date(log.timeIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </td>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {log?.timeOut ? new Date(log.timeOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
                                </td>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {log?.vehicle ? log.vehicle.model : "Walk-in"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default StudentProfileLogs;
