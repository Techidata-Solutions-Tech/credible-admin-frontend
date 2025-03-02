import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../components/product/ProductTable'
import { Link } from 'react-router-dom'
import PillTabs from '../../components/PillTabs'
import { BsThreeDots } from 'react-icons/bs'

const Attributes = () => {
  const tabs_status = [
    { id: 1, label: 'All (200)' },
    { id: 2, label: 'Active (100)' },
    { id: 3, label: 'Inactive (20)' },
    { id: 4, label: 'Instock (05)' },
    { id: 5, label: 'Out of stock (10)' },
  ];
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);

  const attributesData = [
    {
      id: 'A001',
      name: 'Color',
      values: ['Red', 'Blue', 'Green', 'Black'],
      type: 'Dropdown',
    },
    {
      id: 'A002',
      name: 'Size',
      values: ['Small', 'Medium', 'Large', 'Extra Large'],
      type: 'Dropdown',
    },
    {
      id: 'A003',
      name: 'Material',
      values: ['Cotton', 'Polyester', 'Leather'],
      type: 'Text',
    },
  ];

  const handleEdit = (id) => {
    setSelectedAttributeId(id);
    alert(`Editing Attribute ID: ${id}`);
    // Implement modal or form navigation here
  };

  const handleDelete = (id) => {
    setSelectedAttributeId(id);
    alert(`Deleting Attribute ID: ${id}`);
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
            <div className="w-full mb-6">
              <div className="max-w-full px-4">
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-full overflow-x-auto py-2">
                    <div className="flex justify-center min-w-full">
                      <PillTabs tabs={tabs_status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row justify-between mb-4 container items-center gap-4 w-full">
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
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
              
              <div className="w-full sm:w-auto">
                <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                  <i className="ri-search-line text-gray-800"></i>
                  <input type="text" className="grow" placeholder="Tax" />
                </label>
              </div>
              
             
            </div>

            {/* Product Table */}
            <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full table-auto mb-10 min-w-[800px]">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attribute Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attribute Values</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attribute Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {attributesData.map((attribute) => (
                        <tr key={attribute.id} className="hover:bg-gray-50 border-b border-gray-300">
                        <td className="px-4 py-4 text-sm text-gray-900">{attribute.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{attribute.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{attribute.values.join(', ')}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{attribute.type}</td>
                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                            <div className="dropdown dropdown-bottom dropdown-end">
                            <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                                <BsThreeDots className='mt-2 text-blue-500' size={28} />
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                                <li><a href="#" onClick={() => handleEdit(attribute.id)}>Edit</a></li>
                                <li><a href="#" onClick={() => handleDelete(attribute.id)}>Delete</a></li>
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

export default Attributes