import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const sampleData = [
  {
    id: "1",
    date: "01-01-2022",
    productName: "Pickle",
    brand: "Godrej",
    model: "Mango",
    variant: "500",
    uom: "GM",
    sku: "PKL-MNG-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-001",
    supplierId: "BLR-560079-001",
  },
  {
    id: "2",
    date: "01-01-2022",
    productName: "Pickle",
    brand: "Godrej",
    model: "Ginger",
    variant: "01",
    uom: "KG",
    sku: "PKL-GNGR-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-002",
    supplierId: "BLR-560079-002",
  },
  {
    id: "3",
    date: "02-01-2022",
    productName: "Sugar",
    brand: "Tata",
    model: "Brown",
    variant: "500",
    uom: "GM",
    sku: "ONN-MNG-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-001",
    supplierId: "BLR-560079-001",
  },
  {
    id: "4",
    date: "02-01-2022",
    productName: "Tea Powder",
    brand: "Red Label",
    model: "A1",
    variant: "01",
    uom: "KG",
    sku: "RCE-GNGR-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-002",
    supplierId: "BLR-560079-001",
  },
  {
    id: "5",
    date: "02-01-2022",
    productName: "Coffee Powder",
    brand: "Red Lebel",
    model: "A1",
    variant: "500",
    uom: "GM",
    sku: "PKL-MNG-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-001",
    supplierId: "BLR-560079-001",
  },
  {
    id: "6",
    date: "03-01-2022",
    productName: "Rice",
    brand: "Reliance",
    model: "Bullet",
    variant: "01",
    uom: "KG",
    sku: "PKL-GNGR-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-002",
    supplierId: "BLR-560079-002",
  },
  {
    id: "7",
    date: "03-01-2022",
    productName: "Wheat",
    brand: "Tata",
    model: "Premium",
    variant: "500",
    uom: "GM",
    sku: "PKL-MNG-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-001",
    supplierId: "BLR-560079-003",
  },
  {
    id: "8",
    date: "04-01-2022",
    productName: "Oil",
    brand: "Tata",
    model: "Sunflower",
    variant: "01",
    uom: "LTR",
    sku: "PKL-GNGR-500GM",
    stocksInHand: "25",
    warehouseId: "BLR-560079-002",
    supplierId: "BLR-560079-003",
  },
];

const ProcurementDetail = () => {
  const { id } = useParams();
  const record = sampleData.find((item) => item.id === id);

  if (!record) {
    return <div className="text-center text-red-600 mt-10">No record found for ID: {id}</div>;
  }
  const breadcrumbItems = [
    { label: 'Purchase Management', href: '#' },
    { label: 'Purchases', href: '#' },
    { label: 'Procurement Details', href: '/admin/approval/product/supplier' }
  ];

return (
    <div className="p-5">
            <Breadcrumbs
              pageTitle="Procurement Details"
              items={breadcrumbItems}
            /> 
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
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-700 px-2 py-2">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="border border-gray-700 px-2 py-2">No</th>
              <th className="border border-gray-700 px-2 py-2">Date</th>
              <th className="border border-gray-700 px-2 py-2">Product Name</th>
              <th className="border border-gray-700 px-2 py-2">Company/Brand</th>
              <th className="border border-gray-700 px-2 py-2">Model</th>
              <th className="border border-gray-700 px-2 py-2">Varient</th>
              <th className="border border-gray-700 px-2 py-2">UoM</th>
              <th className="border border-gray-700 px-2 py-2">SKU</th>
              <th className="border border-gray-700 px-2 py-2">Stocks In Hand</th>
              <th className="border border-gray-700 px-2 py-2">Wearhouse ID</th>
              <th className="border border-gray-700 px-2 py-2">Supplier ID</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="border border-gray-700 px-2 py-2 text-center">
                <input type="checkbox" className="w-4 h-4" />
              </td>
              <td className="border border-gray-700 px-2 py-2 text-center">{record.id}</td>
              <td className="border border-gray-700 px-2 py-2 text-center">{record.date}</td>
              <td className="border border-gray-700 px-2 py-2">{record.productName}</td>
              <td className="border border-gray-700 px-2 py-2">{record.brand}</td>
              <td className="border border-gray-700 px-2 py-2">{record.model}</td>
              <td className="border border-gray-700 px-2 py-2 text-center">{record.variant}</td>
              <td className="border border-gray-700 px-2 py-2 text-center">{record.uom}</td>
              <td className="border border-gray-700 px-2 py-2">{record.sku}</td>
              <td className="border border-gray-700 px-2 py-2 text-center">{record.stocksInHand}</td>
              <td className="border border-gray-700 px-2 py-2">{record.warehouseId}</td>
              <td className="border border-gray-700 px-2 py-2">{record.supplierId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end my-3">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Move to Procurement</button>
      </div>
    </div>
  );
};

export default ProcurementDetail;
