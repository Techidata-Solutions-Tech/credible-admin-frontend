import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Select from "react-select";

const AddProductHome = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedKind, setSelectedKind] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);



  const productOptions = [
    { value: "choco_box", label: "Choco Box" },
    { value: "power_adapter", label: "Power Adapter" },
    { value: "mini_ups", label: "Mini UPS" },
  ];
  
  const kindOptions = [
    { value: "THIS_WEEK_SAVOUR", label: "This Week Savour" },
    { value: "BEST_SELLER", label: "Best Seller" },
  ];
  
  const warehouseOptions = [
    { value: "WH1", label: "Warehouse 1" },
    { value: "WH2", label: "Warehouse 2" },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Products:", selectedProducts);
    console.log("Selected Kind:", selectedKind);
    console.log("Selected Warehouse:", selectedWarehouse);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
          <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmit}>
        {/* Multi-Select Products */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Products</label>
          <Select
            options={productOptions}
            isMulti
            value={selectedProducts}
            onChange={setSelectedProducts}
            classNamePrefix="select"
            placeholder="Select Products..."
          />
        </div>

        {/* Single-Select Kind Option */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Kind</label>
          <Select
            options={kindOptions}
            value={selectedKind}
            onChange={setSelectedKind}
            classNamePrefix="select"
            placeholder="Select Kind..."
          />
        </div>

        {/* Single-Select Warehouse */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Warehouse</label>
          <Select
            options={warehouseOptions}
            value={selectedWarehouse}
            onChange={setSelectedWarehouse}
            classNamePrefix="select"
            placeholder="Select Warehouse..."
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductHome;
