import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../constants/api';
import toast from 'react-hot-toast';

export default function VehicleDropDown({id}) {
  const navigate = useNavigate()
  const handleNavigate = path => {
    navigate(path)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return
    try{
      const res = await axios.delete(`${API_URL}vehicle/delete/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('authToken')}`
        }
      })
      toast.success("Vehicle deleted successfully")
      window.location.reload()
    } catch (error) {
      toast.error("An error occurred")
    }

  }
  return (
    <Menu>
      <MenuButton className="inline-flex font-bold items-center gap-2 rounded-md  py-1.5 px-3 justify-center text-center font-semibold text-xl focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-40 bg-black/90  z-50 origin-top-right rounded-xl border border-white/5  mt-2 p-1 text-sm text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button onClick={()=> handleNavigate(`/student/edit-vehicle/${id}`)} className="group flex w-full items-center text-white gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-800">
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button onClick={handleDelete} className="group flex w-full text-red-500 items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-red-400 hover:text-white">
            Delete
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-hover:inline"></kbd>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
