// OrderMain.js
import React, { useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../admin/components/Breadcrumbs';

const OrderMain = () => {
  const [filters, setFilters] = useState({
    search: '',
    sort: '',
  });

  const [tableData, setTableData] = useState([
    { id: '20-03-01', poId: '1000001', warehouse: 'Storage', noOfItems: 10, totalAmount: 1000000 },
    { id: '20-03-21', poId: '1000002', warehouse: 'Cartons', noOfItems: 15, totalAmount: 25000 },
    { id: '21-04-01', poId: '1000003', warehouse: 'Sheets', noOfItems: 20, totalAmount: 400 },
  ]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const breadcrumbItems = [
    { label: 'Warehouse Management', href: '#' },
    { label: 'Branch', href: '#' },
    { label: 'Purchased Order', href: '/admin/warehouse/table' },
  ];

  return (
    <div className="container mx-auto p-4">
      
     
          <Breadcrumbs
            pageTitle="Purchased Order"
            items={breadcrumbItems}
          />
          
          <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
            <div className='w-full md:w-auto'>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">Filter</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-transparent">
                  <li><label><input type="checkbox" /></label></li>
                  <li><label><input type="checkbox" /> Checkbox Label</label></li>
                  <li><label><input type="checkbox" /> Checkbox Label</label></li>
                </ul>
              </div>
            </div>
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" className="grow text-blue-900 placeholder:text-center placeholder-blue-400" placeholder=" Search " />
              </label>
            </div>
            <button
              className="bg-gray-200 text-black px-4 py-2 flex items-center rounded"
              onClick={()=>console.log("hello")}
            >
              Sort{" "}
              {1 === "ascending" ? (
                <FaSortUp className="ml-1" />
              ) : (
                <FaSortDown className="ml-1" />
              )}
            </button>
          </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">PO ID</th>
            <th className="border p-2">Warehouse</th>
            <th className="border p-2">No of Items</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td className="border p-2">{row.id}</td>
              <td className="border p-2">{row.poId}</td>
              <td className="border p-2">{row.warehouse}</td>
              <td className="border p-2">{row.noOfItems}</td>
              <td className="border p-2">{row.totalAmount}</td>
              <td className="border p-2">
                <Link to={`/supplier/order/${row.id}`} className="bg-blue-500 text-white px-2 py-1 rounded">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderMain;
