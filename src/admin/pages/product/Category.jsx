import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import CategoryTable from '../../components/category/CategoryTable';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination'; 

const Category = () => {
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(Date.now());
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/all-category-hierarchy`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  }
            });
            const data = await response.json();
            if(response.status === 200){
                setLoading(false)
                const flatCategories = [];
                const traverse = (nodes, depth = 0) => {
                nodes.forEach(node => {
                    flatCategories.push({ 
                      id: node.id, 
                      name: node.name, 
                      depth,
                      status: node.status,
                      seo_url: node.seo_url,
                      featureimage: node.featureimage,
                      categoryType: node.categoryType
                    });
                    if (node.children.length) {
                    traverse(node.children, depth + 1);
                    }
                });
                };
                traverse(data)
                const mainCategories = flatCategories.filter(cat => cat.categoryType === "MAIN");
                setCategories(mainCategories);
                setFilteredCategories(mainCategories); 
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, [toggle]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCategories(categories);
        } else {
            const filtered = categories.filter(category => 
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
        setCurrentPage(1); 
    }, [searchTerm, categories]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredCategories.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalRecords = filteredCategories.length;

    const handlePageChange = (page, perPage) => {
        setCurrentPage(page);
        setRecordsPerPage(perPage);
    };

    const handleAdd = async () => {
        document.getElementById('my_modal_1').showModal();
    };

    const breadcrumbItems = [
        { label: 'Product Management', href: '#' },
        { label: 'Categories', href: '#' },
       { label: 'Product Category', href: '/admin/product/category' }
    ];

    return (
        <div className=" bg-white p-2">                
                <Breadcrumbs
                    pageTitle="Categories"
                    items={breadcrumbItems}
                />
                <div className="flex items-center justify-end w-full sm:w-auto pb-3">
                    <Link
                        to={'/admin/product/category/add-category'}
                        className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
                    >
                        Add Category
                    </Link>
                </div>
     <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 mt-2 rounded-lg'>
                           <div className='w-full md:w-auto'>
  <div className="dropdown">
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
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white"
    >
      <li><label><input type="checkbox" /></label></li>
      <li><label><input type="checkbox" /> Checkbox Label</label></li>
      <li><label><input type="checkbox" /> Checkbox Label</label></li>
    </ul>
  </div>
</div>

                            {/* Search Input */}
                            <div className="flex-1 max-w-lg ">
                                <label className="input bg-white border-blue-400 focus-within:border-blue-400 flex items-center gap-2 w-full">
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

                    <div className="overflow-x-auto">
                        {loading ? <Loader/> : <CategoryTable categories={currentRecords} setToggle={setToggle} />}
                    </div>

                    {!loading && (
                        <Pagination
                            totalRecords={totalRecords}
                            recordsPerPage={recordsPerPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
    );
};

export default Category;