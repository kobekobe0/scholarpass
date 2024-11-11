import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import VehicleDropDown from './student-components/Vehicle_Dropdown';
import useAuth from '../../helper/useAuth';
import axios from 'axios';
import API_URL from '../../constants/api';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);

    const { user } = useAuth();

    const fetchVehicles = async () => {
        if(!user) return;
        try {
            const response = await axios.get(`${API_URL}vehicle/student/${user._id}`);

            setVehicles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!user) return;
        fetchVehicles();
    }, [user]);




    return (
        <div>
            <div className='flex justify-between mx-2 mb-12'>
               <h1 className='text-lg font-semibold'>My Vehicles</h1> 
               <Link to='/student/add-vehicle' className='bg-emerald-700 text-white px-4 py-1 text-sm rounded hover:bg-emerald-800 transition'>Add Vehicle</Link>
            </div>
            
            <div className="flex flex-col w-full gap-4">
                {
                    vehicles.map(vehicle => (
                        <div key={vehicle._id} className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mx-auto p-6 bg-white rounded-lg shadow-md relative">
                            <div className="flex gap-4 items-center md:items-start md:flex-row flex-col">
                                <img src={vehicle.image} alt="Vehicle Image" className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex flex-col mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                                    <h2 className="text-xl font-semibold text-gray-700">{vehicle.model}</h2>
                                    <h3 className="text-sm">{vehicle.plateNumber}</h3>
                                    <h3 className="text-sm">{vehicle.color}</h3>
                                    <h3 className="text-sm">{vehicle.type}</h3>
                                </div>
                            </div>
        
                            <div className="absolute right-4 top-4 md:relative md:top-auto md:right-auto md:self-center">
                                <VehicleDropDown id={vehicle._id}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Vehicle;
