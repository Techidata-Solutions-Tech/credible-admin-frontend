import React, { useState } from 'react';
import Pagination from '../../../admin/components/Pagination';

const SupplierPaymentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const supplierPayments = [
    {
      no: '01',
      dateTime: '01/02/2022',
      amount: 800,
      transactionId: '6347634',
      paymentMode: 'NEFT',
      bank: 'SBI',
      poId: 'ABC-123',
    },
    {
      no: '02',
      dateTime: '05/03/2022',
      amount: 700,
      transactionId: '3453764',
      paymentMode: 'RTGS',
      bank: 'SBI',
      poId: 'DEF-456',
    },
    {
      no: '03',
      dateTime: '20/04/2022',
      amount: 600,
      transactionId: '3453433',
      paymentMode: 'IMPS',
      bank: 'HDFC',
      poId: 'XYZ-123',
    },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = supplierPayments.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto mb-10">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NO</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DATE & TIME</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">AMOUNT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">TRANSACTION ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PAYMENT MODE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">BANK</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.no}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.dateTime}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.amount}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.transactionId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.paymentMode}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.bank}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.poId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalRecords={supplierPayments.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SupplierPaymentTable;
