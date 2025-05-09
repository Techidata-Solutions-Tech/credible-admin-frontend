import React, { useState } from "react";
import Pagination from "../Pagination";

const TransactionPurchaseTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const purchaseData = [
    {
      id: "PUR001",
      orderDate: "2025-01-20",
      supplierName: "ABC Supplies",
      supplierId: "SUP001",
      purchaseOrderId: "PO123456",
      paymentType: "Bank Transfer",
      orderValue: 5000,
      upfrontPayment: 2000,
      balancePayment: 3000,
      transactionId: "TRX998877",
    },
    {
      id: "PUR002",
      orderDate: "2025-01-18",
      supplierName: "XYZ Traders",
      supplierId: "SUP002",
      purchaseOrderId: "PO654321",
      paymentType: "Credit Card",
      orderValue: 7500,
      upfrontPayment: 3000,
      balancePayment: 4500,
      transactionId: "TRX776655",
    },
    {
      id: "PUR003",
      orderDate: "2025-01-15",
      supplierName: "LMN Wholesalers",
      supplierId: "SUP003",
      purchaseOrderId: "PO789012",
      paymentType: "Cash",
      orderValue: 4200,
      upfrontPayment: 4200,
      balancePayment: 0,
      transactionId: "TRX665544",
    },
    // Add more records here if needed
  ];

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = purchaseData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

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
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  No
                </th>
                <th className="sticky top-0 px-4 py-3 min-w-[220px] text-xs font-medium text-white border  uppercase">
                  Order Date
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Supplier Name
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Supplier ID
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Purchase Order ID
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Payment Type
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Order Value
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Upfront Payment
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Balance Payment
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Transaction ID
                </th>
                <th className="sticky top-0 px-4 py-3  text-xs font-medium text-white border  uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item,index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-300"
                >
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {index+1}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {item.orderDate}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {item.supplierName}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {item.supplierId}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {item.purchaseOrderId}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {item.paymentType}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    ${item.orderValue}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    ${item.upfrontPayment}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    ${item.balancePayment}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {item.transactionId}
                  </td>
                  <td className="border border-gray-400 px-4 py-4 text-sm whitespace-nowrap">
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
        totalRecords={purchaseData.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default TransactionPurchaseTable;
