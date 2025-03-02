import React, { useState } from 'react';
import OrderDetailModalBranch from './OrderDetailModalBranch';
import { BsThreeDots } from "react-icons/bs";

const OrderTable = () => {
  const [orderId, setOrderId] = useState(null);

  const orderData = [
    {
      date: '2024-01-10',
      id: '001',
      customerName: 'John Doe',
      branchId: 'BR001',
      items: 5,
      qty: 10,
      orderValue: 250.00,
    },
    {
      date: '2024-02-15',
      id: '002',
      customerName: 'Jane Smith',
      branchId: 'BR002',
      items: 3,
      qty: 7,
      orderValue: 150.50,
    },
    {
      date: '2024-03-20',
      id: '003',
      customerName: 'Alice Johnson',
      branchId: 'BR003',
      items: 8,
      qty: 20,
      orderValue: 400.75,
    },
  ];

  const handleEdit = (id) => {
    setOrderId(id);
    document.getElementById('my_modal_edit').showModal();
  };
  const handleOrder = (id) => {
    setOrderId(id);
    document.getElementById('product_detail').showModal();
  };

  const handleDelete = (id) => {
    setOrderId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  return (
    <>
      <OrderDetailModalBranch/>
      <div className="w-full bg-white container rounded-lg shadow-sm overflow-hidden pb-[100px]">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Customer Name</th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Branch ID</th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Items</th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Qty</th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Order Value ($)</th>
                    <th className="px-6 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderData.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 border-b border-gray-300">
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{order.date}</td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{order.id}</td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{order.customerName}</td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{order.branchId}</td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{order.items}</td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{order.qty}</td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">${order.orderValue.toFixed(2)}</td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 flex justify-center gap-1">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                            <BsThreeDots className='mt-2 text-blue-500' size={28} />
                          </button>
                          <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 shadow bg-white z-20">
                            <li><a href="#" onClick={() => handleOrder(order.id)}>View</a></li>
                            <li><a href="#" onClick={() => handleEdit(order.id)}>Edit</a></li>
                            <li><a href="#" onClick={() => handleDelete(order.id)}>Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;