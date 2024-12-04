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

const StudentCard = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [openCancel, setOpenCancel] = useState(true);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState("");
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

    const handleSubmit = async () => {
        if(isLoading) return;
        setIsLoading(true);
        toast.loading('Generating QR Card')
        try {
            const response = await axios.post(`${API_URL}qr/student-card`, {
                cardID: selectedCard._id,
                vehicleID: selectedVehicle || null,
                studentID: user._id
            }, {
                headers: {
                    Authorization: localStorage.getItem('authToken')
                },
                responseType: 'blob'
            });

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: 'image/png' }); // Change type if necessary

            // Create a URL for the blob and set up a download link
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'downloaded-image.png'; // The filename for the download
            document.body.appendChild(link);
            link.click();

            // Clean up by revoking the URL and removing the link element
            link.remove();
            window.URL.revokeObjectURL(link.href);

            setIsLoading(false);
            
            setConfirm(false)
            toast.dismiss()
            toast.success('Card request submitted');
        } catch (error) {
            setIsLoading(false);
            toast.dismiss()
            console.log(error);
            toast.error('Failed to request card. Please try again.');
        }
    }
    
    if(loading) return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-lg font-semibold mb-6">Generate Card</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
        </div>
    )

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-lg font-semibold mb-6">Generate Card</h1>
            <div className='flex xl:flex-row flex-col gap-8 mb-12'>
                <img src={selectedCard?.displayImage} className='xl:w-1/2 p-4' />
                <div className=' xl:w-1/2 mt-4'>
                    <h2 className='text-3xl font-semibold mb-2'>{selectedCard?.name} <span className='text-sm font-normal'>{selectedCard?.material}</span></h2>
                    <p className='mb-2 text-xs'>Available Card Designs</p>
                    <div className='grid grid-cols-6 gap-4 mb-4'>
                        {cards?.map((card) => (
                            <div key={card._id} onClick={() => setSelectedCard(card)} className="cursor-pointer border w-fit hover:border-gray-600 transition rounded">
                                <img src={card?.displayImage} className='w-12' alt="card" />
                            </div>
                        ))}
                    </div>
                    <p className='mb-2 text-xs'>Select Vehicle</p>
                    <select name="" id="" className='w-full p-2 mb-4 rounded' value={selectedVehicle} onChange={(e)=> setSelectedVehicle(e.target.value)}>
                        <option value="">Walk-in card</option>
                        {
                            availableVehicles.map(vehicle => (
                                <option key={vehicle._id} value={vehicle._id}>{vehicle.model}</option>
                            ))
                        }
                    </select>
                    {
                        !confirm && (
                            <button onClick={()=>setConfirm(true)} className='w-full bg-emerald-600 text-white mt-4 p-2 rounded hover:bg-emerald-700 transition'>Generate</button>

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
        </div>
    );
};

export default StudentCard;
