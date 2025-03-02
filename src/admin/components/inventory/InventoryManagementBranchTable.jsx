import React from 'react';

const InventoryManagementBranchTable = () => {
  // Sample inventory data
  const inventoryData = [
    {
      id: 'INV001',
      category: 'Electronics',
      productName: 'Smartphone',
      companyBrand: 'Samsung',
      model: 'Galaxy S24',
      variant: '128GB, Black',
      UOM: 'Pieces',
      SKU: 'SKU12345',
      currentStock: 150,
      readyToShip: 120,
      returnedStock: 10,
      soldQty: 20,
      stockValue: 450000,
      branchId: 'BR001',
      updateDate: '2025-02-12',
    },
    {
      id: 'INV002',
      category: 'Appliances',
      productName: 'Microwave Oven',
      companyBrand: 'LG',
      model: 'NeoChef 32L',
      variant: 'Silver',
      UOM: 'Pieces',
      SKU: 'SKU67890',
      currentStock: 80,
      readyToShip: 70,
      returnedStock: 5,
      soldQty: 5,
      stockValue: 120000,
      branchId: 'BR002',
      updateDate: '2025-02-10',
    },
    {
      id: 'INV003',
      category: 'Fashion',
      productName: 'Running Shoes',
      companyBrand: 'Nike',
      model: 'Air Zoom Pegasus 40',
      variant: 'Size 10, Blue',
      UOM: 'Pairs',
      SKU: 'SKU11223',
      currentStock: 200,
      readyToShip: 180,
      returnedStock: 10,
      soldQty: 20,
      stockValue: 160000,
      branchId: 'BR003',
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData.map((item) => (
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
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.stockValue}</td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.branchId}</td>
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

export default InventoryManagementBranchTable;
