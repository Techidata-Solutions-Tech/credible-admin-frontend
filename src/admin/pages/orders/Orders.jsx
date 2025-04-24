import React from 'react'
import OrderTable from '../../components/orders/OrderTable'
import PillTabs from '../../components/PillTabs'
import Breadcrumbs from '../../components/Breadcrumbs'

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
    const breadcrumbItems = [
        { label: 'Order Management', href: '#' },
        { label: 'Orders', href: '#' },
        { label: 'My Orders', href: '/admin/approval/product/supplier' }
      ];
  
    return (
        <div className='min-h-screen'>
                <Breadcrumbs
                  pageTitle="My Orders"
                  items={breadcrumbItems}
                /> 
                

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

                    
                        <OrderTable />
                       
                    </div>
                </div>
        </div>
    )
}

export default Orders;