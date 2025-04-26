import React, { useState } from 'react';
import Pagination from '../Pagination';

const SellerPaymentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const sellerPayments = [
    {
      id: 'SEL001',
      returnEndedDate: '2025-02-10',
      sellerName: 'ABC Store',
      sellerId: 'SELL001',
      numberOfOrders: 15,
      numberOfItems: 50,
      quantity: 55,
      orderValue: 12000,
      returnItems: 'Defective Shoes',
      returnQty: 3,
      returnedValue: 450,
      shippingGateway: 'DHL Express',
      paymentGateway: 'PayPal',
      payable: 11550,
      payRefNo: 'PAYSELL001',
    },
    {
      id: 'SEL002',
      returnEndedDate: '2025-02-08',
      sellerName: 'XYZ Traders',
      sellerId: 'SELL002',
      numberOfOrders: 20,
      numberOfItems: 80,
      quantity: 85,
      orderValue: 18000,
      returnItems: 'Broken Glassware',
      returnQty: 5,
      returnedValue: 600,
      shippingGateway: 'FedEx',
      paymentGateway: 'Stripe',
      payable: 17400,
      payRefNo: 'PAYSELL002',
    },
    {
      id: 'SEL003',
      returnEndedDate: '2025-02-05',
      sellerName: 'LMN Electronics',
      sellerId: 'SELL003',
      numberOfOrders: 10,
      numberOfItems: 30,
      quantity: 32,
      orderValue: 8000,
      returnItems: 'None',
      returnQty: 0,
      returnedValue: 0,
      shippingGateway: 'UPS',
      paymentGateway: 'Razorpay',
      payable: 8000,
      payRefNo: 'PAYSELL003',
    },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sellerPayments.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto mb-10">
          <thead className="bg-gray-500">
              <tr>
                <th colSpan={2} className='bg-blue-500 border text-white'>Date</th>
                <th colSpan={5} className='bg-blue-500 border text-white'>Order Details</th>
                <th colSpan={3} className='bg-blue-500 border text-white'>Return Details</th>
                <th colSpan={4} className='bg-blue-500 border text-white'>Deduction Details</th>
                <th colSpan={1} className='bg-blue-500 border text-white'></th>
              </tr>
              <tr className='text-white'>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">No</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Return Ended Date</th>
                {/* <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Seller Name</th> */}
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Seller ID</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">No. of Orders</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">No. of Items</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Quantity</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Order Value</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Returned Items</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Returned Qty</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Returned Value</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Shipping Gateway</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Payment Gateway</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Payable</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Pay/Ref No</th>
                <th className="px-4 py-3 text-left border text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{index +1}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.returnEndedDate}</td>
                  {/* <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.sellerName}</td> */}
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.sellerId}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.numberOfOrders}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.numberOfItems}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">${item.orderValue}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.returnItems}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.returnQty}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">${item.returnedValue}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.shippingGateway}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.paymentGateway}</td>
                  <td className="px-4 py-4 text-sm border font-semibold text-gray-900 whitespace-nowrap">${item.payable}</td>
                  <td className="px-4 py-4 text-sm border text-gray-900 whitespace-nowrap">{item.payRefNo}</td>
                  <td className="px-4 py-4 text-sm border whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalRecords={sellerPayments.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SellerPaymentTable;