"use client"
import React, { useState } from 'react';
import Pagination from '../Pagination';

const MerchantSellerTable = () => {
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
    {
      id: 'MS004',
      sellerName: 'Tech Solutions Inc.',
      categories: ['Electronics', 'Software'],
      products: ['Computers', 'Printers', 'Antivirus'],
      place: 'Austin',
      state: 'TX',
    },
    {
      id: 'MS005',
      sellerName: 'Fashion House',
      categories: ['Clothing', 'Accessories'],
      products: ['Dresses', 'Jewelry', 'Hats'],
      place: 'Miami',
      state: 'FL',
    },
    {
      id: 'MS006',
      sellerName: 'Home Essentials',
      categories: ['Furniture', 'Decor'],
      products: ['Sofas', 'Lamps', 'Curtains'],
      place: 'Seattle',
      state: 'WA',
    },
    {
      id: 'MS007',
      sellerName: 'Sports World',
      categories: ['Fitness', 'Outdoor'],
      products: ['Treadmills', 'Bicycles', 'Camping Gear'],
      place: 'Denver',
      state: 'CO',
    },
    {
      id: 'MS008',
      sellerName: 'Book Haven',
      categories: ['Education', 'Entertainment'],
      products: ['Textbooks', 'Novels', 'Magazines'],
      place: 'Boston',
      state: 'MA',
    },
    {
      id: 'MS009',
      sellerName: 'Pet Paradise',
      categories: ['Animals', 'Pet Care'],
      products: ['Dog Food', 'Toys', 'Grooming'],
      place: 'Portland',
      state: 'OR',
    },
    {
      id: 'MS010',
      sellerName: 'Beauty Spot',
      categories: ['Cosmetics', 'Skincare'],
      products: ['Makeup', 'Perfume', 'Hair Care'],
      place: 'Atlanta',
      state: 'GA',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sellerData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleViewDetails = (id) => {
    alert(`Viewing details for Seller ID: ${id}`);
  };

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (<>
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-4 min-w-[900px]">
        <thead className="bg-gray-200">
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
          {currentRecords?.map((seller) => (
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
    <Pagination 
    totalRecords={sellerData.length} 
    recordsPerPage={recordsPerPage} 
    onPageChange={handlePageChange}
  /></>
  );
};

export default MerchantSellerTable;