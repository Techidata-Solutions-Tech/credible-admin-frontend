"use client"
import React, { useState } from 'react';
import Pagination from '../Pagination'; 
import { Link } from 'react-router-dom';

const PreferredSupplierTable = () => {
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
    {
      id: 'MS011',
      sellerName: 'Auto Parts Direct',
      categories: ['Automotive', 'Tools'],
      products: ['Tires', 'Batteries', 'Car Care'],
      place: 'Detroit',
      state: 'MI',
    },
    {
      id: 'MS012',
      sellerName: 'Garden Supplies',
      categories: ['Outdoor', 'Gardening'],
      products: ['Plants', 'Tools', 'Fertilizers'],
      place: 'Phoenix',
      state: 'AZ',
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Calculate current records to display
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sellerData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (<>
     <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-4 min-w-[900px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">No</th>
            <th colSpan={2} className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">Seller ID & Name</th>
            <th className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">Categories</th>
            <th className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">Products</th>
            <th className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">Place</th>
            <th className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">State</th>
            <th className="px-4 py-3 border border-gray-400  text-left text-xs font-medium text-gray-500 uppercase">View</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRecords?.map((seller, index) => (
            <tr key={seller.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{(currentPage-1)*recordsPerPage + index + 1}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{seller.id}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{seller.sellerName}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{seller.categories.length}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{seller.products.length}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{seller.place}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm text-gray-900">{seller.state}</td>
              <td className="px-4 py-4 border border-gray-400 text-sm">
                <Link 
                  to={`/admin/purchase/preferred-supplier/${seller.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Component */}
     
    </div>
    <Pagination 
        totalRecords={sellerData.length} 
        recordsPerPage={recordsPerPage} 
        onPageChange={handlePageChange}
      />
  </>
 
  );
};

export default PreferredSupplierTable;