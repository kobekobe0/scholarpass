import axios from 'axios'
import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import API_URL from '../../../constants/api'

function UpdateViolations({violationsList}) {
    const [violations, setViolations] = useState(violationsList)

    const handleChange = (e, index) => {
        const {name, value} = e.target
        const list = [...violations]
        list[index][name] = value
        setViolations(list)
    }

    const deleteViolation = (index) => {
        const list = [...violations]
        list.splice(index, 1)
        setViolations(list)
    }

    const undoChanges = () => {
        setViolations(violationsList)
    }

    const addViolation = () => {
        const list = [...violations]
        list.push({
            name: '',
            severity: 'MINOR'
        })
        setViolations(list)
    }

    const handleSave = async () => {
        //check if there are changes
        //if there are changes, send a request to the server
        if(violationsList == violations) return toast.success('No changes detected')
        //check if values are not empty
        if(violations.some(violation => violation.name === '')) return toast.error('Violation name cannot be empty')

        //send request to the server
        const authToken = localStorage.getItem('authToken');
        const res = await axios.put(`${API_URL}config/violation`, violations, {
            headers: {
                Authorization: `${authToken}`,
            },
        }).then(res => {
            toast.success('Violations updated successfully')
        }).catch(err => {
            toast.error(err.response.data.message)
        });
    }
    return (
        <div className='flex flex-col gap-8 p-4'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start'>
                    <h2 className='font-medium'>Violations</h2>
                    <p className='text-sm'>Edit list of violations</p>
                </div>
                <div className='flex gap-4 items-center'>
                    <button onClick={undoChanges} className='text-xs text-gray-500 hover:text-gray-700 transition'>Undo Changes</button>
                    <button onClick={handleSave} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/8 px-8 py-1 rounded'>Save</button> 
                </div>
                
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="text-left font-medium text-sm p-2">Violation Name</th>
                        <th className="text-left font-medium text-sm p-2">Severity</th>
                        <th className="text-left font-medium text-sm p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {violations?.map((violation, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="p-2">
                                <input 
                                    type="text" 
                                    name='name'
                                    value={violation.name}
                                    onChange={(e)=>handleChange(e, index)} 
                                    className='p-2 px-2 border border-black/10 rounded w-full' 
                                />
                            </td>
                            <td className="p-2">
                                <select 
                                    className={`p-2 px-2 border font-medium border-black/10 rounded w-full ${violation.severity == 'MINOR' ? 'text-yellow-500' : violation.severity == 'MAJOR' ? 'text-orange-500' : 'text-red-500'}`}
                                    value={violation.severity}
                                    onChange={(e)=>handleChange(e, index)}
                                    name="severity"
                                >
                                    <option value="MINOR">Minor</option>
                                    <option value="MAJOR">Major</option>
                                    <option value="SEVERE">Severe</option>
                                </select>
                            </td>
                            <td className="p-2 text-center">
                                <button onClick={()=>deleteViolation(index)} className='bg-red-500 text-xs hover:bg-red-600 transition text-white  p-2 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"/></svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addViolation} className='border border-emerald-600 text-emerald-600 rounded p-2 text-xs hover:text-white hover:bg-emerald-600 transition'>+ Add Violation</button>
        </div>
    )
}

export default UpdateViolations