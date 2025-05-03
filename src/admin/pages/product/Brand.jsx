import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Brand = () => {
  const location = useLocation();
const isSupplierRoute = location.pathname.includes("supplier");
const userRole = isSupplierRoute ? "supplier" : "admin";

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [brandData, setBrandData] = useState([]);
  const token = localStorage.getItem("token");
  const handleCheckboxChange = (id) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands(selectedBrands.filter((brandId) => brandId !== id));
    } else {
      setSelectedBrands([...selectedBrands, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBrands([]);
    } else {
      const allIds = currentRecords.map((brand) => brand.id);
      setSelectedBrands(allIds);
    }
    setSelectAll(!selectAll);
  };
const supplierId = 0
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `https://credible-api.techidata.com/v2${isSupplierRoute? `/api/supplierSeller/all-brand-list-by-supplier/${supplierId}`:`/api/supplierSeller/all-brand-list`}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
            },
          }
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON but got: ${text.substring(0, 100)}...`
          );
        }

        const result = await response.json();
        if (response.status === 200) {
          setBrandData(result.data);
        }
      } catch (error) {
        console.error("Error fetching Brand list:", error);
      }
    };

    fetchBrands();
  }, [currentPage, recordsPerPage]);

  const handleDelete = async (brandId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const deleteData = {
        ids: [brandId], 
        added_by: userRole,
        supplier_id: null,
      };
      

      const response = await fetch(
        `https://credible-api.techidata.com/v2/api/supplierSeller/delete-brand`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
          },
          body: JSON.stringify(deleteData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete brand");
      }

      const data = await response.json();
      toast.success("Brand deleted successfully!");

      const updatedBrands = brandData.filter((brand) => brand.id !== brandId);
      setBrandData(updatedBrands);

      return data;
    } catch (error) {
      toast.error(`Error deleting brand: ${error.message}`);
      console.error("Error deleting brand:", error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = brandData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  const statusLabels = {
    1: "Active",
    0: "Inactive",
  };

  const statusColors = {
    1: "text-green-500",
    0: "text-red-500",
  };

  const breadcrumbItems = [
    { label: "Product Management", href: "#" },
    { label: "Brands", href: "#" },
    { label: "Manage Brands", href: `/${userRole}/product/attributes` },
  ];
  
  const handleBulkDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the selected brands?"))
      return;

    try {
      const deleteData = {
        ids: selectedBrands,
        added_by: "admin",
        supplier_id: null,
      };

      const response = await fetch(
        `https://credible-api.techidata.com/v2/api/supplierSeller/delete-brand`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(deleteData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete selected brands");
      }

      toast.success("Selected brands deleted successfully!");
      setBrandData(brandData.filter((b) => !selectedBrands.includes(b.id)));
      setSelectedBrands([]);
      setSelectAll(false);
    } catch (err) {
      toast.error("Error deleting selected brands");
      console.error(err);
    }
  };

  return (
    <div className="rounded p-2 bg-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Breadcrumbs pageTitle="Manage Brands" items={breadcrumbItems} />

        <div className="flex-1 overflow-y-auto bg-gray-100 ">
          <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                           <div className='w-full md:w-auto'>
  <div className="dropdown">
    <div
      tabIndex={0}
      role="button"
      className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base flex items-center justify-center gap-2"
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
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white"
    >
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
            {selectedBrands.length > 0 && (
              <div className="flex justify-end mb-2 px-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </button>
              </div>
            )}

            {/* Brand Table */}
            <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto overflow-y-hidden">
              <table className="w-full table-auto mb-10 min-w-[900px]">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Company Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Brand Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Brand Logo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Products
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords?.map((brand, i) => (
                    <tr
                      key={brand.id}
                      className="hover:bg-gray-50 border-b border-gray-300"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => handleCheckboxChange(brand.id)}
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {i+1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {brand.category_id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {brand.company_name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {brand.brand_name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        <img
                          src={brand.brand_logo}
                          alt={brand.brand_name}
                          className="w-12 h-12 object-contain"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {brand.product_id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {brand.country}
                      </td>
                      <td
                        className={`px-4 py-4 text-sm font-semibold ${
                          statusColors[brand.status]
                        }`}
                      >
                        {statusLabels[brand.status] || brand.status}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <button
                            tabIndex={0}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <BsThreeDots
                              className="mt-2 text-blue-500"
                              size={28}
                            />
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-white z-10 rounded-box w-30 shadow"
                          >
                            <li>
                            <Link to={`/${userRole}/product/brand/${brand.id}`}>

                                Edit
                              </Link>
                            </li>
                            <li>
                              <span
                                href="#"
                                onClick={() => handleDelete(brand.id)}
                              >
                                Delete
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      <div className="mt-4 px-4">
        <Pagination
          totalRecords={brandData.length}
          recordsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Brand;
