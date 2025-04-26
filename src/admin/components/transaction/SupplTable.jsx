import React, { useState } from 'react';
import Pagination from '../Pagination';

const SupplierPaymentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const supplierPayments = [
    {
      id: 'PAY001',
      orderDateTime: '2025-01-22 14:30',
      purchaseOrderId: 'PO123456',
      purchaseOrderValue: 5000,
      invoiceNumber: 'INV987654',
      invoiceValue: 4800,
      returnItems: 'Defective Widgets',
      returnedQty: 2,
      returnValue: 200,
      deduction: 100,
      payable: 4500,
      payRefNo: 'PAYREF001',
    },
    {
      id: 'PAY002',
      orderDateTime: '2025-01-20 10:00',
      purchaseOrderId: 'PO654321',
      purchaseOrderValue: 7500,
      invoiceNumber: 'INV123456',
      invoiceValue: 7300,
      returnItems: 'Damaged Screws',
      returnedQty: 5,
      returnValue: 250,
      deduction: 50,
      payable: 7000,
      payRefNo: 'PAYREF002',
    },
    {
      id: 'PAY003',
      orderDateTime: '2025-01-18 16:45',
      purchaseOrderId: 'PO789012',
      purchaseOrderValue: 4200,
      invoiceNumber: 'INV567890',
      invoiceValue: 4200,
      returnItems: 'None',
      returnedQty: 0,
      returnValue: 0,
      deduction: 0,
      payable: 4200,
      payRefNo: 'PAYREF003',
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
            <thead className="bg-gray-500">
              <tr>
                <th colSpan={2} className='bg-blue-500 border text-white'>Date</th>
                <th colSpan={4} className='bg-blue-500 border text-white'>Order Details</th>
                <th colSpan={3} className='bg-blue-500 border text-white'>Return Details</th>
                <th colSpan={3} className='bg-blue-500 border text-white'>Payable Details</th>
                <th colSpan={3} className='bg-blue-500 border text-white'></th>
              </tr>
              <tr>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">No</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Order Date </th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">PO ID</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">PO Value</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Invoice Number</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Invoice Value</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Returned Items</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Returned Qty</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Returned Value</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Deduction</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Payable</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Pay/Ref No</th>
                <th className="px-4 py-3 text-left border text-xs font-medium text-white uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{item.orderDateTime}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{item.purchaseOrderId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">${item.purchaseOrderValue}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{item.invoiceNumber}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">${item.invoiceValue}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{item.returnItems}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{item.returnedQty}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">${item.returnValue}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">${item.deduction}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">${item.payable}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 border whitespace-nowrap">{item.payRefNo}</td>
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

export default SupplierPaymentTable;
