import axios from 'axios'
import React, { useEffect } from 'react'
import API_URL from '../../../constants/api'
import toast from 'react-hot-toast'

function UpdateEmail({configDetails}) {
    const [email, setEmail] = React.useState('')
    const [save, setSave] = React.useState(false)
    const [savePass, setSavePass] = React.useState(false)
    const [passwordEmail, setPasswordEmail] = React.useState('')

    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const fetchAdmin = async () => {
        const res = await axios.get(`${API_URL}admin`, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        })
        setEmail(res.data.email)
    }

    const handleUpadateEmail = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

        if(!emailRegex.test(email)) return toast.error('Invalid email address')

        const res = await axios.put(`${API_URL}admin/email`, {
            email,
            password: passwordEmail
        }, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        }).then(res => {
            toast.success('Email updated successfully')
            fetchAdmin()
            setPasswordEmail('')
            setSave(false)
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    const handleUpdatePassword = async () => {
        if(newPassword.length < 8) return toast.error('Old password must be at least 8 characters')
        if(newPassword !== confirmPassword) return toast.error('Passwords do not match')

        toast.loading('Updating password...')

        const res = await axios.put(`${API_URL}admin/password`, {
            oldPassword,
            newPassword
        }, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        }).then(res => {
            toast.dismiss()
            toast.success('Password updated successfully')
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setSavePass(false)
            toast.success('Password updated successfully')
        }).catch(err => {
            toast.dismiss()
            toast.error(err.response.data.message)
        })
    }
    
    
    useEffect(() => {
        fetchAdmin()
    }, [])
    return (
            <div className='flex flex-col gap-8 p-4'>
                <div>
                    <div className='flex items-start gap-4'>
                        <div className='flex flex-col w-1/6'>
                            <h1 className='text-sm font-medium'>Email</h1>
                            <p className='text-xs'>Update admin email</p>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <label className='text-xs'>Email</label>
                            <input type="text" value={email} className='p-2 px-8 border font-medium border-black/10 rounded w-full' onChange={e => setEmail(e.target.value)} disabled={save}/>
                            {
                                save && (
                                <div className='flex flex-col gap-4 shadow-md bg-white p-4'>
                                    <h2 className='text-sm font-medium'>Confirmation</h2>
                                    <label className='text-xs'>Enter admin password to save:</label>
                                    <input value={passwordEmail} onChange={e=>setPasswordEmail(e.target.value)} type="password" className='p-2 px-2 border font-medium border-black/10 rounded w-full'/>
                                    <div className='flex gap-4 justify-end'>
                                        <button onClick={()=>setSave(false)} className='border-red-600 border text-red-600 hover:bg-red-700 transition hover:text-white w-1/12 px-2 py-2 rounded text-xs'>Cancel</button>
                                        <button onClick={handleUpadateEmail} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/12 px-2 py-2 rounded text-xs'>Save</button>
                                    </div>
                                </div>   
                                )
                            }
                        </div>

                    </div> 
                    <div className='flex items-center justify-end gap-4 mt-4 w-full'>
                        {
                            !save && <button onClick={()=>setSave(true)} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/12 px-2 py-2 rounded text-xs'>Save Password</button>
                        }
                    </div>
                </div>

                <div>
                    <div className='flex items-start gap-4'>
                        <div className='flex flex-col w-1/6'>
                            <h1 className='text-sm font-medium'>Password</h1>
                            <p className='text-xs'>Update admin password</p>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-xs'>Old Password</label>
                            <input disabled={savePass} type="password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)} className='p-2 px-8 mb-4 border font-medium border-black/10 rounded w-full'/>
                            <label className='text-xs'>New Password</label>
                            <input disabled={savePass} type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='p-2 px-8 mb-4 border font-medium border-black/10 rounded w-full'/>
                            <label className='text-xs'>Confirm Password</label>
                            <input disabled={savePass} type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className='p-2 px-8 border font-medium border-black/10 rounded w-full'/> 
                            {
                                savePass && (
                                <div className='flex flex-col gap-4 shadow-md bg-white p-4'>
                                    <h2 className='text-sm font-medium'>Confirmation</h2>
                                    <label className='text-xs'>Are you sure you want to change admin password?</label>
                                    <div className='flex gap-4 justify-end'>
                                        <button onClick={()=>setSavePass(false)} className='border-red-600 border text-red-600 hover:bg-red-700 transition hover:text-white w-1/12 px-2 py-2 rounded text-xs'>Cancel</button>
                                        <button onClick={handleUpdatePassword} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/12 px-2 py-2 rounded text-xs'>Yes, proceed</button>
                                    </div>
                                </div>   
                                )
                            }
                        </div>

                    </div> 
                    {
                        !savePass && (
                            <div className='flex items-center justify-end gap-4 mt-4 w-full'>
                                <button onClick={()=>setSavePass(true)} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/12 px-2 py-2 rounded text-xs'>Save Password</button>
                            </div>
                        )
                    }
                </div>
            </div>
    )
}

export default UpdateEmail