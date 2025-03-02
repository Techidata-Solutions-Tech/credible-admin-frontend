import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import SaleVerifyReturnTable from '../../components/returns/SaleVerifyReturnTable'

const SaleVerifyReturns = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
                    <div className=' p-3 sm:p-4'>
                        <div className='flex flex-col sm:flex-row justify-between mb-4 gap-4 w-full mt-4 sm:mt-10 bg-blue-50 p-4 rounded-lg'>
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                <div className="dropdown">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base transition-colors"
                                    >
                                        Filter
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow">
                                        <li><label><input type="checkbox" /></label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                    </ul>
                                </div>
                                <select className="select bg-white border-blue-200 hover:border-blue-300 text-blue-700 w-full sm:w-auto font-semibold">
                                    <option disabled selected>Sort</option>
                                    <option>Homer</option>
                                    <option>Marge</option>
                                    <option>Bart</option>
                                    <option>Lisa</option>
                                    <option>Maggie</option>
                                </select>
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
                        </div>
                        <div className='overflow-x-auto'>
                            <SaleVerifyReturnTable />
                        </div>
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
        </div>
    )
}

export default SaleVerifyReturns