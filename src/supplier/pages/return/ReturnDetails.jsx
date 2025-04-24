import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../admin/components/Breadcrumbs";

const ReturnDetails = () => {
  const { id } = useParams();

  const detailsData = {
    "PO156789": [
      {
        no: 1,
        date: "1-1-2023",
        productName: "Mobile",
        brand: "Apple",
        model: "Iphone-14",
        variant: "8GB-256GB",
        sku: "MOB-APP-14",
        uom: "Pcs-Box",
        uip: "1",
        reason: "Damage",
        quantity: 10,
        unitPrice: 1000,
        tax: "10%",
        taxAmt: 1000,
        grossAmount: 11000,
      },
      {
        no: 2,
        date: "",
        productName: "Laptop",
        brand: "Apple",
        model: "Macbook-2023",
        variant: "",
        sku: "LAP-MAC-23",
        uom: "PC",
        uip: "Defective",
        reason: "Defective",
        quantity: 10,
        unitPrice: 10000,
        tax: 10000,
        taxAmt: 10000,
        grossAmount: 110000,
      },
      {
        no: 3,
        date: "",
        productName: "Bagas Plates",
        brand: "Bagas Plates",
        model: "ghi",
        variant: "",
        sku: "bapl03",
        uom: "Box",
        uip: 1000,
        reason: 1000,
        quantity: 1,
        unitPrice: 10,
        tax: 10,
        taxAmt: 10,
        grossAmount: 1000,
      },
    ],
  };

  const rows = detailsData[id] || [];

  const totalQty = rows.reduce((acc, row) => acc + Number(row.quantity), 0);
  const totalTax = rows.reduce((acc, row) => acc + Number(row.taxAmt), 0);
  const totalGross = rows.reduce((acc, row) => acc + Number(row.grossAmount), 0);
  const breadcrumbItems = [
    { label: 'Return Management', href: '#' },
    { label: 'Returns', href: '/supplier/returns' },
    { label: 'Manage Returns', href: '/admin/marketing/create-coupon' }
  ];

  return (
    <div className="p-4 border border-dotted">
         <Breadcrumbs
              pageTitle="Manage Returns"
              items={breadcrumbItems}
            /> 
      <h2 className="text-xl font-semibold mb-2">Purchase Order No: <span className="border px-2 py-1">{id}</span></h2>
      <div className="overflow-x-auto border">
        <table className="min-w-full border-collapse border text-sm text-center">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Brand/Company</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Varient</th>
              <th className="border p-2">SKU</th>
              <th className="border p-2">UoM</th>
              <th className="border p-2 bg-green-600">UiP</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2 bg-green-600">Tax</th>
              <th className="border p-2">Tax Amt</th>
              <th className="border p-2">Gross Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, i) => (
              <tr key={i} className="bg-white even:bg-blue-50">
                <td className="border p-2">{item.no}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2 font-bold">{item.productName}</td>
                <td className="border p-2">{item.brand}</td>
                <td className="border p-2">{item.model}</td>
                <td className="border p-2">{item.variant}</td>
                <td className="border p-2">{item.sku}</td>
                <td className="border p-2">{item.uom}</td>
                <td className="border p-2 bg-green-100">{item.uip}</td>
                <td className="border p-2 text-red-600">{item.reason}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.unitPrice}</td>
                <td className="border p-2 bg-green-100">{item.tax}</td>
                <td className="border p-2">{item.taxAmt}</td>
                <td className="border p-2">{item.grossAmount}</td>
              </tr>
            ))}
            <tr className="bg-blue-200 font-semibold">
              <td colSpan="10" className="border p-2 text-right">Total</td>
              <td className="border p-2">{totalQty}</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">{totalTax}</td>
              <td className="border p-2">{totalGross}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnDetails;
