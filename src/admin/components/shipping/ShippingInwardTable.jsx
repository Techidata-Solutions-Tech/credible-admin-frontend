import React from 'react';

const ShippingInwardTable = () => {
  const shippingData = [
    {
      id: 'SHP001',
      shippingDate: '2024-01-12',
      shippingUoM: 'Boxes',
      quantity: 50,
      weight: '500kg',
      shippingFrom: 'New York',
      shippingTo: 'Los Angeles',
      billNo: 'BILL12345',
      invoice: 'INV-001',
    },
    {
      id: 'SHP002',
      shippingDate: '2024-02-08',
      shippingUoM: 'Pallets',
      quantity: 20,
      weight: '1200kg',
      shippingFrom: 'Chicago',
      shippingTo: 'Houston',
      billNo: 'BILL67890',
      invoice: 'INV-002',
    },
    {
      id: 'SHP003',
      shippingDate: '2024-03-05',
      shippingUoM: 'Cartons',
      quantity: 100,
      weight: '750kg',
      shippingFrom: 'San Francisco',
      shippingTo: 'Seattle',
      billNo: 'BILL54321',
      invoice: 'INV-003',
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden pb-[100px]">
      <table className="w-full table-auto mb-10">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping UoM</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping From</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping To</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill No</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
            {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {shippingData?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{item.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.shippingDate}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.shippingUoM}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.weight}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.shippingFrom}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.shippingTo}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.billNo}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{item.invoice}</td>
              {/* <td className="px-4 py-4 text-sm">
                <button className="text-blue-500 hover:underline">View Details</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingInwardTable;
