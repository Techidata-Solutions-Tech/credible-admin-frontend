import React, { useState } from 'react'
import TransactionPurchaseTable from '../../components/transaction/TransactionPurchaseTable'
import PillTabs from '../../components/PillTabs'
import Breadcrumbs from '../../components/Breadcrumbs'

const TransactionPurchase = () => {
 
    const breadcrumbItems = [
        { label: 'Transaction Management', href: '#' },
        { label: 'Transactions', href: '#' },
        { label: 'Purchase Transactions', href: '/admin/marketing/create-coupon' }
      ];
      const topOptions = [
        { id:1 ,label: "Full Advance (72)" },
        { id:2 ,label: "Partial Credit (72)" },
        { id:3,label: "Full Credit (72)" },
      ];
    
      const bottomOptions = [
        { id:1 ,label: "25% Advance & Credit-75% (72)" },
        { id:2 ,label: "50% Advance & Credit 50% (72)" },
      ];
        return (
          <div className="">
             <Breadcrumbs
                  pageTitle="Purchase Transactions"
                  items={breadcrumbItems}
                />  
                
                <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>
                <div className="space-y-3">
  <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-md shadow-sm overflow-x-auto flex justify-center">
    <PillTabs tabs={topOptions} />
  </div>
  <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-md shadow-sm overflow-x-auto flex justify-center">
    <PillTabs tabs={bottomOptions} />
  </div>
</div>


                   <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                            <div className='w-full md:w-auto'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">Filter</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white">
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

                    <TransactionPurchaseTable />

                   
                </div>
           
        </div>
    )
}

export default TransactionPurchase