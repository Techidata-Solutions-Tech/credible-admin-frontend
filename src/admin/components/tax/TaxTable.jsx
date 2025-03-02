import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const TaxTable = () => {
  const [selectedTaxId, setSelectedTaxId] = useState(null);

  const taxes = [
    {
      id: 'T001',
      category: 'Electronics',
      product: 'Smartphone',
      taxRate: '18%',
      HSN_SAC: '8517',
    },
    {
      id: 'T002',
      category: 'Appliances',
      product: 'Air Conditioner',
      taxRate: '12%',
      HSN_SAC: '8415',
    },
    {
      id: 'T003',
      category: 'Furniture',
      product: 'Office Chair',
      taxRate: '5%',
      HSN_SAC: '9403',
    },
  ];

  const handleEdit = (taxId) => {
    setSelectedTaxId(taxId);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (taxId) => {
    setSelectedTaxId(taxId);
    document.getElementById('my_modal_delete').showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-max">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm md:text-md font-semibold">ID</th>
            <th className="px-4 py-3 text-left text-sm md:text-md font-semibold">Category</th>
            <th className="px-4 py-3 text-left text-sm md:text-md font-semibold">Product</th>
            <th className="px-4 py-3 text-left text-sm md:text-md font-semibold">Tax Rate</th>
            <th className="px-4 py-3 text-left text-sm md:text-md font-semibold">HSN/SAC</th>
            <th className="px-4 py-3 text-left text-sm md:text-md font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {taxes.map((tax) => (
            <tr key={tax.id} className="hover:bg-gray-100 border-b border-gray-300 text-xs md:text-sm">
              <td className="px-4 py-3 text-gray-900">{tax.id}</td>
              <td className="px-4 py-3 text-gray-900">{tax.category}</td>
              <td className="px-4 py-3 text-gray-900">{tax.product}</td>
              <td className="px-4 py-3 text-gray-900">{tax.taxRate}</td>
              <td className="px-4 py-3 text-gray-900">{tax.HSN_SAC}</td>
              <td className="px-4 py-3 flex justify-center items-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='text-blue-500' size={24} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg shadow-md w-40 text-xs md:text-sm text-gray-700 z-10">
                    <li>
                      <a href="#" onClick={() => handleEdit(tax.id)} className="hover:text-blue-500">
                        Edit
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(tax.id)}
                        className="hover:text-red-500"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable;