import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import InventoryManagementBranchTable from '../../components/inventory/InventoryManagementBranchTable'
import PillTabs from '../../components/PillTabs'

const InventoryManagementBranch = () => {
    const tabs_user = [
        { id: 1, label: 'All (1000)' },
        { id: 2, label: 'Active (800)' },
        { id: 3, label: 'Inactive (100)' },
        { id: 4, label: 'Blocked (100)' },
        { id: 5, label: 'Tash (10)' },
    ];

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

                   <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                            <div className='w-full md:w-auto'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">Filter</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-transparent">
                                        <li><label><input type="checkbox" /></label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Search Input */}
                            <div className="flex-1 max-w-md">
                                <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input type="text" className="grow text-blue-900 placeholder-blue-400" placeholder="Search customer..." />
                                </label>
                            </div>
                            <div className='w-full md:w-auto'>
                                <select className="select w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                    <option disabled selected>Sort</option>
                                    <option>Homer</option>
                                    <option>Marge</option>
                                    <option>Bart</option>
                                    <option>Lisa</option>
                                    <option>Maggie</option>
                                </select>
                            </div>
                        </div>

                    <InventoryManagementBranchTable/>

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
    )
}

export default InventoryManagementBranch