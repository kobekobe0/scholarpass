import React, { useEffect, useState } from 'react';
import Image_Slider from './student-components/Image_Slider';

import img1 from '../../assets/1.webp'
import img2 from '../../assets/2.webp'
import img3 from '../../assets/3.webp'
import img4 from '../../assets/4.webp'
import img5 from '../../assets/5.webp'
import API_URL from '../../constants/api';
import axios from 'axios';
import useAuth from '../../helper/useAuth';
import toast from 'react-hot-toast';
import useCardRequestStore from '../../store/student.request';
import CancellationModal from './student-components/Cancel_Request';

// const cards = [
//     {
//         _id: 1,
//         name: 'Basic Card',
//         displayImage: img1,
//         price: 15.00,
//         material: 'PVC',
//     },
//     {
//         _id: 2,
//         name: 'Premium Card',
//         displayImage: img2,
//         price: 15.00
//     },
//     {
//         _id: 3,
//         name: 'VIP Card',
//         displayImage: img3,
//         price: 15.00
//     },
//     {
//         _id: 4,
//         name: 'Student Card',
//         displayImage: img4,
//         price: 15.00
//     },
//     {
//         _id: 5,
//         name: 'Library Card',
//         displayImage: img5,
//         price: 15.00
//     },
//     {
//         _id: 5,
//         name: 'Library Card',
//         displayImage: img5,
//         price: 15.00
//     },
//     {
//         _id: 5,
//         name: 'Library Card',
//         displayImage: img5,
//     },
// ]

const StudentCard = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [openCancel, setOpenCancel] = useState(true);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuth();
    const { cardRequests, loading, error, fetchCardRequests, clearCardRequests } = useCardRequestStore();

    const fetchCards = async () => {
        try {
            const response = await axios.get(`${API_URL}cards/available`);

            setCards(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchVehicles = async () => {
        if(!user) return;
        try {
            const response = await axios.get(`${API_URL}vehicle/student/${user._id}`);

            setAvailableVehicles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!user) return;
        fetchCards();
        fetchVehicles();
        fetchCardRequests(user?._id);
    }, [user]);

    useEffect(() => {
        setSelectedCard(cards[0]);
    }, [cards]);

    const handleCancel = async (id) => {
        console.log(id);
        if(isLoading) return;
        console.log(id);
        setIsLoading(true);
        try {
            const response = await axios.put(`${API_URL}card-request/cancel/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('authToken')
                }
            });

            setIsLoading(false);
            toast.success('Card request cancelled');
            setTimeout(() => {
                fetchCardRequests(user?._id);
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error('Failed to cancel request');
        }
    }

    const handleSubmit = async () => {
        if(isLoading) return;
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}card-request/create`, {
                cardID: selectedCard._id,
                vehicleID: selectedVehicle,
                studentID: user._id
            }, {
                headers: {
                    Authorization: localStorage.getItem('authToken')
                }
            });

            setIsLoading(false);
            toast.success('Card request submitted');
            setConfirm(false);
            setTimeout(() => {
                fetchCardRequests(user?._id);
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error('Failed to request card');
        }
    }
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-lg font-semibold mb-6">Request a Card</h1>
            <div className='flex xl:flex-row flex-col gap-8 mb-12'>
                <img src={selectedCard?.displayImage} className='xl:w-1/2 p-4' />
                <div className=' xl:w-1/2 mt-4'>
                    <h2 className='text-3xl font-semibold mb-2'>{selectedCard?.name} <span className='text-sm font-normal'>{selectedCard?.material}</span></h2>
                    <h2 className='text-2xl text-gray-700 font-semibold mb-4'>₱ {selectedCard?.price.toFixed(2)}</h2>
                    <p className='mb-2 text-xs'>Select Card Design</p>
                    <div className='grid grid-cols-6 gap-4 mb-4'>
                        {cards?.map((card) => (
                            <div key={card._id} onClick={() => setSelectedCard(card)} className="cursor-pointer border w-fit hover:border-gray-600 transition rounded">
                                <img src={card?.displayImage} className='w-12' alt="card" />
                            </div>
                        ))}
                    </div>
                    <p className='mb-2 text-xs'>Select Vehicle</p>
                    <select name="" id="" className='w-full p-2 mb-4 rounded' value={selectedVehicle} onChange={(e)=> setSelectedVehicle(e.target.value)}>
                        <option value={null}>Walk-in card</option>
                        {
                            availableVehicles.map(vehicle => (
                                <option key={vehicle._id} value={vehicle._id}>{vehicle.model}</option>
                            ))
                        }
                    </select>
                    {
                        !confirm && (
                            <button onClick={()=>setConfirm(true)} className='w-full bg-emerald-600 text-white mt-4 p-2 rounded hover:bg-emerald-700 transition'>Request</button>

                        )
                    }
                    {
                        confirm && (
                            <div className='shadow-md p-4'>
                                <h1 className='text-lg font-medium mb-2'>Confirmation</h1>
                                <h2 className='text-sm mb-4'>Are you sure you want to submit the request?</h2>
                                <div className='mt-2 flex justify-between gap-2'>
                                    <button onClick={()=>setConfirm(false)} className='w-full hover:bg-red-600 hover:text-white text-red-600 p-2 rounded border border-red-600 transition'>Cancel</button>
                                    <button onClick={handleSubmit} className='w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition'>Confirm</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <h2 className='text-sm text-gray-700 font-semibold mb-6'>Requested Cards</h2>
            <div className='flex flex-col w-full'>
                <div className='overflow-x-auto'> {/* Add this wrapper for horizontal scrolling */}
                    <table className='w-full min-w-max table-auto'>
                    <thead>
                        <tr className='bg-gray-100 text-left'>
                        <th className='px-4 py-2 font-medium'>Card Name</th>
                        <th className='px-4 py-2 font-medium'>Vehicle</th>
                        <th className='px-4 py-2 font-medium'>Ref No.</th>
                        <th className='px-4 py-2 font-medium'>Price</th>
                        <th className='px-4 py-2 font-medium'>Status</th>
                        <th className='px-4 py-2 font-medium'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardRequests.map(request => (
                        <tr key={request._id} className='hover:bg-gray-50'>
                            <td className='px-4 py-2 whitespace-nowrap'>{request?.cardID?.name}</td>
                            <td className='px-4 py-2 whitespace-nowrap'>{request?.vehicleID?.model ? request.vehicleID.model : 'Walk-in'}</td>
                            <td className='px-4 py-2 whitespace-nowrap'>{request?.refNumber}</td>
                            <td className='px-4 py-2 whitespace-nowrap'>₱ {request?.cardID?.price.toFixed(2)}</td>
                            <td className='px-4 py-2 whitespace-nowrap'>{request?.status}</td>
                            {request?.status == 'Pending' && (
                            <td className='px-4 py-2 flex items-center w-full whitespace-nowrap'>
                                <CancellationModal handleSubmit={() => handleCancel(request._id)}/>
                            </td>
                            )}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
