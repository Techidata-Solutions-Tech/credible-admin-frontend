import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const MerchantSellerApprovalTable = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  const supplierData = [
    {
      id: 'S001',
      supplierId: 'SUP123',
      entityType: 'Manufacturer',
      companyName: 'ABC Industries',
      contactPerson: 'John Doe',
      phone: '1234567890',
      email: 'contact@abcindustries.com',
      location: 'New York, NY',
      status: 1,  // Active
    },
    {
      id: 'S002',
      supplierId: 'SUP456',
      entityType: 'Distributor',
      companyName: 'XYZ Supplies',
      contactPerson: 'Jane Smith',
      phone: '9876543210',
      email: 'info@xyzsupplies.com',
      location: 'Los Angeles, CA',
      status: 0,  // Inactive
    },
    {
      id: 'S003',
      supplierId: 'SUP789',
      entityType: 'Retailer',
      companyName: 'PQR Traders',
      contactPerson: 'Alice Johnson',
      phone: '5556667777',
      email: 'support@pqrtraders.com',
      location: 'Chicago, IL',
      status: 3,  // Blocked
    },
  ];

  const statusLabels = {
    1: 'Active',
    0: 'Inactive',
    2: 'Suspended',
    3: 'Blocked',
  };

  const statusColors = {
    1: 'text-green-500',
    0: 'text-red-500',
    2: 'text-yellow-500',
    3: 'text-gray-500',
  };

  const handleEdit = (id) => {
    setSelectedSupplierId(id);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (id) => {
    setSelectedSupplierId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  const handleStatusChange = (id) => {
    setSelectedSupplierId(id);
    document.getElementById('my_modal_status').showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[900px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {supplierData?.map((supplier) => (
            <tr key={supplier.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.supplierId}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.entityType}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.companyName}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.contactPerson}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.phone}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.email}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{supplier.location}</td>
              <td className={`px-4 py-4 text-sm font-semibold ${statusColors[supplier.status]}`}>
                {statusLabels[supplier.status]}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(supplier.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(supplier.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleStatusChange(supplier.id)}>Change Status</a></li>
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

export default MerchantSellerApprovalTable;
