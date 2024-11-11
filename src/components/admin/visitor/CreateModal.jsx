import axios from 'axios'
import React from 'react'
import API_URL from '../../../constants/api'
import toast from 'react-hot-toast'

function CreateModal({setCreate, fetchQRs}) {
    const [number, setNumber] = React.useState(0)
    const handleCreate = async () => {
        if(number <= 0) return toast.error('Number of QRs must be greater than 0')
        if(number > 10) return toast.error('Number of QRs to be simoutlaneously created must not exceed 10')

        const res = await axios.post(`${API_URL}visitor/qr`, {
            number
        }, {
            headers: {
                Authorization: `${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            toast.success('QRs created successfully')
            setCreate(false)
            fetchQRs()
        }).catch(err => {
            toast.error('Failed to create QRs')
        })
    }
    return (
        <div className='flex flex-col p-8 gap-2 w-full bg-white mb-4'>
            <h1 className='text-lg font-semibold'>Create QRs</h1>
            <p className='text-sm mb-4'>Enter number of QR to be created</p>
            <input onChange={e=>setNumber(parseInt(e.target.value))} type="number" className='border border-gray-300 rounded-md px-4 py-2' placeholder='Number of Card to Create'/>
            <div className='flex w-full justify-end gap-4 my-2'>
                <button onClick={()=>setCreate(false)} className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-1 rounded'>Cancel</button>
                <button onClick={handleCreate} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Submit</button>
            </div>

        </div>
    )
}

export default CreateModal