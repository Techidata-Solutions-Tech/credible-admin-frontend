import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import CustomerBuisnessUserTable from '../../components/customers/CustomerBuisnessUserTable'
import PillTabs from '../../components/PillTabs'

const CustomerBuisnessUser = () => {
    const tabs_user = [
        { id: 1, label: 'All (1000)' },
        { id: 2, label: 'Active (800)' },
        { id: 3, label: 'Inactive (100)' },
        { id: 4, label: 'Blocked (100)' },
        { id: 5, label: 'Trash (10)' },
    ];

    // Replace this with your actual user data or fetch it dynamically.
    const userData = [
        {
            id: '01',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            created_at: '2023-01-01',
            status: 'Active', // Example status, adjust according to your data
        },
        {
            id: '02',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            city: 'Los Angeles',
            state: 'CA',
            zipcode: '90001',
            created_at: '2023-02-01',
            status: 'Inactive',
        },
    ];

    const [userId, setUserId] = useState(null);
    const [modalData, setModalData] = useState(null);

    const handleEdit = (id) => {
        setUserId(id);
        // Find the selected user from the data
        const user = userData.find(user => user.id === id);
        setModalData(user); // Set modalData to the user data
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
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex flex-col md:flex-row bg-gray-100'>
                <Sidebar />
                <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>
                    <div className="w-full mb-6">
                        <div className="max-w-full px-2 md:px-4">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-300">
                                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                                    <div className="min-w-full flex justify-center">
                                        <PillTabs tabs={tabs_user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 container items-center w-full mt-10'>
                        <div className='flex gap-2 flex-wrap'>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                    Filter
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow">
                                    <li><label><input type="checkbox" /></label></li>
                                    <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                    <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                </ul>
                            </div>
                            <select className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                <option disabled selected>Sort</option>
                                <option>Homer</option>
                                <option>Marge</option>
                                <option>Bart</option>
                                <option>Lisa</option>
                                <option>Maggie</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                                <i className="ri-search-line"></i>
                                <input type="text" className="grow" placeholder="Customer" />
                            </label>
                        </div>
                    </div>

                    <CustomerBuisnessUserTable />

                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <div className="join shadow-lg">
                            <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200">«</button>
                            <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200 px-6">Page 22</button>
                            <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200">»</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <dialog id="my_modal_edit" className="modal">
                <form method="dialog" className="modal-box">
                    <button type="button" className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => document.getElementById('my_modal_edit').close()}>
                        &times;
                    </button>
                    <h2 className="text-lg font-semibold">Edit Customer</h2>
                    <input
                        type="text"
                        value={modalData?.name || ''}
                        onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="Full Name"
                    />
                    <input
                        type="email"
                        value={modalData?.email || ''}
                        onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="Email"
                    />
                    <input
                        type="tel"
                        value={modalData?.phone || ''}
                        onChange={(e) => setModalData({ ...modalData, phone: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="Phone Number"
                    />
                    <input
                        type="text"
                        value={modalData?.city || ''}
                        onChange={(e) => setModalData({ ...modalData, city: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="City"
                    />
                    <input
                        type="text"
                        value={modalData?.state || ''}
                        onChange={(e) => setModalData({ ...modalData, state: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="State"
                    />
                    <input
                        type="text"
                        value={modalData?.zipcode || ''}
                        onChange={(e) => setModalData({ ...modalData, zipcode: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="Zipcode"
                    />
                    <input
                        type="date"
                        value={modalData?.created_at || ''}
                        onChange={(e) => setModalData({ ...modalData, created_at: e.target.value })}
                        className="input input-bordered w-full mt-2"
                        placeholder="Created At"
                    />
                    <button className="btn btn-primary mt-4" onClick={() => {/* handle update logic */}}>Save Changes</button>
                </form>
            </dialog>

            {/* Delete Modal */}
            <dialog id="my_modal_delete" className="modal">
                <form method="dialog" className="modal-box">
                    <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => document.getElementById('my_modal_delete').close()}>
                        &times;
                    </button>
                    <h2 className="text-lg font-semibold">Are you sure you want to delete this customer?</h2>
                    <button className="btn btn-danger mt-4" onClick={() => {/* handle delete logic */}}>Yes, Delete</button>
                </form>
            </dialog>

            {/* Status Change Modal */}
            <dialog id="my_modal_status" className="modal">
                <form method="dialog" className="modal-box">
                    <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => document.getElementById('my_modal_status').close()}>
                        &times;
                    </button>
                    <h2 className="text-lg font-semibold">Change Status</h2>
                    <select
                        className="select select-bordered w-full mt-2"
                        value={modalData?.status || ''}
                        onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                    <button className="btn btn-primary mt-4">Change Status</button>
                </form>
            </dialog>
        </div>
    );
}

export default CustomerBuisnessUser;
