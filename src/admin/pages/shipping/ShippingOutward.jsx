import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { RiFilterLine, RiSearchLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import ShippingOutwardTable from '../../components/shipping/ShippingOutwardTable';
import Breadcrumbs from '../../components/Breadcrumbs';

const ShippingOutward = () => {
    const breadcrumbItems = [
        { label: 'Shipping Management', href: '#' },
        { label: 'Shipments', href: '#' },
        { label: 'Shipping Outward', href: '/admin/marketing/create-coupon' }
      ];
     
        return (
          <div className=" p-4">
             <Breadcrumbs
                  pageTitle="Shipping Outward"
                  items={breadcrumbItems}
                />   
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
                                            <span className="text-blue-900">Pending ShippingOutwards</span>
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
                                        placeholder="Search ShippingOutwards..."
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

<div className='max-w-full overflow-x-auto'>
<ShippingOutwardTable />

</div>
                      
                    </div>
       
    );
};

export default ShippingOutward;