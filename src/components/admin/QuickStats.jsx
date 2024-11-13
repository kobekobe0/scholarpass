import React, { useEffect } from 'react'
import useStatsStore from '../../store/stats.store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../constants/api';

function QuickStats() {
    const navigate = useNavigate();
    const [vehicleNumber, setVehicleNumber] = React.useState(0)
    const { statistics, loading, error, fetchStatisticsToday } = useStatsStore();
    useEffect(() => {
        fetchStatisticsToday();
    }, [])

    const fetchNumberVehicles = async () => {
        const res = await axios.get(`${API_URL}log/vehicle-number`)
        setVehicleNumber(res.data.count)
    }

    useEffect(() => {
        fetchNumberVehicles()
    }, [])

    useEffect(() => {
        console.log("STATS: ", statistics)
    }, [statistics])
    const goToStudents = () => {
        navigate('/admin/students');
    }

    const goToVehicles = () => {
        navigate('/admin/vehicles');
    }

    const goToVisitors = () => {
        navigate('/admin/visitor');
    }

    if(loading) return <p>Loading...</p>

    return (
        <div className='flex w-full flex-1 gap-4'>
            <div className='shadow-md p-6 bg-white rounded-lg flex-1'>
                <h3 className='text-lg font-semibold text-gray-800'>Student Inside</h3>
                <p className='text-3xl font-bold text-gray-900'>{statistics?.uniqueStudents}</p>
                <button onClick={goToStudents} className='mt-4 text-sm text-emerald-600 hover:underline'>View Students</button>
            </div>
            <div className='shadow-md p-6 bg-white rounded-lg flex-1'>
                <h3 className='text-lg font-semibold text-gray-800'>Vahicles Inside</h3>
                <p className='text-3xl font-bold text-gray-900'>{vehicleNumber}</p>
                <button className='mt-4 text-sm text-emerald-600 cursor-default'>Number of Vehicles Registered</button>
            </div>
            <div className='shadow-md p-6 bg-white rounded-lg flex-1'>
                <h3 className='text-lg font-semibold text-gray-800'>Visitors</h3>
                <p className='text-3xl font-bold text-gray-900'>{statistics?.totalVisitors}</p>
                <button onClick={goToVisitors} className='mt-4 text-sm text-emerald-600 hover:underline'>View Visitors</button>
            </div>
        </div>
  )
}

export default QuickStats