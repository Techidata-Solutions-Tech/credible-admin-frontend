import React from 'react';

const InventoryManagementDeadStockTable = () => {
  // Sample dead stock data
  const deadStockData = [
    {
      id: 'DS001',
      category: 'Electronics',
      productName: 'Wireless Headphones',
      companyBrand: 'Sony',
      model: 'WH-1000XM4',
      variant: 'Black',
      UOM: 'Pieces',
      SKU: 'DSK12345',
      currentStock: 10,
      readyToShip: 5,
      returnedStock: 3,
      soldQty: 2,
      stocksOnHand: 8,
      stockValue: 4000,
      stockistId: 'STK001',
      updateDate: '2025-02-12',
    },
    {
      id: 'DS002',
      category: 'Appliances',
      productName: 'Blender',
      companyBrand: 'Philips',
      model: 'HR2221/00',
      variant: 'White',
      UOM: 'Pieces',
      SKU: 'DSK67890',
      currentStock: 15,
      readyToShip: 10,
      returnedStock: 2,
      soldQty: 3,
      stocksOnHand: 12,
      stockValue: 6000,
      stockistId: 'STK002',
      updateDate: '2025-02-10',
    },
    {
      id: 'DS003',
      category: 'Fashion',
      productName: 'Leather Wallet',
      companyBrand: 'Fossil',
      model: 'RFID Bifold',
      variant: 'Brown',
      UOM: 'Pieces',
      SKU: 'DSK11223',
      currentStock: 20,
      readyToShip: 18,
      returnedStock: 1,
      soldQty: 1,
      stocksOnHand: 19,
      stockValue: 9500,
      stockistId: 'STK003',
      updateDate: '2025-02-08',
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mb-10">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company / Brand</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UOM</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ready to Ship</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returned Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stocks on Hand</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stockist ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deadStockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.category}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.productName}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.companyBrand}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.model}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.variant}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.UOM}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.SKU}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.currentStock}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.readyToShip}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.returnedStock}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.soldQty}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.stocksOnHand}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.stockValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.stockistId}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.updateDate}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                    Update
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

export default InventoryManagementDeadStockTable;
