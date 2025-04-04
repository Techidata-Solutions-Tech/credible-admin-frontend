import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import SelectImageModal from "./SelectImageModal";

const EditCategoryPopup = ({ show, onClose, category, onSave }) => {
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState("");
  const [image, setImage] = useState("");
  const [index, setIndex] = useState(null);
const token = localStorage.getItem('token')
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setRedirect(category.redirect || "");
      setImage(category.image || "");
      setIndex(category.index || null)
    }
  }, [category]);

  const handleSave = async () => {
    try {
      const updatedCategory = { name, redirect, image };
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/admin/popularCategory/${
          category.id
        }`,
        updatedCategory,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      toast.success("Category updated successfully");
      onSave(updatedCategory);
      onClose();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return show ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 uppercase">Edit Category</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Redirect URL
          </label>
          <input
            type="text"
            value={redirect}
            onChange={(e) => setRedirect(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order
          </label>
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <SelectImageModal setImage={setImage}/>

        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const PopularCategoryTable = ({ popularCategory }) => {
  const [categories, setCategories] = useState(popularCategory);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
const token = localStorage.getItem('token')
  useEffect(() => {
    setCategories(popularCategory);
  }, [popularCategory]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/admin/popularCategory/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.success) {
        toast.success("Category deleted successfully");
        setCategories(categories.filter((category) => category.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleToggleStatus = async (id) => {
    const categoryToUpdate = categories.find((category) => category.id === id);
    const updatedStatus = !categoryToUpdate.status ; 

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/admin/popularCategory/${id}`,
        {
          status: updatedStatus, 
        },{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setCategories(
        categories.map((category) =>
          category.id === id ? { ...category, status: updatedStatus } : category
        )
      );
      toast.success("Category status updated successfully");
    } catch (error) {
      toast.error("Failed to update category status");
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setEditPopupVisible(true);
  };

  const handleSaveEdit = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setEditPopupVisible(false);
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full table-auto mb-10 min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Redirect URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories?.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-gray-50 border-b border-gray-300"
              >
                <td className="px-4 py-4 text-sm text-gray-900">
                  {category.id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <img
                    src={category.image}
                    alt="Category"
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-blue-500 underline">
                  <a
                    href={category.redirect}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {category.redirect}
                  </a>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <button
                  
                    className={`px-4 py-2 rounded-lg`}
                  >
                    {category.index }
                  </button>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <button
                    onClick={() => handleToggleStatus(category.id)}
                    className={`px-4 py-2 rounded-lg ${
                      category.status ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {category.status  ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <button
                      tabIndex={0}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <BsThreeDots className="mt-2 text-blue-500" size={28} />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow"
                    >
                      <li>
                        <button onClick={() => handleEdit(category)}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(category.id)}>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditCategoryPopup
        show={editPopupVisible}
        onClose={() => setEditPopupVisible(false)}
        category={currentCategory}
        onSave={handleSaveEdit}
      />
      <ToastContainer />
    </>
  );
};

export default PopularCategoryTable;