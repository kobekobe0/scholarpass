import React from 'react'
import logo from '../../assets/logo.png'
import useAuth from '../../helper/useAuth'

function Sidebar({children}) {
    const {user} = useAuth()
    const [expanded, setExpanded] = React.useState(true)
  return (
    <aside className='h-screen'>
        <nav className='h-full flex flex-col bg-emerald-950 border-r shadow-sm'>
            <div className='p-4 pb-2 flex justify-between items-center'>
                <img src={logo} className={
                    `
                      overflow-hidden
                      transition-all
                      ${expanded ? 'w-32' : 'w-0'}
                    `
                } alt="" />
                <button onclick={()=>setExpanded(curr => !curr)}>-;</button>
            </div>
        </nav>

        <ul className='flex-1 px-3'>
            {children}
        </ul>

        <div className='border-t flex-p-3'>
            <img src="https://placehold.co/50x50" alt="" className='w-10 h-10 rounded-md' />
            <div className='flex justify-between items-center w-52 ml-3'>
                <div className='leading-4' >
                    <h4>test</h4>
                </div>
            </div>
        </div>
    </aside>
  )
}

export default Sidebar

export const SidebarItem = ({icon, text, active, alert}) => {
    return (
        <li className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors
            ${
                active
                    ? 'bg-gradient-to-tr from-emerald-200 to-emerald-800 text-white'
                    : 'hover:bg-emerald-50 text-gray-600'
            }
        `}> 
            {icon}
            <span className='w-52 ml-3'>{text}</span>
            {alert && <span className={`absolute right-2 w-2 h-2 rounded bg-emerald-400`}></span>}
        </li>
    )
}