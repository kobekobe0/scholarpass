import axios from 'axios';
import React, {act, useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import API_URL from '../../../constants/api';
import useAuth from '../../../helper/useAuth';
import UpdateButton from './Update_Button';
import UpdateAccountButton from './UpdateButtonAccount';

function UpdateAccount() {
    const [details, setDetails] = useState({
        cellphone: '',
        email: '',
    });
    const {user} = useAuth();

    useEffect(() => {
        setDetails(user);
    },[user])

    const handleChange = async (name, value) => {
        // Update the user details
        setDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        if(!details.cellphone || !details.email) return toast.error("Please fill out all the fields.");
        const response = await axios.put(`${API_URL}student/update/${user._id}`, {
            cellphone: details.cellphone,
            email: details.email,
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
                    Update Your <span className="text-emerald-800 font-semibold">Account</span>
                </h2>
            </div>
            
            <div>
                <label htmlFor="cellphone" className="text-sm text-gray-600">Cellphone</label>
                <input 
                    type="number" 
                    id="cellphone" 
                    name="cellphone" 
                    value={details?.cellphone} 
                    onChange={(e) => handleChange('cellphone', e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mt-2"/>
                
                <label htmlFor="email" className="text-sm text-gray-600 mt-4">Email</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={details?.email} 
                    onChange={(e) => handleChange('email', e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 mt-2"/>
            </div>
            
            <div className="w-full mt-8 mb-4 flex gap-4">
                <UpdateAccountButton handleSubmit={handleSubmit}/>
            </div>
        
        </div>
        
    )
}

export default UpdateAccount