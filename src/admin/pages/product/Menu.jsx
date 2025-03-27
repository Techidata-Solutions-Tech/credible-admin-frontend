import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import Loader from '../../../components/loader';
import MenuTable from '../../components/menu/MenuTable';

const Menu = () => {
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(Date.now());
    const [categories, setCategories] = useState([]);
     useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/all-category-hierarchy`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            
            );
            const data = await response.json();
            if(response.status === 200){
                setLoading(false)
                const flatCategories = [];
                const traverse = (nodes, depth = 0) => {
                nodes.forEach(node => {
                    flatCategories.push({ id: node.id, name: node.name, depth,status:node.status ,seo_url: node.seo_url,featureimage:node.featureimage,categoryType:node.categoryType});
                    if (node.children.length) {
                    traverse(node.children, depth + 1);
                    }
                });
                };
                traverse(data)
                setCategories(flatCategories.filter(cat=>cat.categoryType !=="MAIN"));
            }
            
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, [toggle]);
    const handleAdd = async () => {
        document.getElementById('my_modal_1').showModal();
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
                        <div className="flex flex-col sm:flex-row justify-between mb-4 container items-center gap-4 w-full bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between w-full sm:w-auto">
                                <Link
                                    to={'/admin/product/menu/add-menu'}
                                    className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
                                >
                                    Add Menu
                                </Link>
                            </div>

                            {/* Search Input */}
                            <div className="flex-1 max-w-md">
                                <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input type="text" className="grow text-blue-900 placeholder-blue-400" placeholder="Search Menu..." />
                                </label>
                            </div>

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
                        { loading ? <Loader/> :<MenuTable categories={categories} setToggle={setToggle} />}
                        </div>
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
    );
};

export default Menu;
