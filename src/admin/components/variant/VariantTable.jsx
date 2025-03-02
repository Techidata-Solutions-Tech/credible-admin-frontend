import React, { useEffect, useState } from 'react';
import EditVariantModal from './EditVariantModal';
import { ToastContainer, toast } from 'react-toastify';
import EditVariantForm from './EditVariantForm';
const VariantTable = ({variants,setToggle}) => {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  // const variants = [
  //   {
  //     id: 'V001',
  //     variantName: 'Color',
  //     variantValue: 'Red, Blue',
  //     SKU: 'SKU12345',
  //     quantity: 50,
  //     sellingPrice: 999,
  //     MRP: 1199,
  //     image: 'https://via.placeholder.com/50',
  //   },
  //   {
  //     id: 'V002',
  //     variantName: 'Size',
  //     variantValue: 'Medium, Large',
  //     SKU: 'SKU67890',
  //     quantity: 30,
  //     sellingPrice: 1499,
  //     MRP: 1799,
  //     image: 'https://via.placeholder.com/50',
  //   },
  //   {
  //     id: 'V003',
  //     variantName: 'Material',
  //     variantValue: 'Cotton, wool',
  //     SKU: 'SKU54321',
  //     quantity: 20,
  //     sellingPrice: 1299,
  //     MRP: 1599,
  //     image: 'https://via.placeholder.com/50',
  //   },
  // ];

  const handleEdit = (variant) => {
    setSelectedVariant(variant)
    // setSelectedVariantId(variantId);
    document.getElementById('edit_variant2').showModal();
  };

  const handleDeleteModal = (variantId) => {
    setSelectedVariantId(variantId);
    document.getElementById('variant_delete_modal').showModal();
  };
 
  const handleDelete = async (variantId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/delete-variant/${variantId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setToggle(Date.now())
        toast.success('Variant deleted successfully!')
        document.getElementById('variant_delete_modal').close();
      } else {
        const errorData = await response.json();
       toast.error(`Error: ${errorData.message}`)
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }
  };
  

  return (
   <>
   {/* <EditVariantModal setToggle={setToggle}/> */}
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden pt-[20px] pb-[40px]">
      <table className="w-full table-auto mb-10 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant SEO Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant value</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MRP</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {variants?.map((variant) => (
            <tr key={variant.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-4 py-4 text-sm text-gray-900">{variant.variant_name}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{variant.variant_seo_name}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{variant.variant_value}</td>
              <td className="px-4 py-4 text-sm text-gray-900">Rs.{variant.price}</td>
              <td className="px-4 py-4 text-sm text-gray-900">Rs.{variant.discount_price}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{variant.description}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{variant.review}⭐</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn">Action</div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-10 rounded-box w-52 shadow">
                    <li><a href="#" onClick={() => handleEdit(variant)}>Edit</a></li>
                    <li><a href="#" onClick={() => handleDeleteModal(variant.id)}>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Edit */}
      <dialog id="edit_variant2" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg pb-5">Edit variant</h3>
          <div className="modal-action">
           {selectedVariant && <EditVariantForm setToggle={setToggle} data={selectedVariant} />}
            <button className="btn" onClick={() => document.getElementById('edit_variant2').close()}>Close</button>
          </div>
        </div>
      </dialog>

      {/* Modal for Delete */}
      <dialog id="variant_delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Variant</h3>
          <p className="py-4">Are you sure you want to delete variant ID: {selectedVariantId}?</p>
          <div className="modal-action">
            <button className="btn btn-error"
            onClick={() => handleDelete(selectedVariantId)}
            >Delete</button>
            <button className="btn" onClick={() => document.getElementById('variant_delete_modal').close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </div>
    </>
  );
};

export default VariantTable;
