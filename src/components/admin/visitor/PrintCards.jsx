import React from 'react';
import API_URL from '../../../constants/api';
import axios from 'axios';
import toast from 'react-hot-toast';

const PrintCards = ({ selectedCards, cardID, onClose }) => {
const downloadPDF = async () => {
    if(selectedCards.length === 0) return toast.error('Please select at least one card to print');
    if(selectedCards.length > 6) return toast.error('You can only print a maximum of 6 cards at a time');
    //if(!cardID) return toast.error('Please select a card design to print');

    toast.loading('Printing cards');
    try {
        // Prepare the request body with selected card details
        const requestBody = {
            CardID: cardID, // Assuming each card has a unique ID
            details: selectedCards.map(card => ({
                cardNumber: card.cardNumber, // Adjust based on your card structure
                _id: card._id, // Adjust based on your card structure
            })),
        };

        // Make a request to your backend to generate and download the PDF
        const response = await axios.post(`${API_URL}qr/visitor-card`, requestBody, {
            headers: {
                Authorization: localStorage.getItem('authToken'),
                'Content-Type': 'application/json',
            },
            responseType: 'blob', // Set the response type to Blob
        });

        // No need to check response.ok; just assume successful response if no error is thrown
        // Create a Blob from the PDF response
        const blob = response.data; // Use response.data directly since responseType is 'blob'

        // Create a URL for the Blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'qr_codes.pdf'); // Set the default file name
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.dismiss();
        toast.success('Cards printed successfully');
        onClose()
    } catch (error) {
        console.error('Error downloading PDF:', error);
        toast.dismiss();
        toast.error('Failed to print cards, please try again.');
        onClose()
    }
};

    return (
        <button onClick={downloadPDF} className='bg-emerald-600 text-white hover:text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Print</button>
    );
};

export default PrintCards;
