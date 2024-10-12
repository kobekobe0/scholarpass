import React, { useEffect } from 'react'
import useAuth from '../../helper/useAuth'
import useStudentStatsStore from '../../store/student.stats'

function Dashboard() {
    const {isLoading, user} = useAuth();
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


    useEffect(() => {
      if(user){

          fetchStudentStats(user._id);
        
      }
    }, [user]);

    useEffect(() => {
      console.log(violations, pendingCardRequest, registeredVehicles, entryLogs, loading, error);
    }, [violations, pendingCardRequest, registeredVehicles, entryLogs, loading, error]);
    return (
      <div >
          {/* Header Section */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-700">Registered Vehicles</h3>
                  <p className="text-4xl font-bold text-emerald-700">{registeredVehicles?.count}</p>
                  <button className="mt-4 text-sm text-emerald-600 hover:underline">Manage Vehicles</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-700">Pending Card Requests</h3>
                  <p className="text-4xl font-bold text-yellow-500">{pendingCardRequest?.count}</p>
                  <button className="mt-4 text-sm text-yellow-600 hover:underline">Check Request Status</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-700">Violations</h3>
                  <p className="text-4xl font-bold text-red-500">{violations?.count}</p>
                  <button className="mt-4 text-sm text-red-600 hover:underline">View Violations</button>
              </div>
          </div>

          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 gap-2">
              <div className="p-4 rounded-lg transition flex justify-between items-center">
                  <div>
                      <h3 className="text-lg xl:text-xl font-semibold text-gray-700">Recent Entry Logs</h3>
                  </div>
                  <button className="rounded-full  text-blue-500 px-4 py-2 text-xs  transition">
                      View Logs
                  </button>
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
        {entryLogs?.map((log, index) => (
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="py-4 px-4 text-sm text-gray-800">{new Date(log.timeIn).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })}</td>
            <td className="py-4 px-4 text-sm text-gray-800">{new Date(log.timeIn).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // 24-hour format, set to true for 12-hour format
            })}</td>
            <td className="py-4 px-4 text-sm text-gray-800">{new Date(log.timeOut).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // 24-hour format, set to true for 12-hour format
            })}</td>
            <td className="py-4 px-4 text-sm text-gray-800">{log?.vehicle?.model ? log.vehicle.model : "Walk-in"}</td>
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