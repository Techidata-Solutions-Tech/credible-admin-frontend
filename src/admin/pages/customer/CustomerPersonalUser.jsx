import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterSearchSort from "./FilterSearchSort";
import PillTabs from "../../components/PillTabs";
import Pagination from "../../components/Pagination";

const UserTable = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const filterOptions = [
    { label: 'Filter', value: 'all' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'State' },
    { label: 'Pincode', value: 'Pincode' },
  ];

  const sortOptions = [
    { label: 'Sort', value: 'asc' },
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  const handleFilterChange = (value) => setFilter(value);
  const handleSearchChange = (value) => setSearch(value);
  const handleSortChange = (value) => setSort(value);

  const token = localStorage.getItem('token')
  const [allUsers, setAllUsers] = useState([]); 
  const [displayUsers, setDisplayUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    paginateUsers();
  }, [allUsers, currentPage, recordsPerPage]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const filteredUsers = data?.data?.filter(user => user.kind === "customer") || [];
      setAllUsers(filteredUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setDisplayUsers(allUsers.slice(startIndex, endIndex));
  };

  const handlePageChange = (newPage, perPage) => {
    setCurrentPage(newPage);
    setRecordsPerPage(perPage);
  };

  const toggleBlockStatus = async (id, isBlocked) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAccountBlockedByAdmin: !isBlocked,
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating user status");
      }
      toast.success(`User ${!isBlocked ? "Blocked" : "Active"} Successfully`);
      
      const updatedUsers = allUsers.map(user => 
        user.id === id ? {...user, isAccountBlockedByAdmin: !isBlocked} : user
      );
      setAllUsers(updatedUsers);
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const breadcrumbItems = [
    { label: 'Customer Management', href: '#' },
    { label: 'Customers', href: '#' },
    { label: 'Personal Users', href: '/admin/user/personal' }
  ];

  const tabs_status = [
    { id: 1, label: `All (${allUsers?.length})` },
    { id: 2, label: `Active (${allUsers.filter(user=>!user.isAccountBlockedByAdmin)?.length})` },
    { id: 3, label: `Inactive (${allUsers.filter(user=>user.isAccountBlockedByAdmin)?.length})` },
    { id: 4, label:  `Blocked (${allUsers.filter(user=>user.isAccountBlockedByAdmin)?.length})` },
    { id: 5, label:  `Trash (${allUsers.filter(user=>user.trash)?.length})` },
  ];
  
  return (
    <div className="min-h-screen">
      
      <div className="flex flex-col md:flex-row bg-gray-100">
        
        <div className="p-6 bg-gray-100 min-h-screen flex-1 overflow-x-auto">
          <ToastContainer position="top-right" autoClose={3000} />
          <Breadcrumbs
              pageTitle="Personal Users"
              items={breadcrumbItems}
            />
            <div className="w-full my-3">
              <div className="max-w-full px-4">
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-full overflow-x-auto py-2">
                    <div className="flex justify-center min-w-full">
                      <PillTabs tabs={tabs_status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <FilterSearchSort
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
          />
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-auto">
              <thead className="bg-gray-700 text-white">
                <tr className=" uppercase text-xs font-medium">
                  <th className="px-4 py-3 text-left"><input type="checkbox" className="w-4 h-4" /></th>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Phone Number</th>
                  <th className="px-4 py-3 text-left">Email Id</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Pincode</th>
                  <th className="px-4 py-3 text-left">State</th>
                  <th className="px-4 py-3 text-left">Created Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user,i) => (
                  <tr key={user.id} className="border-b text-center hover:bg-gray-50">
                    <td className="p-3 border-r"><input type="checkbox" className="w-4 h-4" /></td>
                    <td className="p-3 border-r">{i+1}</td>
                    <td className="p-3 border-r">{user.id}</td>
                    <td className="p-3 border-r">{user.firstName || "N/A"} {user.lastName || ""}</td>
                    <td className="p-3 border-r">{user.phone || "N/A"}</td>
                    <td className="p-3 border-r">{user.email}</td>
                    <td className="p-3 border-r">{user.city}</td>
                    <td className="p-3 border-r">{user.pincode}</td>
                    <td className="p-3 border-r">{user.state}</td>
                    <td className="p-3 border-r">{new Date(user.createdAt).toLocaleString()}</td>
                    <td className="p-3 border-r flex justify-center items-center space-x-4">
                      <button
                        onClick={() => toggleBlockStatus(user.id, user.isAccountBlockedByAdmin)}
                        className={`px-3 py-1 text-white rounded-full ${user.isAccountBlockedByAdmin ? "bg-red-500" : "bg-green-500"}`}
                      >
                        {user.isAccountBlockedByAdmin ? "Blocked" : "Active"}
                      </button>
                    </td>
                    <td className="p-3 border-r">
                      <button onClick={() => openModal(user)} className="text-blue-600 hover:text-blue-800 text-lg">
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Pagination 
            totalRecords={allUsers.length} 
            recordsPerPage={recordsPerPage} 
            onPageChange={handlePageChange} 
          />
          
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4 uppercase">User Details</h2>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Name:</strong> {selectedUser.firstName || "N/A"} {selectedUser.lastName || ""}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
                <p><strong>Account:</strong> {selectedUser.isAccountCompleted ? "Completed" : "Incomplete"}</p>
                <p><strong>Status:</strong> {selectedUser.isAccountBlockedByAdmin ? "Blocked" : "Active"}</p>
                <button onClick={() => setIsModalOpen(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;