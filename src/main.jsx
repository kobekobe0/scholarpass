import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Error from './pages/Error'
import Signin from './pages/Signin'

import Census from './pages/Census'
import CensusItem from './pages/CensusItem'
import Household from './pages/Household'
import HouseholdNew from './pages/HouseholdNew'
import Receipts from './pages/Receipts'
import ReceiptItem from './pages/ReceiptItem'
import Cedula from './pages/Cedula'
import Residents from './pages/Residents'
import ResidentItem from './pages/ResidentItem'
import { Toaster } from 'react-hot-toast'
import Business from './pages/Business'
import BusinessItem from './pages/BusinessItem'
import Indigent from './pages/Indigent'
import BlockLog from './pages/BlockLogs'
import CedulaItem from './pages/CedulaItem'
import Temp from './pages/Temp'
import Forms from './pages/Forms'
import Borrow from './pages/Borrow'
import useAuth from './helper/useAuth'
import path from 'path'
import Landing from './pages/Landing'
import Register from './pages/Register'
import StudentHome from './pages/StudentHome'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ResetPasswordItem'
import Dashboard from './pages/student/Dashboard'
import StudentLogs from './components/student/StudentLogs'
import Vehicle from './components/student/StudentVehicle'
import StudentCard from './components/student/StudentCard'
import Student_Profile from './components/student/Student_Profile'
import AddVehicle from './components/student/StudentAddVehicle'
import { ChakraProvider } from '@chakra-ui/react'
import AdminSignin from './pages/admin/Signin'
import DashboardAdmin from './pages/admin/Dashboard'


const router = createBrowserRouter([
  {

    path: '/admin',
    element: <Home />,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <DashboardAdmin />,
      },
      {
        path: 'census',
        element: <Census />,
      },
    ]
  },
  {
    path: '/student',
    element: <StudentHome />,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'logs',
        element: <StudentLogs />,
      },
      {
        path: 'card',
        element: <StudentCard />,
      },
      {
        path: 'profile',
        element: <Student_Profile />,
      },
      {
        path: 'vehicle',
        element: <Vehicle />,
      },
      {
        path: 'add-vehicle',
        element: <AddVehicle />,
      }
    ]
  },
  {
    path: '/admin-signin',
    element: <AdminSignin/>
  },
  {
    path: '/census/:id/:householdId',
    element: <Household />
  },
  {
    path: '/census/:id/household/new',
    element: <HouseholdNew />
  },

  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/forgot-password',
    element: <ResetPassword />
  },
  {
    path: '/forgot-password/:id',
    element: <ChangePassword />
  },
  {
    path: '/',
    element: <Landing />
  }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
      <Toaster 
        position='top-center'
        reverseOrder={false}
      />
    </ChakraProvider>
  </React.StrictMode>,
)
