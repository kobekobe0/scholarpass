import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../constants/api';
import VehicleDropDown from '../student/student-components/Vehicle_Dropdown';
function StudentProfileVehicles({ id }) {
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        if(!id) return;
        try {
            const response = await axios.get(`${API_URL}vehicle/student/${id}`);

            setVehicles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!id) return;
        fetchVehicles();
    }, [id]);

    useEffect(() => {console.log(vehicles)}, [vehicles   ]);

    return (
        <div className='w-full h-full flex flex-col '>
            <div className="flex gap-4 items-center justify-between my-4">
                <h1 className='text-lg font-semibold'>Vehicles</h1>
            </div>

            <div className="flex-grow overflow-y-scroll  border-gray-300 rounded-lg">
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
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default StudentProfileVehicles;
