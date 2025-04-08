import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "../Pagination";
import TopTabs from "../../pages/customer/TopTabs";
const TaxTable = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [selectedTaxId, setSelectedTaxId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const taxResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/tax`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTaxes(taxResponse.data.data);

        const catResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/all-category?sort=asc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(catResponse.data.categories);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, [token, count]);

  const handleDeletePopUp = (id) => {
    setSelectedTaxId(id);
    document.getElementById("delete_modal").showModal();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/admin/tax/${selectedTaxId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCount(Date.now());
      document.getElementById("delete_modal").close();
      toast.success("Tax deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tax");
    }
  };
  const calculateTaxRateCounts = (taxes) => {
    const counts = {};
    taxes.forEach((tax) => {
      const rate = `${tax.taxRate}%`;
      counts[rate] = (counts[rate] || 0) + 1;
    });
    return Object.entries(counts).map(([rate, count],i) => ({
      id:i,
      label :`${rate}  (${count})`
    }));
  };
  console.log(calculateTaxRateCounts(taxes));
  
  const handleStatusChange = async (tax) => {
    try {
      const updatedTax = { status: !tax.status };
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/admin/tax/${tax.id}`,
        updatedTax,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCount(Date.now());
      toast.success(`Tax ${updatedTax.status ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error("Failed to update tax status");
    }
  };

  const handleEdit = (tax) => {
    setSelectedTax(tax);
    setIsModalOpen(true);
  };

  const handleSaveTax = async (taxData) => {
    try {
      const payload = {
        taxRate: parseFloat(taxData.taxRate.replace("%", "")),
        cgst: parseFloat(taxData.cgst),
        sgst_utgst: parseFloat(taxData.sgst),
        igst: parseFloat(taxData.igst),
        hsn: taxData.hsnCode,
        categorie: categories.find((c) => c.name === taxData.category)?.id || 1,
        description: taxData.description,
        status: taxData.status || true,
      };

      if (selectedTax) {
        // Update
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/admin/tax/${selectedTax.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Tax updated successfully");
      } else {
        // Create
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/admin/tax`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Tax created successfully");
      }

      setCount(Date.now());
      setIsModalOpen(false);
      setSelectedTax(null);
    } catch (error) {
      toast.error(
        selectedTax ? "Failed to update tax" : "Failed to create tax"
      );
    }
  };

  const handleCsvUploadSuccess = () => {
    toast.success("CSV uploaded successfully");
    setCount(Date.now());
    setIsCsvModalOpen(false);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = taxes.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="w-full shadow-lg rounded-lg border overflow-hidden py-8">
       <div className="w-full my-2">
              <div className="max-w-full px-4">
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-full overflow-x-auto py-2">
                    <div className="flex flex-col justify-center min-w-full">
                      <TopTabs tabs={calculateTaxRateCounts(taxes)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      <ToastContainer />
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this tax?</p>
          <div className="modal-action">
            <button className="btn btn-error mr-2" onClick={handleDelete}>
              Delete
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex justify-end px-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedTax(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Single
          </button>
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Bulk
          </button>
        </div>
      </div>

      <div className="px-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="uppercase bg-gray-100">
              <th className="px-4 py-2 text-left">Tax Rate(%)</th>
              <th className="px-4 py-2 text-left">CGST(%)</th>
              <th className="px-4 py-2 text-left">SGST/UTGST(%)</th>
              <th className="px-4 py-2 text-left">IGST(%)</th>
              <th className="px-4 py-2 text-left">HSN Code</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((tax) => (
              <tr
                key={tax.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{tax.taxRate}%</td>
                <td className="px-4 py-2">{tax.cgst}</td>
                <td className="px-4 py-2">{tax.sgst_utgst}</td>
                <td className="px-4 py-2">{tax.igst}</td>
                <td className="px-4 py-2">{tax.hsn}</td>
                <td className="px-4 py-2">{tax.description}</td>
                <td className="px-4 py-2">{tax.categorieName}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleStatusChange(tax)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tax.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tax.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(tax)}>
                    <FiEdit className="text-blue-500" />
                  </button>
                  <button onClick={() => handleDeletePopUp(tax.id)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalRecords={taxes.length}
          recordsPerPage={recordsPerPage}
          onPageChange={(page, perPage) => {
            setCurrentPage(page);
            setRecordsPerPage(perPage);
          }}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-lg font-semibold">
                {selectedTax ? "Edit Tax" : "Create Tax"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedTax(null);
                }}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <TaxForm
              tax={selectedTax}
              categories={categories}
              onSave={handleSaveTax}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedTax(null);
              }}
            />
          </div>
        </div>
      )}

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

const TaxForm = ({ tax, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    taxRate: tax?.taxRate?.toString() || "",
    cgst: tax?.cgst?.toString() || "",
    sgst: tax?.sgst_utgst?.toString() || "",
    igst: tax?.igst?.toString() || "",
    hsnCode: tax?.hsn || "",
    description: tax?.description || "",
    category: tax?.categorieName || "",
    status: tax?.status ?? true,
  });

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
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Tax Rate (%)</label>
          <input
            type="text"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">CGST (%)</label>
          <input
            type="text"
            name="cgst"
            value={formData.cgst}
            readOnly
            className="input input-bordered w-full bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block mb-2">SGST/UTGST (%)</label>
          <input
            type="text"
            name="sgst"
            value={formData.sgst}
            readOnly
            className="input input-bordered w-full bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block mb-2">IGST (%)</label>
          <input
            type="text"
            name="igst"
            value={formData.igst}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">HSN Code</label>
          <input
            type="text"
            name="hsnCode"
            value={formData.hsnCode}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
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
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full h-32"
          required
        />
      </div>

      {tax && (
        <div className="mb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.status}
              onChange={() =>
                setFormData({ ...formData, status: !formData.status })
              }
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">Active</span>
          </label>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="btn">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {tax ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default TaxTable;
