import axios from 'axios';
import React, {act, useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import API_URL from '../../../constants/api';
import useAuth from '../../../helper/useAuth';
import UpdateButton from './Update_Button';
import UpdatePasswordButton from './UpdatePasswordButton';

function UpdatePassword() {
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const {user} = useAuth();

    const handleChange = async (name, value) => {
        // Update the user details
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        if(!password.oldPassword || !password.newPassword || !password.confirmPassword) return toast.error("Please fill out all the fields.");
        if(password.newPassword !== password.confirmPassword) return toast.error("Passwords do not match.");
        if(password.newPassword.length < 8) return toast.error("Password must be at least 8 characters long.");
        const response = await axios.put(`${API_URL}student/password/${user._id}`, {
            oldPassword: password.oldPassword,
            newPassword: password.newPassword,
        }).catch(error => {
            toast.dismiss();
            toast.error(error.response.data.message)
        });

        if(response && response.data) {
            window.location.reload();
            toast.dismiss();
            toast.success(response.data.message);
        }
    }
    return (
        <div className="flex flex-col w-full p-2">
            <div className="flex justify-center flex-col">
                <h2 className="text-lg text-gray-700">
                    Update Your <span className="text-emerald-800 font-semibold">Password</span>
                </h2>
            </div>
            
            <div>
                <label htmlFor="oldPassword" className="text-sm text-gray-600">Old Password</label>
                <input 
                    type="password" 
                    id="oldPassword" 
                    name="oldPassword" 
                    value={password?.oldPassword} 
                    onChange={(e) => handleChange('oldPassword', e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mt-2"/>
                
                <label htmlFor="newPassword" className="text-sm text-gray-600 mt-4">New Password</label>
                <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    value={password?.newPassword} 
                    onChange={(e) => handleChange('newPassword', e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mt-2"/>

                <label htmlFor="confirmPassword" className="text-sm text-gray-600 mt-4">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={password?.confirmPassword} 
                    onChange={(e) => handleChange('confirmPassword', e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mt-2"/>
            </div>
            
            <div className="w-full mt-8 mb-4 flex gap-4">
                <UpdatePasswordButton handleUpdate={handleSubmit}/>
            </div>
        
        </div>
        
    )
}

export default UpdatePassword