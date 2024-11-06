import { useState, useEffect } from "react";
import { Switch } from '@headlessui/react';
import { Link } from 'react-router-dom';
import axios from "axios";
import API_URL from "../../../constants/api";

const CardTable = ({ data, selectedRows, setSelectedRows, handleSelect, handleToggleValid }) => {

  const [cardData, setCardData] = useState(data);

  useEffect(() => {setCardData(data)}, [data]);

  return (
    <div className="h-[70vh] overflow-y-auto bg-white p-4 rounded-md shadow-sm">
      <table className="min-w-full text-left">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-600">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(cardData);
                  } else {
                    setSelectedRows([]);
                  }
                }}
                checked={selectedRows.length === cardData.length}
              />
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600">Card Number</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600">In Use</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600">Valid</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600">Usage history</th>
          </tr>
        </thead>
        <tbody>
          {cardData.map((card, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.some(row => row._id === card._id)}
                  onChange={() => handleSelect(card)}
                />
              </td>
              <td className="px-4 py-3">{card.cardNumber}</td>
              <td className="px-4 py-3">{card.inUse ? 'Yes' : 'No'}</td>
              <td className="px-4 py-3">
                <Switch
                  checked={card.valid}
                  onChange={() => handleToggleValid(card._id)}
                  className={`${card.valid ? 'bg-green-500' : 'bg-gray-300'}
                    relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Toggle Validity</span>
                  <span
                    className={`${
                      card.valid ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </td>
              <td className="px-4 py-3">
                <Link to={`${card._id}`}>
                    View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;