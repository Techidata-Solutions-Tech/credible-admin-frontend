import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";

const UserTable = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const tabs = [
    { id: "inward", label: "Inward" },
    { id: "approved", label: "Approved" },
    { id: "pending", label: "Pending" },
    { id: "holding", label: "Holding" },
    { id: "rejected", label: "Rejected" },
    // { id: "banned", label: "Banned" },
    // { id: "active", label: "Active" },
  ];

  const registrationTabs = [
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  const handleFilterChange = (value) => setFilter(value);
  const handleSearchChange = (value) => setSearch(value);
  const handleSortChange = (value) => setSort(value);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchAllUsers(tab);
  };

  const token = localStorage.getItem("token");
  const [allUsers, setAllUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [userDetails, setUserDetails] = useState(null);
  const [statusForm, setStatusForm] = useState({
    active_status: "active",
    account_remark: "",
  });
  const [registrationForm, setRegistrationForm] = useState({
    registration_status: "approved",
    account_remark: "",
  });

  useEffect(() => {
    fetchAllUsers(activeTab);
  }, []);

  useEffect(() => {
    paginateUsers();
  }, [allUsers, currentPage, recordsPerPage]);

  const fetchAllUsers = async (status = "pending") => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_V2
        }/api/supplierSeller/all-supplier-list?active_status=${status}`,
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
      const filteredUsers = data?.data || [];
      setAllUsers(filteredUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_V2
        }/api/supplierSeller/single-supplier-info/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserDetails(data.data);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const changeActiveStatus = async (userId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_V2
        }/api/supplierSeller/change-supplier-active-status/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(statusForm),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      toast.success("Status updated successfully");
      setIsStatusModalOpen(false);
      fetchAllUsers(activeTab);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const changeRegistrationStatus = async (userId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_V2
        }/api/supplierSeller/change-supplier-registration-status/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(registrationForm),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update registration status");
      }
      toast.success("Registration status updated successfully");
      setIsRegistrationModalOpen(false);
      fetchAllUsers(activeTab);
    } catch (error) {
      toast.error("Failed to update registration status");
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

  const openModal = async (user) => {
    setSelectedUser(user);
    await fetchUserDetails(user.supplier_id);
    setIsModalOpen(true);
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setStatusForm({
      active_status: user.active_status || "active",
      account_remark: user.account_remark || "",
    });
    setIsStatusModalOpen(true);
  };

  const openRegistrationModal = (user) => {
    setSelectedUser(user);
    setRegistrationForm({
      registration_status: user.registration_status || "pending",
      account_remark: user.account_remark || "",
    });
    setIsRegistrationModalOpen(true);
  };

  const handleStatusChange = (e) => {
    setStatusForm({
      ...statusForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationChange = (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
        <div >
          <ToastContainer position="top-right" autoClose={3000} />

          <div className="w-full mb-6">
            <div className="max-w-full ">
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg ">
                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                  <div className="min-w-full flex justify-center">
                    <div className=" bg-gray-100 p-4 rounded-full shadow-sm">
                      <div className="flex items-center justify-center gap-2">
                        {tabs.map((tab) => (
                         <button
                         key={tab.id}
                         onClick={() => handleTabChange(tab.id)}
                         className={`flex flex-col items-center justify-center gap-2
           px-4 py-2 font-medium text-sm border rounded-full transition-colors shadow-sm
         
            ${activeTab === tab.id 
              ? 'bg-cyan-500 text-white shadow-sm ' 
              : 'text-gray-600 hover:bg-gray-100'}
         
         `}
                       >
                         <span className="text-sm font-medium">{tab.label}</span>
                         <span className="text-xs font-bold">{100}</span>
                       </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 mt-2 rounded-lg'>
                           <div className='w-full md:w-auto'>
  <div className="dropdown">
    <div
      tabIndex={0}
      role="button"
      className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-3 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base flex items-center justify-center gap-2"
    >
      Filter
      {/* Dropdown icon */}
      <svg
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
      </svg>
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white"
    >
      <li><label><input type="checkbox" /></label></li>
      <li><label><input type="checkbox" /> Checkbox Label</label></li>
      <li><label><input type="checkbox" /> Checkbox Label</label></li>
    </ul>
  </div>
</div>

                            {/* Search Input */}
                            <div className="flex-1 max-w-lg ">
                                <label className="input bg-white border-blue-400 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                              <input type="text" className="grow text-blue-900 placeholder:text-center placeholder-blue-400" placeholder=" Search " />
                               
                             </label>
                            </div>
                            <div className='w-full md:w-auto'>
                                <select className="select min-w-[150px] text-center  w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                    <option disabled selected>Sort</option>
                                    <option>Homer</option>
                                    <option>Marge</option>
                                    <option>Bart</option>
                                    <option>Lisa</option>
                                    <option>Maggie</option>
                                </select>
                            </div>
                        </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-auto">
              <thead className="bg-gray-700 text-white">
                <tr className="uppercase text-xs font-medium">
                  <th className="py-3 text-left border">
                    <input type="checkbox" className="w-3 h-3" />
                  </th>
                  <th className="py-3 text-left border">No</th>
                  <th className="px-4 py-3 text-left border">ID</th>
                  <th className="px-4 py-3 text-left border">Seller Id</th>
                  <th className="px-4 py-3 text-left border">Entity Type</th>
                  <th className="px-4 py-3 text-left border">Company Name</th>
                  <th className="px-4 py-3 text-left border">Contact Person</th>
                  <th className="px-4 py-3 text-left border">Phone Number</th>
                  <th className="px-4 py-3 text-left border">Email Id</th>
                  <th className="px-4 py-3 text-left border">Location</th>
                  <th className="px-6 py-3 text-left border">Status</th>
                  <th className="px-6 py-3 text-left border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user, i) => (
                  <tr key={i} className="border-b text-center hover:bg-gray-50">
                    <td className=" border-r">
                      <input type="checkbox" className="w-3 h-3" />
                    </td>
                    <td className=" border-r">
                      {(currentPage - 1) * recordsPerPage + (i + 1)}
                    </td>
                    <td className="p-3 border-r">{user.supplier_id}</td>
                    <td className="p-3 border-r">
                      {user.company_name || "N/A"}
                    </td>
                    <td className="p-3 border-r">{user.nature}</td>
                    <td className="p-3 border-r">{user.registration}</td>
                    <td className="p-3 border-r">{user.promoter_name}</td>
                    <td className="p-3 border-r">
                      {user.promoter_phone || "N/A"}
                    </td>
                    <td className="p-3 border-r">{user.promoter_email}</td>
                    <td className="p-3 border-r">
                      {user.city}, {user.state} PIN: {user.pincode}
                    </td>
                    <td className="p-3 border-r">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.active_status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.active_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : user.active_status === "holding"
                            ? "bg-blue-100 text-blue-800"
                            : user.active_status === "banned"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.active_status}
                      </span>
                    </td>
                    <td className="p-3 border-r flex space-x-2">
                      <button
                        onClick={() => openModal(user)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openStatusModal(user)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Status
                      </button>
                      <button
                        onClick={() => openRegistrationModal(user)}
                        className="text-purple-600 hover:text-purple-800 text-sm"
                      >
                        Registration
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

          {/* User Details Modal */}
          {isModalOpen && userDetails && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold uppercase">
                    User Details
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg border-b pb-2">
                      Basic Information
                    </h3>
                    <p>
                      <strong>Supplier ID:</strong> {userDetails.id}
                    </p>
                    <p>
                      <strong>Business Name:</strong>{" "}
                      {userDetails.business_name || "N/A"}
                    </p>
                    <p>
                      <strong>Business Registration:</strong>{" "}
                      {userDetails.business_registration || "N/A"}
                    </p>
                    <p>
                      <strong>Trade Type:</strong>{" "}
                      {userDetails.trade_type || "N/A"}
                    </p>
                    <p>
                      <strong>Selling Goods:</strong>{" "}
                      {userDetails.selling_goods || "N/A"}
                    </p>
                    <p>
                      <strong>User Type:</strong>{" "}
                      {userDetails.user_type || "N/A"}
                    </p>
                    <p>
                      <strong>Active Status:</strong>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          userDetails.active_status === "active"
                            ? "bg-green-100 text-green-800"
                            : userDetails.active_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : userDetails.active_status === "holding"
                            ? "bg-blue-100 text-blue-800"
                            : userDetails.active_status === "banned"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userDetails.active_status}
                      </span>
                    </p>
                    <p>
                      <strong>Registration Status:</strong>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          userDetails.registration_status === "approved"
                            ? "bg-green-100 text-green-800"
                            : userDetails.registration_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : userDetails.registration_status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userDetails.registration_status}
                      </span>
                    </p>
                    <p>
                      <strong>Account Remark:</strong>{" "}
                      {userDetails.account_remark || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-lg border-b pb-2">
                      Promoter Information
                    </h3>
                    <p>
                      <strong>Name:</strong>{" "}
                      {userDetails.promoter_first_name || "N/A"}{" "}
                      {userDetails.promoter_last_name || ""}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {userDetails.promoter_phone || "N/A"}
                    </p>
                    <p>
                      <strong>Alt Phone:</strong>{" "}
                      {userDetails.promoter_alt_phone || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {userDetails.promoter_email || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-lg border-b pb-2">
                      Operator Information
                    </h3>
                    <p>
                      <strong>Name:</strong>{" "}
                      {userDetails.operator_first_name || "N/A"}{" "}
                      {userDetails.operator_last_name || ""}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {userDetails.operator_phone || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {userDetails.operator_email || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-lg border-b pb-2">
                      Address Information
                    </h3>
                    <p>
                      <strong>Address:</strong> {userDetails.address || "N/A"}
                    </p>
                    <p>
                      <strong>City:</strong> {userDetails.city || "N/A"}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {userDetails.pincode || "N/A"}
                    </p>
                    <p>
                      <strong>State:</strong> {userDetails.state || "N/A"}
                    </p>
                    <p>
                      <strong>Country:</strong> {userDetails.country || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-lg border-b pb-2">
                      Bank Information
                    </h3>
                    <p>
                      <strong>Account Holder:</strong>{" "}
                      {userDetails.account_holder_name || "N/A"}
                    </p>
                    <p>
                      <strong>Bank Name:</strong>{" "}
                      {userDetails.bank_name || "N/A"}
                    </p>
                    <p>
                      <strong>Account Number:</strong>{" "}
                      {userDetails.account_number || "N/A"}
                    </p>
                    <p>
                      <strong>IFSC Code:</strong>{" "}
                      {userDetails.ifsc_code || "N/A"}
                    </p>
                    <p>
                      <strong>Account Type:</strong>{" "}
                      {userDetails.account_type || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-lg border-b pb-2">
                      Document Links
                    </h3>
                    <p>
                      <strong>GST Certificate:</strong>
                      {userDetails.gst_certificate ? (
                        <a
                          href={userDetails.gst_certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>PAN Card:</strong>
                      {userDetails.pan_card ? (
                        <a
                          href={userDetails.pan_card}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Passport/Aadhaar:</strong>
                      {userDetails.passport_adhaar_card ? (
                        <a
                          href={userDetails.passport_adhaar_card}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Signature:</strong>
                      {userDetails.signature ? (
                        <a
                          href={userDetails.signature}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Cancel Cheque:</strong>
                      {userDetails.cancel_cheque ? (
                        <a
                          href={userDetails.cancel_cheque}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Status Change Modal */}
          {isStatusModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Change Active Status
                  </h2>
                  <button
                    onClick={() => setIsStatusModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="active_status"
                      value={statusForm.active_status}
                      onChange={handleStatusChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="holding">Holding</option>
                      <option value="banned">Banned</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remark
                    </label>
                    <textarea
                      name="account_remark"
                      value={statusForm.account_remark}
                      onChange={handleStatusChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter remark for status change"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsStatusModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        changeActiveStatus(selectedUser.supplier_id)
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registration Status Change Modal */}
          {isRegistrationModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Change Registration Status
                  </h2>
                  <button
                    onClick={() => setIsRegistrationModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="registration_status"
                      value={registrationForm.registration_status}
                      onChange={handleRegistrationChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remark
                    </label>
                    <textarea
                      name="account_remark"
                      value={registrationForm.account_remark}
                      onChange={handleRegistrationChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                      placeholder="Enter remark for registration status change"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsRegistrationModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        changeRegistrationStatus(selectedUser.supplier_id)
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
  );
};

export default UserTable;
