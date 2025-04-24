import React, { useState } from 'react';
import Pagination from '../../../admin/components/Pagination';

const SupplierTransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const supplierPayments = [
    {
      no: '01',
      inwardDate: '01/02/2022',
      poId: '6347634',
      invoiceNumber: '800',
      invoiceValue: '800',
      deduction: 'Post Paid',
      payable: 'COD',
    },
    {
      no: '02',
      inwardDate: '05/03/2022',
      poId: '3453764',
      invoiceNumber: '700',
      invoiceValue: '700',
      deduction: 'Prepaid',
      payable: 'Debit Card',
    },
    {
      no: '03',
      inwardDate: '20/04/2022',
      poId: '3453433',
      invoiceNumber: '400',
      invoiceValue: '400',
      deduction: 'Prepaid',
      payable: 'Net Banking',
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
            <thead className="bg-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">NO</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">INWARD DATE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">PO ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">INVOICE NUMBER</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">INVOICE VALUE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">DEDUCTION</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">PAYABLE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.no}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.inwardDate}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.poId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.invoiceNumber}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.invoiceValue}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.deduction}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.payable}</td>
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
        totalRecords={supplierPayments.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SupplierTransactionTable;
