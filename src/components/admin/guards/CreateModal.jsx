import axios from 'axios'
import React, { useState } from 'react'
import API_URL from '../../../constants/api'
import toast from 'react-hot-toast'

function CreateModal({ setCreate, fetchGuards }) {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleCreate = async () => {
        if (password !== confirmPassword) return toast.error('Passwords do not match')
        if (username.length < 3) return toast.error('Username must be at least 3 characters long')
        if (firstName.length < 3 || lastName.length < 3) return toast.error('First and last names must be at least 3 characters long')
        if (password.length < 6) return toast.error('Password must be at least 6 characters long')
        
        try {
            const res = await axios.post(`${API_URL}guard/create`, {
                username,
                name: {
                    first: firstName,
                    middle: middleName,
                    last: lastName,
                    suffix
                },
                password
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('authToken')}`
                }
            })

            toast.success(`${firstName} ${lastName}'s guard account created successfully`)
            setCreate(false)
            fetchGuards()
        } catch (err) {
            toast.error('Failed to create account')
        }
    }

    return (
        <div className='flex flex-col p-8 gap-2 w-full bg-white mb-4'>
            <h1 className='text-lg font-semibold'>Create Guard Account</h1>
            <p className='text-sm mb-4'>Enter credentials</p>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-sm'>First Name</label>
                        <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='First name' />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-sm'>Middle Name</label>
                        <input onChange={e => setMiddleName(e.target.value)} value={middleName} type="text" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Middle name' />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-sm'>Last Name</label>
                        <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Last name' />
                    </div>
                    
                    <div className='flex flex-col'>
                        <label className='text-sm'>Suffix</label>
                        <input onChange={e => setSuffix(e.target.value)} value={suffix} type="text" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Suffix' />
                    </div>
                </div>
                
                <label className='text-sm'>Username</label>
                <input onChange={e => setUsername(e.target.value)} value={username} type="text" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Username' />

                <label className='text-sm'>Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Password' />

                <label className='text-sm'>Confirm Password</label>
                <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Confirm password' />
            </div>
            <div className='flex w-full justify-end gap-4 my-2'>
                <button onClick={() => setCreate(false)} className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-1 rounded'>Cancel</button>
                <button onClick={handleCreate} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Submit</button>
            </div>
        </div>
    )
}

export default CreateModal
