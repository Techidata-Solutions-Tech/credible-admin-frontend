import React, { useState, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";

const BannerTable = ({banners}) => {
 

  const handleEdit = (id) => {
    setSelectedBannerId(id);
    document.getElementById('my_modal_edit').showModal();
  };

  const handleDelete = (id) => {
    setSelectedBannerId(id);
    document.getElementById('my_modal_delete').showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[900px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Redirect URL</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Index</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {banners?.map((banner) => (
            <tr key={banner.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{banner.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">
                <img src={banner.image} alt="Banner" className="w-20 h-12 object-cover rounded" />
              </td>
              <td className="px-4 py-4 text-sm text-blue-500 underline">
                <a href={banner.redirectUrl} target="_blank" rel="noopener noreferrer">
                  {banner.redirectUrl}
                </a>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">{banner.type}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{banner.position}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{banner.index}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(banner.id)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDelete(banner.id)}>Delete</a></li>
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

export default BannerTable;
