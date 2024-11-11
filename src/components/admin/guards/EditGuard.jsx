import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API_URL from '../../../constants/api'
import toast from 'react-hot-toast'

function EditModal({ guardId }) {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    const [confirmDetails, setConfirmDetails] = useState(false)
    const [confirmDetailsPassword, setConfirmDetailsPassword] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleUpdate = async () => {
        if (username.length < 3) return toast.error('Username must be at least 3 characters long')
        if (firstName.length < 3 || lastName.length < 3) return toast.error('First and last names must be at least 3 characters long')
        if (adminPassword.length < 8) return toast.error('Admin password must be at least 8 characters long')

        try {
            const res = await axios.put(`${API_URL}guard/update/${guardId}`, {
                securityGuard:{
                    username,
                    name: {
                        first: firstName,
                        middle: middleName,
                        last: lastName,
                        suffix
                    },
                },
                adminPassword
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('authToken')}`
                }
            })

            toast.success(`${firstName} ${lastName}'s guard account updated successfully`)

            setAdminPassword('')
            setConfirmDetails(false)
        } catch (err) {
            setAdminPassword('')
            toast.error(err.response.data.message)
        }
    }

    const handleConfirmPassword = async () => {
        if (password !== confirmPassword) return toast.error('Passwords do not match')
        if (password.length < 6) return toast.error('Password must be at least 6 characters long')

        try {
            const res = await axios.put(`${API_URL}guard/change-password/${guardId}`, {
                newPassword: password,
                adminPassword: adminPassword
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('authToken')}`
                }
            })

            toast.success(`${firstName} ${lastName}'s guard account password updated successfully`)

            setPassword('')
            setConfirmPassword('')
            setConfirmDetailsPassword(false)
        } catch (err) {
            setPassword('')
            setConfirmPassword('')
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${API_URL}guard/${guardId}/${adminPassword}`, {
                headers: {
                    Authorization: `${localStorage.getItem('authToken')}`
                }
            })

            toast.success(`${firstName} ${lastName}'s guard account deleted successfully`)
            setConfirmDelete(false)
            window.location.reload()
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const fetchGuard = async () => {
        try {
            const res = await axios.get(`${API_URL}guard/${guardId}`, {
                headers: {
                    Authorization: `${localStorage.getItem('authToken')}`
                }
            })

            const { username, name } = res.data
            setUsername(username)
            setFirstName(name.first)
            setMiddleName(name.middle)
            setLastName(name.last)
            setSuffix(name.suffix)
            console.log(res.data)
        } catch (err) {
            console.log(err)
            toast.error('Failed to fetch guard')
        }
    }

    useEffect(() => {
        if(!guardId) return
        fetchGuard()
    }, [guardId])

    return (
        <div className='flex flex-col p-8 gap-2 w-full bg-white mb-4'>
            <h1 className='text-lg font-semibold'>Edit Guard Account</h1>
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
                {
                    !confirmDetails && (
                        <div className='flex w-full justify-end gap-4 my-2 mb-4'>
                            <button disabled={confirmDetailsPassword} onClick={()=> setConfirmDetails(true)} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Update Details</button>
                        </div>
                    )
                }
                {
                    confirmDetails && (
                        <div className='flex flex-col bg-gray-100 p-4 rounded w-full gap-4 my-2 mb-4'>
                            <label className='text-sm'>Admin Password</label>
                            <input onChange={e => setAdminPassword(e.target.value)} value={adminPassword} type="password" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Admin password' />
                            <div className='flex items-center gap-2 justify-end'>
                                <button onClick={()=> setConfirmDetails(false)} className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-1 rounded'>Cancel</button>
                                <button onClick={handleUpdate} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Update</button>
                            </div>
                        </div>
                    )
                }

                
                <label className='text-sm'>Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Password' />

                <label className='text-sm'>Confirm Password</label>
                <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Confirm password' />
                {
                    !confirmDetailsPassword && (
                        <div className='flex w-full justify-end gap-4 my-2'>
                            <button onClick={()=>setConfirmDetailsPassword(true)} disabled={confirmDetails} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Update Password</button>
                        </div>
                    )
                }
                {
                    confirmDetailsPassword && (
                        <div className='flex flex-col bg-gray-100 p-4 rounded w-full gap-4 my-2'>
                            <label className='text-sm'>Admin Password</label>
                            <input onChange={e => setAdminPassword(e.target.value)} value={adminPassword} type="password" className='border border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Admin password' />
                            <div className='flex items-center gap-2 justify-end'>
                                <button onClick={()=> setConfirmDetailsPassword(false)} className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-1 rounded'>Cancel</button>
                                <button onClick={handleConfirmPassword} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Update</button>
                            </div>
                        </div>
                    )
                }

                <div className='flex flex-col gap-2 bg-gray-100 p-4 rounded'>
                    <h2 className='font-semibold'>Delete Account</h2>
                    <p>
                        Delete this account permanently. This action cannot be undone.
                    </p>
                    {
                        confirmDelete && (
                            <div className='flex flex-col items-start w-full bg-gray-200 p-4 rounded'>
                                <label className='text-sm'>Admin Password</label>
                                <input onChange={e => setAdminPassword(e.target.value)} value={adminPassword} type="password" className='border w-full border-gray-300 rounded-md px-4 py-2 mb-4' placeholder='Admin password' />

                                <div className='flex items-center gap-2 justify-end'>
                                    <button onClick={()=> setConfirmDelete(false)} className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-1 rounded'>Cancel</button>
                                    <button onClick={handleDelete} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Delete</button>
                                </div>
                            </div>
                        )
                    }
                    {
                        !confirmDelete && (
                            <div className='w-full mt-4'>
                                <button onClick={()=>setConfirmDelete(true)} className='w-full bg-red-500 text-white px-4 rounded py-1'>Delete</button>
                            </div>
                        )
                    }

                </div>
 
            </div>

        </div>
    )
}

export default EditModal
