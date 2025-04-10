import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../components/product/ProductTable'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Breadcrumbs from '../../components/Breadcrumbs'
import Pagination from '../../components/Pagination'
import PillTabs from '../../components/PillTabs'

const Product = () => {
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  

  const [toggle, setToggle] = useState(Date.now());
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/product?page=${currentPage}&limit=${recordsPerPage}`,
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
          setTotalRecords(result.total || result.data.length); 
        }       
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [toggle, currentPage, recordsPerPage]);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  const breadcrumbItems = [
    { label: 'Product Management', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Manage Product', href: '/admin/approval/product/supplier' }
  ];

  const tabs_status1 = [
    { id: 1, label: `Categories (${[...new Set(products.map(product => product.category.id))].length})` },
    { id: 2, label: `Products (${products.length})` },
  ];
  const tabs_status2 = [
    { id: 1, label: `Active (${products.filter(p=>p.status === true).length})` },
    { id: 2, label: `In - Active (${products.filter(p=>p.status !== true).length})` },
    { id: 3, label: `In - Stock (${products.filter(p=>p.status === true).length})` },
    { id: 4, label: `No - Stock (${products.filter(p=>p.status === true).length})` },
  ];
  console.log(products);
  
  return (
    <div className="flex h-screen overflow-hidden">
      
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        
        
       
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Breadcrumbs
            pageTitle="ManageProducts"
            items={breadcrumbItems}
          />
          <div className="flex flex-col sm:flex-row justify-end mb-4 container items-center gap-4 w-full">
            <button type='button'
              className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
            >
              + Add Product
            </button>
            <Link
              to="/admin/product/add-product"
              className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
            >
              Bulk Upload
            </Link> 
          </div>
          <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
            {/* Tabs Section */}
            <div className="w-full mb-6">
              <div className="max-w-full px-4">
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-full overflow-x-auto py-2">
                    <div className="flex flex-col justify-center min-w-full">
                      <PillTabs tabs={tabs_status1} />
                      <PillTabs tabs={tabs_status2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className='flex gap-2 flex-wrap justify-between w-[100%]'>
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
              <div className="">
                <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                  <i className="ri-search-line"></i>
                  <input type="text" className="grow" placeholder="Product" />
                </label>
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

            {/* Product Table */}
            <div className="w-full overflow-x-auto my-3 sticky top-[50px] z-10">
              {loading ? <Loader/> : <ProductTable products={products} setToggle={setToggle}/>}
            </div>

            
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6">
              <Pagination 
                totalRecords={totalRecords} 
                recordsPerPage={recordsPerPage} 
                onPageChange={handlePageChange}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Product