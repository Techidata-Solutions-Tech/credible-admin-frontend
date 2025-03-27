import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ProductHome = () => {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/get-productHome`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      if (result.status) {
        setProducts(result.data);
        toast.success("Products loaded successfully!");
      } else {
        throw new Error(result.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleState = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isActive: !product.isActive } : product
    ));
    toast.success("Product state updated!");
  };

  const editProduct = (id) => {
    toast.info(`Edit product with ID: ${id}`);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast.error("Product deleted!");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Home Products</h2>
          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Brand</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((item) => (
                      <tr key={item.id} className="text-center">
                        <td className="border p-2">
                          <img src={item.product.main_image} alt={item.product.product_name} className="h-16 w-16 object-cover mx-auto" />
                        </td>
                        <td className="border p-2">{item.product.product_name}</td>
                        <td className="border p-2">{item.product.brand_name}</td>
                        <td className="border p-2">${item.product.discount_price}</td>
                        <td className="border p-2">
                          <button 
                            className={`px-2 py-1 text-white rounded ${item.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                            onClick={() => toggleState(item.id)}
                          >
                            {item.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="border p-2">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => editProduct(item.id)}>Edit</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteProduct(item.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
      </div>
    </div>
  );
};

export default ProductHome;