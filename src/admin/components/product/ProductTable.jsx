import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";

const ProductTable = ({products}) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
console.log(products);

  // const products = [
  //   {
  //     id: 'P001',
  //     category: 'Electronics',
  //     subcategory: 'Mobile Phones',
  //     childcategory: 'Smartphones',
  //     image: '/60.png',
  //     name: 'Smartphone',
  //     brand: 'Samsung',
  //     model: 'Galaxy S22',
  //     variant: '128GB',
  //     SKU: 'SAM-S22-128',
  //     UOM: 'Piece',
  //     taxRate: '18%',
  //     sellingPrice: 750.0,
  //     MRP: 800.0,
  //   },
  //   {
  //     id: 'P002',
  //     category: 'Appliances',
  //     subcategory: 'Cooling',
  //     childcategory: 'Air Conditioners',
  //     image: '/56.png',
  //     name: 'Air Conditioner',
  //     brand: 'LG',
  //     model: 'DualCool',
  //     variant: '1.5 Ton',
  //     SKU: 'LG-AC-15',
  //     UOM: 'Unit',
  //     taxRate: '12%',
  //     sellingPrice: 450.0,
  //     MRP: 500.0,
  //   },
  //   {
  //     id: 'P004',
  //     category: 'Appliances',
  //     subcategory: 'Cooling',
  //     childcategory: 'Air Conditioners',
  //     image: '/51.png',
  //     name: 'Air Conditioner',
  //     brand: 'LG',
  //     model: 'DualCool',
  //     variant: '1.5 Ton',
  //     SKU: 'LG-AC-15',
  //     UOM: 'Unit',
  //     taxRate: '12%',
  //     sellingPrice: 450.0,
  //     MRP: 500.0,
  //   },
  //   {
  //     id: 'P003',
  //     category: 'Furniture',
  //     subcategory: 'Office',
  //     childcategory: 'Chairs',
  //     image: '/53.png',
  //     name: 'Office Chair',
  //     brand: 'IKEA',
  //     model: 'ErgoComfort',
  //     variant: 'Black',
  //     SKU: 'IKEA-OC-BLK',
  //     UOM: 'Piece',
  //     taxRate: '5%',
  //     sellingPrice: 120.0,
  //     MRP: 150.0,
  //   },
  //   {
  //     id: 'P005',
  //     category: 'Furniture',
  //     subcategory: 'Office',
  //     childcategory: 'Chairs',
  //     image: '/56.png',
  //     name: 'Office Chair',
  //     brand: 'IKEA',
  //     model: 'ErgoComfort',
  //     variant: 'Black',
  //     SKU: 'IKEA-OC-BLK',
  //     UOM: 'Piece',
  //     taxRate: '5%',
  //     sellingPrice: 120.0,
  //     MRP: 150.0,
  //   },
  // ];

  const handleDelete = (productId) => {
    setSelectedProductId(productId);
    document.getElementById('my_modal_delete').showModal();
  };

  return (
    <div className="w-full bg-gray-100 border rounded-lg shadow-md">
      <table className="w-full overflow-x-auto">
        <thead className="bg-gray-50 text-black">
          <tr className=' uppercase'>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Image</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">ID</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Category</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Subcategory</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Child Category</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Name</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Brand</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Model</th>
            {/* <th className="px-4 py-3 text-left text-[14px] font-[700] ">Variant</th> */}
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">SKU</th>
            {/* <th className="px-4 py-3 text-left text-[14px] font-[700] ">UOM</th> */}
            {/* <th className="px-4 py-3 text-left text-[14px] font-[700] ">Tax Rate</th> */}
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Selling Price ($)</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">MRP ($)</th>
            <th className="px-4 py-3 text-left text-[14px] font-[700] ">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {products?.map((product) => (
            <tr key={product?.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <img src={product?.main_image} alt={product?.product_name} className="h-12 w-12 rounded-lg object-cover shadow" />
              </td>
              <td className="px-4 py-4 text-[14px] text-gray-600 font-semibold">{product?.id}</td>
              <td className="px-4 py-4 text-[14px] text-gray-600">{product?.main_category}</td>
              <td className="px-4 py-4 text-[14px] text-gray-600">{product?.sub_category}</td>
              <td className="px-4 py-4 text-[14px] text-gray-600">{product?.child_category}</td>
              <td className="px-4 py-4 text-[14px] text-gray-700">{product?.product_name}</td>
              <td className="px-4 py-4 text-[14px] text-gray-600">{product?.brand_name}</td>
              <td className="px-4 py-4 text-[14px] text-gray-600">{product?.model_name}</td>
              {/* <td className="px-4 py-4 text-[14px] text-gray-600">{product?.variant}</td> */}
              <td className="px-4 py-4 text-[14px] text-gray-600">{product?.SKU}</td>
              {/* <td className="px-4 py-4 text-[14px] text-gray-600">{product?.UOM}</td> */}
              {/* <td className="px-4 py-4 text-[14px] text-gray-600">{product?.taxRate}</td> */}
              <td className="px-4 py-4 text-[14px] text-green-700 font-semibold">
                {product?.seller_price}
              </td>
              <td className="px-4 py-4 text-sm text-red-500 font-semibold">{product?.mrp}</td>
              <td className="px-4 py-4 text-sm text-gray-700 flex justify-center gap-3">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
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
