import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ReviewTable from '../../components/reviews/ReviewTable';
import PillTabs from '../../components/PillTabs';

const Reviews = () => {
    const tabs_type = [
        { id: 1, label: 'All (08)' },
        { id: 2, label: 'Fresh (08)' },
        { id: 3, label: 'Approved (70)' },
        { id: 4, label: 'Pending (70)' },
        { id: 5, label: 'Denied (70)' },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            
            <div className="flex-1 flex flex-col overflow-hidden">
                

                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Header Section with improved spacing and alignment */}
                        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-300">
                            <div className="w-full overflow-x-auto py-2">
                                <div className="flex justify-center min-w-full">
                                    <PillTabs tabs={tabs_type} />
                                </div>
                            </div>
                        </div>

                        {/* Controls Section with better spacing and styling */}
                        <div className="flex flex-wrap gap-4 mb-6 mt-4 items-center justify-between bg-blue-100 p-4 rounded-md">
                            {/* Filter Dropdown with blue accent */}
                            <div className="dropdown">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-[1] w-52 p-3 shadow-lg mt-2">
                                    <li className="mb-2">
                                        <label className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded">
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <span>All Reviews</span>
                                        </label>
                                    </li>
                                    <li className="mb-2">
                                        <label className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded">
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <span>Recent Reviews</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded">
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <span>Verified Reviews</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            {/* Search Input */}
                            <div className="flex-1 max-w-md">
                                <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input type="text" className="grow text-blue-900 placeholder-blue-400" placeholder="Search here..." />
                                </label>
                            </div>
                            {/* Sort Dropdown with blue accent */}
                            <select className="select bg-white border-blue-200 hover:border-blue-300 text-blue-700 w-full sm:w-auto font-semibold">
                                <option disabled selected>Sort by</option>
                                <option>Newest First</option>
                                <option>Oldest First</option>
                                <option>Rating: High to Low</option>
                                <option>Rating: Low to High</option>
                            </select>
                        </div>

                        {/* Review Table */}
                        <ReviewTable />

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
            </div>
        </div>
    );
};

export default Reviews;