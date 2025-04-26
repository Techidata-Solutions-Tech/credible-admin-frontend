import React, { useState } from 'react';
import Pagination from '../Pagination';

const TransactionSaleTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const transactionData = [
    {
      id: 'TXN001',
      dateTime: '2025-01-22 14:30',
      customerId: 'CUST001',
      transactionId: 'TRX123456',
      salePrice: 1500,
      SKU: 'SKU12345',
      paymentType: 'Credit Card',
      paymentMode: 'Online',
      paymentStatus: 'Paid',
    },
    {
      id: 'TXN002',
      dateTime: '2025-01-21 10:15',
      customerId: 'CUST002',
      transactionId: 'TRX987654',
      salePrice: 2300,
      SKU: 'SKU67890',
      paymentType: 'Cash',
      paymentMode: 'Offline',
      paymentStatus: 'Pending',
    },
    {
      id: 'TXN003',
      dateTime: '2025-01-20 18:45',
      customerId: 'CUST003',
      transactionId: 'TRX543210',
      salePrice: 750,
      SKU: 'SKU11223',
      paymentType: 'Debit Card',
      paymentMode: 'Online',
      paymentStatus: 'Failed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = transactionData.slice(indexOfFirstRecord, indexOfLastRecord);

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
              <tr className='text-white bg-gray-500'>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">ID</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Date & Time</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Customer ID</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Transaction ID</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Sale Price</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">SKU</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Payment Type</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Payment Mode</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Payment Status</th>
                <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium border uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.dateTime}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.customerId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.transactionId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.salePrice}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.SKU}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.paymentType}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.paymentMode}</td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.paymentStatus)}`}>
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
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
        totalRecords={transactionData.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default TransactionSaleTable;
