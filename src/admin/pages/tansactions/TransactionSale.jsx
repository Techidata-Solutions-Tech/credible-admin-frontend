import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import TransactionSaleTable from '../../components/transaction/TransactionSaleTable'
import PillTabs from '../../components/PillTabs'
import Breadcrumbs from '../../components/Breadcrumbs'

const TransactionSale = () => {
    const tabs_mode_type = [
        { id: 1, label: 'COD (1000)' },
        { id: 2, label: 'Debit Card (800)' },
        { id: 3, label: 'Credit Card (100)' },
        { id: 4, label: 'Net Banking (100)' },
        { id: 5, label: 'UPI (10)' },
        { id: 6, label: 'Wallet (10)' },
    ];
    const tabs_status = [
        { id: 1, label: 'Recived payment (1000)' },
        { id: 2, label: 'Pending payment (800)' },
        { id: 3, label: 'Total Payments (100)' },
    ];
    const tabs_paid = [
        { id: 1, label: 'Prepaid (08)' },
        { id: 2, label: 'Post paid(70)' },
    ];

    const breadcrumbItems = [
        { label: 'Transaction Management', href: '#' },
        { label: 'Transactions', href: '#' },
        { label: 'Sale Transactions', href: '/admin/marketing/create-coupon' }
      ];
     
        return (
          <div className=" p-4">
             <Breadcrumbs
                  pageTitle="Sale Transactions"
                  items={breadcrumbItems}
                />  
                
                
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-2">
            
                    <div className="rounded shadow-lg p-2 sm:p-4 bg-white space-y-8">
                        {/* Header */}
                        <div className="mb-6">
                            <p className="text-blue-600">Manage and monitor your payment transactions</p>
                        </div>
                        <div className="max-w-full px-2 md:px-4">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-300">
                                
                                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                                    <div className="min-w-full flex justify-center">
                                        <PillTabs tabs={tabs_mode_type} /> 
                                    </div>
                                    <div className="min-w-full flex justify-center">
                                        <PillTabs tabs={tabs_status} />
                                    </div>
                                    <div className="min-w-full flex justify-center">
                                         <PillTabs tabs={tabs_paid} />
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                        {/* Controls Section */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-blue-50 p-4 rounded-lg">
                            {/* Filter Dropdown */}
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn bg-white hover:bg-blue-500 text-blue-700 border-blue-200 hover:border-blue-300 hover:text-white w-full sm:w-auto">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        Filter
                                    </span>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-[1] w-52 p-2 shadow-lg border border-blue-100">
                                    <li className="p-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <span className="text-blue-900">Filter Option 1</span>
                                        </label>
                                    </li>
                                    <li className="p-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <span className="text-blue-900">Filter Option 2</span>
                                        </label>
                                    </li>
                                    <li className="p-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <span className="text-blue-900">Filter Option 3</span>
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
                                    <input type="text" className="grow text-blue-900 placeholder-blue-400" placeholder="Search Transaction..." />
                                </label>
                            </div>

                            {/* Sort Dropdown */}
                            <select className="select bg-white border-blue-200 hover:border-blue-300 text-blue-700 w-full sm:w-auto font-semibold">
                                <option disabled selected>Sort by</option>
                                <option>Date: Newest First</option>
                                <option>Date: Oldest First</option>
                                <option>Amount: High to Low</option>
                                <option>Amount: Low to High</option>
                            </select>
                        </div>

                        {/* Transaction Table */}
                        <div className="overflow-x-auto rounded-lg border border-blue-100">
                            <TransactionSaleTable />
                        </div>

                       
                    </div>
                </div>
           
        </div>
    )
}

export default TransactionSale