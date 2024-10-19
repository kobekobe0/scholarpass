import axios from 'axios'
import React from 'react'
import API_URL from '../../../constants/api'
import toast from 'react-hot-toast'

function DeleteModal({handleDelete, setConfirmDelete}) {
    return (
        <div className='flex flex-col p-8 gap-2 w-full bg-white mb-4'>
            <h1 className='text-lg font-semibold'>Delete QRs</h1>
            <p className='text-sm mb-4'>Are you sure you want to delete these QRs? Once deleted, it can't be used again.</p>
            <div className='flex w-full justify-end gap-4 my-2'>
                <button onClick={()=>setConfirmDelete(false)} className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-1 rounded'>Cancel</button>
                <button onClick={handleDelete} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Submit</button>
            </div>

        </div>
    )
}

export default DeleteModal