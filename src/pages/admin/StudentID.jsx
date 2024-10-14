import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import API_URL from '../../constants/api'

function StudentID() {
    const {id} = useParams()
    const [student, setStudent] = React.useState({})

    const fetchStudent = async () => {
        const res = await axios.get(`${API_URL}student/student/${id}`)
        setStudent(res.data)
    }

    useEffect(() => {
        fetchStudent()
    }, [])
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between items-center my-8 mx-4'>
                
            </div>
        </div>
    )
}

export default StudentID