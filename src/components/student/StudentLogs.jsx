import React, { useEffect, useState } from 'react';
import useStudentLogStore from '../../store/student.log';
import useAuth from '../../helper/useAuth';

const StudentLogs = () => {
    const [activeTab, setActiveTab] = useState('entry'); // Default tab
    const { studentLogs, violations, fetchStudentLogs, fetchStudentViolations, loading, error } = useStudentLogStore();
    const {user} = useAuth()
    useEffect(() => {
        if(!user) return
        fetchStudentLogs(user._id); // Replace 'studentID' with the actual student ID
    }, [user]);

    useEffect(()=> {
        console.log(studentLogs)
    },[studentLogs])

    return (
        <>
            <h1 className='text-lg mb-4 mx-4 font-semibold'>Student Logs</h1>
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md h-full flex flex-col"> {/* Adjust height based on your layout */}
                
                {/* Tab Navigation */}
                <div className="flex space-x-4 border-b mb-4">
                    <button 
                        onClick={() => setActiveTab('entry')} 
                        className={`py-2 px-4 text-lg font-semibold ${activeTab === 'entry' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-600 hover:text-green-500'}`}>
                        Entry Logs
                    </button>
                    <button 
                        onClick={() => setActiveTab('violations')} 
                        className={`py-2 px-4 text-lg font-semibold ${activeTab === 'violations' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
                        Violations
                    </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-auto"> {/* Make the content area flexible and scrollable */}
                    {activeTab === 'entry' && (
                        <div className="h-96 overflow-auto"> {/* Fixed height with scrollable table */}
                            <div className="w-full overflow-x-auto"> {/* Horizontal scroll wrapper */}
                                <table className="min-w-full rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Date</th>
                                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Time-in</th>
                                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Time-Out</th>
                                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Mode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentLogs.map(log => (
                                            <tr key={log.id} className="hover:bg-gray-200">
                                                <td className="py-2 px-4 whitespace-nowrap">{new Date(log.timeIn).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                                <td className="py-2 px-4 whitespace-nowrap">{new Date(log.timeIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                                <td className="py-2 px-4 whitespace-nowrap">{log?.timeOut ? new Date(log?.timeOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}</td>
                                                <td className="py-2 px-4 whitespace-nowrap">{log?.vehicle ? log.vehicle.model : "Walk-in"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


                    {activeTab === 'violations' && (
                        <div className="h-96 overflow-auto"> {/* Fixed height with scrollable table */}
                            <div className="w-full overflow-x-auto"> {/* Horizontal scroll wrapper */}
                                <table className="min-w-full rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 text-left whitespace-nowrap font-medium">Date</th>
                                            <th className="py-2 px-4 text-left whitespace-nowrap font-medium">Violation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {violations.map(violation => (
                                            <tr key={violation.id} className="hover:bg-gray-200">
                                                <td className="py-2 px-4 whitespace-nowrap">{new Date(violation.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                                <td className="py-2 px-4 whitespace-nowrap">{violation.violation}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default StudentLogs;
