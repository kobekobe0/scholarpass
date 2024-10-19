import React, { useEffect, useState } from 'react'
import API_URL from '../../constants/api'
import axios from 'axios'
import { Switch } from '@headlessui/react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CreateCardDesign from './carddesign/CreateCardDesign';
import CardDesignTable from './carddesign/CardDesignTable';


function CardDesignList() {
    const [create, setCreate] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const [cards, setCards] = React.useState([])

    const fetchCards = async () => {
        const res = await axios.get(`${API_URL}cards/all`, {
            headers: {
                Authorization: `${localStorage.getItem('authToken')}`
            }
        })

        setCards(res.data)
    }

    useEffect(() => {
        fetchCards()
    }, [])

    useEffect(() => {
        console.log(cards)
    },[cards])
  return (
    <div>
        <div className='rounded flex-1 p-8'>
            <div className='flex justify-between items-center mb-4 p-4 rounded-md'>
                <h2 className='text-xl font-semibold text-gray-800'>Card Design</h2>
                <div className='flex items-center gap-2'>
                  {
                    selectedRows.length > 0 && (
                      <>
                      </>
                    )
                  }

                  <button onClick={()=>setCreate(true)} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Create</button>
                </div>    
            </div>
            {
                create && (
                    <CreateCardDesign setCreate={setCreate} fetchCards={fetchCards}/>
                )
            }
            <div>
                <CardDesignTable data={cards} fetchCards={fetchCards}/>
            </div>
        </div>
    </div>
  )
}

export default CardDesignList