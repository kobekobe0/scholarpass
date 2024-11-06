import React from 'react';

const HistoryTable = ({ data }) => {
    return (
        <div className="h-[65vh] overflow-y-auto bg-white p-4 rounded-md shadow-sm">
            <table className="min-w-full text-left">
                <thead className="sticky top-0 bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Time In</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Time Out</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Agency</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Address</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Person to Visit</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Purpose</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((visitor) => {
                        const timeIn = new Date(visitor.timeIn);
                        const timeOut = new Date(visitor.timeOut);
                        const date = timeIn.toLocaleDateString(); // Extracting the date

                        return (
                            <tr key={visitor._id} className="border-b last:border-none">
                                <td className="px-4 py-3">{visitor.name}</td>
                                <td className="px-4 py-3">{date}</td> {/* Display date here */}
                                <td className="px-4 py-3">{timeIn.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                <td className="px-4 py-3">{timeOut.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                <td className="px-4 py-3">{visitor.agency}</td>
                                <td className="px-4 py-3">{visitor.address}</td>
                                <td className="px-4 py-3">{visitor.personToVisit}</td>
                                <td className="px-4 py-3">{visitor.purpose}</td>
                                <td className="px-4 py-3">{visitor.number}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;
