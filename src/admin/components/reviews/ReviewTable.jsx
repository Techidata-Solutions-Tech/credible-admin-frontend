import React, { useState } from 'react';
import ActionReviewModal from './ActionReviewModal'
import { BsThreeDots } from "react-icons/bs";

const ReviewTable = () => {
  // Sample review data
  const handleAction = async () => {
    document.getElementById('action_review').showModal()
  }

  const reviewData = [
    {
      id: 'RV001',
      customerName: 'John Doe',
      orderId: 'ORD12345',
      productName: 'Smartphone',
      modeVariant: '128GB / Black',
      SKU: 'SKU1234',
      productRating: 4.5,
      review: 'Great product, works as expected!',
      remarks: 'Highly recommended',
      status: 'Approved',
    },
    {
      id: 'RV002',
      customerName: 'Jane Smith',
      orderId: 'ORD67890',
      productName: 'Laptop',
      modeVariant: '16GB RAM / Silver',
      SKU: 'SKU5678',
      productRating: 3.0,
      review: 'Decent but could be better',
      remarks: 'Average experience',
      status: 'Pending',
    },
    {
      id: 'RV003',
      customerName: 'Alice Johnson',
      orderId: 'ORD11223',
      productName: 'Headphones',
      modeVariant: 'Wireless / Blue',
      SKU: 'SKU91011',
      productRating: 5.0,
      review: 'Excellent sound quality!',
      remarks: 'Best purchase ever',
      status: 'Rejected',
    },
  ];


  return (
    <>
      <ActionReviewModal />
      <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden pb-[100px]">
        <table className="w-full table-auto mb-10">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode/Variant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviewData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300 ">
                <td className="px-4 py-4 text-sm text-gray-900">{item.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.customerName}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.orderId}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.productName}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.modeVariant}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.SKU}</td>
                <td className="px-4 py-4 text-sm text-yellow-500 font-bold">{item.productRating} ★</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.review}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.remarks}</td>
                <td
                  className={`px-4 py-4 text-sm font-semibold ${item.status === 'Approved' ? 'text-green-600' : item.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}
                >
                  {item.status}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                      <BsThreeDots className='mt-2 text-blue-500' size={28} />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 shadow bg-white z-20">
                      <li><a href="#" onClick={() => handleAction(item.id)}>View</a></li>
                      <li><a href="#" onClick={() => handleDelete(item.id)}>Delete</a></li>

                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReviewTable;
