import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import GSTTaxTable  from '../../components/tax/GSTTaxTable'
import AddTaxModal from '../../components/tax/AddTaxModal'
import PillTabs from '../../components/PillTabs'
import { RiFilterLine, RiSearchLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const Taxes = () => {
    const handleAdd = async () => {
        document.getElementById('my_modal_1').showModal()
    }

    const tabs_tax = [
        { id: 1, label: 'Taxable' },
        { id: 2, label: 'Non-taxable' },
    ];

    const tabs_gst = [
        { id: 1, label: 'GST 3%' },
        { id: 2, label: 'GST 5%' },
        { id: 3, label: 'GST 15%' },
        { id: 4, label: 'GST 18%' },
        { id: 5, label: 'GST 28%' },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
                    <div className="w-full mb-6">
                        <div className="max-w-full px-2 md:px-4">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-300">
                                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                                    <div className="flex flex-col md:flex-row gap-2 min-w-full justify-center">
                                        <div className="w-full md:w-auto">
                                            <PillTabs tabs={tabs_tax} />
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <PillTabs tabs={tabs_gst} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 container items-center w-full'>
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="dropdown">
                                <button tabIndex={0} className="btn bg-blue-500 hover:bg-blue-600 text-white gap-2 min-w-[120px] border-none">
                                    <RiFilterLine className="text-lg" />
                                    Filter
                                </button>
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
                                <i className="ri-search-line text-gray-800"></i>
                                <input type="text" className="grow" placeholder="Tax" />
                            </label>
                        </div>

                        <div className='flex justify-end'>
                            <AddTaxModal />
                            <button
                                className="bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base whitespace-nowrap"
                                onClick={() => handleAdd()}
                            >
                                + Add Tax
                            </button>
                        </div>
                    </div>
                    </div>

                    <GSTTaxTable />

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

export default Taxes