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
        <div className="flex h-screen overflow-auto">
            

            <div className="flex-1 flex flex-col overflow-auto">
                
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
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
                <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
                    <div className="flex flex-col sm:flex-row justify-between mb-4 container items-center gap-4 w-full bg-blue-50 p-4 rounded-lg">
                       
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
                        
                        <div className="flex-1 max-w-md">
                            <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                    type="text" 
                                    className="grow text-blue-900 placeholder-blue-400" 
                                    placeholder="Search category..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                            <select className="select bg-white border-blue-200 hover:border-blue-300 text-blue-700 w-full sm:w-auto font-semibold">
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
                </div>
            </div>
        </div>
    );
};

export default Category;