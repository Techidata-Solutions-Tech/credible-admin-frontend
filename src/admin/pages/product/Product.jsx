import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../components/product/ProductTable'
import { Link } from 'react-router-dom'
import PillTabs from '../../components/PillTabs'
import Loader from '../../../components/loader'

const Product = () => {
  const token = localStorage.getItem('token')
   const [loading, setLoading] = useState(true);
  const tabs_status = [
    { id: 1, label: 'All (200)' },
    { id: 2, label: 'Active (100)' },
    { id: 3, label: 'Inactive (20)' },
    { id: 4, label: 'Instock (05)' },
    { id: 5, label: 'Out of stock (10)' },
  ];
  const [toggle, setToggle] = useState(Date.now());
  const [products, setProducts] = useState([]);
 useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/product?page=1&limit=5`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const result = await response.json();
            if(response.status === 200){
              setLoading(false)
              setProducts(result.data);
            }       
            
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, [toggle]);
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
              
              <Link
                to="/admin/product/add-product"
                className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
              >
                + Add Product
              </Link>
            </div>

            {/* Product Table */}
            <div className="w-full overflow-x-auto">
              {
                loading ? <Loader/> : <ProductTable products={products} setToggle={setToggle}/>
              }
              
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

export default Product