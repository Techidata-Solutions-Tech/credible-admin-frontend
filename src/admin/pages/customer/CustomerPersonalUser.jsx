import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterSearchSort from "./FilterSearchSort";
import PillTabs from "./PillTabs";


const UserTable = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'State' },
    { label: 'Zipcode', value: 'Zipcode' },
  ];

  const sortOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  const handleFilterChange = (value) => setFilter(value);
  const handleSearchChange = (value) => setSearch(value);
  const handleSortChange = (value) => setSort(value);

  const token = localStorage.getItem('token')
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/user?page=${page - 1}&limit=20`,
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
      setUsers(data?.data?.filter(user=>user.kind === "customer"));
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
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
      fetchUsers();
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const breadcrumbItems = [
    { label: 'Home', href: '/admin' },
    { label: 'Personal Users', href: '/admin/user/personal' }
  ];

  const tabs_status = [
    { id: 1, label: `All (${users?.length})` },
    { id: 2, label: `Active (${users.filter(user=>!user.isAccountBlockedByAdmin)?.length})` },
    { id: 3, label: `Inactive (${users.filter(user=>user.isAccountBlockedByAdmin)?.length})` },
    { id: 4, label:  `Blocked (${users.filter(user=>user.isAccountBlockedByAdmin)?.length})` },
    { id: 5, label:  `Trash (${users.filter(user=>user.trash)?.length})` },
  ];
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
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
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-100">
    <tr className="text-gray-500 uppercase text-xs font-medium">
      <th className="px-4 py-3 text-left"><input type="checkbox" className="w-4 h-4" /></th>
      <th className="px-4 py-3 text-left">ID</th>
      <th className="px-4 py-3 text-left">Image</th>
      <th className="px-4 py-3 text-left">Name</th>
      <th className="px-4 py-3 text-left">Phone Number</th>
      <th className="px-4 py-3 text-left">Email Id</th>
      <th className="px-4 py-3 text-left">City</th>
      <th className="px-4 py-3 text-left">Zipcode</th>
      <th className="px-4 py-3 text-left">State</th>
      <th className="px-4 py-3 text-left">Created Date</th>
      <th className="px-6 py-3 text-left">Status</th>
      <th className="px-6 py-3 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id} className="border-b text-center hover:bg-gray-50">
        <td className="p-3 border-r"><input type="checkbox" className="w-4 h-4" /></td>
        <td className="p-3 border-r">{user.id}</td>
        <td className="p-3 border-r">{user.image}</td>
        <td className="p-3 border-r">{user.firstName || "N/A"} {user.lastName || ""}</td>
        <td className="p-3 border-r">{user.phone || "N/A"}</td>
        <td className="p-3 border-r">{user.email}</td>
        <td className="p-3 border-r">{user.city}</td>
        <td className="p-3 border-r">{user.zipcode}</td>
        <td className="p-3 border-r">{user.state}</td>
        <td className="p-3 border-r">{new Date(user.createdAt).toLocaleString()}</td>
        {/* <td className="p-3 border-r">{user.kind === "customer" ? "Customer" : "Supplier"}</td> */}
        {/* <td className="p-3 border-r">{user.isAccountCompleted ? "Completed" : "Incomplete"}</td> */}
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
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-semibold">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4 uppercase">User Details</h2>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Name:</strong> {selectedUser.firstName || "N/A"} {selectedUser.lastName || ""}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
                <p ><strong>Account:</strong> {selectedUser.isAccountCompleted ? "Completed" : "Incomplete"}</p>
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