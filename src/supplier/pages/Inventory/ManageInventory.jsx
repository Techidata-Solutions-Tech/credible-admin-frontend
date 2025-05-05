import React, { useState } from "react";
import Pagination from "../../../admin/components/Pagination";
import Breadcrumbs from "../../../admin/components/Breadcrumbs";

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const inventoryData = [
    {
      no: "Q1",
      category: "Fashion",
      productName: "Kurta",
      brand: "Harini",
      model: "Kurta",
      varient: "Kurta",
      sku: "Harini",
      uom: "Harini",
      unitPrice: "1000",
      currentStock: "100",
      returnedStock: "50",
      soldQty: "950",
      stockOnHand: "View",
      location: "Kurta",
      updatedAt: "01/02/2022"
    },
    {
      no: "Q2",
      category: "Groceries",
      productName: "Sunflower Oil",
      brand: "Mehath",
      model: "Sunflower Oil",
      varient: "Sunflower Oil",
      sku: "Mehath",
      uom: "Mehath",
      unitPrice: "Mehath",
      currentStock: "Mehath",
      returnedStock: "Sunflower Oil",
      soldQty: "Mehath",
      stockOnHand: "Groceries",
      location: "View",
      updatedAt: "05/03/2022"
    },
    {
      no: "Q3",
      category: "Kitchenware",
      productName: "Pressure Cooker",
      brand: "Mahesh",
      model: "Pressure Cooker",
      varient: "Pressure Cooker",
      sku: "Mahesh",
      uom: "Mahesh",
      unitPrice: "Mahesh",
      currentStock: "Mahesh",
      returnedStock: "Pressure Cooker",
      soldQty: "Mahesh",
      stockOnHand: "Kitchenware",
      location: "View",
      updatedAt: "20/04/2022"
    }
    // Add more inventory records here
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentInventory = inventoryData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  const breadcrumbItems = [
    { label: 'Inventory Management', href: '#' },
    { label: 'Inventory', href: '#' },
    { label: 'Manage Inventory', href: '/admin/marketing/create-coupon' }
  ];
 
    return (
      <div className="min-h-screen p-4">
         <Breadcrumbs
              pageTitle="Manage Inventory"
              items={breadcrumbItems}
            />   
      {/* Overview Boxes */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <div className="bg-green-300 px-4 py-2 rounded">In Stock <b>50</b></div>
        <div className="bg-yellow-300 px-4 py-2 rounded">Low Stock Alert <b>10</b></div>
        <div className="bg-red-500 text-white px-4 py-2 rounded">Dead Stocks <b>50</b></div>
        <div className="bg-purple-300 px-4 py-2 rounded">Out of Stock <b>25</b></div>
        <div className="bg-blue-700 text-white px-4 py-2 rounded">Total Stocks <b>2000</b></div>
        <div className="bg-green-600 text-white px-4 py-2 rounded">Category <b>(02)</b></div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded">Product <b>(40)</b></div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center  items-center gap-4 mb-4">
        <select className="border p-2 rounded">
          <option>Main Category</option>
        </select>
        <select className="border p-2 rounded">
          <option>Sub Category</option>
        </select>
        <select className="border p-2 rounded">
          <option>Child Category</option>
        </select>
       
      </div>
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

      {/* Table */}
      <div className="overflow-auto mb-6">
        <table className="min-w-[1200px] w-full border border-collapse">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Company/Brand</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Varient</th>
              <th className="border p-2">SKU</th>
              <th className="border p-2">UoM</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Current Stock</th>
              <th className="border p-2">Returned Stock</th>
              <th className="border p-2">Sold Quantity</th>
              <th className="border p-2">Stock On Hand</th>
              <th className="border p-2">Warehouse Location</th>
              <th className="border p-2">Added/Updated</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentInventory.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.no}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.productName}</td>
                <td className="border p-2">{item.brand}</td>
                <td className="border p-2">{item.model}</td>
                <td className="border p-2">{item.varient}</td>
                <td className="border p-2">{item.sku}</td>
                <td className="border p-2">{item.uom}</td>
                <td className="border p-2">{item.unitPrice}</td>
                <td className="border p-2">{item.currentStock}</td>
                <td className="border p-2">{item.returnedStock}</td>
                <td className="border p-2">{item.soldQty}</td>
                <td className="border p-2">{item.stockOnHand}</td>
                <td className="border p-2">{item.location}</td>
                <td className="border p-2">{item.updatedAt}</td>
                <td className="border p-2 space-x-1">
                  <button className="text-blue-600 hover:underline">Update Qty</button>
                  <button className="text-orange-600 hover:underline">Deactivate</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalRecords={inventoryData.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Inventory;
