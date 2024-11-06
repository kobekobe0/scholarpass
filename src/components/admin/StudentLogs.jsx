import React, { useCallback, useEffect, useState } from 'react'
import useLogStore from '../../store/log.store';
import debounce from '../../helper/debounce.js';
import { Link } from 'react-router-dom';
import printTableData from '../../helper/print.js';


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
    }, []);

    useEffect(() => {
      fetchLogs({ limit, page: currentPage, studentName, from: fromDate || '', to: toDate || '' });
    }, [limit, currentPage, studentName, fromDate, toDate])

    const handlePrint = () => {
      printTableData(logs, "Entry Logs")
    }

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
            <div className="flex items-center gap-2">
                <label className="text-xs">Page</label>
                <button 
                    onClick={() => setPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 text-xs border border-gray-300 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700'}`}
                >
                    Previous
                </button>
                <select 
                    value={currentPage} 
                    onChange={e => setPage(Number(e.target.value))} // Ensure the value is a number
                    className='px-4 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700'
                >
                    {Array.from(Array(totalPages || 1).keys()).map(pageNumber => (
                        <option key={pageNumber + 1} value={pageNumber + 1}>{pageNumber + 1}</option>
                    ))}
                </select>
                <button 
                    onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 text-xs border border-gray-300 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700'}`}
                >
                    Next
                </button>
            </div>

        </div>

  )
}

export default StudentLogs