import React, { useEffect, useState } from 'react'
import API_URL from '../../constants/api'
import axios from 'axios'
import { Switch } from '@headlessui/react';
import { Link } from 'react-router-dom';
import CardTable from './visitor/CardTable';
import CreateModal from './visitor/CreateModal';
import DeleteModal from './visitor/DeleteModal';
import toast from 'react-hot-toast';
import PrintCards from './visitor/PrintCards';
import AvailableDesigns from './visitor/AvailableDesigns';


function CardsCollection() {
  const [qrs, setQrs] = React.useState([])
  const [status, setStatus] = React.useState(false)
  const [inUse, setInUse] = React.useState(false)
  const [create, setCreate] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null)

  const [confirmPrint, setConfirmPrint] = useState(false)

  const handleSelect = (card) => {
    setSelectedRows((prevSelectedRows) => {
      // Check if the card is already selected
      const isSelected = prevSelectedRows.some((row) => row._id === card._id);

      if (isSelected) {
        // If it's selected, remove it from the selected rows
        return prevSelectedRows.filter((row) => row._id !== card._id);
      } else {
        // If it's not selected, add the whole card object to the selected rows
        return [...prevSelectedRows, card];
      }
    });
  };

  const handleToggleValid = (cardId) => {
    setCardData((prevCardData) =>
      prevCardData.map((card) =>
        card._id === cardId ? { ...card, valid: !card.valid } : card
      )
    );
  };

  const fetchQRs = async () => {
    let query = {}
    if (status) query.valid = status
    if (inUse) query.inUse = inUse

    let url = new URL(`${API_URL}visitor/qr`)
    url.search = new URLSearchParams(query).toString()

    const res = await axios.get(url, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })

    setQrs(res.data)
  }

  const handleDelete = async () => {
    const res = await axios.delete(`${API_URL}visitor/qr`, {
        data : { ids: selectedRows.map(row => row._id) },
        headers: {
            Authorization: `${localStorage.getItem('authToken')}`
        }
        }).then(res => {
            toast.success('QRs deleted successfully')
            fetchQRs()
            setConfirmDelete(false)
        }).catch(err => {
            toast.error('Failed to delete QRs')
        })
  }

  useEffect(() => {
    fetchQRs()
  }, [])

  useEffect(() => {
    fetchQRs()
  }, [status, inUse])
  return (
    <div>
        <div className='rounded flex-1 p-8'>
            <div className='flex justify-between items-center mb-4 p-4 rounded-md'>
                <h2 className='text-xl font-semibold text-gray-800'>Cards</h2>
                <div className='flex items-center gap-2'>
                  {
                    selectedRows.length > 0 && (
                      <>
                        <button
                            onClick={() => {
                              setSelectedRows([]);
                            }}
                            className=' text-yellow-600 hover:bg-yellow-700 hover:text-white transition px-4 py-1 rounded'
                        >
                            Clear
                        </button>
                        <button onClick={()=>setConfirmDelete(true)} className=' text-red-600 hover:bg-red-700 hover:text-white transition px-4 py-1 rounded'>Delete</button>
                        <button onClick={()=>setConfirmPrint(true)} className='border-emerald-600 text-emerald-600 hover:text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Print</button>
                      </>
                    )
                  }

                  <button onClick={()=>setCreate(true)} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Create</button>
                </div>    
            </div>
            {
              confirmPrint && (
                <AvailableDesigns setSelectedDesign={setSelectedDesign} selectedDesign={selectedDesign} selectedCards={selectedRows} setConfirmPrint={setConfirmPrint}/>
              )
            }
            {
              create && (
                  <CreateModal setCreate={setCreate} fetchQRs={fetchQRs}/>
              )
            }
            {
              confirmDelete && <DeleteModal handleDelete={handleDelete} setConfirmDelete={setConfirmDelete}/>
            }
            <div className='mb-8 px-4 gap-2 flex items-center'>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <label htmlFor="">Status</label>
                  <select 
                      name="" 
                      id="" 
                      value={status} 
                      onChange={e => setStatus(e.target.value)} 
                      className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700'
                  >
                      <option value="">All</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                  </select>
                </div>
                <div className='flex items-center gap-2'> 
                  <label htmlFor="">In Use</label>
                  <select 
                      name="" 
                      id="" 
                      value={inUse} 
                      onChange={e => setInUse(e.target.value)} 
                      className='px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700'
                  >
                      <option value="">All</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <CardTable data={qrs} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleSelect={handleSelect} handleToggleValid={handleToggleValid}/>
            </div>
        </div>
    </div>
  )
}

export default CardsCollection