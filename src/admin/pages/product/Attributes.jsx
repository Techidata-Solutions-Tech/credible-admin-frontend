import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";

const AttributeTable = () => {
  const [attributes, setAttributes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    value: "",
    type: "",
    order: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: ""
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/attribute`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setAttributes(data.data);
      setFilteredData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const filtered = attributes.filter((attr) =>
      attr.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attribute?")) {
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/attribute/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      toast.success("Attribute deleted successfully!");
      fetchAttributes();
    } catch (error) {
      toast.error("Failed to delete attribute.");
    }
  };

  const openEditModal = (attribute) => {
    setCurrentAttribute(attribute);
    setEditForm({
      name: attribute.name,
      value: attribute.value.join(", "),
      type: attribute.type,
      order: attribute.order,
      metaTitle: attribute.metaTitle || "",
      metaKeyword: attribute.metaKeyword || "",
      metaDescription: attribute.metaDescription || ""
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/attribute/${currentAttribute.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          value: editForm.value.split(",").map(item => item.trim())
        }),
      });

      if (response.ok) {
        toast.success("Attribute updated successfully!");
        fetchAttributes();
        setShowEditModal(false);
      } else {
        toast.error("Failed to update attribute.");
      }
    } catch (error) {
      toast.error("Error updating attribute.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Manage Attributes', href: '/admin/product/attributes' },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={1} />

      <div className="flex-1 flex flex-col overflow-hidden px-4">
        <Navbar />
        <ToastContainer />
        <Breadcrumbs
              pageTitle="Manage Attributes"
              items={breadcrumbItems}
            />
        {/* Search & Filter */}
        <div className="flex mb-4 space-x-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-1/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">No</th>
              <th className="p-4">Attribute Name</th>
              <th className="p-4">Values</th>
              <th className="p-4">Type</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((attr, index) => (
              <tr key={attr.id} className="text-center">
                <td className="p-4">{index + 1 + (currentPage - 1) * perPage}</td>
                <td className="p-4">{attr.name}</td>
                <td className="p-4">{attr.value.join(", ")}</td>
                <td className="p-4">{attr.type}</td>
                <td className="p-4">
                  <button
                    onClick={() => openEditModal(attr)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(attr.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredData.length / perPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4 uppercase">Edit Attribute</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Values (comma separated)</label>
                    <input
                      type="text"
                      name="value"
                      value={editForm.value}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Type</label>
                    <input
                      type="text"
                      name="type"
                      value={editForm.type}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Order</label>
                    <input
                      type="number"
                      name="order"
                      value={editForm.order}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={editForm.metaTitle}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Meta Keyword</label>
                    <input
                      type="text"
                      name="metaKeyword"
                      value={editForm.metaKeyword}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2">Meta Description</label>
                    <textarea
                      name="metaDescription"
                      value={editForm.metaDescription}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributeTable;