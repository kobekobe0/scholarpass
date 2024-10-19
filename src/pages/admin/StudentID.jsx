import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import API_URL from '../../constants/api'
import abbrev from '../../helper/abbrev'
import StudentProfile from '../../components/admin/StudentProfile'
import StudentProfileLogs from '../../components/admin/StudentProfileLogs'
import StudentProfileViolations from '../../components/admin/StudentProfileViolations'
import StudentProfileRequests from '../../components/admin/StudentProfileRequests'
import StudentProfileVehicles from '../../components/admin/StudentProfileVehicles'
import StudentProfileSettings from '../../components/admin/StudentProfileSettings'
import Schedule from '../../components/admin/settings/Schedule'
import toast from 'react-hot-toast'

function StudentID() {
    const [activeTab, setActiveTab] = React.useState('logs')
    const [student, setStudent] = React.useState({})
    
    const fetchStudent = async () => {
        const res = await axios.get(`${API_URL}student/student/${id}`)
        console.log(res.data)
        setStudent(res.data)
    }

    useEffect(() => {
        fetchStudent()
    }, [])
    const {id} = useParams()

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    const handlePfpUpdate = async (file) => {
        if(!file) return toast.error('Please upload a valid image file.')
        try{
            const formData = new FormData()
            formData.append('image', file)
            await axios.put(`${API_URL}student/admin/update-pfp/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('authToken')
                }
            })

            toast.success('Profile Picture Updated')

            fetchStudent()
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const handlePasswordUpdate = async (password) => {
        try {
            const res = await axios.put(`${API_URL}student/admin/update-password/${id}`, {newPassword: password}, {
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            })
            console.log(res)
            toast.success('Password Updated')
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between items-center my-8 mx-8'>
                <h2 className='text-gray-600 text-sm'>Student Profile</h2>
            </div>
            <div className='flex'>
                <StudentProfile student={student} />
                <div className='flex flex-col my-4 mx-8 w-5/6 h-[80vh] justify-start p-8 items-start bg-white shadow-md'>
                    {/* Tabs */}
                    <div className='flex'>
                        <button onClick={() => handleTabChange('logs')} className={`border-b-2  w-32 text-center px-4 py-2 ${activeTab === 'logs' ? 'border-emerald-700 text-emerald-700' : 'border-white'}`}>Logs</button>
                        <button onClick={() => handleTabChange('violations')} className={`border-b-2 w-32 text-center px-4 py-2 ${activeTab === 'violations' ? 'border-emerald-700 text-emerald-700' : 'border-white'}`}>Violations</button>
                        <button onClick={() => handleTabChange('requests')} className={`border-b-2 w-32 text-center px-4 py-2 ${activeTab === 'requests' ? 'border-emerald-700 text-emerald-700' : 'border-white'}`}>Requests</button>
                        <button onClick={() => handleTabChange('vehicles')} className={`border-b-2 w-32 text-center px-4 py-2 ${activeTab === 'vehicles' ? 'border-emerald-700 text-emerald-700' : 'border-white'}`}>Vehicles</button>
                        <button onClick={() => handleTabChange('schedule')} className={`border-b-2 w-32 text-center px-4 py-2 ${activeTab === 'schedule' ? 'border-emerald-700 text-emerald-700' : 'border-white'}`}>Schedule</button>
                        <button onClick={() => handleTabChange('settings')} className={`border-b-2 w-32 text-center px-4 py-2 ${activeTab === 'settings' ? 'border-emerald-700 text-emerald-700' : 'border-white'}`}>Settings</button>
                    </div>
                    
                    {/* Content Area */}
                    <div className='flex-grow w-full overflow-y-scroll'>
                        {activeTab === 'logs' && (
                            <StudentProfileLogs id={id} />
                        )}
                        {activeTab === 'violations' && (
                            <StudentProfileViolations id={id} />
                        )}
                        {activeTab === 'requests' && (
                            <StudentProfileRequests id={id} />
                        )}
                        {activeTab === 'schedule' && (
                            <Schedule schedule={student?.schedule} />
                        )}
                        {activeTab === 'vehicles' && (
                            <StudentProfileVehicles id={id} />
                        )}
                        {activeTab === 'settings' && (
                            <StudentProfileSettings student={student} handlePfpUpdate={handlePfpUpdate} handlePasswordUpdate={handlePasswordUpdate}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default StudentID