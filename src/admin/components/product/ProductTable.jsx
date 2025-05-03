import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { toast } from 'react-toastify';

const ProductTable = ({products}) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
console.log(products);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      toast.success('Product deleted successfully:');
      return data;
      
    } catch (error) {
      toast.error('Error deleting product:');
      throw error;
    } };

  return (
    <div className="w-full bg-gray-100 border rounded-lg shadow-md z-10">
      <table className="w-full overflow-x-auto ">
        <thead className="bg-gray-50 text-black ">
          <tr className=' uppercase'>
          <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400"> <input type="checkbox" className='border border-black'/></th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">No</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">ID</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Category</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Subcategory</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Child Category</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Image</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400 min-w-[350px]">Product Name</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Brand</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Model</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Variant</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">SKU</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">UOM</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Tax Rate</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Selling Price ($)</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">MRP ($)</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Supplier</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {products?.map((product, index) => (
            <tr key={product?.id} className="hover:bg-gray-50">
              <td className="border border-gray-400 px-4 py-4">
              <input type="checkbox" className='border border-black'/>
              </td>
             
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600 font-semibold">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600 font-semibold">{product?.id}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.main_category}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.sub_category}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.child_category}</td>
              <td className="border border-gray-400 px-4 py-4">
                <img src={product?.images[0]} alt={product?.product_name} className="h-12 w-12 rounded-lg object-cover shadow" />
              </td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-700">{product?.product_name}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.brand_name}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.model_name}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.variant}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.SKU}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.UOM}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-gray-600">{product?.taxRate}</td>
              <td className="border border-gray-400 px-4 py-4 text-[14px] text-green-700 font-semibold">
                {product?.seller_price}
              </td>
              <td className="border border-gray-400 px-4 py-4 text-sm text-red-500 font-semibold">{product?.mrp}</td>
              <td className="border border-gray-400 px-4 py-4 text-sm text-red-500 font-semibold">{product?.supplier_name}</td>
              <td className="border-r border-b border-gray-400 px-4 py-4 text-sm text-gray-700 flex justify-center">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-5 text-blue-500' size={28} />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white shadow-md rounded-lg w-48 text-sm text-gray-700 z-10"
                  >
                    <li>
                      <Link to={`/admin/product/variant/${product?.id}` }className="hover:text-blue-500">
                        Variants
                      </Link>
                    </li>
                    <li>
                      <Link to={`/admin/product/edit-product/${product?.id}`} className="hover:text-blue-500">
                        Edit
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(product?.id)}
                        className="hover:text-red-500"
                      >
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
  );
};

export default ProductTable;
