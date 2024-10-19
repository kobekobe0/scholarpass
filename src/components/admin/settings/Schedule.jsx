import React from 'react'

function Schedule({schedule}) {
    
    return (
        <div className="flex justify-center flex-col mt-4 overflow-x-scroll">
            <h1 className='text-lg font-semibold mb-4'>Schedule</h1>

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
                    <td className="border border-slate-300 px-4 py-8">{entry[1]}</td> {/* Subject */}
                    <td className="border border-slate-300 px-4 py-8">{entry[2]}</td> {/* Subject Code */}
                    <td className="border border-slate-300 px-4 py-8">{entry[3]}</td> {/* Professor */}
                    <td className="border border-slate-300 px-4 py-8">{entry[4]}</td> {/* Section */}
                    <td className="border border-slate-300 px-4 py-8">{entry[0]}</td> {/* First Schedule */}
                    <td className="border border-slate-300 px-4 py-8">
                        {entry.length === 6 ? entry[5] : "N/A"} {/* Second Schedule if present */}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Schedule