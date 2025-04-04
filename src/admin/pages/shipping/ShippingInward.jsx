import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { RiFilterLine, RiSearchLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import ShippingOutwardTable from '../../components/shipping/ShippingOutwardTable';

const ShippingInward = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-6 uppercase">Shipping Inward Management</h2>

                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            {/* Filter Dropdown */}
                            <div className="dropdown">
                                <button tabIndex={0} className="btn bg-blue-500 hover:bg-blue-600 text-white gap-2 min-w-[120px] border-none">
                                    <RiFilterLine className="text-lg" />
                                    Filter
                                </button>
                                <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-[1] w-64 p-4 shadow-lg mt-2 border">
                                    <li className="mb-2">
                                        <label className="flex items-center gap-3 px-2 py-1 hover:bg-blue-50 rounded">
                                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                            <span className="text-blue-900">Pending Shipping Inwards</span>
                                        </label>
                                    </li>
                                    <li className="mb-2">
                                        <label className="flex items-center gap-3 px-2 py-1 hover:bg-blue-50 rounded">
                                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                            <span className="text-blue-900">In Transit</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center gap-3 px-2 py-1 hover:bg-blue-50 rounded">
                                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                            <span className="text-blue-900">Delivered</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            {/* Search Bar */}
                            <div className="flex-1 max-w-md">
                                <label className="input input-bordered flex items-center gap-2 px-4 focus-within:border-blue-500 bg-blue-50/50">
                                    <RiSearchLine className="text-lg text-blue-500" />
                                    <input
                                        type="text"
                                        className="grow bg-transparent focus:outline-none placeholder-blue-400"
                                        placeholder="Search Shipping Inwards..."
                                    />
                                </label>
                            </div>

                            {/* Sort Dropdown */}
                            <select className="select select-bordered min-w-[160px] border-blue-200 focus:border-blue-500 bg-blue-50/50">
                                <option value="">Sort by</option>
                                <option value="date">Date</option>
                                <option value="status">Status</option>
                                <option value="priority">Priority</option>
                                <option value="destination">Destination</option>
                            </select>
                        </div>

                        <ShippingOutwardTable />

                        {/* Pagination */}
                        <div className="flex justify-center mt-6">
                            <div className="join shadow-sm">
                                <button className="join-item btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none">
                                    <RiArrowLeftSLine className="text-lg" />
                                </button>
                                <button className="join-item btn btn-sm bg-blue-100 hover:bg-blue-200 text-blue-800 border-none">
                                    Page 22 of 48
                                </button>
                                <button className="join-item btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none">
                                    <RiArrowRightSLine className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingInward;