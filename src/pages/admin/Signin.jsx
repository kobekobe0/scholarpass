import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import API_URL from "../../constants/api";
import useAuth from "../../helper/useAuth";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const {isLoading} = useAuth(); // Protect the page based on user role


    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(loading) return;
        if(!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }
        setLoading(true);
        toast.loading('Logging in...');
        try {
            const response = await axios.post(`${API_URL}admin/login`, {
                email,
                password
            });
            setLoading(false);
            toast.dismiss();
            toast.success('Login successful.');
            //set token to local storage
            localStorage.setItem('authToken', response.data.token);
            navigate('/admin');
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.dismiss();
            toast.error('Invalid credentials. Please try again.');
        }
    }

    return (
        <div className="flex flex-1 bg-slate-100 items-center flex-col w-full h-fit overflow-y-scroll">
            <div className="flex flex-col w-screen p-8 xl:w-[50vw]">
                <div className="flex justify-center flex-col">
                    <h2 className="text-2xl text-gray-700">
                    Access <span className="text-emerald-800 font-semibold">Admin Dashboard</span>
                    </h2>
                    <p>Enter admin creadentials below.</p>
                </div>

                <div className="flex justify-center flex-col mt-12">
                    <label className="text-sm mb-2">Email</label>
                    <input
                        type="text"
                        className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-sm mb-2">Password</label>
                    <div style={{ position: 'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <input
                type={showPassword ? "text" : "password"}
                className="border border-gray-300 bg-gray-100 rounded-md p-2 mb-4 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '60px' }} // Make room for the button
            />
            <button 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                    position: 'absolute',
                    top: '40%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '0.8rem',
                }}
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <Link to="/admin-forgot-password" className="text-emerald-800 text-xs"><span className="text-black">Forgot your password?</span> Reset here</Link>                
                </div>
                <div className="w-full mt-8">
                    <button onClick={handleLogin} className="hover:bg-emerald-900 transition-all ease-in-out border  bg-emerald-800 w-full text-white rounded-md  px-4 py-2 text-lg">Next</button>
                </div>
            </div>
        </div>
    )
}

const AdminSignin = () => {
    const navigate = useNavigate();
    return (
        <main className="flex flex-col h-[100vh]">
            <Navbar/>
            <LoginPage/>
            <div className="flex-1 max-h-20 flex items-center justify-center bg-emerald-950 shadow-lg">
                <p className="text-white text-xs">© ScholarPass Team | 2024</p>
            </div>
        </main>
    );
}
export default AdminSignin;