import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import toast from "react-hot-toast";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import API_URL from "../constants/api";

const StartRegister = ({next}) => {
    return (
        <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-fit overflow-y-scroll">
            <div className="flex flex-col w-screen p-8 xl:w-[50vw]">
                <div className="flex justify-center flex-col">
                    <h2 className="text-2xl text-gray-700">Welcome to <span className="text-emerald-800 font-semibold">ScholarPass!</span></h2>
                </div>
                <div className="flex items-center mb-8">
                    <h3 className="text-sm">Here's what we're gonna do:</h3>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <p className="rounded-full text-xl font-medium bg-emerald-700 w-5 h-5 text-center items-center flex justify-center text-white p-6">1</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Let us see your COR</h3>
                            <h3 className="text-sm">Upload your original and latest Certificate of Registration (COR).</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <p className="rounded-full text-xl font-medium bg-emerald-700 w-5 h-5 text-center items-center flex justify-center text-white p-6">2</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Check parsed data</h3>
                            <h3 className="text-sm">Double-check the details we pull from it.</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <p className="rounded-full text-xl font-medium bg-emerald-700 w-5 h-5 text-center items-center flex justify-center text-white p-6">3</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Uplaod profile pic</h3>
                            <h3 className="text-sm">Give us your best smile!</h3>
                        </div>
                    </div>

                </div>
                
                <div className="w-full mt-12">
                    <button onClick={next} className="border-emerald-800 transition-all ease-in-out border text-emerald-950 hover:bg-emerald-800 w-full hover:text-white rounded-md  px-4 py-2 text-lg">Next</button>
                </div>
            </div>
            <div></div>
        </div>
    )
}

const UploadCOR = ({next, prev, file, setFile, setDetails, setSchedule}) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files[0];
        validateFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateFile(selectedFile);
    };

    const validateFile = (selectedFile) => {
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            toast.success("File selected");
        } else {
            toast.error("Invalid file type. Please upload a PDF file.");
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
            toast.success("File uploaded successfully.");
            setDetails(response?.data?.details);
            console.log(response.data);
            setSchedule(response?.data?.schedules);
            console.log(response.data);
            next();
        }
        if(response.status === 400) {
            toast.dismiss();
            console.log(response.data.message);
        }
    }
    return(
        <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-fit overflow-y-scroll">
            <div className="flex flex-col w-screen p-8 xl:w-[50vw]">
                <div className="flex justify-center flex-col">
                    <h2 className="text-2xl text-gray-700 mb-4">
                        Upload Your <span className="text-emerald-800 font-semibold">COR</span>
                    </h2>
                    <p>Upload your original and latest Certificate of Registration (COR). Only PDF files are accepted </p>
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
                
                <div className="w-full mt-12 flex gap-4">
                    <button onClick={prev} className="border-emerald-800 transition-all ease-in-out border text-emerald-950 hover:bg-emerald-800 w-full hover:text-white rounded-md px-4 py-2 text-lg">Back</button>
                    <button onClick={handleNext} className="border-emerald-800 transition-all ease-in-out border bg-emerald-800 w-full hover:bg-emerald-950 text-white rounded-md px-4 py-2 text-lg">Next</button>
                </div>
            </div>
        </div>
    )
}

const CheckDetails = ({next, prev, details, setDetails, schedule}) => {
    
    return(
        <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-fit overflow-y-scroll">
            <div className="flex flex-col w-screen p-8 xl:w-[50vw]">
                <div className="flex justify-center flex-col mb-8">
                    <h2 className="text-2xl text-gray-700">Check your <span className="text-emerald-800 font-semibold">Details</span></h2>
                </div>

                <div className="flex justify-center flex-col">
                    <label className="text-sm mb-1">Student Number</label>
                    <p className="text-2xl font-bold mb-4">{details?.studentNumber}</p>
                    
                    <label className="text-sm mb-1">Student Name</label>
                    <p className="text-2xl font-bold mb-4">{details?.studentName}</p>

                    <label className="text-sm mb-2">Department</label>
                    <p className=" font-medium text-gray-700 mb-4">{details?.department}</p>

                    <label className="text-sm mb-2">Degree</label>
                    <p className=" font-medium text-gray-700 mb-4">{details?.degree}</p>
                    <label className="text-sm mb-2">Section</label>
                    <p className=" font-medium text-gray-700 mb-4">{details?.section}</p>
                    <label className="text-sm mb-2">Year Level</label>
                    <p className=" font-medium text-gray-700 mb-4">{details?.yearLevel}</p>
                    <label className="text-sm mb-2">Semester</label>
                    <p className=" font-medium text-gray-700 mb-4">{details?.SY?.semester} Semester {details?.SY?.start}-{details?.SY?.end}</p>
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
        </div>
    )
}

const ImageUpload = ({next, prev, email, setEmail, cellphone, setCellphone, password, setPassword, confirmPassword, setConfirmPassword, file, setFile, handleSubmit }) => {    
    const [dragActive, setDragActive] = useState(false);

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

    const handleSave = () => {
        toast.loading('Creating account...');
        let error = false;
        if (!file) {
          toast.error('Please upload an image.');
          error = true;
        }
        if (!email || !password || !confirmPassword) {
          toast.error('Please fill out all fields.');
          error = true;
        }
        if (password !== confirmPassword) {
          toast.error('Passwords do not match.');
          error = true;
        }
        if (error) {
            setTimeout(() => {
                toast.dismiss();
            }, 3000);
            return;
        };

        handleSubmit();
    }
  
    return (
      <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-fit overflow-y-scroll">
        <div className="flex flex-col w-screen p-8 xl:w-[50vw]">
          <div className="flex justify-center flex-col">
            <h2 className="text-2xl text-gray-700">
              Upload Your <span className="text-emerald-800 font-semibold">Profile Picture</span>
            </h2>
            <p>Give us your best smile!</p>
          </div>
  
            <div 
                className={`mt-8 p-8 border-dashed border-2 ${dragActive ? 'border-emerald-800' : 'border-gray-400'} rounded-md flex flex-col items-center justify-center`}
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

          <div className="flex justify-center flex-col mt-8">
            <h2 className="text-2xl text-gray-700">
              Set Your <span className="text-emerald-800 font-semibold">Email and Password</span>
            </h2>
            <p className="text-xs">Must be a valid email address and have at least 8-character long password.</p>
          </div>

            <div className="flex justify-center flex-col mt-4">
                <label className="text-sm mb-2">Email</label>
                <input
                    type="text"
                    className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="text-sm mb-2">Cellphone Number</label>
                <input
                    type="text"
                    className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4"
                    value={cellphone}
                    onChange={(e) => setCellphone(e.target.value)}
                />
                <label className="text-sm mb-2">Password</label>
                <input
                    type="password"
                    className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="text-sm mb-2">Confirm Password</label>
                <input
                    type="password"
                    className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
  
          <div className="w-full mt-12 flex gap-4">
            <button onClick={prev} className="border-emerald-800 transition-all ease-in-out border text-emerald-950 hover:bg-emerald-800 w-full hover:text-white rounded-md px-4 py-2 text-lg">Back</button>
            <button onClick={handleSave} className="border-emerald-800 transition-all ease-in-out border bg-emerald-800 w-full hover:bg-emerald-950 text-white rounded-md px-4 py-2 text-lg">Next</button>
          </div>
        </div>
      </div>
    );
}

const DonePage = () => {
    return (
        <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-fit overflow-y-scroll">
            <div className="flex flex-col w-screen p-8 items-center">
                <div className="flex items-center justify-center w-fit h-fit rounded-full p-6 bg-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0"/></g></svg>
                </div>
                <div className="flex text-center justify-center items-center mt-4 flex-col mb-8">
                    <h2 className="text-2xl text-gray-700 mb-4">All <span className="text-emerald-800 font-semibold">Done! 🎉</span></h2>
                    <p>And that’s it! You’re officially a <span className="text-emerald-800 font-semibold">ScholarPass</span> user.</p>
                </div>
                <div className="flex text-center justify-center items-center mt-4 flex-col mb-16">
                    <button className="bg-emerald-800 text-white px-4 py-2 rounded text-sm">Proceed to Login Page</button>
                </div>
            </div>
        </div>
    )
}

