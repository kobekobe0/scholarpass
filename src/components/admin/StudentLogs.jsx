import React, { useCallback, useEffect, useState } from 'react'
import useLogStore from '../../store/log.store';
import debounce from '../../helper/debounce.js';
import { Link } from 'react-router-dom';


//TODO: Design and add time picker
function StudentLogs() {
    const [limit, setLimit] = useState("100");
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [studentName, setStudentName] = useState('');
    const { logs, fetchLogs, loading, error, totalPages, currentPage, setPage, totalDocs } = useLogStore();

    const debouncedSetQuery = useCallback(
        debounce((newQuery) => {
            setStudentName(newQuery); 
        }, 300),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        debouncedSetQuery(value); // Call the debounced state setter
    };

    useEffect(() => {
        fetchLogs({ limit, page: currentPage, studentName, from: fromDate || '', to: toDate || '' });
    }, [studentName, fromDate, toDate]);

    useEffect(()=>{
        fetchLogs({ limit, page: currentPage, studentName, from: fromDate || '', to: toDate || '' });
    }, [limit])

    return (
        <div className=' rounded flex-1 p-8'>
            <div className='flex justify-between items-center mb-4 p-4 rounded-md'>
                <h2 className='text-lg font-semibold text-gray-800'>Recent Student Logs</h2>
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
      <th className="px-4 py-3 text-sm font-medium text-gray-600">Department</th>
      <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
      <th className="px-4 py-3 text-sm font-medium text-gray-600">Time In</th>
      <th className="px-4 py-3 text-sm font-medium text-gray-600">Time Out</th>
      <th className="px-4 py-3 text-sm font-medium text-gray-600">Vehicle Model</th>
    </tr>
  </thead>
  {loading ? (
    <tbody>
      <tr>
        <td colSpan="6" className="text-center mt-4">Loading...</td>
      </tr>
    </tbody>
  ) : error ? (
    <tbody>
      <tr>
        <td colSpan="6" className="text-center text-red-500">{error}</td>
      </tr>
    </tbody>
  ) : (
    <tbody>
      {logs?.map((log, index) => {
        const logDate = new Date(log.logDate);
        const formattedDate = logDate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const timeIn = new Date(log.timeIn);
        const formattedTimeIn = timeIn.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        let formattedTimeOut = "N/A";
        if (log.timeOut) {
          const timeOut = new Date(log.timeOut);
          formattedTimeOut = timeOut.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        }

        return (
          <tr
            key={index}
            className="border-b last:border-none hover:bg-gray-50 odd:bg-white even:bg-gray-100"
          >
            <td className="px-4 py-3 text-gray-700">
              <Link to={`/admin/students/${log.studentID._id}`}>
                {log.studentID.name}
              </Link>
            </td>
            <td className="px-4 py-3 text-gray-700">{log.studentID.department}</td>
            <td className="px-4 py-3 text-gray-700">{formattedDate}</td>
            <td className="px-4 py-3 text-gray-700">{formattedTimeIn}</td>
            <td className="px-4 py-3 text-gray-700">{formattedTimeOut}</td>
            <td className="px-4 py-3 text-gray-700">
              {log.vehicle ? log.vehicle.model : "Walk-in"}
            </td>
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

export default StudentLogs