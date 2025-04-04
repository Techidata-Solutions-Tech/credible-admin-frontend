import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar";
import Select from "react-select";
import Sidebar from "../../components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";
const CreateSection = () => {
  const token = localStorage.getItem('token');
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Manage Sections', href: '/admin/dashboard/section/manage' },
    { label: 'Create Section', href: '//admin/dashboard/section/manage' }
  ];
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/product`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const productOptions = products.map((product) => ({
    main_image: product.main_image,
    value: product.id,
    product_name: product.product_name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProductIds = selectedProducts.map((product) => product.value);
    const data = {
      name: title,
      index: index,
      products: selectedProductIds,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/productHome`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast.success("Product Home Added Successfully");
          navigate("/admin/dashboard/section/manage");
        } else {
          toast.error("Failed to add Product Home");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while adding the Product Home");
        console.error("Error submitting the form:", error);
      });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
        <Breadcrumbs
              pageTitle="Create HomePage Section"
              items={breadcrumbItems}
            />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">Section Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Order</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={title}
                onChange={(e) => setIndex(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Assign Products</label>
              <Select
                isMulti
                options={productOptions}
                value={selectedProducts}
                onChange={setSelectedProducts}
                getOptionLabel={(e) => e.product_name}
                getOptionValue={(e) => e.value}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Create Section
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateSection;
