import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TaxTable from "../../components/tax/TaxTable";
import Breadcrumbs from "../../components/Breadcrumbs";
const Taxes = () => {
 const token = localStorage.getItem("token");
  const breadcrumbItems = [
    { label: 'Tax Management', href: '#' },
  { label: 'Tax', href: '#' },
    { label: 'Manage Taxes', href: '/admin/taxes/hsn-sac' },
    // { label: 'Create Product Category', href: '/create-product-category' }
  ];
  return (
    <div className="flex h-screen overflow-auto">
      
      <div className="flex-1 flex flex-col overflow-auto">
        

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <Breadcrumbs
              pageTitle="Manage Tax"
              items={breadcrumbItems}
            />
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
          <TaxTable token={token}/>
        </div>
      </div>
    </div>
  );
};

export default Taxes;
