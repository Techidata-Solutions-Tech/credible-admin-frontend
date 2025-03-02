import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import PillTabs from '../../components/PillTabs'
import BannerTable from '../../components/dashboard/BannerTable'
import Loader from '../../../components/loader'

const Banner = () => {
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState([]);
    const [toggle, setToggle] = useState(Date.now());
    const tabs_user = [
        { id: 1, label: 'All (1000)' },
        { id: 2, label: 'Active (800)' },
        { id: 3, label: 'Inactive (100)' },
        { id: 4, label: 'Blocked (100)' },
        { id: 5, label: 'Tash (10)' },
    ];

    useEffect(()=>{
        const fetchBanners = async () => {
            try {
              const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/get-banner`);
              const result = await response.json();
              if(response.status === 200){
                setLoading(false)
                setBanners(result.data)
              }
             
            } catch (error) {
              console.error("Error fetching categories:", error);
            }
          };
      
          fetchBanners();
    },[toggle])

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex flex-col md:flex-row bg-gray-100'>
                <Sidebar />
                <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>
                    <div className="w-full mb-6">
                        <div className="max-w-full px-2 md:px-4">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-300">
                                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                                    <div className="min-w-full flex justify-center">
                                        <PillTabs tabs={tabs_user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 container items-center w-full mt-10'>
                        <div className='flex gap-2 flex-wrap'>
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

                        <div className="w-full">
                            <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                                <i className="ri-search-line"></i>
                                <input type="text" className="grow" placeholder="Customer" />
                            </label>
                        </div>
                    </div>
                   { loading ? <Loader/> :
                     <BannerTable setToggle={setToggle} banners={banners}/> 
                   }

                    {/* */}
                       
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
    )
}

export default Banner