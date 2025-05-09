import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Pagination from '../Pagination';

const MerchantSellerApprovalTable = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const supplierData = [
    {
      id: 'S001',
      supplierId: 'SUP123',
      entityType: 'Manufacturer',
      companyName: 'ABC Industries',
      contactPerson: 'John Doe',
      phone: '1234567890',
      email: 'contact@abcindustries.com',
      location: 'New York, NY',
      status: 1,  // Active
    },
    {
      id: 'S002',
      supplierId: 'SUP456',
      entityType: 'Distributor',
      companyName: 'XYZ Supplies',
      contactPerson: 'Jane Smith',
      phone: '9876543210',
      email: 'info@xyzsupplies.com',
      location: 'Los Angeles, CA',
      status: 0,  // Inactive
    },
    {
      id: 'S003',
      supplierId: 'SUP789',
      entityType: 'Retailer',
      companyName: 'PQR Traders',
      contactPerson: 'Alice Johnson',
      phone: '5556667777',
      email: 'support@pqrtraders.com',
      location: 'Chicago, IL',
      status: 3,  // Blocked
    },
    {
      id: 'S004',
      supplierId: 'SUP101',
      entityType: 'Wholesaler',
      companyName: 'Global Goods',
      contactPerson: 'Robert Brown',
      phone: '1112223333',
      email: 'sales@globalgoods.com',
      location: 'Houston, TX',
      status: 1,  // Active
    },
    {
      id: 'S005',
      supplierId: 'SUP202',
      entityType: 'Manufacturer',
      companyName: 'Tech Solutions',
      contactPerson: 'Michael Green',
      phone: '4445556666',
      email: 'info@techsolutions.com',
      location: 'San Francisco, CA',
      status: 2,  // Suspended
    },
    {
      id: 'S006',
      supplierId: 'SUP303',
      entityType: 'Distributor',
      companyName: 'Quality Products',
      contactPerson: 'Sarah Wilson',
      phone: '7778889999',
      email: 'contact@qualityproducts.com',
      location: 'Miami, FL',
      status: 1,  // Active
    },
    {
      id: 'S007',
      supplierId: 'SUP404',
      entityType: 'Retailer',
      companyName: 'Best Deals',
      contactPerson: 'David Taylor',
      phone: '2223334444',
      email: 'support@bestdeals.com',
      location: 'Seattle, WA',
      status: 1,  // Active
    },
    {
      id: 'S008',
      supplierId: 'SUP505',
      entityType: 'Manufacturer',
      companyName: 'Premium Brands',
      contactPerson: 'Emily Clark',
      phone: '6667778888',
      email: 'info@premiumbrands.com',
      location: 'Boston, MA',
      status: 0,  // Inactive
    },
    {
      id: 'S009',
      supplierId: 'SUP606',
      entityType: 'Wholesaler',
      companyName: 'Bulk Suppliers',
      contactPerson: 'James White',
      phone: '9990001111',
      email: 'sales@bulksuppliers.com',
      location: 'Denver, CO',
      status: 1,  // Active
    },
    {
      id: 'S010',
      supplierId: 'SUP707',
      entityType: 'Distributor',
      companyName: 'Fast Delivery',
      contactPerson: 'Lisa Harris',
      phone: '3334445555',
      email: 'contact@fastdelivery.com',
      location: 'Atlanta, GA',
      status: 1,  // Active
    },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = supplierData.slice(indexOfFirstRecord, indexOfLastRecord);

  const statusLabels = {
    1: 'Active',
    0: 'Inactive',
    2: 'Suspended',
    3: 'Blocked',
  };

  const statusColors = {
    1: 'text-green-500',
    0: 'text-red-500',
    2: 'text-yellow-500',
    3: 'text-gray-500',
  };

  const handleEdit = (id) => {
    setSelectedSupplierId(id);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (id) => {
    setSelectedSupplierId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  const handleStatusChange = (id) => {
    setSelectedSupplierId(id);
    document.getElementById('my_modal_status').showModal();
  };

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (<>
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto overflow-y-hidden">
      <table className="w-full table-auto mb-4 min-w-[900px]">
        <thead className="bg-gray-200 font-bold">
          <tr>
            <th className=" py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">No</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Supplier ID</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Entity Type</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Company Name</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Contact Person</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-4 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left border border-gray-400 text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRecords?.map((supplier, i) => (
            <tr key={supplier.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className=" py-4 text-sm border border-gray-400 text-gray-900">{(currentPage - 1) * recordsPerPage + i + 1}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.id}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.supplierId}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.entityType}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.companyName}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.contactPerson}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.phone}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.email}</td>
              <td className="px-4 py-4 text-sm border border-gray-400 text-gray-900">{supplier.location}</td>
              <td className={`px-4 py-4 text-sm border border-gray-400 font-semibold ${statusColors[supplier.status]}`}>
                {statusLabels[supplier.status]}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(supplier.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(supplier.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleStatusChange(supplier.id)}>Change Status</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
     <Pagination 
     totalRecords={supplierData.length} 
     recordsPerPage={recordsPerPage} 
     onPageChange={handlePageChange}
   /></>
  );
};

export default MerchantSellerApprovalTable;