import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const ProcurementList = () => {
  const data = [
    {
      id: 1,
      productName: "Pickle",
      model: "Mango",
      variant: "500 GM",
      uom: "GM",
      warehouses: "10",
    },
    {
      id: 2,
      productName: "Pickle",
      model: "Ginger",
      variant: "01 KG",
      uom: "KG",
      warehouses: "05",
    },
  ];
  const breadcrumbItems = [
    { label: 'Purchase Management', href: '#' },
    { label: 'Purchases', href: '#' },
    { label: 'Procurement List', href: '/admin/approval/product/supplier' }
  ];

return (
    <div className="p-5">
            <Breadcrumbs
              pageTitle="Procurement List"
              items={breadcrumbItems}
            /> 
      <div className="flex space-x-4 mb-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded">New Order/Latest</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Processed/Order Placed</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Order Delivered</button>
      </div>

      {/* Date Filter Section */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <label className="border px-3 py-2 bg-white flex items-center">
            Period
            <span className="ml-1 border-l-2 border-green-600 w-0 h-0 border-t-8 border-t-transparent border-b-0 border-r-8 border-r-green-600 border-l-8 border-l-transparent"></span>
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">Date From :</span>
          <input type="text" defaultValue="01-01-2023" className="border px-3 py-1" />
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">Date To :</span>
          <input type="text" defaultValue="31-01-2023" className="border px-3 py-1" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2"><input type="checkbox" className="w-5 h-5" /></th>
              <th className="p-2">No</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Model</th>
              <th className="p-2">Varient</th>
              <th className="p-2">UoM</th>
              <th className="p-2">No Of Ware Houses</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="bg-gray-50 hover:bg-gray-100">
                <td className="p-2"><input type="checkbox" className="w-5 h-5" /></td>
                <td className="p-2 font-semibold">{String(index + 1).padStart(2, "0")}</td>
                <td className="p-2 font-semibold text-black">{item.productName}</td>
                <td className="p-2">{item.model}</td>
                <td className="p-2">{item.variant}</td>
                <td className="p-2">{item.uom}</td>
                <td className="p-2">{item.warehouses}</td>
                <td className="p-2 text-gray-700 font-semibold">
                  <Link to={`/admin/purchase/procurement-list/${item.id}`} className="hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcurementList;
