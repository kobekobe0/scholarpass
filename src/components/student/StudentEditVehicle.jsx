import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for navigation
import VehicleDropDown from './student-components/Vehicle_Dropdown';
import useAuth from '../../helper/useAuth';
import axios from 'axios';
import API_URL from '../../constants/api';
import toast from 'react-hot-toast';

const EditVehicle = () => {
    const {id} = useParams();
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [details, setDetails] = useState({
        model: '',
        plateNumber: '',
        color: '',
        type: 'Motorcycle',
    });
    const [vehicleImage, setVehicleImage] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleDragOver = (e) => {
      e.preventDefault();
      setDragActive(true);
    };
  
    const handleDragLeave = () => {
      setDragActive(false);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      setDragActive(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
      } else {
        alert('Please upload a valid image file.');
      }
    };
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
      } else {
        alert('Please upload a valid image file.');
      }
    };

    const handleChange = (name, value) => {
        setDetails((prev) => ({ ...prev, [name]: value }));
    }
    
    const handleSubmit = async () => {
        if(submitting) return;
        setSubmitting(true);
        if(!details.model || !details.plateNumber || !details.color || !details.type) {
            setSubmitting(false);
            return toast.error('Please fill all fields');
        }
        try{

            const response = await axios.put(`${API_URL}vehicle/update/${id}`, details, {
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });

            toast.success('Vehicle updated successfully');
            setSubmitting(false);
        }catch(error){
            toast.error('Failed to add vehicle');
            console.log(error)
            setSubmitting(false);
        }
    }

    const handleUpdateImage = async () => {
        if(submitting) return;
        setSubmitting(true);
        if(!file) {
            setSubmitting(false);
            return toast.error('Please select an image');
        }
        try{
            const formData = new FormData();
            formData.append('image', file);
            const response = await axios.put(`${API_URL}vehicle/update-image/${id}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('authToken')
                }
            });

            toast.success('Vehicle image updated successfully');
            setSubmitting(false);
        }catch(error){
            toast.error('Failed to update vehicle image');
            console.log(error)
            setSubmitting(false);
        }
    }

    const fetchVehicle = async () => {
        try {
            const res = await axios.get(`${API_URL}vehicle/vehicle/${id}`);
            console.log(res)
            const temp = {
                color: res.data.color,
                model: res.data.model,
                plateNumber: res.data.plateNumber,
                type: res.data.type
            }
            setDetails(temp)
            setVehicleImage(res.data.image)
        } catch(error) {
            toast.error("Error fetching vehicle")
        }
    }

    useEffect(()=>{
        fetchVehicle()
    },[id])

    return (
        <div>
            <div className='flex justify-between mx-2 mb-8'>
                
               <h1 className='text-lg font-semibold'>Edit Vehicle</h1> 
               <Link to='/student/vehicle' className='bg-emerald-700 text-white px-4 py-1 text-sm rounded hover:bg-emerald-800 transition'>Back</Link>
            </div>
            
            <div className="flex flex-col w-full gap-4">
                <h2 className='text-sm'>Model<span className='text-xs ml-2 text-gray-500'>(e.g. Honda Click 150i)</span></h2>
                <div>
                    <input type="text" name='model' value={details?.model} onChange={e=> handleChange(e.target.name, e.target.value)} className='w-full p-2 border rounded border-gray-300 px-4'/>
                </div>

                <h2 className='text-sm'>Plate Number<span className='text-xs ml-2 text-gray-500'>(or registration number if not applicable)</span></h2>
                <div>
                    <input type="text" name='plateNumber' value={details?.plateNumber} onChange={e=> handleChange(e.target.name, e.target.value)} className='w-full p-2 border rounded border-gray-300 px-4'/>
                </div>

                <h2 className='text-sm'>Color</h2>
                <div >
                    <input type="text" name='color' value={details?.color} onChange={e=> handleChange(e.target.name, e.target.value)} className='w-full p-2 border rounded border-gray-300 px-4'/>
                </div>

                <h2 className='text-sm'>Type</h2>
                <div>
                    <select name='type' value={details?.type} className='w-full p-2 border rounded border-gray-300 px-4' onChange={e=> handleChange(e.target.name, e.target.value)}>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="4-Wheels">4-Wheels</option>
                        
                    </select>
                </div>
                <button onClick={handleSubmit} className='bg-emerald-600 text-white p-2 rounded mt-2 hover:bg-emerald-700 transition'>Update</button>


                <h2 className='text-sm'>Update Image</h2>
                <img src={vehicleImage ? vehicleImage : 'https://via.placeholder.com/150'} alt="Vehicle Image" className="object-cover rounded-md" />
                <div 
                    className={`p-8 border-dashed border-2 ${dragActive ? 'border-emerald-800' : 'border-gray-400'} rounded-md flex flex-col items-center justify-center`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                        {/* Display preview if image is selected */}
                        {file && (
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-32 h-32"> {/* Square container */}
                            <img 
                                src={URL.createObjectURL(file)} 
                                alt="Preview" 
                                className="absolute inset-0 w-full h-full object-cover rounded-md shadow-md"
                            />
                            </div>
                        </div>
                        )}
                    <input 
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                    <p className="text-lg text-gray-600">
                        {file ? `Selected Image: ${file.name}` : 'Drag & Drop your image here or click to upload'}
                    </p>
                    </label>
                </div>
                <button onClick={handleUpdateImage} className='bg-emerald-600 text-white p-2 rounded mt-2 hover:bg-emerald-700 transition'>Update Image</button>

            </div>
        </div>
    );
};

export default EditVehicle;
