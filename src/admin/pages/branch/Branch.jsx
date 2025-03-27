import React, { useState, useEffect } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const WarehouseTable = () => {
  const token = localStorage.getItem('token');
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/warehouse`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch warehouses");
        }
        const result = await response.json();
        if (result.success) {
          setFilteredWarehouses(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch warehouses");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredWarehouses].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredWarehouses(sortedData);
  };

  const handleSortButtonClick = () => {
    const key = sortConfig.key || "warehouseId";
    handleSort(key);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 overflow-hidden">
            <div className="bg-white rounded shadow-lg p-4 h-full flex items-center justify-center">
              <p>Loading warehouses...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 overflow-hidden">
            <div className="bg-white rounded shadow-lg p-4 h-full flex items-center justify-center">
              <p className="text-red-600">Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white rounded shadow-lg p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold bg-blue-600 text-white p-2 rounded">
              Manage Warehouses
            </h2>
            <div className="flex justify-between items-center my-2">
              <Link
                to={"/admin/warehouse/create"}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Create Warehouse ID
              </Link>
              <button
                className="bg-gray-200 text-black px-4 py-2 flex items-center rounded"
                onClick={handleSortButtonClick}
              >
                Sort{" "}
                {sortConfig.direction === "ascending" ? (
                  <FaSortUp className="ml-1" />
                ) : (
                  <FaSortDown className="ml-1" />
                )}
              </button>
            </div>
            <div className="overflow-auto max-h-[30rem] flex-1">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50 text-black">
                    <th className="px-4 py-3 text-left text-[14px] font-[700]">
                      No
                    </th>
                    {[
                      { key: "warehouseId", label: "Warehouse ID" },
                      { key: "state", label: "State" },
                      { key: "city", label: "City" },
                      { key: "location", label: "Location" },
                      { key: "pinCode", label: "Pincode" },
                      { key: "address", label: "Address" },
                      { key: "name", label: "Name" },
                      { key: "email", label: "Email ID" },
                      { key: "phone", label: "Phone No" },
                      { key: "alternateNumber", label: "Alternate No" },
                      { key: "product", label: "Products" },
                      { key: "inventory", label: "Inventory" },
                      { key: null, label: "Action" },
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-[14px] font-[700] cursor-pointer"
                        onClick={() => header.key && handleSort(header.key)}
                      >
                        <div className="flex items-center">
                          {header.label}
                          {sortConfig.key === header.key &&
                            (sortConfig.direction === "ascending" ? (
                              <FaSortUp className="ml-1" />
                            ) : (
                              <FaSortDown className="ml-1" />
                            ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredWarehouses?.map((warehouse, index) => (
                    <tr key={warehouse.id} className="text-center border">
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.warehouseId}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.state}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.city}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.location}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.pinCode}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.address}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.name}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.email}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.phone}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.alternateNumber}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.product ? "Active" : "-"}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600">
                        {warehouse.inventory ? "Active" : "-"}
                      </td>
                      <td className="px-4 py-4 text-[14px] text-gray-600 cursor-pointer">
                        Update / Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseTable;
