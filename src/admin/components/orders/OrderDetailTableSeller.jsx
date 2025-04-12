import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const OrderDetailTable = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const orderDetails = [
    {
      productId: 'P001',
      category: 'Electronics',
      productName: 'Smartphone',
      brand: 'Samsung',
      model: 'Galaxy S22',
      variant: '128GB',
      SKU: 'SAM-S22-128',
      UoM: 'Piece',
      qty: 5,
      amount: 2500.00,
    },
    {
      productId: 'P002',
      category: 'Appliances',
      productName: 'Air Conditioner',
      brand: 'LG',
      model: 'DualCool',
      variant: '1.5 Ton',
      SKU: 'LG-AC-15',
      UoM: 'Unit',
      qty: 2,
      amount: 1200.00,
    },
    {
      productId: 'P003',
      category: 'Furniture',
      productName: 'Office Chair',
      brand: 'IKEA',
      model: 'ErgoComfort',
      variant: 'Black',
      SKU: 'IKEA-OC-BLK',
      UoM: 'Piece',
      qty: 10,
      amount: 1500.00,
    },
  ];

  const handleEdit = (productId) => {
    setSelectedProductId(productId);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (productId) => {
    setSelectedProductId(productId);
    document.getElementById('my_modal_delete').showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-auto pb-[100px]">
      <div>
        <table className="w-full table-auto mb-10">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UoM</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount ($)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderDetails.map((detail) => (
              <tr key={detail.productId} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-4 text-sm text-gray-900">{detail.productId}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.category}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.productName}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.brand}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.model}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.variant}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.SKU}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.UoM}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{detail.qty}</td>
                <td className="px-4 py-4 text-sm text-gray-900">${detail.amount.toFixed(2)}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                                      <BsThreeDots className='mt-2 text-blue-500' size={28} />
                                      </button>
                    <ul tabIndex={2} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                      <li><a href="#" onClick={() => handleEdit(detail.productId)}>Edit</a></li>
                      <li><a href="#" onClick={() => handleDelete(detail.productId)}>Delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailTable;
