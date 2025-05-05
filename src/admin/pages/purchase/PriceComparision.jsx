import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import Breadcrumbs from '../../components/Breadcrumbs';

const data = [
  {
    id: 1,
    supplierId: '1001',
    supplierName: 'Amar',
    brand: 'abc',
    variant: '1/2 LTR',
    sku: 'AM-CG-100GM',
    uom: 'LTR',
    qty: '1',
    unitPrice: 500,
    grossPrice: 550,
  },
  {
    id: 2,
    supplierId: '1002',
    supplierName: 'Bhima',
    brand: 'def',
    variant: '1/2',
    sku: 'PT-CG-100GM',
    uom: 'LTR',
    qty: '1/2',
    unitPrice: 600,
    grossPrice: 600,
  },
  {
    id: 3,
    supplierId: '1003',
    supplierName: 'Chetna',
    brand: 'ghi',
    variant: '',
    sku: 'RA-CG-100GM',
    uom: 'LTR',
    qty: '1/2',
    unitPrice: 700,
    grossPrice: 700,
  },
  {
    id: 4,
    supplierId: '1004',
    supplierName: 'Dinesh',
    brand: 'jkl',
    variant: '',
    sku: 'PA-CG-100GM',
    uom: 'LTR',
    qty: '1/2',
    unitPrice: 800,
    grossPrice: 800,
  },
];

const PriceComparisionTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); 
  };

  const handleSort = (field) => {
    setSortField(field);
    setCurrentPage(1); 
  };

  const filteredData = data
    .filter((item) =>
      item.supplierName.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) =>
      sortField ? a[sortField].toString().localeCompare(b[sortField].toString()) : 0
    );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };
  const breadcrumbItems = [
    { label: 'Purchase Management', href: '#' },
    { label: 'Price', href: '#' },
    { label: 'Price Comparison', href: '/admin/approval/product/supplier' }
];

return (
    <div className='p-4'>
        <Breadcrumbs
            pageTitle="Price Comparison"
            items={breadcrumbItems}
        /> 
       <div
      tabIndex={0}
      role="button"
      className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-3 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base flex items-center justify-center gap-2"
    >
      Filter
      {/* Dropdown icon */}
      <svg
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
      </svg>
    </div>

      <table className="w-full table-fixed border border-collapse text-sm">
        <thead>
          <tr className="bg-gray-600 text-white" >
            <th className="p-2 border">No</th>
            <th className="p-2 border" colSpan={2}>Supplier ID & Name</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Model</th>
            <th className="p-2 border">Varient</th>
            <th className="p-2 border">SKU</th>
            <th className="p-2 border">UOM</th>
            <th className="p-2 border">QTY</th>
            <th className="p-2 border">Unit Price</th>
            <th className="p-2 border">Gross Price</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-600 p-2">{String(indexOfFirstRecord + index + 1).padStart(2, '0')}</td>
              <td className="border border-gray-600 p-2">{item.supplierId}</td>
              <td className="border border-gray-600 p-2 text-blue-600 underline cursor-pointer">
                {item.supplierName}
              </td>
              <td className="border border-gray-600 p-2 bg-lime-100">Cow Ghee</td>
              <td className="border border-gray-600 p-2">{item.brand}</td>
              <td className="border border-gray-600 p-2"></td>
              <td className="border border-gray-600 p-2">{item.variant}</td>
              <td className="border border-gray-600 p-2">{item.sku}</td>
              <td className="border border-gray-600 p-2">{item.uom}</td>
              <td className="border border-gray-600 p-2">{item.qty}</td>
              <td className="border border-gray-600 p-2 bg-lime-100">{item.unitPrice}</td>
              <td className="border border-gray-600 p-2 bg-lime-100">{item.grossPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <Pagination
          totalRecords={filteredData.length}
          recordsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="bg-lime-400 px-4 py-2 rounded text-white hover:bg-lime-500">Save</button>
        <button className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">Next</button>
      </div>
    </div>
  );
};

export default PriceComparisionTable;
