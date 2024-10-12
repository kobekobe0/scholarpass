import axios from 'axios';
import React, {act, useState} from 'react'
import toast from 'react-hot-toast';
import API_URL from '../../../constants/api';
import useAuth from '../../../helper/useAuth';

const CheckDetails = ({next, prev, details, setDetails, schedule}) => {
    
    return(
            <div className="flex flex-col w-full p-2">
                <div className="flex justify-center flex-col mb-8">
                    <h2 className="text-lg text-gray-700">Check your <span className="text-emerald-800 font-semibold">Details</span></h2>
                </div>

                <div className="flex justify-center flex-col">
                    <label className="text-sm mb-2">Department</label>
                    <input type="text" className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4" value={details?.department} onChange={e=>setDetails({...details, department: e.target.value})}/>
                </div>

                <div className="flex justify-center flex-col mt-4 overflow-x-scroll">
                    <label className="text-sm mb-2">Schedule</label>

                    <table className="table-auto w-full border-collapse border border-slate-400 text-xs">
                        <thead>
                        <tr>
                            <th className="border border-slate-300 px-4 py-2">Subject</th>
                            <th className="border border-slate-300 px-4 py-2">Subject Code</th>
                            <th className="border border-slate-300 px-4 py-2">Professor</th>
                            <th className="border border-slate-300 px-4 py-2">Section</th>
                            <th className="border border-slate-300 px-4 py-2">First Schedule</th>
                            <th className="border border-slate-300 px-4 py-2">Second Schedule</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schedule?.map((entry, index) => (
                            <tr key={index}>
                            <td className="border border-slate-300 px-4 py-2">{entry[1]}</td> {/* Subject */}
                            <td className="border border-slate-300 px-4 py-2">{entry[2]}</td> {/* Subject Code */}
                            <td className="border border-slate-300 px-4 py-2">{entry[3]}</td> {/* Professor */}
                            <td className="border border-slate-300 px-4 py-2">{entry[4]}</td> {/* Section */}
                            <td className="border border-slate-300 px-4 py-2">{entry[0]}</td> {/* First Schedule */}
                            <td className="border border-slate-300 px-4 py-2">
                                {entry.length === 6 ? entry[5] : "N/A"} {/* Second Schedule if present */}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full mt-12 flex gap-4">
                    <button onClick={prev} className="border-emerald-800 transition-all ease-in-out border text-emerald-950 hover:bg-emerald-800 w-full hover:text-white rounded-md px-4 py-2 text-lg">Back</button>
                    <button onClick={next} className="border-emerald-800 transition-all ease-in-out border bg-emerald-800 w-full hover:bg-emerald-950 text-white rounded-md px-4 py-2 text-lg">Next</button>
                </div>
            </div>
    )
}

function Update_COR() {
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
        //should be pdf
        if (droppedFile && droppedFile.type === 'application/pdf') {
            console.log(droppedFile)
            setFile(droppedFile);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        //should be pdf
        if (selectedFile && selectedFile.type === 'application/pdf') {
            console.log(selectedFile)
            setFile(selectedFile);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const handleNext = async () => {
        if(!file) return toast.error("Please upload a file first.");
        toast.loading("Uploading file...");

        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${API_URL}student/cor`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            toast.dismiss();
            toast.error(error.response.data.message)
        });

        if(response.status === 200) {
            toast.dismiss();
            if(response.data.details.studentNumber !== user.studentNumber) return toast.error("Please upload your own COR.");
            toast.success("File uploaded successfully.");
            setDetails(response?.data?.details);
            console.log(response.data);
            setSchedule(response?.data?.schedules);
            console.log(response.data);
            setActiveTab(1);
            
        }
        if(response.status === 400) {
            toast.dismiss();
            console.log(response.data.message);
        }
    }

    const handleChange = (name, value) => {
        setDetails((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        if(!details.department) return toast.error("Please fill out all the fields.");
        toast.loading("Updating profile picture...");
        const response = await axios.put(`${API_URL}student/update/${user._id}`, {
            schedule,
            department: details.department,
        }).catch(error => {
            toast.dismiss();
            toast.error(error.response.data.message)
        });

        if(response && response.data) {
            toast.dismiss();
            toast.success(response.data.message);
        }
    }
    return (
        <>
            {activeTab == 0 && (
                <div className="flex flex-col w-full p-2">
                    <div className="flex justify-center flex-col">
                        <h2 className="text-lg text-gray-700 mb-4">
                            Upload Your <span className="text-emerald-800 font-semibold">COR</span>
                        </h2>
                        <p className='text-xs'>Upload your original and latest Certificate of Registration (COR). Only PDF files are accepted </p>
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
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <p className="text-lg text-gray-600">
                            {file ? `File: ${file.name}` : 'Drag & Drop your file here or click to upload'}
                        </p>
                    </label>
                    </div>
                    
                    <div className="w-full mt-8 mb-4 flex gap-4">
                        <button onClick={handleNext} className="border-emerald-800 transition-all ease-in-out border bg-emerald-800 w-full hover:bg-emerald-950 text-white rounded-md px-4 py-2 text-lg">Next</button>
                    </div>
                </div>
            )}

            {
                activeTab == 1 && (
                    <CheckDetails next={handleSubmit} prev={() => setActiveTab(0)} details={details} setDetails={setDetails} schedule={schedule}/>
                )
            }
        </>
        
    )
}

export default Update_COR