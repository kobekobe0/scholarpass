import {useState, useEffect} from 'react'
import toast from 'react-hot-toast';

function ProfilePicture({handlePfpUpdate}) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    
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

    return (
        <div className='w-full flex flex-col items-end gap-4'>
            <div 
            className={`w-full py-8 px-8 border-dashed border-2 ${dragActive ? 'border-emerald-800' : 'border-gray-400'} rounded-md flex flex-col items-center justify-center`}
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
            <button onClick={()=>handlePfpUpdate(file)} className='bg-emerald-600 text-white px-2 py-1 rounded'>Update</button>
        </div>
    )
}

export default ProfilePicture