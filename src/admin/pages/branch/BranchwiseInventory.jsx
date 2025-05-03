import PillTabs from '../../components/PillTabs';
import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

const BranchWiseInventory = () => {
  // State for filters and data
  const [states, setStates] = useState([]);
  const [places, setPlaces] = useState([]);
  const [locations, setLocations] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  
  // Selected filter states
  const [selectedState, setSelectedState] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedChildCategory, setSelectedChildCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    setInventoryData([
      {
        id: '01',
        category: 'Clothing',
        productName: 'Benarasi Sari',
        companyBrand: 'CES - 123',
        model: '550',
        variant: '550',
        sku: '-',
        rackNo: '-',
        currentStock: '150',
        readyToShip: '30',
        returnedStock: '5',
        soldQty: '20',
        stocksOnHand: '105',
        unitPrice: '105',
        warehouseLocation: 'Bangalore',
        warehouseId: 'ABC',
        productUpdated: '28/02/2021'
      }
    ]);
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleChildCategoryChange = (e) => {
    setSelectedChildCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = () => {
    console.log("Filtering with:", {
      state: selectedState,
      place: selectedPlace,
      location: selectedLocation,
      mainCategory: selectedMainCategory,
      subCategory: selectedSubCategory,
      childCategory: selectedChildCategory,
      search: searchQuery
    });
  };

  const handleSort = () => {
    console.log("Sorting inventory data");
  };
  const tabs_user = [
    { id: 1, label: 'States (1000)' },
    { id: 2, label: 'Place (800)' },
    { id: 3, label: 'Location (100)' },
];
  const breadcrumbItems = [
    { label: 'Warehouse Management', href: '#' },
    { label: 'Branch', href: '#' },
    { label: 'Stockistwise Inventory', href: '/admin/warehouse/table' },
  ];
  return (
    <div className=" bg-white p-2">
          <Breadcrumbs
            pageTitle="Stockistwise Inventory"
            items={breadcrumbItems}
          />
      <div className="mb-6">
        
        <div className="w-full mb-6">
                        <div className="max-w-full  ">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-400  rounded-lg shadow-lg ">
                                <div className="w-full overflow-x-auto scrollbar-hide py-2">
                                    <div className="min-w-full flex justify-center">
                                        <PillTabs tabs={tabs_user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="border border-gray-300 flex">
            <select 
              className="w-full p-2"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">State</option>
            </select>
          </div>
          
          <div className="border border-gray-300 flex">
            <select 
              className="w-full p-2"
              value={selectedPlace}
              onChange={handlePlaceChange}
            >
              <option value="">Place</option>
              {/* Places would be populated from API */}
            </select>
          </div>
          
          <div className="border border-gray-300 flex">
            <select 
              className="w-full p-2"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">Location</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="border border-gray-300 flex">
            <select 
              className="w-full p-2"
              value={selectedMainCategory}
              onChange={handleMainCategoryChange}
            >
              <option value="">Main Category</option>
            </select>
          </div>
          
          <div className="border border-gray-300 flex">
            <select 
              className="w-full p-2"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Sub Category</option>
            </select>
          </div>
          
          <div className="border border-gray-300 flex">
            <select 
              className="w-full p-2"
              value={selectedChildCategory}
              onChange={handleChildCategoryChange}
            >
              <option value="">Child Category</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                           <div className='w-full md:w-auto'>
  <div className="dropdown">
    <div
      tabIndex={0}
      role="button"
      className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base flex items-center justify-center gap-2"
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
                            <div className="flex-1 max-w-md">
                                <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                              <input type="text" className="grow text-blue-900 placeholder:text-center placeholder-blue-400" placeholder="Search" />
                               
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
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="py-2 px-3 border">
                <input type="checkbox" />
              </th>
              <th className="py-2 px-3 border">No</th>
              <th className="py-2 px-3 border">Category</th>
              <th className="py-2 px-3 border">Product Name</th>
              <th className="py-2 px-3 border">Company/Brand</th>
              <th className="py-2 px-3 border">Model</th>
              <th className="py-2 px-3 border">Variant</th>
              <th className="py-2 px-3 border">SKU</th>
              <th className="py-2 px-3 border">Rack No</th>
              <th className="py-2 px-3 border">Current Stock</th>
              <th className="py-2 px-3 border">Ready to Ship</th>
              <th className="py-2 px-3 border">Returned Stock</th>
              <th className="py-2 px-3 border">Sold Qty</th>
              <th className="py-2 px-3 border">Stocks On Hand</th>
              <th className="py-2 px-3 border">Unit Price</th>
              <th className="py-2 px-3 border">Warehouse Location</th>
              <th className="py-2 px-3 border">Warehouse Id/Name</th>
              <th className="py-2 px-3 border">Product Updated</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-3 border text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-3 border">{item.id}</td>
                <td className="py-2 px-3 border">{item.category}</td>
                <td className="py-2 px-3 border">{item.productName}</td>
                <td className="py-2 px-3 border">{item.companyBrand}</td>
                <td className="py-2 px-3 border">{item.model}</td>
                <td className="py-2 px-3 border">{item.variant}</td>
                <td className="py-2 px-3 border">{item.sku}</td>
                <td className="py-2 px-3 border">{item.rackNo}</td>
                <td className="py-2 px-3 border">{item.currentStock}</td>
                <td className="py-2 px-3 border">{item.readyToShip}</td>
                <td className="py-2 px-3 border">{item.returnedStock}</td>
                <td className="py-2 px-3 border">{item.soldQty}</td>
                <td className="py-2 px-3 border">{item.stocksOnHand}</td>
                <td className="py-2 px-3 border">{item.unitPrice}</td>
                <td className="py-2 px-3 border">{item.warehouseLocation}</td>
                <td className="py-2 px-3 border">{item.warehouseId}</td>
                <td className="py-2 px-3 border">{item.productUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchWiseInventory;
