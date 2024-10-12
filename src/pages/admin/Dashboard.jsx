import React from 'react'

function DashboardAdmin() {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex justify-between items-center  my-8 mx-4'>
          <h2 className='text-md font-thin'>Dashboard</h2>  
          <div className='flex items-center gap-4 text-gray-600'>
            <button className='text-xs font-normal'>Daily</button>
            <button className='text-xs font-normal'>Weekly</button>
            <button className='text-xs font-normal'>Monthly</button>
          </div>
        </div>
        
        <div className='flex justify-between gap-4 flex-col'>
            <div className='flex w-full flex-1 gap-4'>
                <div className='shadow-md p-6 bg-white rounded-lg flex-1'>
                    <h3 className='text-lg font-semibold text-gray-800'>Student Traffic</h3>
                    <p className='text-3xl font-bold text-gray-900'>0</p>
                    <button className='mt-4 text-sm text-emerald-600 hover:underline'>View Students</button>
                </div>
                <div className='shadow-md p-6 bg-white rounded-lg flex-1'>
                    <h3 className='text-lg font-semibold text-gray-800'>Vahicles Entered</h3>
                    <p className='text-3xl font-bold text-gray-900'>0</p>
                    <button className='mt-4 text-sm text-emerald-600 hover:underline'>View Vehicles</button>
                </div>
                <div className='shadow-md p-6 bg-white rounded-lg flex-1'>
                    <h3 className='text-lg font-semibold text-gray-800'>Visitors</h3>
                    <p className='text-3xl font-bold text-gray-900'>0</p>
                    <button className='mt-4 text-sm text-emerald-600 hover:underline'>View Visitors</button>
                </div>
            </div>

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
                        <tbody>
                            {/* Sample Data Row */}
                            <tr className='hover:bg-gray-50'>
                                <td className='px-4 py-2 text-gray-700'>John Doe</td>
                                <td className='px-4 py-2 text-gray-700'>Computer Science</td>
                                <td className='px-4 py-2 text-gray-700'>2024-10-12</td>
                                <td className='px-4 py-2 text-gray-700'>08:30 AM</td>
                                <td className='px-4 py-2 text-gray-700'>05:00 PM</td>
                                <td className='px-4 py-2 text-gray-700'>Toyota Corolla</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='shadow-md bg-white rounded flex-1 min-h-96 p-8'>
                <h2 className='text-xl font-semibold mb-4'>Recent Visitor Logs</h2>
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
                        <tbody>
                            {/* Sample Data Row */}
                            <tr className='hover:bg-gray-50'>
                                <td className='px-4 py-2 text-gray-700'>John Doe</td>
                                <td className='px-4 py-2 text-gray-700'>Computer Science</td>
                                <td className='px-4 py-2 text-gray-700'>2024-10-12</td>
                                <td className='px-4 py-2 text-gray-700'>08:30 AM</td>
                                <td className='px-4 py-2 text-gray-700'>05:00 PM</td>
                                <td className='px-4 py-2 text-gray-700'>Toyota Corolla</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    </div>
  )
}

export default DashboardAdmin