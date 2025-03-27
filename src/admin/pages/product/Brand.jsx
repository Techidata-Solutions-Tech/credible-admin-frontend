import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../components/product/ProductTable'
import { Link } from 'react-router-dom'
import PillTabs from '../../components/PillTabs'
import { BsThreeDots } from 'react-icons/bs'

const Brand = () => {

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const brandData = [
    {
      id: 'B001',
      category: 'Electronics',
      companyName: 'Apple Inc.',
      brandName: 'Apple',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      products: ['iPhone', 'MacBook', 'iPad'],
      country: 'USA',
      status: 1,  // Active
    },
    {
      id: 'B002',
      category: 'Automobiles',
      companyName: 'Tesla Motors',
      brandName: 'Tesla',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      products: ['Model S', 'Model 3', 'Model X'],
      country: 'USA',
      status: 0,  // Inactive
    },
    {
      id: 'B003',
      category: 'Fashion',
      companyName: 'Nike Inc.',
      brandName: 'Nike',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      products: ['Shoes', 'Sportswear', 'Accessories'],
      country: 'USA',
      status: 1,  // Active
    },
  ];

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
    // Implement modal or form navigation here
  };

  const handleDelete = (id) => {
    setSelectedBrandId(id);
    alert(`Deleting Brand ID: ${id}`);
    // Implement delete logic here
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={1} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
            {/* Tabs Section */}


            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row justify-between mb-4 container items-center gap-4 w-full">
              <div className="flex items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                  <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                    <i className="ri-search-line text-gray-800"></i>
                    <input type="text" className="grow" placeholder="Tax" />
                  </label>
                </div>
                
              </div>
              <div className="flex items-center justify-end gap-2 sm:gap-4 flex-wrap ml-auto">
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                      Filter
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow">
                      <li><label><input type="checkbox" /></label></li>
                      <li><label><input type="checkbox" /> Checkbox Label</label></li>
                      <li><label><input type="checkbox" /> Checkbox Label</label></li>
                    </ul>
                  </div>
                  <select className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                    <option disabled selected>Sort</option>
                    <option>Homer</option>
                    <option>Marge</option>
                    <option>Bart</option>
                    <option>Lisa</option>
                    <option>Maggie</option>
                  </select>
                </div>


            </div>

            {/* Product Table */}
            <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full table-auto mb-10 min-w-[900px]">
                <thead className="bg-gray-50">
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
                  {brandData.map((brand) => (
                    <tr key={brand.id} className="hover:bg-gray-50 border-b border-gray-300">
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.category}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.companyName}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.brandName}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        <img src={brand.brandLogo} alt={brand.brandName} className="w-12 h-12 object-contain" />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.products.join(', ')}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{brand.country}</td>
                      <td className={`px-4 py-4 text-sm font-semibold ${statusColors[brand.status]}`}>
                        {statusLabels[brand.status]}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                            <BsThreeDots className='mt-2 text-blue-500' size={28} />
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
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="join shadow-lg">
                <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200">«</button>
                <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200 px-6">Page 22</button>
                <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200">»</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brand