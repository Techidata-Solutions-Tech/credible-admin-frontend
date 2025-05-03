import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function SalesOrders() {
  const [activeTab, setActiveTab] = useState('Confirmed');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    date: '',
    orderId: '',
    customerName: '',
  });

  const orders = [
    { 
      id: 1, 
      no: "01", 
      date: "01/02/2022", 
      orderId: "6347634", 
      customerName: "Harini", 
      items: "02", 
      qty: "04", 
      orderValue: "10000-00",
      status: "Confirmed",
      products: [
        { no: "01", category: "Fashion", image: "👔", productName: "Mens-Shirt", companyBrand: "Raymond", model: "Solid", variant: "XXL", sku: "KU1209", uom: "PC", qty: "02", amount: "1000" }
      ]
    },
    { 
      id: 2, 
      no: "02", 
      date: "01/02/2022", 
      orderId: "6347634", 
      customerName: "Harini", 
      items: "04", 
      qty: "08", 
      orderValue: "20000-00",
      status: "Confirmed",
      products: [
        { no: "01", category: "Fashion", image: "👔", productName: "Mens-Shirt", companyBrand: "Raymond", model: "Solid", variant: "XXL", sku: "KU1209", uom: "PC", qty: "02", amount: "1000" },
        { no: "02", category: "Fashion", image: "👖", productName: "Mens-Trousure", companyBrand: "Raymond", model: "Solid", variant: "XL", sku: "KU1210", uom: "PC", qty: "02", amount: "1000" }
      ]
    },
    { 
      id: 3, 
      no: "03", 
      date: "01/02/2022", 
      orderId: "6347634", 
      customerName: "Harini", 
      items: "06", 
      qty: "12", 
      orderValue: "30000-00",
      status: "Confirmed",
      products: [
        { no: "01", category: "Fashion", image: "👔", productName: "Mens-Shirt", companyBrand: "Raymond", model: "Solid", variant: "XXL", sku: "KU1209", uom: "PC", qty: "02", amount: "1000" },
        { no: "02", category: "Fashion", image: "👖", productName: "Mens-Trousure", companyBrand: "Raymond", model: "Solid", variant: "XL", sku: "KU1210", uom: "PC", qty: "02", amount: "1000" },
        { no: "03", category: "Fashion", image: "🧥", productName: "Mens-Jacket", companyBrand: "Raymond", model: "Solid", variant: "L", sku: "KU1211", uom: "PC", qty: "02", amount: "1000" }
      ]
    }
  ];

  const statusTabs = [
    { name: 'Confirmed', count: 100, color: 'bg-teal-600' },
    { name: 'Cancelled', count: 20, color: 'bg-green-500' },
    { name: 'Replaced', count: 5, color: 'bg-green-500' },
    { name: 'Returned', count: 10, color: 'bg-green-500' },
    { name: 'Un - Delivered', count: 5, color: 'bg-green-600' },
    { name: 'Delivered', count: 50, color: 'bg-green-500' },
    { name: 'Open Orders', count: 10, color: 'bg-teal-600' }
  ];

  const processTabs = [
    { name: 'Under Process', count: 4, color: 'bg-teal-600' },
    { name: 'Ready to Ship', count: 3, color: 'bg-teal-600' },
    { name: 'Pickup & Shipped', count: 3, color: 'bg-teal-600' }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    if (searchTerm && !Object.values(order).some(value => 
      value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    
    if (filterOptions.date && order.date !== filterOptions.date) {
      return false;
    }
    if (filterOptions.orderId && order.orderId !== filterOptions.orderId) {
      return false;
    }
    if (filterOptions.customerName && 
        order.customerName.toLowerCase() !== filterOptions.customerName.toLowerCase()) {
      return false;
    }
    
    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortBy) return 0;
    
    if (a[sortBy] < b[sortBy]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleSort = () => {
    const nextSortOptions = [
      { field: 'date', direction: 'asc' },
      { field: 'date', direction: 'desc' },
      { field: 'orderValue', direction: 'asc' },
      { field: 'orderValue', direction: 'desc' },
      { field: null, direction: 'asc' }
    ];
    
    const currentIndex = nextSortOptions.findIndex(
      option => option.field === sortBy && option.direction === sortDirection
    );
    
    const nextIndex = (currentIndex + 1) % nextSortOptions.length;
    setSortBy(nextSortOptions[nextIndex].field);
    setSortDirection(nextSortOptions[nextIndex].direction);
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterReset = () => {
    setFilterOptions({
      date: '',
      orderId: '',
      customerName: '',
    });
  };

  const [showShipmentModal, setShowShipmentModal] = useState(false);
  
  const handleMoveToShipment = () => {
    setShowShipmentModal(true);
  };

  const breadcrumbItems = [
    { label: 'Warehouse Management', href: '#' },
    { label: 'Branch', href: '#' },
    { label: 'My Orders', href: '/admin/warehouse/table' },
  ];
  return (
    <div className="min-h-screen flex flex-col">
          <Breadcrumbs
            pageTitle="My Orders"
            items={breadcrumbItems}
          />
      <div className="mb-4">
    
        
      <div className="flex flex-wrap items-center justify-between text-base font-medium">
      <div className="flex items-center">
      <span className="mr-4 text-gray-800">Total Orders:</span>

      <span className="font-bold">12</span>
    </div>
  <div className="flex flex-wrap gap-x-12 items-center text-blue-600">
    <div className="flex items-center">
      <span className="mr-2">Cancelled by Seller:</span>
      <span className="font-bold">12</span>
    </div>
    <div className="flex items-center">
      <span className="mr-2">After Purchase Return:</span>
      <span className="font-bold">8</span>
    </div>
    <div className="flex items-center">
      <span className="mr-2">Wrong Address & Other Reason:</span>
      <span className="font-bold">5</span>
    </div>
  </div>
</div>

      </div>
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg ">
                               
      <div className="px-10 py-2 bg-white grid grid-cols-7 gap-2 rounded-full">
  {statusTabs.map((tab) => (
    <button
      key={tab.name}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex flex-col gap-0 justify-center items-center
        ${activeTab === tab.name 
          ? 'bg-cyan-500 text-white shadow-sm ' 
          : 'text-gray-600 hover:bg-gray-100'}
      `}
      onClick={() => setActiveTab(tab.name)}
    >
      <span>{tab.name}</span>
      <span>{tab.count}</span>
    </button>
  ))}
</div>
</div>

<div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg ">
      <div className="bg-white mx-20 py-4 flex justify-center gap-1 rounded-full">
        {processTabs.map((tab) => (
          <button
            key={tab.name}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex flex-col gap-0 justify-center items-center
              ${activeTab === tab.name 
                ? 'bg-cyan-500 text-white shadow-sm ' 
                : 'text-gray-600 hover:bg-gray-100'}
            `}
            onClick={() => setActiveTab(tab.name)}
          >
            <div>{tab.name}</div>
            <div>{tab.count}</div>
          </button>
        ))}
      </div>
      </div>
      
      <div className="flex items-center my-4 justify-center">
        <button 
          className="bg-red-500 text-white font-semibold py-2 px-4 mr-2"
          onClick={handleMoveToShipment}
        >
          Move to Shipment
        </button>
        
      </div>
      <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                            <div className='w-full md:w-auto'>
                                <div className="dropdown">
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
                              <input type="text" className="grow text-blue-900 placeholder:text-center placeholder-blue-400" placeholder="Search ..." />
                               
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
      
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 py-2 px-4 text-center">
                <span className="inline-block w-6 h-6 bg-gray-500"></span>
              </th>
              <th className="border border-gray-300 py-2 px-4">No</th>
              <th className="border border-gray-300 py-2 px-4">Date</th>
              <th className="border border-gray-300 py-2 px-4">Order ID</th>
              <th className="border border-gray-300 py-2 px-4">Customer Name</th>
              <th className="border border-gray-300 py-2 px-4">Items</th>
              <th className="border border-gray-300 py-2 px-4">Qty</th>
              <th className="border border-gray-300 py-2 px-4">Order Value</th>
              <th className="border border-gray-300 py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} className="border border-gray-300">
                <td className="border border-gray-300 py-2 px-4 text-center">
                  <div className="inline-block w-6 h-6 border border-gray-400"></div>
                </td>
                <td className="border border-gray-300 py-2 px-4">{order.no}</td>
                <td className="border border-gray-300 py-2 px-4">{order.date}</td>
                <td className="border border-gray-300 py-2 px-4">{order.orderId}</td>
                <td className="border border-gray-300 py-2 px-4">{order.customerName}</td>
                <td className="border border-gray-300 py-2 px-4">{order.items}</td>
                <td className="border border-gray-300 py-2 px-4">{order.qty}</td>
                <td className="border border-gray-300 py-2 px-4">{order.orderValue}</td>
                <td className="border border-gray-300 py-2 px-4">
                  <button 
                    className="text-blue-600 mr-2"
                    onClick={() => handleExpand(order.id)}
                  >
                    Expand
                  </button>
                  |
                  <button className="text-blue-600 ml-2">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {expandedOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-10/12 max-h-90vh overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">No</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Category</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Image</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Product Name</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Company/Brand</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Model</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Variant</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">SKU</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">UoM</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Qty</th>
                  <th className="bg-green-500 text-white border border-gray-300 py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.find(o => o.id === expandedOrderId)?.products.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="border border-gray-300 py-2 px-4">{product.no}</td>
                    <td className="border border-gray-300 py-2 px-4">
                      {index === 0 ? <span className="block text-center">{product.category}</span> : null}
                      {index === 0 ? <span className="block h-8"></span> : null}
                    </td>
                    <td className="border border-gray-300 py-2 px-4 text-center bg-blue-200">
                      <span className="text-2xl">{product.image}</span>
                    </td>
                    <td className="border border-gray-300 py-2 px-4">{product.productName}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.companyBrand}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.model}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.variant}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.sku}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.uom}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.qty}</td>
                    <td className="border border-gray-300 py-2 px-4">{product.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border border-gray-300 bg-green-500 text-white py-2 px-4">{orders.find(o => o.id === expandedOrderId)?.products.length.toString().padStart(2, '0') || '00'}</td>
                  <td colSpan="9" className="border border-gray-300"></td>
                  <td className="border border-gray-300 py-2 px-4 bg-green-600 text-white text-right">
                    {orders.find(o => o.id === expandedOrderId)?.products.reduce((total, p) => total + parseInt(p.qty), 0).toString().padStart(2, '0') || '00'}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-right">Submit</td>
                </tr>
              </tfoot>
            </table>
            
            <div className="flex justify-end">
              <button 
                className="bg-red-500 text-white py-2 px-6"
                onClick={() => setExpandedOrderId(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showShipmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Select Logistic Partner</h2>
            
            <div className="mb-4">
              <label className="block mb-2">Logistic Partner</label>
              <select className="w-full border border-gray-300 p-2 mb-4">
                <option value="">Select Logistic Partner</option>
                <option value="dhl">DHL</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
              </select>
              
              <label className="block mb-2">Shipping Method</label>
              <select className="w-full border border-gray-300 p-2">
                <option value="">Select Shipping Method</option>
                <option value="standard">Standard</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="bg-red-500 text-white py-2 px-6"
                onClick={() => setShowShipmentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-green-500 text-white py-2 px-6"
                onClick={() => {
                  alert('Shipping details submitted successfully!');
                  setShowShipmentModal(false);
                }}
              >
                Confirm & Create Label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}