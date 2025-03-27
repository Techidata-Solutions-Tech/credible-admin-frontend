import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const UserTable = () => {
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
      setUsers(data.data);
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
      toast.success(`User ${!isBlocked ? "Blocked" : "Unblocked"} Successfully`);
      fetchUsers();
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="p-6 bg-gray-100 min-h-screen flex-1">
          <ToastContainer position="top-right" autoClose={3000} />
          <h1 className="text-2xl mb-2 font-semibold">Manage Users</h1>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Account</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b text-center">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.firstName || "N/A"} {user.lastName || ""}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone || "N/A"}</td>
                    <td className="p-3">{user.kind === "customer" ? "Customer" : "Supplier"}</td>
                    <td className="p-3">{user.isAccountCompleted ? "Completed" : "Incomplete"}</td>
                    <td className="p-3 flex justify-center items-center space-x-4">
                      <button
                        onClick={() => toggleBlockStatus(user.id, user.isAccountBlockedByAdmin)}
                        className={`px-3 py-1 text-white rounded ${user.isAccountBlockedByAdmin ? "bg-red-500" : "bg-green-500"}`}
                      >
                        {user.isAccountBlockedByAdmin ? "Blocked" : "Unblocked"}
                      </button>
                      <button onClick={() => openModal(user)} className="text-blue-600 text-lg">
                        <FaEye />
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
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Name:</strong> {selectedUser.firstName || "N/A"} {selectedUser.lastName || ""}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
                <p ><strong>Account:</strong> {selectedUser.isAccountCompleted ? "Completed" : "Incomplete"}</p>
                <p><strong>Status:</strong> {selectedUser.isAccountBlockedByAdmin ? "Blocked" : "Unblocked"}</p>
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