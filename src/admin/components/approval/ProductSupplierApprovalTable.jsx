import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Pagination from '../Pagination';

const ProductSupplierApprovalTable = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const productData = [
    {
      id: 'P001',
      category: 'Electronics',
      productName: 'Smartphone',
      brand: 'Samsung',
      model: 'Galaxy S21',
      variant: '128GB, Black',
      sku: 'SMG-S21-128-BLK',
      uom: 'Piece',
      cop: 500,
      qty: 100,
      hsnSacGst: '8517 12 00 - 18%',
      batchNo: 'BCH202401',
      mfgDate: '2024-01-15',
      expDate: 'N/A',
      unitPrice: 600,
      grossPrice: 650,
      supplierName: 'Tech Distributors',
      supplierId: 'SUP123',
    },
    {
      id: 'P002',
      category: 'Appliances',
      productName: 'Air Conditioner',
      brand: 'LG',
      model: 'DualCool',
      variant: '1.5 Ton, White',
      sku: 'LG-AC-15T-WHT',
      uom: 'Piece',
      cop: 300,
      qty: 50,
      hsnSacGst: '8415 10 10 - 28%',
      batchNo: 'BCH202402',
      mfgDate: '2023-12-10',
      expDate: 'N/A',
      unitPrice: 350,
      grossPrice: 380,
      supplierName: 'Cooling Experts Ltd.',
      supplierId: 'SUP456',
    },
  ];

  const totalRecords = productData.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = productData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleEdit = (id) => {
    setSelectedProductId(id);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (id) => {
    setSelectedProductId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  const handleApproval = (id) => {
    setSelectedProductId(id);
    document.getElementById('my_modal_approval').showModal();
  };

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (<>
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto overflow-y-hidden">
      <table className="w-full table-auto mb-10 min-w-[1200px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand/Company</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UOM</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">COP</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">QTY</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">HSN/SAC GST</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch No</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MFG. Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EXP Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRecords.map((product, i) => (
            <tr key={product?.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{indexOfFirstRecord + i + 1}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.category}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.productName}</td>
              <td className="px-4 py-4 text-sm text-gray-900"><img src={product?.images ? product?.images[0]:""} alt={product?.id} /></td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.brand}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.model}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.variant}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.sku}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.uom}</td>
              <td className="px-4 py-4 text-sm text-gray-900">${product?.cop}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.qty}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.hsnSacGst}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.batchNo}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.mfgDate}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.expDate}</td>
              <td className="px-4 py-4 text-sm text-gray-900">${product?.unitPrice}</td>
              <td className="px-4 py-4 text-sm text-gray-900">${product?.grossPrice}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{product?.supplierName} ({product?.supplierId})</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(product?.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(product?.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleApproval(product?.id)}>Approve/Reject</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       <Pagination
       totalRecords={totalRecords}
       recordsPerPage={recordsPerPage}
       onPageChange={handlePageChange}
     /></>
  );
};

export default ProductSupplierApprovalTable;