const RegistrationPage = () => {
    const [file, setFile] = useState(null);
    const [details, setDetails] = useState({
        studentNumber: '000000000',
        studentName: 'SANTOS, Kobe Brian E',
        department: 'College of Business Education and',
    });

    const [schedule, setSchedule] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const [animating, setAnimating] = useState(false);

    
    const [image, setImage] = useState(null); //pass as file
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const nextTab = () => {
      if (!animating) {
        setAnimating(true);
        setActiveTab((prev) => Math.min(prev + 1, 4));
      }
    };
    
    const nextTabDetails = () => {
        if (!animating) {

          if(details.department.trim().length === 0){
                toast.error("Please fill out the department field.");
                return;
          }
          setAnimating(true);
          setActiveTab((prev) => Math.min(prev + 1, 4));
        }
    }
  
    const prevTab = () => {
      if (!animating) {
        setAnimating(true);
        setActiveTab((prev) => Math.max(prev - 1, 0));
      }
    };
  
    const handleAnimationEnd = () => {
      setAnimating(false);
    };

    const handleSubmit = async () => {
        let error = false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            toast.error("Invalid email address.");
            error = true;
        }

        if(!cellphone.startsWith('09') || cellphone.length !== 11){
            toast.error("Invalid cellphone number.");
            error = true;
        }
        if(password.length < 8){
            toast.error("Password must be at least 8 characters long.");
            error = true;
        }
        if(error) {
            setTimeout(() => {
                toast.dismiss();
            }, 2000);
            return;
        };
        try{
            const formData = new FormData();
            formData.append('image', image);
            formData.append('email', email);
            formData.append('cellphone', cellphone);
            formData.append('password', password);
            formData.append('studentNumber', details.studentNumber);
            formData.append('name', details.studentName);
            formData.append('department', details.department);
            formData.append('degree', details.degree);
            formData.append('section', details.section);
            formData.append('yearLevel', details.yearLevel);
            formData.append('start', details.SY.start);
            formData.append('end', details.SY.end);
            formData.append('semester', details.SY.semester);
            formData.append('schedule', JSON.stringify(schedule));
            const response = await axios.post(`${API_URL}student/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(error => {
                toast.dismiss();
                toast.error(error.response.data.message);
            });
            console.log(response);
            if(response.status === 201){
                toast.dismiss();
                toast.success("Account created successfully.");
                nextTab();
            }
        }catch(error){
            console.log(error);
        }
    }
  
    const tabs = [
      <StartRegister key="start" next={nextTab} />,
      <UploadCOR key="upload" next={nextTab} prev={prevTab} file={file} setFile={setFile} setDetails={setDetails} setSchedule={setSchedule} />,
      <CheckDetails key="check" next={nextTabDetails} prev={prevTab} details={details} schedule={schedule} setDetails={setDetails} />,
      <ImageUpload key="image" next={nextTab} cellphone={cellphone} setCellphone={setCellphone} prev={prevTab} file={image} setFile={setImage} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} handleSubmit={handleSubmit} />,
      <DonePage key="done" />
    ];
  
    return (
      <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-[80vh] overflow-y-scroll relative">
        <div className="tabs-container relative w-full h-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-content ${index === activeTab ? 'active' : 'inactive'} ${animating ? 'animating' : ''}`}
              onAnimationEnd={handleAnimationEnd}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const tempSignin = (e) => {
        e.preventDefault();
        console.log('Signing in...');
        navigate('/');
    }
    return (
        <main className="flex flex-col h-[100vh]">
            <Navbar/>
            <RegistrationPage/>
            <div className="flex-1 max-h-20 flex items-center justify-center bg-emerald-950 shadow-lg">
                <p className="text-white text-xs">© ScholarPass Team | 2024</p>
            </div>
        </main>
    );
}
export default Register;