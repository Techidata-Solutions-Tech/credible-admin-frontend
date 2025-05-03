import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";

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
  const [currentItems, setCurrentItems] = useState([]);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    const indexOfLast = page * perPage;
    const indexOfFirst = indexOfLast - perPage;
    setCurrentItems(filteredData.slice(indexOfFirst, indexOfLast));
  };
  useEffect(() => {
    fetchAttributes();
  }, []);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      const filtered = attributes.filter((attr) =>
        attr.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1);
      const indexOfLast = 1 * perPage;
      const indexOfFirst = indexOfLast - perPage;
      setCurrentItems(filtered.slice(indexOfFirst, indexOfLast));
    }, 300);
  
    return () => clearTimeout(debounceSearch); 
  }, [search, attributes,perPage]); 

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
      // Convert comma-separated values from backend to pipe-separated for display
      value: attribute.value.join(" | "),
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
      // Convert pipe-separated input to comma-separated for backend
      const valuesForBackend = editForm.value.split("|").map(item => item.trim());
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/attribute/${currentAttribute.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          value: valuesForBackend
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

const breadcrumbItems = [
  { label: 'Product Management', href: '#' },
  { label: 'Attributes', href: '#' },
   
    { label: 'Manage Attributes', href: '/admin/product/attributes' },
  ];

  return (
    <div className="flex h-screen overflow-auto">

      <div className="flex-1 flex flex-col overflow-auto px-4">
        
        <ToastContainer />
        <Breadcrumbs
          pageTitle="Manage Attributes"
          items={breadcrumbItems}
        />

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
     
        {/* Table */}
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 uppercase">
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
                <td className="p-4">{attr.value.join(" | ")}</td>
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
        <Pagination
  totalRecords={filteredData.length}
  recordsPerPage={perPage}
  onPageChange={handlePageChange}
/>
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
                    <label className="block mb-2">Values (separate with | )</label>
                    <input
                      type="text"
                      name="value"
                      value={editForm.value}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                      placeholder="Value 1 | Value 2 | Value 3"
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