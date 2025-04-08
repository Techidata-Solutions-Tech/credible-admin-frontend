import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const ReferralCodeTable = () => {
  const [referralId, setReferralId] = useState(null);

  const referralData = [
    {
      id: "R01",
      name: "WELCOME100",
      value: "$100 Off",
      userGroup: "New Users",
      userName: "John Doe",
      discountedAmount: "$5000",
      status: 1, // Active
      shareDate: "2024-02-01",
      usedDate: "2024-02-01",
    },
    {
      id: "R02",
      name: "VIP50",
      value: "50% Off",
      userGroup: "VIP Members",
      userName: "Jane Smith",
      discountedAmount: "$2500",
      status: 2, // Expired
      shareDate: "2024-02-01",
      usedDate: "2023-12-15",
    },
    {
      id: "R03",
      name: "FRIENDS20",
      value: "$20 Off",
      userGroup: "All Users",
      userName: "Alice Johnson",
      discountedAmount: "$800",
      status: 0, // Inactive
      shareDate: "2024-02-01",
      usedDate: "2024-01-10",
    },
  ];

  const statusLabels = {
    1: "Active",
    0: "Inactive",
    2: "Expired",
  };

  const statusColors = {
    1: "text-green-500",
    0: "text-red-500",
    2: "text-gray-500",
  };

  const handleEdit = (id) => {
    setReferralId(id);
    document.getElementById("referral_modal_edit").showModal();
  };

  const handleDelete = (id) => {
    setReferralId(id);
    document.getElementById("referral_modal_delete").showModal();
  };

  const handleStatusChange = (id) => {
    setReferralId(id);
    document.getElementById("referral_modal_status").showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[800px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referral ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Group</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discounted</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Share Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {referralData?.map((referral) => (
            <tr key={referral.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{referral.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.name}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.value}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.userGroup}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.userName}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.discountedAmount}</td>
              <td className={`px-4 py-4 text-sm font-semibold ${statusColors[referral.status]}`}>
                {statusLabels[referral.status]}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.shareDate}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{referral.usedDate}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className="mt-2 text-blue-500" size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(referral.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(referral.id)}>Delete</a></li>
                    <li><a href="#" onClick={() => handleStatusChange(referral.id)}>Change Status</a></li>
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

export default ReferralCodeTable;
