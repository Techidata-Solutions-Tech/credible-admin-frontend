import React from 'react';

const InventoryManagementSellerTable = () => {
  const sellerStockData = [
    {
      id: 'SLR001',
      category: 'Electronics',
      productName: 'Smartphone',
      companyBrand: 'Samsung',
      model: 'Galaxy S24',
      variant: 'Phantom Black',
      UOM: 'Pieces',
      SKU: 'SLR12345',
      currentStock: 50,
      readyToShip: 30,
      returnedStock: 5,
      soldQty: 15,
      stocksOnHand: 35,
      unitPrice: 999,
      sellerId: 'SELL001',
      updateDate: '2025-02-12',
    },
    {
      id: 'SLR002',
      category: 'Home Appliances',
      productName: 'Microwave Oven',
      companyBrand: 'LG',
      model: 'NeoChef 32L',
      variant: 'Silver',
      UOM: 'Pieces',
      SKU: 'SLR67890',
      currentStock: 20,
      readyToShip: 15,
      returnedStock: 2,
      soldQty: 3,
      stocksOnHand: 18,
      unitPrice: 350,
      sellerId: 'SELL002',
      updateDate: '2025-02-10',
    },
    {
      id: 'SLR003',
      category: 'Fashion',
      productName: 'Running Shoes',
      companyBrand: 'Nike',
      model: 'Air Zoom Pegasus',
      variant: 'Blue',
      UOM: 'Pairs',
      SKU: 'SLR11223',
      currentStock: 100,
      readyToShip: 90,
      returnedStock: 5,
      soldQty: 5,
      stocksOnHand: 95,
      unitPrice: 120,
      sellerId: 'SELL003',
      updateDate: '2025-02-08',
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mb-10">
          <thead className="bg-gray-200">
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sellerStockData?.map((item) => (
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
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.unitPrice}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.sellerId}</td>
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

export default InventoryManagementSellerTable;
