import React from 'react';

const SupplierPaymentTable = () => {
  // Sample supplier payment data
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

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mb-10">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date & Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Items</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returned Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deduction</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay/Ref No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supplierPayments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.orderDateTime}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.purchaseOrderId}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.purchaseOrderValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.invoiceNumber}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.invoiceValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnItems}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnedQty}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.returnValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.deduction}</td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">${item.payable}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.payRefNo}</td>
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
  );
};

export default SupplierPaymentTable;
