// import { useEffect, useState } from "react";
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Breadcrumbs from "../../components/Breadcrumbs";

// const TaxTable = () => {
//   const token = localStorage.getItem('token');
//   const [taxes, setTaxes] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [editTax, setEditTax] = useState(null);
//   const [newTax, setNewTax] = useState({ name: "", percentage: "", displayName: "" });

//   const fetchTaxes = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax`,
//         {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       }
//       );
//       const data = await res.json();
//       setTaxes(data.data);
//     } catch (error) {
//       toast.error("Failed to fetch taxes");
//     }
//   };

//   useEffect(() => {
//     fetchTaxes();
//   }, []);

//   const toggleStatus = async (id, status) => {
//     try {
//       await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//          },
//         body: JSON.stringify({ status: !status })
//       });
//       toast.success("Status updated");
//       fetchTaxes();
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   const setDefault = async (id) => {
//     try {
//       await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax/${id}`,
//         {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       }
//       );
//       toast.success("Default tax updated");
//       fetchTaxes();
//     } catch (error) {
//       toast.error("Failed to set default tax");
//     }
//   };

//   const deleteTax = async (id) => {
//     if (window.confirm("Are you sure you want to delete this tax?")) {
//       try {
//         await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax/${id}`, {
//           method: "DELETE",
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         toast.success("Tax deleted");
//         fetchTaxes();
//       } catch (error) {
//         toast.error("Failed to delete tax");
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const url = editTax ? `${import.meta.env.VITE_BASE_URL}/api/admin/tax/${editTax.id}` : `${import.meta.env.VITE_BASE_URL}/api/admin/tax`;
//       const method = editTax ? "PUT" : "POST";
//       await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//            'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(newTax),
//       });
//       toast.success(editTax ? "Tax updated successfully" : "Tax added successfully");
//       setShowPopup(false);
//       setEditTax(null);
//       setNewTax({ name: "", percentage: "", displayName: "" });
//       fetchTaxes();
//     } catch (error) {
//       toast.error("Failed to save tax");
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-auto">

//       <div className="flex-1 flex flex-col overflow-auto">

//         <div className="p-6">
//      <div className="flex justify-between items-center">
//      <h2 className="text-xl font-bold mb-4 uppercase">Tax Setting</h2>
//           <button onClick={() => setShowPopup(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">+ Add New Tax</button>

//      </div>
//         <table className="w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100 uppercase">
//                 <th className="p-2 border">Sr. No</th>
//                 <th className="p-2 border">Display Name</th>
//                 <th className="p-2 border">Tax Name</th>
//                 <th className="p-2 border">Tax Amount(%)</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Default</th>
//                 <th className="p-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {taxes.map((tax, index) => (
//                 <tr key={tax.id} className="text-center">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{tax.displayName}</td>
//                   <td className="p-2 border">{tax.name}</td>
//                   <td className="p-2 border">{tax.percentage}%</td>
//                   <td className="p-2 border">
//                     <span
//                       onClick={() => toggleStatus(tax.id, tax.status)}
//                       className={`cursor-pointer px-2 py-1 text-white rounded ${tax.status ? "bg-green-500" : "bg-red-500"}`}
//                     >
//                       {tax.status ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="p-2 border">
//                     {tax.isDefault ? (
//                       <span className="bg-blue-500 text-white px-2 py-1 rounded">Default</span>
//                     ) : (
//                       <button onClick={() => setDefault(tax.id)} className="text-blue-500 underline">
//                         Make Default
//                       </button>
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     <button onClick={() => deleteTax(tax.id)} className="text-red-500 mr-2">🗑</button>
//                     <button onClick={() => { setEditTax(tax); setNewTax(tax); setShowPopup(true); }} className="text-blue-500">✏</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {showPopup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//               <div className="bg-white p-6 rounded shadow-lg">
//                 <h3 className="text-lg font-bold mb-4">{editTax ? "Edit Tax" : "Add Tax"}</h3>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={newTax.name}
//                   onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
//                   className="border p-2 w-full mb-2"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Percentage"
//                   value={newTax.percentage}
//                   onChange={(e) => setNewTax({ ...newTax, percentage: e.target.value })}
//                   className="border p-2 w-full mb-2"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Display Name"
//                   value={newTax.displayName}
//                   onChange={(e) => setNewTax({ ...newTax, displayName: e.target.value })}
//                   className="border p-2 w-full mb-2"
//                 />
//                 <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
//                 <button onClick={() => { setShowPopup(false); setEditTax(null); setNewTax({ name: "", percentage: "", displayName: "" }); }} className="ml-2 px-4 py-2 border rounded">Cancel</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default TaxTable;


import { FaEdit, FaTrash } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pagination from '../../components/Pagination'; // Reuse this

const gstData = [
  {
    igst: "5%",
    cgst_sgst: "2.5% - 2.5%",
    cess: "-",
    hsn: "ABC-123",
    products: [
      "Hair Shampoo",
      "Hair Conditioner",
      "Hair Oil",
      "Hair Wax",
      "Hair Clay",
      "Hair Paste",
      "Hair Serum",
    ],
    category: "Personal Care",
  },
  {
    igst: "5%",
    cgst_sgst: "2.5% - 2.5%",
    cess: "-",
    hsn: "DEF-123",
    products: [
      "Face Oils",
      "Face Scrub",
      "Face Mask",
      "Facial Kit",
      "Face Cream",
      "Face Wash",
      "Face Serum",
      "Face Cleanser",
      "Lip Balm",
      "Sunscreen",
      "Sheet Masks",
      "Toner",
      "Lotions",
      "Under Eye Gel",
      "Micellar Water",
    ],
    category: "Medicine",
  },
];

const breadcrumbItems = [
  { label: "Tax Management", href: "#" },
  { label: "Tax", href: "#" },
  { label: "Manage GST/TAX", href: "/admin/taxes/gst-tax" },
];

import React, { useState, useEffect } from "react";
import PillTabs from '../../components/PillTabs';
import CreateGstPopup from './CreateGstTax';

const GstTable = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(gstData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = gstData.filter(item => 
      item.products.some(product => 
        product.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hsn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };
  const topOptions = [
    { id:1 ,label: "Non-taxable (72)" },
    { id:2 ,label: "Taxable (72)" },
  ];

  const bottomOptions = [
    { id:1 ,label: "0% (8)" },
    { id:2 ,label: "3% (5)" },
    { id:3 ,label: "5% (10)" },
    { id:4 ,label: "12% (5)" },
    { id:5 ,label: "18% (10)" },
    { id:6 ,label: "28% (4)" },
  ];
  return (
    <div className="overflow-x-auto p-4">
      <Breadcrumbs pageTitle="Manage GST/TAX" items={breadcrumbItems} />
      <div className="space-y-3">
  <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-md shadow-sm overflow-x-auto flex justify-center">
    <PillTabs tabs={topOptions} />
  </div>
  <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-md shadow-sm overflow-x-auto flex justify-center">
    <PillTabs tabs={bottomOptions} />
  </div>
</div>
<div className="flex justify-end my-2">
  <button
    onClick={() => setIsPopupOpen(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
  >
    + Add GST/TAX
  </button>
</div>

      <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                            <div className='w-full md:w-auto'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">Filter</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white">
                                        <li><label><input type="checkbox" /></label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Search Input */}
                            <div className="flex-1 max-w-md">
                                <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                              <input type="text" className="grow text-blue-900 placeholder:text-center placeholder-blue-400" placeholder=" Search " />
                               
                             </label>
                            </div>
                            <div className='w-full md:w-auto'>
                                <select className="select min-w-[150px] text-center  w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                    <option disabled selected>Sort</option>
                                    <option>Homer</option>
                                    <option>Marge</option>
                                    <option>Bart</option>
                                    <option>Lisa</option>
                                    <option>Maggie</option>
                                </select>
                            </div>
                        </div>
      <table className="min-w-full border border-gray-400 text-left text-sm bg-white">
        <thead className="bg-gray-200 text-gray-700">
          <tr className="uppercase">
            <th className="px-4 py-2 border">IGST</th>
            <th className="px-4 py-2 border">CGST & SGST</th>
            <th className="px-4 py-2 border">CESS</th>
            <th className="px-4 py-2 border">HSN CODE</th>
            <th className="px-4 py-2 border">Products</th>
            <th className="px-4 py-2 border">Categories</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index} className="border">
              {index === 0 && (
                <>
                  <td
                    rowSpan={currentRecords.length}
                    className="px-4 py-2 border align-center text-blue-800 font-semibold"
                  >
                    {item.igst}
                  </td>
                  <td
                    rowSpan={currentRecords.length}
                    className="px-4 py-2 border align-center text-blue-800 font-semibold"
                  >
                    {item.cgst_sgst}
                  </td>
                  <td
                    rowSpan={currentRecords.length}
                    className="px-4 py-2 border align-center text-blue-800 font-semibold"
                  >
                    {item.cess}
                  </td>
                </>
              )}
              <td className="px-4 py-2 border font-semibold">{item.hsn}</td>
              <td className="px-4 py-2 border">{item.products.join(" | ")}</td>
              <td
                className={`px-4 py-2 border font-semibold text-center bg-gradient-to-r from-gray-100 to-gray-200`}
              >
                {item.category}
              </td>
              <td
                className={`px-4 py-2  font-semibold`}
              >
                <div className=' flex justify-center items-center h-full gap-4'>
                <FaEdit/> <FaTrash/>
                </div>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRecords={filteredData.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
      <CreateGstPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

    </div>
  );
};

export default GstTable;


