import React, { useEffect } from 'react'
import useAuth from '../../helper/useAuth'
import useStudentStatsStore from '../../store/student.stats'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const {isLoading, user} = useAuth();
    const navigate = useNavigate()
    const {
      violations,
      pendingCardRequest,
      registeredVehicles,
      entryLogs,
      loading,
      error,
      fetchStudentStats,
      clearStats
    } = useStudentStatsStore();

    const handleNavigate = (path) => {
      navigate(path)
    }

    useEffect(()=> {
      console.log(entryLogs)
    }, [entryLogs])

    useEffect(() => {
      if(user){

          fetchStudentStats(user._id);
          console.log(user)
      }
    }, [user]);

    useEffect(() => {
      console.log(violations, pendingCardRequest, registeredVehicles, entryLogs, loading, error);
    }, [violations, pendingCardRequest, registeredVehicles, entryLogs, loading, error]);
    return (
      <div >
          {
              user && !user?.valid && (
                <div className='flex p-4 items-start gap-4 bg-yellow-300 text-yellow-800 rounded mb-8'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3M12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m1 4h-2v-2h2z"/></svg>
                  <div className='flex flex-col'>
                      <h1 className="text-2xl font-semibold text-yellow-800">COR is Out-of-Date</h1>
                      <p className="text-sm text-yellow-800">Please upload your latest COR to continue using the service.</p>
                      <p className="text-xs font-medium text-yellow-800 mt-4">Profile {'>'} Update COR {'>'} Confirm</p>
                  </div>

                </div>
              )
          }
          <div className="flex justify-between items-center mb-12">

              <div className="flex flex-col gap-2">
                  <h2 className="xl:text-3xl text-xl font-semibold text-gray-800">Welcome, <span className="font-bold">{user?.name}</span></h2>
                  <p className="text-md text-gray-600">Good to have you back! Here's an overview of your profile and activities.</p>
              </div>
              {/* Profile Image */}
              <div className="flex-shrink-0 hidden md:block">
                  <img src={user?.image} alt="student" className="rounded-full w-28 h-28 object-cover border-4 border-gray-300 shadow-lg"/>
              </div>
          </div>

          {/* Overview Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-700">Registered Vehicles</h3>
                  <p className="text-4xl font-bold text-emerald-700">{registeredVehicles?.count}</p>
                  <button onClick={()=>handleNavigate('/student/vehicle')} className="mt-4 text-sm text-emerald-600 hover:underline">Manage Vehicles</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-700">Violations</h3>
                  <p className="text-4xl font-bold text-red-500">{violations?.count}</p>
                  <button onClick={()=>handleNavigate('/student/logs')} className="mt-4 text-sm text-red-600 hover:underline">View Violations</button>
              </div>
          </div>

          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 gap-2">
              <div className="p-4 rounded-lg transition flex justify-between items-center">
                  <div>
                      <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Recent Entry Logs</h3>
                  </div>
              </div>
              <div>
              <div className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl">
                    <div className="overflow-x-auto max-h-[400px]"> {/* Set fixed height and enable horizontal scrolling */}
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b bg-gray-200 text-gray-600">
                            <th className="py-3 px-4 text-left text-sm font-semibold">Date</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Time In</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Time Out</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Row for Orientation Day */}
                          {entryLogs
                            ?.sort((a, b) => new Date(a.timeIn) - new Date(b.timeIn))
                            .map((log, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4 text-sm text-gray-800">
                                  {new Date(log.timeIn).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                  })}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-800">
                                  {new Date(log.timeIn).toLocaleTimeString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true // Set to true for 12-hour format
                                  })}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-800">
                                  {log.timeOut
                                    ? new Date(log.timeOut).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true // Set to true for 12-hour format
                                      })
                                    : "N/A"}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-800">
                                  {log?.vehicle?.model ? log.vehicle.model : "Walk-in"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

              </div>
          </div>
      </div>




  )
}

export default Dashboard