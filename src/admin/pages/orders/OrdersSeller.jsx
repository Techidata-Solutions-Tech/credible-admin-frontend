import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import OrderTableSeller from '../../components/orders/OrderTableSeller'
import PillTabs from '../../components/PillTabs'

const Orders = () => {
    const tabs_status = [
        { id: 1, label: 'Confirmed (100)' },
        { id: 2, label: 'Cancelled (20)' },
        { id: 3, label: 'Replaced (05)' },
        { id: 4, label: 'Returned (10)' },
        { id: 5, label: 'Undeliverd (05)' },
        { id: 6, label: 'Delivered (50)' },
        { id: 7, label: 'Open Orders (10)' },
        { id: 8, label: 'Under process (04)' },
        { id: 9, label: 'Ready to ship (03)' },
        { id: 10, label: 'Pickup & Shipped(03)' },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
                        <div className="w-full mb-4 md:mb-6">
                            <div className="max-w-full px-2 md:px-4">
                                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-300">
                                    <div className="w-full overflow-x-auto py-1 md:py-2">
                                        <div className="flex min-w-full justify-center">
                                            <PillTabs tabs={tabs_status} />
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
                        <OrderTableSeller />
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
    )
}

export default Orders;