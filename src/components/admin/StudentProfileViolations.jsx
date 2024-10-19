import React, { useEffect } from 'react';
import useStudentLogStore from '../../store/student.log';

function StudentProfileViolations({ id }) {
    const { studentLogs, violations, fetchStudentLogs, fetchStudentViolations, loading, error, clearData } = useStudentLogStore();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [count, setCount] = React.useState({ minor: 0, major: 0, severe: 0 });

    useEffect(() => {
        clearData();
        fetchStudentViolations(id);
    }, []);

    useEffect(() => {
        if (violations?.length > 0) {
            let minor = 0;
            let major = 0;
            let severe = 0;

            violations.forEach((log) => {
                if (log.current) {
                    if (log.severity === 'MINOR') minor++;
                    if (log.severity === 'MAJOR') major++;
                    if (log.severity === 'SEVERE') severe++;
                }
            });

            setCount({ minor, major, severe });
        }
    }, [violations])

    return (
        <div className='w-full h-full flex flex-col '>
            <div className="flex gap-4 items-center justify-between mt-4">
                <h1 className='text-lg font-semibold'>Violations</h1>
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

            <div className='flex w-full gap-2 mb-8'>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <label className='text-gray-700 font-medium text-xs'>Minor</label>
                        <span className='text-yellow-500 font-semibold'>{count.minor}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-gray-700 font-medium text-xs'>Major</label>
                        <span className='text-orange-500 font-semibold'>{count.major}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-gray-700 font-medium text-xs'>Severe</label>
                        <span className='text-red-500 font-semibold'>{count.severe}</span>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-scroll border border-gray-300">
                <table className="w-full border-collapse border border-slate-400 text-xs">
                    <thead className="sticky top-0 bg-gray-200">
                        <tr>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Date</th>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Violation</th>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Severity</th>
                            <th className="border border-slate-300 py-2 px-4 text-left font-medium whitespace-nowrap">Current</th>
                        </tr>
                    </thead>
                    <tbody>
                        {violations.map((log, index) => (
                            <tr key={log.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200`}>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                                </td>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {log.violation}
                                </td>
                                <td className={`${log.severity == "MAJOR" && 'text-orange-500'} ${log.severity == "MINOR" && 'text-yellow-500'} ${log.severity == "SEVERE" && 'text-red-500'} border border-slate-300 py-2 px-4 whitespace-nowrap`}>
                                    {log.severity}
                                </td>
                                <td className="border border-slate-300 py-2 px-4 whitespace-nowrap">
                                    {log.current ? 'Yes' : 'No'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default StudentProfileViolations;
