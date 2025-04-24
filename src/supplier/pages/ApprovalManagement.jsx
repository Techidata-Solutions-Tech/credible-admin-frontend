import React, { useState } from 'react';

const ApprovalsTable = () => {
  const [activeTab, setActiveTab] = useState('Sent');
  const [searchTerm, setSearchTerm] = useState('');
  
  const tableData = [
    {
      id: '01',
      category: '01/02/2022',
      productName: '6347634',
      image: 'Image',
      company: 'Fashion',
      model: 'Kurta',
      variant: 'Kurta',
      sku: 'KU1209',
      uom: 'KU1209',
      cop: 'Harini',
      qty: 'Verdan',
      hsn: 'KU1209',
      gst: '5%',
      unitPrice: '100',
      sellingPrice: '105',
      mrp: '105',
      status: 'Sent',
      remark: 'Due to Incomplete Details Your Product has been Hold'
    },
    {
      id: '02',
      category: '05/03/2022',
      productName: '3453764',
      image: 'Image',
      company: 'Groceries',
      model: 'Sunflower Oil',
      variant: 'Sunflower Oil',
      sku: 'SNO555',
      uom: 'SNO555',
      cop: 'Mehath',
      qty: '-',
      hsn: 'SNO555',
      gst: '-',
      unitPrice: 'SNO555',
      sellingPrice: '',
      mrp: '',
      status: 'Hold',
      remark: ''
    },
    {
      id: '03',
      category: '20/04/2022',
      productName: '3453433',
      image: 'Image',
      company: 'Kitchenware',
      model: 'Pressure Cooker',
      variant: 'Pressure Cooker',
      sku: 'PSC009',
      uom: 'PSC009',
      cop: 'Mahesh',
      qty: 'Prestige',
      hsn: 'PSC009',
      gst: 'Prestige',
      unitPrice: 'PSC009',
      sellingPrice: '',
      mrp: '',
      status: 'Pending',
      remark: ''
    }
  ];

  // Filter data based on active tab
  const filteredData = tableData.filter(item => 
    (activeTab === 'Sent' && item.status === 'Sent') ||
    (activeTab === 'Approved' && item.status === 'Approved') ||
    (activeTab === 'Pending' && item.status === 'Pending') ||
    (activeTab === 'Hold' && item.status === 'Hold') ||
    (activeTab === 'Rejected' && item.status === 'Rejected')
  );

  // Filter data for Hold & Rejected section
  const holdRejectedData = tableData.filter(item => 
    item.status === 'Hold' || item.status === 'Rejected'
  );

  // Status counts
  const statusCounts = {
    Sent: tableData.filter(item => item.status === 'Sent').length,
    Approved: tableData.filter(item => item.status === 'Approved').length,
    Pending: tableData.filter(item => item.status === 'Pending').length,
    Hold: tableData.filter(item => item.status === 'Hold').length,
    Rejected: tableData.filter(item => item.status === 'Rejected').length,
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <button className="bg-green-600 text-white px-4 py-2 font-bold">
          My Approvals
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex">
          <button 
            className={`px-4 py-2 ${activeTab === 'Sent' ? 'bg-green-500' : 'bg-green-500'} text-white`}
            onClick={() => setActiveTab('Sent')}
          >
            Sent<br />
            {String(statusCounts.Sent).padStart(2, '0')}
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'Approved' ? 'bg-green-600' : 'bg-green-600'} text-white`}
            onClick={() => setActiveTab('Approved')}
          >
            Approved<br />
            {String(statusCounts.Approved).padStart(2, '0')}
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'Pending' ? 'bg-yellow-400' : 'bg-yellow-400'} text-white`}
            onClick={() => setActiveTab('Pending')}
          >
            Pending<br />
            {String(statusCounts.Pending).padStart(2, '0')}
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'Hold' ? 'bg-orange-400' : 'bg-orange-400'} text-white`}
            onClick={() => setActiveTab('Hold')}
          >
            Hold<br />
            {String(statusCounts.Hold).padStart(2, '0')}
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'Rejected' ? 'bg-red-600' : 'bg-red-600'} text-white`}
            onClick={() => setActiveTab('Rejected')}
          >
            Rejected<br />
            {String(statusCounts.Rejected).padStart(2, '0')}
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex justify-between mb-4">
        <button className="border border-gray-300 px-4 py-2">
          Filter
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 px-4 py-2 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="border border-gray-300 px-4 py-2">
          Sort
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th colSpan="7" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Product</th>
              <th colSpan="4" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Measurement</th>
              <th colSpan="2" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Tax</th>
              <th colSpan="3" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Price</th>
              <th colSpan="1" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Operation</th>
            </tr>
            <tr className="bg-green-600 text-white">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">CATEGORY</th>
              <th className="border border-gray-300 p-2">PRODUCT NAME</th>
              <th className="border border-gray-300 p-2">IMAGE</th>
              <th className="border border-gray-300 p-2">COMPANY/BRAND</th>
              <th className="border border-gray-300 p-2">MODEL</th>
              <th className="border border-gray-300 p-2">VARIENT</th>
              <th className="border border-gray-300 p-2">SKU</th>
              <th className="border border-gray-300 p-2">UOM</th>
              <th className="border border-gray-300 p-2">COP</th>
              <th className="border border-gray-300 p-2">QTY</th>
              <th className="border border-gray-300 p-2">HSN/SAC</th>
              <th className="border border-gray-300 p-2">GST</th>
              <th className="border border-gray-300 p-2">UNIT PRICE</th>
              <th className="border border-gray-300 p-2">SELLING PRICE</th>
              <th className="border border-gray-300 p-2">MRP</th>
              <th className="border border-gray-300 p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-300 p-2">{row.id}</td>
                <td className="border border-gray-300 p-2">{row.category}</td>
                <td className="border border-gray-300 p-2">{row.productName}</td>
                <td className="border border-gray-300 p-2">{row.image}</td>
                <td className="border border-gray-300 p-2">{row.company}</td>
                <td className="border border-gray-300 p-2">{row.model}</td>
                <td className="border border-gray-300 p-2">{row.variant}</td>
                <td className="border border-gray-300 p-2">{row.sku}</td>
                <td className="border border-gray-300 p-2">{row.uom}</td>
                <td className="border border-gray-300 p-2">{row.cop}</td>
                <td className="border border-gray-300 p-2">{row.qty}</td>
                <td className="border border-gray-300 p-2">{row.hsn}</td>
                <td className="border border-gray-300 p-2">{row.gst}</td>
                <td className="border border-gray-300 p-2">{row.unitPrice}</td>
                <td className="border border-gray-300 p-2">{row.sellingPrice}</td>
                <td className="border border-gray-300 p-2">{row.mrp}</td>
                <td className="border border-gray-300 p-2">
                  <button className="text-blue-600">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Format: Hold & Rejected Section */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Format: Hold & Rejected</h2>
          <div className="text-sm text-gray-600">
            Action replace with <span className="font-bold">Remark</span> in Hold & Reject
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th colSpan="7" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Product</th>
                <th colSpan="4" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Measurement</th>
                <th colSpan="2" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Tax</th>
                <th colSpan="3" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Price</th>
                <th colSpan="1" className="bg-green-600 text-white border border-gray-300 p-2 text-center">Operation</th>
              </tr>
              <tr className="bg-green-600 text-white">
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">CATEGORY</th>
                <th className="border border-gray-300 p-2">PRODUCT NAME</th>
                <th className="border border-gray-300 p-2">IMAGE</th>
                <th className="border border-gray-300 p-2">COMPANY/BRAND</th>
                <th className="border border-gray-300 p-2">MODEL</th>
                <th className="border border-gray-300 p-2">VARIENT</th>
                <th className="border border-gray-300 p-2">SKU</th>
                <th className="border border-gray-300 p-2">UOM</th>
                <th className="border border-gray-300 p-2">COP</th>
                <th className="border border-gray-300 p-2">QTY</th>
                <th className="border border-gray-300 p-2">HSN/SAC</th>
                <th className="border border-gray-300 p-2">GST</th>
                <th className="border border-gray-300 p-2">UNIT PRICE</th>
                <th className="border border-gray-300 p-2">SELLING PRICE</th>
                <th className="border border-gray-300 p-2">MRP</th>
                <th className="border border-gray-300 p-2">REMARK</th>
              </tr>
            </thead>
            <tbody>
              {holdRejectedData.map((row) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 p-2">{row.id}</td>
                  <td className="border border-gray-300 p-2">{row.category}</td>
                  <td className="border border-gray-300 p-2">{row.productName}</td>
                  <td className="border border-gray-300 p-2">{row.image}</td>
                  <td className="border border-gray-300 p-2">{row.company}</td>
                  <td className="border border-gray-300 p-2">{row.model}</td>
                  <td className="border border-gray-300 p-2">{row.variant}</td>
                  <td className="border border-gray-300 p-2">{row.sku}</td>
                  <td className="border border-gray-300 p-2">{row.uom}</td>
                  <td className="border border-gray-300 p-2">{row.cop}</td>
                  <td className="border border-gray-300 p-2">{row.qty}</td>
                  <td className="border border-gray-300 p-2">{row.hsn}</td>
                  <td className="border border-gray-300 p-2">{row.gst}</td>
                  <td className="border border-gray-300 p-2">{row.unitPrice}</td>
                  <td className="border border-gray-300 p-2">{row.sellingPrice}</td>
                  <td className="border border-gray-300 p-2">{row.mrp}</td>
                  <td className="border border-gray-300 p-2 text-xs">
                    {row.remark || 'Due to Incomplete Details Your Product has been Hold'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovalsTable;
