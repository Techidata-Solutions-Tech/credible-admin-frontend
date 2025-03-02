import React from 'react';

const MerchantSupplierTable = () => {
  const sellerData = [
    {
      id: 'MS001',
      sellerName: 'John Doe Enterprises',
      categories: ['Electronics', 'Home Appliances'],
      products: ['Smartphones', 'Laptops', 'Air Conditioners'],
      place: 'New York',
      state: 'NY',
    },
    {
      id: 'MS002',
      sellerName: 'ABC Retailers',
      categories: ['Fashion', 'Accessories'],
      products: ['Watches', 'Bags', 'Shoes'],
      place: 'Los Angeles',
      state: 'CA',
    },
    {
      id: 'MS003',
      sellerName: 'Global Traders',
      categories: ['Groceries', 'Organic Food'],
      products: ['Fruits', 'Vegetables', 'Dairy'],
      place: 'Chicago',
      state: 'IL',
    },
  ];

  const handleViewDetails = (id) => {
    alert(`Viewing details for Seller ID: ${id}`);
    // You can replace this with modal or navigation logic
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[900px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller & Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categories</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Place</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">View</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sellerData.map((seller) => (
            <tr key={seller.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{seller.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{seller.sellerName}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{seller.categories.join(', ')}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{seller.products.join(', ')}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{seller.place}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{seller.state}</td>
              <td className="px-4 py-4 text-sm">
                <button 
                  onClick={() => handleViewDetails(seller.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantSupplierTable;
