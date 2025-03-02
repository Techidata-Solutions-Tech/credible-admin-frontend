import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const SellerCouponTable = () => {
  const [couponId, setCouponId] = useState(null);

  const couponData = [
    {
      id: "S01",
      name: "Winter Special",
      code: "WINTER50",
      value: "50%",
      SKU: "SELL123",
      category: "Fashion",
      userGroup: "Regular Buyers",
      couponUsed: 120,
      discountAmount: "$2400",
      status: 1, // Active
      startDate: "2024-12-01 00:00",
      endDate: "2024-12-31 23:59",
    },
    {
      id: "S02",
      name: "Holiday Bonanza",
      code: "HOLIDAY20",
      value: "$20 Off",
      SKU: "SELL456",
      category: "Electronics",
      userGroup: "VIP Members",
      couponUsed: 80,
      discountAmount: "$1600",
      status: 2, // Scheduled
      startDate: "2024-11-15 00:00",
      endDate: "2024-11-25 23:59",
    },
    {
      id: "S03",
      name: "Clearance Sale",
      code: "CLEAR100",
      value: "$100 Off",
      SKU: "SELL789",
      category: "Home Appliances",
      userGroup: "All Users",
      couponUsed: 50,
      discountAmount: "$5000",
      status: 3, // Expired
      startDate: "2023-09-01 00:00",
      endDate: "2023-09-10 23:59",
    },
  ];

  const statusLabels = {
    1: "Active",
    0: "Inactive",
    2: "Scheduled",
    3: "Expired",
  };

  const statusColors = {
    1: "text-green-500",
    0: "text-red-500",
    2: "text-yellow-500",
    3: "text-gray-500",
  };

  const handleEdit = (id) => {
    setCouponId(id);
    document.getElementById("seller_coupon_modal_edit").showModal();
  };

  const handleDelete = (id) => {
    setCouponId(id);
    document.getElementById("seller_coupon_modal_delete").showModal();
  };

  const handleStatusChange = (id) => {
    setCouponId(id);
    document.getElementById("seller_coupon_modal_status").showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[1000px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coupon ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Group</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discounted</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {couponData.map((coupon) => (
            <tr key={coupon.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.name}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.code}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.value}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.SKU}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.category}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.userGroup}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.couponUsed}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.discountAmount}</td>
              <td className={`px-4 py-4 text-sm font-semibold ${statusColors[coupon.status]}`}>
                {statusLabels[coupon.status]}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.startDate}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{coupon.endDate}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className="mt-2 text-blue-500" size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(coupon.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(coupon.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleStatusChange(coupon.id)}>Change Status</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerCouponTable;
