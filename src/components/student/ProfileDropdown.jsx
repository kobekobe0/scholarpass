import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function ProfileDropDown({image, name, logout}) {
  return (
    <Menu>
      <MenuButton className="inline-flex bg-black/5 items-center gap-2 rounded-md  py-1.5 px-3 text-sm font-semibold text-white focus:outline-none hover:bg-gray-800">
        <span className='text-xs font-normal'>{name}</span>
        <img src={image} className='w-6 h-6 bg-white rounded-full' alt="" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-40  z-50 origin-top-right rounded-xl border border-white/5 bg-white mt-2 p-1 text-sm text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <Link to='profile' className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200">
              Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <button onClick={logout} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-red-400 hover:text-white">
            Logout
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-hover:inline"></kbd>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
