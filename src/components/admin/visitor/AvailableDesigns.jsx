import axios from 'axios'
import React, { useEffect } from 'react'
import API_URL from '../../../constants/api'
import PrintCards from './PrintCards'

function AvailableDesigns({setSelectedDesign, selectedDesign, selectedCards, setConfirmPrint}) {
    const [designs, setDesigns] = React.useState([])

    const fetchCards = async () => {
        const res = await axios.get(`${API_URL}cards/available`, {
            headers: {
                Authorization: `${localStorage.getItem('authToken')}`
            }
        })

        setDesigns(res.data)
    }

    useEffect(() => {
        fetchCards()
    },[])
  return (
    <div className='flex p-4 bg-white shadow-md flex-col gap-4 mb-8'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl px-4 font-medium my-4'>Select Card Design</h2>
            <div>
               <button onClick={()=>setConfirmPrint(false)} className='text-red-600 hover:text-white hover:bg-red-700 transition px-4 py-1 rounded'>Back</button>
               <PrintCards selectedCards={selectedCards} cardID={selectedDesign?._id}/> 
            </div>
            
        </div>
        <div className='w-full overflow-x-auto flex items-center px-4 gap-8 scrollable p-4'>
            {
                designs?.map(design => (
                    <div key={design._id} onClick={()=>setSelectedDesign(design)}className={`${selectedDesign?._id == design._id ? 'bg-gray-200' : 'bg-white'} flex-shrink-0 w-1/6 flex flex-col justify-center items-center gap-2 hover:bg-gray-100 transition p-4 rounded cursor-pointer`}>
                        <img src={design.displayImage} alt={design.name} className='w-full' />
                        <h3 className='text-lg font-medium'>{design.name}</h3>    
                    </div>
                ))
            }
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default AvailableDesigns