import React from 'react'
import OrderTable from '../../components/orders/OrderTable'
import PillTabs from '../../components/PillTabs'
import Breadcrumbs from '../../components/Breadcrumbs'

const Orders = () => {
    const top_status = [
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
    const tabs_status = [
     
    ];
    const breadcrumbItems = [
        { label: 'Order Management', href: '#' },
        { label: 'Orders', href: '#' },
        { label: 'My Orders', href: '/admin/approval/product/supplier' }
      ];
  
    return (
        <div className='min-h-screen bg-white p-2'>
                <Breadcrumbs
                  pageTitle="My Orders"
                  items={breadcrumbItems}
                /> 
                

                        <div className="w-full mb-4 md:mb-6">
                            <div className="max-w-full">
                                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-lg shadow-lg ">
                                    <div className="w-full overflow-x-auto py-1">
                                        <div className="flex min-w-full justify-center">
                                            <PillTabs tabs={top_status} />                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OrderTable />
                       
        </div>
    )
}

export default Orders;