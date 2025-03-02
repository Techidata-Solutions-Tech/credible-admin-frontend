import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const CustomerPersonalUserTable = () => {
  const [userId, setUserId] = useState(null);

  const userData = [
    {
      id: '01',
      name: 'John Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      city: 'New York',
      zipcode: '10001',
      state: 'NY',
      created_at: '2023-01-01',
      status: 1,  // Active
    },
    {
      id: '02',
      name: 'Jane Smith',
      phone: '9876543210',
      email: 'jane.smith@example.com',
      city: 'Los Angeles',
      zipcode: '90001',
      state: 'CA',
      created_at: '2023-02-01',
      status: 0,  // Inactive
    },
    {
      id: '03',
      name: 'Alice Johnson',
      phone: '5556667777',
      email: 'alice.johnson@example.com',
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
    setUserId(id);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (id) => {
    setUserId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  const handleStatusChange = (id) => {
    setUserId(id);
    document.getElementById('my_modal_status').showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[800px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zipcode</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{user.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.name}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.phone}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.email}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.city}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.zipcode}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.state}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{user.created_at}</td>
              <td className={`px-4 py-4 text-sm font-semibold ${statusColors[user.status]}`}>
                {statusLabels[user.status]}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(user.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(user.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleStatusChange(user.id)}>Change Status</a></li>
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

export default CustomerPersonalUserTable;
