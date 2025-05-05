import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import MenuTable from '../../components/menu/MenuTable';
import Breadcrumbs from '../../components/Breadcrumbs';

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
    const breadcrumbItems = [
        { label: 'Product Management', href: '#' },
        { label: 'Menu', href: '#' },
        { label: 'Manage Menu', href: '/admin/product/attributes' },
      ];
    return (

                
                <div className=" bg-white p-2">
                <Breadcrumbs
              pageTitle="Manage Menu"
              items={breadcrumbItems}
            />
            <div className="flex justify-end pb-3">
            <Link
                                    to={'/admin/product/menu/add-menu'}
                                    className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
                                >
                                    Add Menu
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
                        { loading ? <Loader/> :<MenuTable categories={categories} setToggle={setToggle} token={token}/>}
                        </div>
                    </div>
    );
};

export default Menu;
