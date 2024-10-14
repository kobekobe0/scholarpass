import React from 'react'
import StudentLogs from '../../components/admin/StudentLogs'

function Logs() {
  return (
    <div className='flex flex-col w-full'>
        
        <div className='flex justify-between gap-4 flex-col'>
            <StudentLogs/>
        </div>
    </div>
  )
}

export default Logs