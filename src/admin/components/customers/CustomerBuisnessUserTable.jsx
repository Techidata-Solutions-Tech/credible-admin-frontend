import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const CustomerBusinessUserTable = () => {
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  const businessData = [
    {
      id: 'B01',
      businessName: 'Tech Solutions Inc.',
      businessNature: 'IT Services',
      businessRegistration: 'TS12345',
      contactPerson: 'John Doe',
      phone: '1234567890',
      email: 'contact@techsolutions.com',
      city: 'New York',
      zipcode: '10001',
      state: 'NY',
      created_at: '2023-01-01',
      status: 1,  // Active
    },
    {
      id: 'B02',
      businessName: 'Green Energy Ltd.',
      businessNature: 'Renewable Energy',
      businessRegistration: 'GE56789',
      contactPerson: 'Jane Smith',
      phone: '9876543210',
      email: 'support@greenenergy.com',
      city: 'Los Angeles',
      zipcode: '90001',
      state: 'CA',
      created_at: '2023-02-01',
      status: 0,  // Inactive
    },
    {
      id: 'B03',
      businessName: 'Fresh Farm Produce',
      businessNature: 'Agriculture',
      businessRegistration: 'FFP78910',
      contactPerson: 'Alice Johnson',
      phone: '5556667777',
      email: 'info@freshfarm.com',
      city: 'Chicago',
      zipcode: '60601',
      state: 'IL',
      created_at: '2023-03-01',
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
    setSelectedBusinessId(id);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (id) => {
    setSelectedBusinessId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  const handleStatusChange = (id) => {
    setSelectedBusinessId(id);
    document.getElementById('my_modal_status').showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[1000px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"><input type="check" /></th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nature</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email Id</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zipcode</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {businessData?.map((business) => (
            <tr key={business.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900"><input type="check" /></td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.image}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.businessName}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.businessNature}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.businessRegistration}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.contactPerson}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.phone}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.email}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.city}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.zipcode}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.state}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{business.created_at}</td>
              <td className={`px-4 py-4 text-sm font-semibold ${statusColors[business.status]}`}>
                {statusLabels[business.status]}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(business.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(business.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleStatusChange(business.id)}>Change Status</a></li>
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

export default CustomerBusinessUserTable;
