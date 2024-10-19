import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../constants/api';
import Update_PFP from '../student/student-components/Upadate_PFP';
import ProfilePicture from './settings/ProfilePicture';
import COR from './settings/COR';
import toast from 'react-hot-toast';

function StudentProfileSettings({ student, handlePfpUpdate, handlePasswordUpdate }) {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [details, setDetails] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            toast.error('Please upload a valid PDF file.');
        } else {
            setFile(selectedFile); 
            console.log('PDF file selected:', selectedFile);
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const passwordUpdate = async () => {
        if(password !== confirmPassword) return toast.error('Passwords do not match');
        if(password.length < 8) return toast.error('Password must be at least 8 characters long');

        handlePasswordUpdate(password);
    }

    const corUpdate = async () => {
        if(!file) return toast.error('Please upload a valid PDF file.');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${API_URL}student/cor`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(res.data.details.studentNumber !== student.studentNumber) return toast.error('Please upload the COR of the student.');
            setDetails(res.data.details);
            toast.success('COR Uploaded');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleSubmitDetails = async () => {
        if(!details) return toast.error('Please upload a COR file first.');
        try {
            const res = await axios.put(`${API_URL}student/update/${student._id}`, details, {
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            toast.success('Details Updated');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='w-full h-full flex flex-col '>
            <div className="flex gap-4 items-center justify-between my-4">
                <h1 className='text-lg font-semibold'>Settings</h1>
            </div>

            <div className="flex-grow overflow-y-scroll gap-4 border-gray-300 rounded-lg">
                <div className='flex w-full mb-8'>
                    <div className='w-1/5'>
                        <h2 className='text-sm font-medium text-gray-700'>Profile Picture</h2>
                        <p className='text-xs'>Update Profile Picture Manually</p>
                    </div>
                    <ProfilePicture handlePfpUpdate={handlePfpUpdate}/>
                </div>
                <hr className='my-8'/>

                <div className='flex w-full mb-8'>
                    <div className='w-1/5'>
                        <h2 className='text-sm font-medium text-gray-700'>Password</h2>
                        <p className='text-xs'>Update Password</p>
                    </div>

                    <div className='w-full flex flex-col items-end gap-4'>
                        <div className='flex w-full flex-col gap-2'>
                            <label className='text-xs'>Password</label>
                            <input type="password" className='p-2 mb-2 border rounded border-black/30' onChange={e=>setPassword(e.target.value)}/>
                            <label className='text-xs'>Confirm Password</label>
                            <input type="password" className='p-2 border rounded border-black/30' onChange={e=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <button onClick={passwordUpdate} className='bg-emerald-600 text-white px-2 py-1 rounded'>Update Password</button>
                    </div>
                </div>
                <hr className='my-8'/>
                                
                <div className='flex w-full mb-8'>
                    <div className='w-1/5'>
                        <h2 className='text-sm font-medium text-gray-700'>COR</h2>
                        <p className='text-xs'>Update student's details</p>
                    </div>

                    <div className='w-full flex flex-col items-end gap-4'>
                        {/* Hidden file input */}
                        <input 
                        type="file" 
                        id="fileInput" 
                        className='hidden' 
                        onChange={handleFileChange} 
                        />

                        {/* Custom button that triggers the file input */}
                        <button  
                        className='bg-gray-200 text-gray-700 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-300 transition duration-200 ease-in-out w-full'
                        onClick={handleButtonClick}
                        >
                            {
                                file ? <p className='text-gray-700 text-sm'>{file.name}</p> : <><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15"><path fill="currentColor" d="M2.5 6.5V6H2v.5zm4 0V6H6v.5zm0 4H6v.5h.5zm7-7h.5v-.207l-.146-.147zm-3-3l.354-.354L10.707 0H10.5zM2.5 7h1V6h-1zm.5 4V8.5H2V11zm0-2.5v-2H2v2zm.5-.5h-1v1h1zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 5 7.5zM3.5 7a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 3.5 6zM6 6.5v4h1v-4zm.5 4.5h1v-1h-1zM9 9.5v-2H8v2zM7.5 6h-1v1h1zM9 7.5A1.5 1.5 0 0 0 7.5 6v1a.5.5 0 0 1 .5.5zM7.5 11A1.5 1.5 0 0 0 9 9.5H8a.5.5 0 0 1-.5.5zM10 6v5h1V6zm.5 1H13V6h-2.5zm0 2H12V8h-1.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146l3 3l.708-.708l-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5z"/></svg><p>Select PDF File</p></>
                            }
                        </button>

                        {
                            !details ? 
                            <button 
                                className='bg-emerald-700 text-white px-4 py-2 text-sm rounded transition duration-200 ease-in-out hover:bg-emerald-500'
                                onClick={corUpdate}
                            >
                                Upload COR
                            </button> :
                            <button 
                                className='bg-emerald-700 text-white px-4 py-2 text-sm rounded transition duration-200 ease-in-out hover:bg-emerald-500'
                                onClick={handleSubmitDetails}
                            >
                                Update Details
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfileSettings;
