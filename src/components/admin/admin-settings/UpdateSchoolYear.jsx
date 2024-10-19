import React, {useState, useEffect} from 'react'
import axios from 'axios'
import API_URL from '../../../constants/api';
import toast from 'react-hot-toast';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => (currentYear + i).toString());


function UpdateSchoolYear({config}) {
    const [confirm, setConfirm] = useState(false)
    const [configDetails, setConfigDetails] = useState({})
    const [password, setPassword] = useState('')

    const changeStartYear = (e) => {
        setConfigDetails({
            ...configDetails,
            SY: {
                ...configDetails.SY,
                start: e.target.value,
                end: (parseInt(e.target.value) + 1).toString()
            }
        })
    }

    const changeEndYear = (e) => {
        setConfigDetails({
            ...configDetails,
            SY: {
                ...configDetails.SY,
                end: e.target.value,
                start: (parseInt(e.target.value) - 1).toString()
            }
        })
    }

    const updateSY = async () => {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.put(`${API_URL}config/sy`, {
            start: configDetails.SY.start,
            end: configDetails.SY.end,
            semester: configDetails.SY.semester,
            password
        }, {
            headers: {
                Authorization: `${authToken}`,
            },
        }).then(res => {
            toast.success('School year updated successfully')
            setConfirm(false)
            setPassword('')
        }).catch(err => {
            toast.error(err.response.data.message)
            setConfirm(false)
            setPassword('')
        });
    }

    useEffect(() => {
        if(config) {
            setConfigDetails(config)
        }
    }, [config])

    return (
        <div className='flex flex-col gap-8 p-4'>
            <div className='bg-yellow-200 px-4 py-2 text-sm text-yellow-700 flex items-center gap-2 rounded'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5s-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531M10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.72.72 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728m0 11.624c-.619 0-1.11-.51-1.11-1.14s.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14S10.607 16.48 10 16.48"/></svg>                        
                <h2>Updating the academic year will make all student account obsolete. Proceed with caution.</h2>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex flex-col w-1/6'>
                    <h1 className='text-sm font-medium'>Start Year</h1>
                    <p className='text-xs'>Update the Academic Year</p>
                </div>
                <select type="text" value={configDetails?.SY?.start} onChange={changeStartYear} className='p-2 px-8 border font-medium border-black/10 rounded w-5/6'>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                </select>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex flex-col w-1/6'>
                    <h1 className='text-sm font-medium'>End Year</h1>
                    <p className='text-xs'>Update the Academic Year</p>
                </div>
                <select type="text" value={configDetails?.SY?.end} onChange={changeEndYear} className='p-2 px-8 border font-semibold border-black/10 rounded w-5/6'>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                </select>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex flex-col w-1/6'>
                    <h1 className='text-sm font-medium'>Semester</h1>
                    <p className='text-xs'>Update Semester</p>
                </div>
                <select type="text" value={configDetails?.SY?.semester} onChange={e=>setConfigDetails(
                    {
                        ...configDetails,
                        SY: {
                            ...configDetails.SY,
                            semester: e.target.value
                        }
                    }
                )} className='p-2 px-8 border font-semibold border-black/10 rounded w-5/6'>
                    <option value='1st'>1st Semester</option>
                    <option value='2nd'>2nd Semester</option>
                    <option value='3rd'>3rd Semester</option>
                    <option value='4th'>Mid-Year</option>
                </select>
            </div>
            {
                !confirm && (
                    <div className='flex items-center justify-end gap-4 mt-4 w-full'>
                        <button onClick={()=>setConfirm(true)} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/6 px-8 py-1 rounded'>Save</button>
                    </div>
                )
            }

            {
                confirm && (
                    <div className='flex flex-col gap-4 shadow-xl bg-white p-4'>
                        <h2 className='text-sm font-medium'>Confirmation</h2>
                        <label className='text-xs'>Enter admin password to save:</label>
                        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className='p-2 px-2 border font-medium border-black/10 rounded w-full'/>
                        <div className='flex gap-4 justify-end'>
                            <button onClick={()=>setConfirm(false)} className='border-red-600 border text-red-600 hover:bg-red-700 transition hover:text-white w-1/12 px-2 py-2 rounded text-xs'>Cancel</button>
                            <button onClick={updateSY} className='bg-emerald-600 hover:bg-emerald-700 transition text-white w-1/12 px-2 py-2 rounded text-xs'>Save</button>
                        </div>
                    </div>   
                )
            }

        </div>
    )
}

export default UpdateSchoolYear