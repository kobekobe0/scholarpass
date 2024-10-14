import React from 'react'
import abbrev from '../../helper/abbrev'
import { Link } from 'react-router-dom'

function StudentCard({student}) {
  return (
    <Link to={`/admin/students/${student._id}`} className='shadow-md bg-white flex w-full p-4 px-8 rounded hover:bg-slate-200 cursor-pointer transition justify-between'>
        <div className='flex items-center gap-4'>
            <img src={student.pfp} alt="" className='w-10 h-10 object-cover rounded-full'/>
            <div className='flex items-center gap-4'>
                <h3 className='text-lg font-semibold'>{student.name}</h3>
                <p className='text-gray-600'>{student.studentNumber}</p>
            </div>
        </div>
        <div className='flex items-center'>
            <h2 className='text-xl'>{abbrev(student.department)}</h2>
        </div>
    </Link>
  )
}

export default StudentCard