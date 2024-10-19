import React, {useEffect} from 'react'
import axios from 'axios'
import abbrev from '../../helper/abbrev'
import API_URL from '../../constants/api'

function StudentProfile({student}) {
    return (
        <div className='flex flex-col my-4 mx-8 w-1/6 justify-start items-start'>
        <img src={student?.pfp} alt="Profile Picture" className='w-56 h-56 object-cover rounded-md shadow-md' />

        <div className='flex flex-col gap-3 mt-6'>
            <h1 className='text-2xl font-semibold text-gray-800'>{student?.name || 'N/A'}</h1>

            <h1 className='text-xl flex items-center gap-4 font-medium text-gray-800'>{student?.studentNumber || 'N/A'} <span className={`
            ${student?.valid ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-1 rounded-full text-xs 
            `}>{student?.valid ? "up-to-date" : "out-of-date"}</span></h1>

            <div>
            <h2 className='text-xs text-gray-500 uppercase tracking-wide'>Section</h2>
            <p className='text-sm text-gray-700'>{student?.section || 'No Section'}</p>
            </div>

            <div>
            <h2 className='text-xs text-gray-500 uppercase tracking-wide'>Department</h2>
            <p className='text-sm text-gray-700'>{student?.department ? abbrev(student?.department) : 'No Department'}</p>
            </div>

            <div>
            <h2 className='text-xs text-gray-500 uppercase tracking-wide'>Email</h2>
            <p className='text-sm text-gray-700'>{student?.email || 'No Email'}</p>
            </div>

            <div>
            <h2 className='text-xs text-gray-500 uppercase tracking-wide'>Cellphone</h2>
            <p className='text-sm text-gray-700'>{student?.cellphone || 'No Cellphone'}</p>
            </div>
        </div>
        </div>

    )
}

export default StudentProfile