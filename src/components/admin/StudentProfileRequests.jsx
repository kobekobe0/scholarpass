import React, { useEffect } from 'react';
import useStudentLogStore from '../../store/student.log';
import useCardRequestStore from '../../store/student.request';

function StudentProfileRequests({ id }) {
    const { cardRequests, loading, error, fetchCardRequests, clearCardRequests } = useCardRequestStore();

    useEffect(() => {
        clearCardRequests();
        fetchCardRequests(id);
    }, []);

    return (
        <div className='w-full h-full flex flex-col '>
            {/* Header and Filters */}
            <div className="flex gap-4 items-center justify-between my-4">
                <h1 className='text-lg font-semibold'>Requests</h1>
            </div>

            {/*TODO: VIOLATIONS*/}
            <div className="flex-grow overflow-y-scroll border border-gray-300 rounded-lg">
                <table className="w-full">
                    <thead className="sticky top-0 bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Card Name</th>
                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Vehicle</th>
                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Ref No</th>
                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Price</th>
                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Status</th>
                            <th className="py-2 px-4 text-left font-medium whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardRequests.map((card, index) => (
                            <tr key={card._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200`}>
                                <td className="py-2 px-4 whitespace-nowrap">
                                    {card.cardID.name}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap">
                                    {card.vehicleID ? card.vehicleID.model : 'N/A'}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap">
                                    {card.refNumber}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap">
                                     ₱ {parseFloat(card.cardID.price).toFixed(2)}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap">
                                    {card.status}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap">
                                    <button>TODO</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentProfileRequests;
