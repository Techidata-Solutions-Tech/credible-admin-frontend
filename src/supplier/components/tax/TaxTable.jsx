import React, { useState } from 'react';
import Pagination from '../../../admin/components/Pagination';

const TaxTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const products = [
    {
      no: '01',
      image: '01/02/2022', 
      category: '6347634',
      productName: 'Image',
      companyBrand: 'Fashion',
      model: 'Kurta',
      varient: 'Kurta',
      sku: 'Harini',
      gst: '5%',
      cess: '-',
      hsn: '-',
    },
    {
      no: '02',
      image: '05/03/2022',
      category: '3453764',
      productName: 'Image',
      companyBrand: 'Groceries',
      model: 'Sunflower Oil',
      varient: 'Sunflower Oil',
      sku: 'Mehath',
      gst: '5%',
      cess: '-',
      hsn: '-',
    },
    {
      no: '03',
      image: '20/04/2022',
      category: '3453433',
      productName: 'Image',
      companyBrand: 'Kitchenware',
      model: 'Pressure Cooker',
      varient: 'Pressure Cooker',
      sku: 'Mahesh',
      gst: '10%',
      cess: '-',
      hsn: '-',
    },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto mb-10">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Company/Brand</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Model</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Varient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">GST(%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">CESS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">HSN/SAC</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50 border-b border-gray-300">
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.no}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.image}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.category}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.productName}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.companyBrand}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.model}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.varient}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.sku}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.gst}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.cess}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.hsn}</td>
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

      <Pagination
        totalRecords={products.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default TaxTable;
