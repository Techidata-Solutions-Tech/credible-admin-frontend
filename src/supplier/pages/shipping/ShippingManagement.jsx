import React, { useState } from "react";
import Breadcrumbs from "../../../admin/components/Breadcrumbs";

const ShipmentPopup = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shipment Details</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-lg">X</button>
        </div>
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">No</th>
              <th className="p-2 border">Shipping Partner</th>
              <th className="p-2 border">Shipping UOM</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Weight</th>
              <th className="p-2 border">Ship From</th>
              <th className="p-2 border">Ship To</th>
              <th className="p-2 border">Invoice No</th>
              <th className="p-2 border">E-Way Bill</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">01</td>
              <td className="p-2 border">{data.date}</td>
              <td className="p-2 border">Box</td>
              <td className="p-2 border">50</td>
              <td className="p-2 border">Kg</td>
              <td className="p-2 border">500</td>
              <td className="p-2 border">700</td>
              <td className="p-2 border">700</td>
              <td className="p-2 border">700</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
        <div>
          <label className="font-semibold mr-2">Date :</label>
          <input
            type="text"
            value="Banglore"
            readOnly
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="font-semibold mr-2">Warehouse Id :</label>
          <input
            type="text"
            value="ABC-123"
            readOnly
            className="border px-2 py-1"
          />
        </div>
      </div>
      </div>
     
    </div>
  );
};

const ManageShipments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleViewClick = (data) => {
    setSelectedData(data);
    setShowPopup(true);
  };

  const shipments = [
    {
      no: "01",
      poNo: "PO156789",
      invoiceNo: "100",
      receiptNo: "100",
      shippingPartner: "100",
      deliveryLocations: ["Shikaripura", "Shimoga", "Sagara"],
      date: "01-01-2024",
      warehouseId: "ABC-123",
    },
  ];
  const breadcrumbItems = [
    { label: 'Shipping Management', href: '#' },
    { label: 'Shipments', href: '#' },
    { label: 'Manage Shipments', href: '/admin/marketing/create-coupon' }
  ];
 
    return (
      <div className="p-4">
         <Breadcrumbs
              pageTitle="Manage Shipments"
              items={breadcrumbItems}
            />  
      <table className="w-full mb-4 border border-gray-300">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-2 border">No</th>
            <th className="p-2 border">PO NO</th>
            <th className="p-2 border">Invoice No</th>
            <th className="p-2 border">Receipt No</th>
            <th className="p-2 border">Shipping Partner</th>
            <th className="p-2 border">Delivery Location</th>
            <th className="p-2 border">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.no} className="text-center">
              <td className="p-2 border">{shipment.no}</td>
              <td className="p-2 border">{shipment.poNo}</td>
              <td className="p-2 border">{shipment.invoiceNo}<br />View</td>
              <td className="p-2 border">{shipment.receiptNo}<br />View</td>
              <td className="p-2 border">{shipment.shippingPartner}<br />View</td>
              <td className="p-2 border">
                {shipment.deliveryLocations.map((loc, i) => (
                  <div key={i}>{loc}</div>
                ))}
              </td>
              <td className="p-2 border">
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleViewClick(shipment)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  

      <ShipmentPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        data={selectedData}
      />
    </div>
  );
};

export default ManageShipments;