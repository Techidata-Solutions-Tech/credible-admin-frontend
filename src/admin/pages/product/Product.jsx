import React, { useEffect, useState } from 'react'
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
          `${import.meta.env.VITE_BASE_URL}/api/admin/product?page=${currentPage}&limit=${recordsPerPage}&added_by=${localStorage.getItem("userRole")}&added_by_id=${parseInt(localStorage.getItem("userId"))}`,
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
    <div className="min-h-screen">        
        <div className="bg-gray-100 p-4">
          <Breadcrumbs
            pageTitle="ManageProducts"
            items={breadcrumbItems}
          />
          <div className="flex flex-col sm:flex-row justify-end px-2 items-center gap-4 w-full">
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
                    <div className="flex flex-col justify-center items-center min-w-full">
                      <PillTabs tabs={tabs_status1} />
                      <PillTabs tabs={tabs_status2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                            <div className='w-full md:w-auto'>
                                <div className="dropdown z-[100000]">
                                    <div tabIndex={0} role="button" className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">Filter</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white">
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
                            <div className='w-full md:w-auto'>
                                <select className="select min-w-[150px] text-center  w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
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
            <div className="w-full overflow-x-auto my-3 sticky z-10">
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
  )
}

export default Product