import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
import { FaTimes } from "react-icons/fa";

const CreateTaxForm = ({ token }) => {
  const [formData, setFormData] = useState({
    taxRate: "",
    cgst: "",
    sgst: "",
    igst: "",
    hsnCode: "",
    description: "",
    category: "",
    status: true,
  });
  const [count, setCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/all-category?sort=asc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(catResponse.data.categories || []);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, [token]);

  const handleCsvUploadSuccess = () => {
    toast.success("CSV uploaded successfully");
    setCount(Date.now());
    setIsCsvModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taxRate") {
      const numericValue = parseFloat(value) || 0;
      const halfValue = (numericValue / 2).toFixed(2);

      setFormData({
        ...formData,
        taxRate: value,
        cgst: halfValue,
        sgst: halfValue,
        igst: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      taxRate: parseFloat(formData.taxRate),
      cgst: parseFloat(formData.cgst),
      sgst_utgst: parseFloat(formData.sgst),
      igst: parseFloat(formData.igst),
      hsn: formData.hsnCode,
      categorie: categories.find((c) => c.name === formData.category)?.id || 1,
      description: formData.description,
      status: formData.status,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/tax`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Tax created successfully");
      setFormData({
        taxRate: "",
        cgst: "",
        sgst: "",
        igst: "",
        hsnCode: "",
        description: "",
        category: "",
        status: true,
      });
    } catch (error) {
      toast.error("Failed to create tax");
    }
  };
  const breadcrumbItems = [
    { label: "Tax Management", href: "#" },
    { label: "Tax", href: "#" },
    { label: "Create Taxes", href: "/admin/taxes/hsn-sac" },
    // { label: 'Create Product Category', href: '/create-product-category' }
  ];
  return (
    <div className="bg-white p-2">
      <Breadcrumbs pageTitle="Create Tax" items={breadcrumbItems} />
      <div className="flex justify-end bg-gray-100 mb-4">
        <div className="flex flex-end my-2">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Bulk
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" rounded-md mt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            type="number"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleChange}
            className="input border border-gray-500 w-full md:col-span-6"
            placeholder="Tax Rate (%)"
            required
          />

          <input
            type="number"
            name="cgst"
            value={formData.cgst}
            readOnly
            className="input border border-gray-500 w-full bg-gray-100 md:col-span-2"
            placeholder="CGST (%)"
            required
          />

          <input
            type="number"
            name="sgst"
            value={formData.sgst}
            readOnly
            className="input border border-gray-500 w-full bg-gray-100 md:col-span-2"
            placeholder="SGST/UTGST (%)"
            required
          />

          <input
            type="number"
            name="igst"
            value={formData.igst}
            readOnly
            className="input border border-gray-500 w-full bg-gray-100 md:col-span-2"
            placeholder="IGST (%)"
            required
          />

          <input
            type="text"
            name="hsnCode"
            value={formData.hsnCode}
            onChange={handleChange}
            className="input border border-gray-500 w-full md:col-span-3"
            placeholder="HSN Code"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select  border border-gray-500  w-full md:col-span-3"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea  border border-gray-500  w-full"
            placeholder="Description"
            rows={4}
            required
          />
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.status}
              onChange={() =>
                setFormData({ ...formData, status: !formData.status })
              }
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            <span className="ml-3 text-sm font-medium">Active</span>
          </label>
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-primary">
            Create Tax
          </button>
        </div>
      </form>
      {isCsvModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-lg font-semibold">Upload Tax CSV</h2>
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-4">
              <input
                type="file"
                accept=".csv"
                className="file-input file-input-bordered w-full"
              />
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => setIsCsvModalOpen(false)}
                  className="btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCsvUploadSuccess}
                  className="btn btn-primary"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTaxForm;
