import axios from 'axios';
import React, {act, useState} from 'react'
import toast from 'react-hot-toast';
import API_URL from '../../../constants/api';
import useAuth from '../../../helper/useAuth';
import UpdateButton from './Update_Button';

function Update_PFP() {
    const [activeTab, setActiveTab] = React.useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const {user} = useAuth();
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };
    const [details, setDetails] = useState({});
    const [schedule, setSchedule] = useState([]);
    
    const handleDragLeave = () => {
        setDragActive(false);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files[0];
        //should be image
        if (droppedFile && droppedFile.type.includes('image/')) {
            console.log(droppedFile)
            setFile(droppedFile);
        } else {
            toast.error('Please upload a valid image file.');
        }
    };
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        //should be image
        if (selectedFile && selectedFile.type.includes('image/')) {
            setFile(selectedFile);
        } else {
            toast.error('Please upload a valid image file.');
        }
    };

    const handleUpdate = async () => {
        if(!file) return toast.error("Please upload a file first.");
        toast.loading("Uploading file...");

        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.put(`${API_URL}student/pfp/${user._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            toast.dismiss();
            //reload the page
            toast.error(error.response.data.message)
            window.location.reload();
        });

        if(response && response.data) {
            window.location.reload();
            toast.dismiss();
            toast.success(response.data.message);
        }
    }

    const handleChange = (name, value) => {
        setDetails((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <div className="flex flex-col w-full p-2">
            <div className="flex justify-center flex-col">
                <h2 className="text-lg text-gray-700 mb-4">
                    Update Your <span className="text-emerald-800 font-semibold">Profile Picture</span>
                </h2>
                <p className='text-xs'>You can only change your profile picture once a month.</p>
            </div>
            
            {/* Draggable File Upload */}
            <div 
            className={`mt-8 py-16 px-8 border-dashed border-2 ${dragActive ? 'border-emerald-800' : 'border-gray-400'} rounded-md flex flex-col items-center justify-center`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
            <input 
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                {
                    file && (
                        <img src={URL.createObjectURL(file)} alt="uploaded" className="w-32 h-32 object-cover rounded"/>
                    )
                }
                <p className="text-lg text-gray-600">
                    {file ? `File: ${file.name}` : 'Drag & Drop your file here or click to upload'}
                </p>
            </label>
            </div>
            
            <div className="w-full mt-8 mb-4 flex gap-4">
                <UpdateButton handleUpdate={handleUpdate}/>
            </div>
        </div>
        
    )
}

export default Update_PFP