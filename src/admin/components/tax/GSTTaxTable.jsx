import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const GSTTaxTable = () => {
  const [selectedTaxId, setSelectedTaxId] = useState(null);

  const taxes = [
    {
      id: 'GT001',
      category: 'Electronics',
      company: 'Samsung',
      productName: 'Galaxy S24',
      model: 'S24 Ultra',
      variant: '12GB RAM, 512GB Storage',
      SKU: 'SM-S24U512',
      GST: '18%',
      cess: '5%',
      HSN_Code: '8517',
      added: '2024-01-15',
    },
    {
      id: 'GT002',
      category: 'Appliances',
      company: 'LG',
      productName: 'Dual Inverter AC',
      model: 'LS-Q18JNXA',
      variant: '1.5 Ton 5 Star',
      SKU: 'LG-AC-1.5T5S',
      GST: '12%',
      cess: '0%',
      HSN_Code: '8415',
      added: '2024-02-01',
    },
    {
      id: 'GT003',
      category: 'Furniture',
      company: 'IKEA',
      productName: 'Ergonomic Office Chair',
      model: 'MARKUS',
      variant: 'Black Leather',
      SKU: 'IK-CHAIR-BLK',
      GST: '5%',
      cess: '0%',
      HSN_Code: '9403',
      added: '2024-01-25',
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
            {[
              'ID', 'Category', 'Company/Brand', 'Product Name', 'Model', 'Variant', 
              'SKU', 'GST', 'Cess', 'HSN Code', 'Added', 'Action'
            ].map((header) => (
              <th key={header} className="px-4 py-3 text-left text-sm md:text-md font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {taxes.map((tax) => (
            <tr key={tax.id} className="hover:bg-gray-100 border-b border-gray-300 text-xs md:text-sm">
              <td className="px-4 py-3 text-gray-900">{tax.id}</td>
              <td className="px-4 py-3 text-gray-900">{tax.category}</td>
              <td className="px-4 py-3 text-gray-900">{tax.company}</td>
              <td className="px-4 py-3 text-gray-900">{tax.productName}</td>
              <td className="px-4 py-3 text-gray-900">{tax.model}</td>
              <td className="px-4 py-3 text-gray-900">{tax.variant}</td>
              <td className="px-4 py-3 text-gray-900">{tax.SKU}</td>
              <td className="px-4 py-3 text-gray-900">{tax.GST}</td>
              <td className="px-4 py-3 text-gray-900">{tax.cess}</td>
              <td className="px-4 py-3 text-gray-900">{tax.HSN_Code}</td>
              <td className="px-4 py-3 text-gray-900">{tax.added}</td>
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

export default GSTTaxTable;
