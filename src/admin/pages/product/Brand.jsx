import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import PillTabs from '../../components/PillTabs';
import { BsThreeDots } from 'react-icons/bs';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination';

const Brand = () => {
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const brandData = [
    {
      id: 'B001',
      category: 'Electronics',
      companyName: 'Apple Inc.',
      brandName: 'Apple',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      products: ['iPhone', 'MacBook', 'iPad'],
      country: 'USA',
      status: 1,
    },
    {
      id: 'B002',
      category: 'Automobiles',
      companyName: 'Tesla Motors',
      brandName: 'Tesla',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      products: ['Model S', 'Model 3', 'Model X'],
      country: 'USA',
      status: 0,
    },
    {
      id: 'B003',
      category: 'Fashion',
      companyName: 'Nike Inc.',
      brandName: 'Nike',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      products: ['Shoes', 'Sportswear', 'Accessories'],
      country: 'USA',
      status: 1,
    },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = brandData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  const statusLabels = {
    1: 'Active',
    0: 'Inactive',
  };

  const statusColors = {
    1: 'text-green-500',
    0: 'text-red-500',
  };

  const handleEdit = (id) => {
    setSelectedBrandId(id);
    alert(`Editing Brand ID: ${id}`);
  };

  const handleDelete = (id) => {
    setSelectedBrandId(id);
    alert(`Deleting Brand ID: ${id}`);
  };

  const breadcrumbItems = [
    { label: 'Product Management', href: '#' },
    { label: 'Brands', href: '#' },
    { label: 'Manage Brands', href: '/admin/product/attributes' },
  ];

  return (
    <div className="rounded shadow-lg p-4 m-2 bg-white">
      <Breadcrumbs pageTitle="Manage Brands" items={breadcrumbItems} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
            <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 flex-wrap ml-auto">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base"
                >
                  Filter
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow">
                  <li><label><input type="checkbox" /></label></li>
                  <li><label><input type="checkbox" /> Checkbox Label</label></li>
                  <li><label><input type="checkbox" /> Checkbox Label</label></li>
                </ul>
              </div>
              <div className="w-full sm:w-auto">
                <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                  <i className="ri-search-line text-gray-800"></i>
                  <input type="text" className="grow placeholder:text-center" placeholder="Brand" />
                </label>
              </div>
              <select className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                <option disabled selected>Sort</option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
            </div>

            {/* Brand Table */}
            <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full table-auto mb-10 min-w-[900px]">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand Logo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords?.map((brand) => (
                    <tr key={brand.id} className="hover:bg-gray-50 border-b border-gray-300">
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.category}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.companyName}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.brandName}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        <img src={brand.brandLogo} alt={brand.brandName} className="w-12 h-12 object-contain" />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.products.join(' | ')}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.country}</td>
                      <td className={`px-4 py-4 text-sm font-semibold ${statusColors[brand.status]}`}>
                        {statusLabels[brand.status]}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                            <BsThreeDots className="mt-2 text-blue-500" size={28} />
                          </button>
                          <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                            <li><a href="#" onClick={() => handleEdit(brand.id)}>Edit</a></li>
                            <li><a href="#" onClick={() => handleDelete(brand.id)}>Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4">
                <Pagination
                  totalRecords={brandData.length}
                  recordsPerPage={recordsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
    </div>
  );
};

export default Brand;
