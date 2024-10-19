import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react'; // Assuming you are using Headless UI for the switch
import API_URL from '../../../constants/api';
import axios from 'axios';
import toast from 'react-hot-toast';

const CardDesignTable = ({ data }) => {
  const [itemData, setItemData] = useState(data);
  const [confirmDeleteRow, setConfirmDeleteRow] = useState({
    index: null,
    id: null,
  });

  useEffect(() => {
    setItemData(data);
  }, [data]);

  const handleToggleActive = (itemId) => {
    // TODO: Implement the logic to toggle the active status of the item
    setItemData((prevItemData) =>
      prevItemData.map((item) =>
        item._id === itemId ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`${API_URL}cards/${id}`, {
        headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
        },
        }).then(res => {
            toast.success('Card design deleted successfully');
            window.location.reload();
        }).catch(err => {
            toast.error('Failed to delete card design');
        })
  }

  return (
    <div className="h-[70vh] overflow-y-auto bg-white p-4 rounded-md shadow-sm">
      <table className="min-w-full text-left">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="w-1/5 px-4 py-3 text-sm font-medium text-gray-600">Image</th>
            <th className="w-1/5 px-4 py-3 text-sm font-medium text-gray-600">Name</th>
            <th className="w-1/5 px-4 py-3 text-sm font-medium text-gray-600">Active</th>
            <th className="w-1/5 px-4 py-3 text-sm font-medium text-gray-600">Created At</th>
            <th className="w-1/5 px-4 py-3 text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {itemData?.map((item, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="w-1/5 px-4 py-3">
                <img src={`${item.displayImage}`} alt={item.name} className="w-24 h-24 object-contain" />
              </td>
              <td className="w-1/5 px-4 py-3">{item.name}</td>
              <td className="w-1/5 px-4 py-3">
                <Switch
                  checked={item.active}
                  onChange={() => handleToggleActive(item._id)}
                  className={`${item.active ? 'bg-green-500' : 'bg-gray-300'}
                    relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Toggle Active Status</span>
                  <span
                    className={`${
                      item.active ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </td>
              <td className="w-1/5 px-4 py-3">
                {new Date(item.createdAt).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              {confirmDeleteRow.index !== index && (
                <td className="w-1/5 px-4 py-3">
                  <button
                    onClick={() => {
                      setConfirmDeleteRow({ index, id: item._id });
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              )}

              {confirmDeleteRow.index === index && (
                <td colSpan="5" className="px-4 py-3">
                  <div className="flex justify-center items-center flex-col gap-4 bg-white shadow-lg p-4 rounded">
                    <h2 className='flextext-sm'>Are you sure you want to delete this item?</h2>
                    <div className='flex items-center justify-end gap-2 w-full'>
                      <button
                        onClick={() => {
                          handleDelete(item._id)
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded text-xs hover:bg-red-700 transition"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteRow({ index: null, id: null })}
                        className="text-gray-700 hover:bg-gray-600 hover:text-white transition px-4 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardDesignTable;
