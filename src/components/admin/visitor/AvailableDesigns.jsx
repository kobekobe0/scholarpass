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
            <h2 className='text-xl px-4 font-medium my-4'>Print Visitor Card</h2>
            <div>
               <button onClick={()=>setConfirmPrint(false)} className='text-red-600 hover:text-white hover:bg-red-700 transition px-4 py-1 rounded'>Back</button>
               <PrintCards selectedCards={selectedCards} cardID={selectedDesign?._id} onClose={()=>setConfirmPrint(false)}/> 
            </div>
            
        </div>
    
    </div>
  )
}

export default AvailableDesigns