import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const UserTable = () => {
  const [userId, setUserId] = useState(null);
  const [modalData, setModalData] = useState(null);
  
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
    const user = userData.find(user => user.id === id);
    setModalData(user);
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

  const updateUser = async (userData) => {
    try {
      const response = await fetch('https://your-api-url/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log('User updated successfully:', data);
      document.getElementById('my_modal_edit').close();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://your-api-url/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('User deleted successfully:', data);
      document.getElementById('my_modal_delete').close();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const changeUserStatus = async (id, status) => {
    try {
      const response = await fetch(`https://your-api-url/status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      console.log('User status updated successfully:', data);
      document.getElementById('my_modal_status').close();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
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

      {/* Edit Modal */}
      <dialog id="my_modal_edit" className="modal">
        <form method="dialog" className="modal-box">
          <button type="button" className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => document.getElementById('my_modal_edit').close()}>
            &times;
          </button>
          <h2 className="text-lg font-semibold uppercase">Edit User</h2>
          <input type="text" value={modalData?.name} className="input input-bordered w-full mt-2" />
          <button className="btn btn-primary mt-4" onClick={() => updateUser(modalData)}>Save Changes</button>
        </form>
      </dialog>

      {/* Delete Modal */}
      <dialog id="my_modal_delete" className="modal">
        <form method="dialog" className="modal-box">
          <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => document.getElementById('my_modal_delete').close()}>
            &times;
          </button>
          <h2 className="text-lg font-semibold">Are you sure you want to delete this user?</h2>
          <button className="btn btn-danger mt-4" onClick={() => deleteUser(userId)}>Yes, Delete</button>
        </form>
      </dialog>

      {/* Status Change Modal */}
      <dialog id="my_modal_status" className="modal">
        <form method="dialog" className="modal-box">
          <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => document.getElementById('my_modal_status').close()}>
            &times;
          </button>
          <h2 className="text-lg font-semibold uppercase">Change Status</h2>
          <select className="select select-bordered w-full mt-2" onChange={(e) => changeUserStatus(userId, e.target.value)}>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
            <option value="2">Suspended</option>
            <option value="3">Blocked</option>
          </select>
          <button className="btn btn-primary mt-4">Change Status</button>
        </form>
      </dialog>
    </div>
  );
};

export default UserTable;
