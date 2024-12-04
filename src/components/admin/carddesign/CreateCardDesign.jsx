import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import API_URL from '../../../constants/api';

function CreateCardDesign({ create, setCreate, fetchCards }) {
    const [files, setFiles] = useState([null, null]); // State to store 2 files, one for index 0 and one for index 1
    const [name, setName] = useState(''); // State to store the name
    const [type, setType] = useState(''); // State to store the type

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newFiles = [...files];
            newFiles[index] = file;
            setFiles(newFiles); // Update the specific index (0 or 1)
        }
    };

    const handleCreate = async () => {
        toast.loading("Creating card desgin")
        if(!name) return toast.error('Name is required');
        if(!type) return toast.error('Type is required');
        if(!files[0]) return toast.error('Display image is required');
        if(!files[1]) return toast.error('Template image is required');

        //check file size and type <5mb
        if(files[0].size > 5 * 1024 * 1024) return toast.error('Display image must be less than 5mb');
        if(files[1].size > 5 * 1024 * 1024) return toast.error('Template image must be less than 5mb');

        //check file type
        if(!files[0].type.includes('image')) return toast.error('Display image must be an image file');
        if(!files[1].type.includes('image')) return toast.error('Template image must be an image file');


        const formData = new FormData();
        formData.append('name', name);
        formData.append('images', files[0])
        formData.append('images', files[1])
        formData.append('type', type)

        const res = await axios.post(`${API_URL}cards/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            toast.dismiss()
            toast.success('Card design created successfully');
            fetchCards()
            setCreate(false)
        }).catch(err => {
            toast.dismiss()
            toast.error(err.response.data.message || "Failed to create card design");
        })
        
        console.log({ name, files });
        setCreate(false);
    };

    return (
                <div className='bg-white p-8 rounded-md w-full'>
                    <h1 className='text-lg font-semibold mb-4'>Create Card Design</h1>
                    
                    {/* Name Input */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>Name:</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 rounded-md px-4 py-2 w-full outline-none transition'
                            placeholder='Enter name'
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>Card Type:</label>
 
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className='border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 rounded-md px-4 py-2 w-full outline-none transition'
                        >
                            <option value=''>Select a card type</option>
                            <option value='VISITOR'>Visitor</option>
                            <option value='STUDENT'>Student</option>
                            <option value='VEHICLE'>Vehicle</option>
                        </select>
                    </div>

                    {/* Image Upload Inputs */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <label className='block text-gray-700 text-sm font-medium mb-4'>Upload Display Image</label>
                            <div className='flex items-center'>
                                <label className='cursor-pointer border-emerald-600 text-emerald-600 border hover:text-white px-4 py-1 rounded hover:bg-emerald-700 transition'>
                                    Choose File
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleFileChange(e, 0)}
                                        className='hidden'
                                    />
                                </label>
                                <span className='ml-4 text-gray-500'>
                                    {files[0] ? files[0].name : 'No file selected'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className='block text-gray-700 text-sm font-medium mb-4'>Upload Template Image:</label>
                            <div className='flex items-center'>
                                <label className='cursor-pointer border-emerald-600 text-emerald-600 border hover:text-white px-4 py-1 rounded hover:bg-emerald-700 transition'>
                                    Choose File
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleFileChange(e, 1)}
                                        className='hidden'
                                    />
                                </label>
                                <span className='ml-4 text-gray-500'>
                                    {files[1] ? files[1].name : 'No file selected'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Display Uploaded Files */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                        {files[0] && (
                            <div>
                                <h2 className='text-gray-700 text-sm font-medium mb-2'>Preview Display Image:</h2>
                                <img
                                    src={URL.createObjectURL(files[0])}
                                    alt='Preview 1'
                                    className='w-full h-64 object-contain rounded-md border'
                                />
                            </div>
                        )}
                        {files[1] && (
                            <div>
                                <h2 className='text-gray-700 text-sm font-medium mb-2'>Preview Template Image:</h2>
                                <img
                                    src={URL.createObjectURL(files[1])}
                                    alt='Preview 2'
                                    className='w-full h-64 object-contain rounded-md border'
                                />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-4'>
                        <button
                            onClick={() => setCreate(false)}
                            className='bg-red-600 text-white hover:bg-red-700 transition px-4 py-2 rounded-md'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-2 rounded-md'
                        >
                            Submit
                        </button>
                    </div>
                </div>
 
    
    );
}

export default CreateCardDesign;
