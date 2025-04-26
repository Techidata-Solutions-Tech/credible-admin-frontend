import React from "react";
import { Link } from "react-router-dom";

const data = [
  { id: "01", poNo: "PO156789", trackingNo: "100", shippingPartner: "100", supplier: "100", warehouse: "Shikaripura", action: "View" },
  { id: "01", poNo: "PO156789", trackingNo: "View", shippingPartner: "View", supplier: "View", warehouse: "Shimoga", action: "View" },
  { id: "01", poNo: "PO156789", trackingNo: "View", shippingPartner: "View", supplier: "View", warehouse: "Sagara", action: "View" },
];

const ShippingInwardTable = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-green-600 text-white text-center">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">PO NO</th>
            <th className="border border-gray-300 px-4 py-2">Tracking No</th>
            <th className="border border-gray-300 px-4 py-2">Shipping Partner</th>
            <th className="border border-gray-300 px-4 py-2">Supplier</th>
            <th className="border border-gray-300 px-4 py-2">Warehouse</th>
            <th className="border border-gray-300 px-4 py-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const isFirstOccurrence =
              index === 0 || item.poNo !== data[index - 1].poNo;

            const rowSpanCount = data.filter((d) => d.poNo === item.poNo).length;

            return (
              <tr key={index + 1} className="text-center">
                {isFirstOccurrence && (
                  <>
                    <td
                      className="border border-gray-300 px-4 py-2 align-middle"
                      rowSpan={rowSpanCount}
                    >
                      {index+1}
                    </td>
                    <td
                      className="border border-gray-300 px-4 py-2 align-middle"
                      rowSpan={rowSpanCount}
                    >
                      {item.poNo}
                    </td>
                  </>
                )}
                {!isFirstOccurrence && null}
                <td className="border border-gray-300 px-4 py-2">{item.trackingNo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.shippingPartner}</td>
                <td className="border border-gray-300 px-4 py-2">{item.supplier}</td>
                <td className="border border-gray-300 px-4 py-2">{item.warehouse}</td>
                <td className="border border-gray-300 px-4 py-2 text-blue-600 underline cursor-pointer" >
                  <Link to={`/admin/shipping/inward/${item.id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingInwardTable
