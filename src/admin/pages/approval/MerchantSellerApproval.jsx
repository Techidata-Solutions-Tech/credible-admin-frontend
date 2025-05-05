import React, { useState } from 'react'
import MerchantSellerApprovalTable from '../../components/approval/MerchantSellerApprovalTable'
import PillTabs from '../../components/PillTabs'
import Breadcrumbs from '../../components/Breadcrumbs'

const MerchantSellerApproval = () => {
    const tabs_user = [
        { id: 1, label: "Inward (100)" },
        { id: 2, label: "Approved (100)" },
        { id: 3, label: "Pending (100)" },
        { id: 4, label: "Holding (100)" },
        { id: 5, label: "Rejected (100)" },
        // { id: "banned", label: "Banned (100)" },
        // { id: "active", label: "Active (100)" },
      ];
    const breadcrumbItems = [
        { label: 'Approval Management', href: '#' },
        { label: 'Merchant', href: '#' },
        { label: 'Seller Approval', href: '/admin/approval/merchent/Seller' }
      ];
  
    return (
        <div className='min-h-screen bg-white p-2'>
                <Breadcrumbs
                  pageTitle="Seller Approval"
                  items={breadcrumbItems}
                />
    
                    <div className="w-full mb-6">
                        <div className="max-w-full ">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg ">
                                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                                    <div className="min-w-full flex justify-center">
                                        <PillTabs tabs={tabs_user} />
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

                    <MerchantSellerApprovalTable/>

                </div>
      
    )
}

export default MerchantSellerApproval