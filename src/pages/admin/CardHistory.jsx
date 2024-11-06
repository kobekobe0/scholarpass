import React, { useEffect, useState } from 'react'
import API_URL from '../../constants/api'
import axios from 'axios'
import { Switch } from '@headlessui/react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import HistoryTable from '../../components/admin/visitor/HistoryTable';
import printTableData from '../../helper/print';
const sampleData = {
    total: 10,
    page: 1,
    limit: 10,
    totalPages: 1,
    data: [
        {
            _id: "1",
            name: "Jayvee Maniquz",
            timeIn: "2024-10-29T16:34:15.774Z",
            timeOut: "2024-10-29T16:34:28.380Z",
            agency: "Faculty",
            address: "Sta. Maria",
            personToVisit: "Ma'am Solis",
            number: "09788789878",
            purpose: "Grade Consultation",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "2",
            name: "Kevin Almoguerra",
            timeIn: "2024-10-23T08:30:29.362Z",
            timeOut: "2024-10-23T08:30:38.221Z",
            agency: "Clinic",
            address: "Pulilan Bulacan",
            personToVisit: "Ma'am Jaira",
            number: "09899878987",
            purpose: "For BMI",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "3",
            name: "Kobe Santos",
            timeIn: "2024-10-23T05:29:52.602Z",
            timeOut: "2024-10-23T05:30:20.069Z",
            agency: "Registrar",
            address: "Cacarong Pandi",
            personToVisit: "Doc Malang",
            number: "09899878888",
            purpose: "For cor",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "4",
            name: "Alexander Madrigal",
            timeIn: "2024-10-23T05:20:34.996Z",
            timeOut: "2024-10-23T05:21:09.091Z",
            agency: "Registrar",
            address: "Bagong Barrio, Pandi",
            personToVisit: "Sir Ma'am",
            number: "09898799878",
            purpose: "For cor",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "5",
            name: "Alexander",
            timeIn: "2024-10-22T16:59:50.954Z",
            timeOut: "2024-10-22T16:59:55.897Z",
            agency: "Clinic",
            address: "Pandi",
            personToVisit: "Ma'am Tes",
            number: "09122123232",
            purpose: "For BMI",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "6",
            name: "Alexander",
            timeIn: "2024-10-22T16:55:58.472Z",
            timeOut: "2024-10-22T16:56:04.605Z",
            agency: "Clinic",
            address: "Pandi, Bulacan",
            personToVisit: "Ma'am Jaira",
            number: "09879879876",
            purpose: "For results",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "7",
            name: "Alexander Madrigal Jr.",
            timeIn: "2024-10-22T16:54:45.271Z",
            timeOut: "2024-10-22T16:55:03.383Z",
            agency: "Clinic",
            address: "Pandi, Bulacan",
            personToVisit: "Ma'am Jaira",
            number: "09899877896",
            purpose: "For Results",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        },
        {
            _id: "8",
            name: "Anthony Pisodas",
            timeIn: "2024-10-22T16:44:13.410Z",
            timeOut: "2024-10-22T16:45:07.083Z",
            agency: "Admin",
            address: "Marilao, Bulacan",
            personToVisit: "Sir Ryan",
            number: "09898998796",
            purpose: "For cog",
            visitorCardID: "6713b3502ab8f8b5f5ae6b9e",
            __v: 0
        }
    ]
};


function CardHistory() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [limit, setLimit] = useState(100)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const {id} = useParams()
  const [cardData, setCardData] = useState(null)

  const fetchData = async () => {
    let query = {
        visitorCardID: id
    }
    if (search) query.name = search
    if (fromDate) query.fromDate = fromDate
    if (toDate) query.toDate = toDate
    query.limit = limit
    query.page = page

    let url = new URL(`${API_URL}visitor/logs`)
    url.search = new URLSearchParams(query).toString()

    const res = await axios.get(url, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })

    setCardData(res.data)
    console.log(res.data)
  }

  const printJob = () => {
    printTableData(cardData.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const clearFilters = () => {
    setFromDate('')
    setToDate('')
    setLimit(100)
    setSearch('')
  }

  useEffect(() => {
    fetchData()
  }, [limit, page, search, fromDate, toDate])
  return (
    <div>
        <div className='rounded flex-1 p-8'>
            <div className='flex justify-between items-center mb-4 p-4 rounded-md'>
                <h2 className='text-xl font-semibold text-gray-800'>History</h2>
            </div>
            <div className='mb-8 px-4 gap-2 flex items-center'>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <label className='text-xs'>Start Date</label>
                    <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className='px-4 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700'/>
                </div>
                <div className='flex items-center gap-2'>
                  <label className='text-xs'>End Date</label>
                    <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className='px-4 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700'/>
                </div>
                <div className='flex items-center gap-2'> 
                  <label className='text-xs'>Name</label>
                  <input type="text" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} className='px-4 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700'/>
                </div>
                <div className='flex items-center gap-2'> 
                  <label className='text-xs'>Limit</label>
                  <select name="" id="" value={limit} onChange={e => setLimit(e.target.value)} className='px-4 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700'>
                    <option value="2">2</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="100">300</option>
                  </select>
                </div>
                <div className='flex items-center gap-2'> 
                    <button onClick={clearFilters} className='bg-emerald-600 text-white px-2 text-xs py-1 rounded hover:bg-emerald-700 transition'>Clear Filters</button>
                </div>
                <div className='flex items-center gap-2'> 
                    <button onClick={printJob} className='bg-emerald-600 text-white px-2 text-xs py-1 rounded hover:bg-emerald-700 transition'>Print</button>
                </div>
              </div>
            </div>
            <div className='p-2 rounded'>
                <HistoryTable data={cardData?.data || []}/>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xs">Page</label>
                <button 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-2 py-1 text-xs border border-gray-300 rounded-md ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700'}`}
                >
                    Previous
                </button>
                <select 
                    value={page} 
                    onChange={e => setPage(e.target.value)} 
                    className='px-4 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700'
                >
                    {Array.from(Array(cardData?.totalPages || 1).keys()).map(pageNumber => (
                        <option key={pageNumber + 1} value={pageNumber + 1}>{pageNumber + 1}</option>
                    ))}
                </select>
                <button 
                    onClick={() => setPage(prev => Math.min(prev + 1, cardData?.totalPages))}
                    disabled={page === cardData?.totalPages}
                    className={`px-2 py-1 text-xs border border-gray-300 rounded-md ${page === cardData?.totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700'}`}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default CardHistory