import React from 'react';

const SellerPaymentTable = () => {
  // Sample seller payment data
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

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mb-10">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Ended Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. of Orders</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. of Items</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Items</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returned Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping Gateway</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Gateway</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay/Ref No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sellerPayments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnEndedDate}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.sellerName}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.sellerId}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.numberOfOrders}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.numberOfItems}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.quantity}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.orderValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnItems}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnQty}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.returnedValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.shippingGateway}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.paymentGateway}</td>
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

export default SellerPaymentTable;
