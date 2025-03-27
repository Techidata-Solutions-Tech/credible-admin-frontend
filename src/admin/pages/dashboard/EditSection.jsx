import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const SectionDetail = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState({ title: "", selectedProducts: [] });
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/admin/getAllProducts?page=0&limit=100`, config)
      .then((response) => {
        const formattedProducts = response.data.data.map((product) => ({
          product_name: product.product_name,
          value: product.id,
          main_image: product.main_image,
        }));
        setAllProducts(formattedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      });

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/admin/productHome/${id}`, config)
      .then((response) => {
        if (response.data.status) {
          const sectionData = response.data.data;
          setSection({
            title: sectionData.name,
            selectedProducts: sectionData.products.map((product) => ({
              value: product.id,
              product_name: product.product_name,
              main_image: product.main_image,
            })),
          });
        } else {
          toast.error("Failed to fetch section details.");
        }
      })
      .catch((error) => {
        console.error("Error fetching section:", error);
        toast.error("Failed to fetch section details.");
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setSection({ ...section, title: e.target.value });
  };

  const handleProductChange = (selectedOptions) => {
    setSection({ ...section, selectedProducts: selectedOptions });
  };

  const removeProduct = (value) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      setSection((prevSection) => ({
        ...prevSection,
        selectedProducts: prevSection.selectedProducts.filter(
          (product) => product.value !== value
        ),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: section.title,
      products: section.selectedProducts.map((product) => product.value),
    };

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/admin/productHome/${id}`, data)
      .then((response) => {
        if (response.data.status) {
          toast.success("Section updated successfully!");
          navigate("/admin/dashboard/section/manage"); 
        } else {
          toast.error("Failed to update section.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while updating the section.");
        console.error("Error updating section:", error);
      });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Section Details</h2>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Title:</label>
              <input
                type="text"
                value={section.title}
                onChange={handleTitleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Products:
              </label>
              <Select
                isMulti
                options={allProducts}
                value={section.selectedProducts}
                onChange={handleProductChange}
                getOptionLabel={(e) => e.product_name}
                getOptionValue={(e) => e.value}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <h3 className="text-lg font-semibold mt-4">Selected Products</h3>
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Image</th>
                  <th className="border border-gray-300 p-2">Product Name</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {section.selectedProducts.map((product) => (
                  <tr
                    key={product.value}
                    className="text-center border border-gray-300"
                  >
                    <td className="border border-gray-300 p-2">
                      <img
                        src={product.main_image}
                        alt={product.product_name}
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.product_name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        type="button"
                        onClick={() => removeProduct(product.value)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SectionDetail;
