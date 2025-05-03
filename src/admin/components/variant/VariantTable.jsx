import React, { useEffect, useState } from 'react';
import EditVariantModal from './EditVariantModal';
import { ToastContainer, toast } from 'react-toastify';
import EditVariantForm from './EditVariantForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VariantTable = ({ variants, setToggle,token }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleEdit = (variant) => {
    setSelectedVariant(variant);
    document.getElementById('edit_variant2').showModal();
  };
console.log(variants);

  const handleDeleteModal = (variantId) => {
    setSelectedVariantId(variantId);
    document.getElementById('variant_delete_modal').showModal();
  };
 
  const handleDelete = async (variantId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/variant/${variantId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setToggle(Date.now());
        toast.success('Variant deleted successfully!');
        document.getElementById('variant_delete_modal').close();
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-auto pt-[20px] pb-[40px]">
        <table className="w-full table-auto mb-10">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Combination</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MRP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Videos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variants?.map((variant) => (
              <tr key={variant.id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-4 text-sm text-gray-900">{variant.combinations}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{variant.skuId}</td>
                <td className="px-4 py-4 text-sm text-gray-900">Rs.{variant.price}</td>
                <td className="px-4 py-4 text-sm text-gray-900">Rs.{variant.mrp}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{variant.quantity}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {variant.images?.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {variant.images.slice(0, 2).map((img, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-1 rounded">Image {index + 1}</span>
                      ))}
                      {variant.images.length > 2 && (
                        <span className="text-xs bg-gray-100 px-1 rounded">+{variant.images.length - 2} more</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No images</span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {variant.videos?.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {variant.videos.slice(0, 2).map((video, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-1 rounded">Video {index + 1}</span>
                      ))}
                      {variant.videos.length > 2 && (
                        <span className="text-xs bg-gray-100 px-1 rounded">+{variant.videos.length - 2} more</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No videos</span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 flex gap-2">
                  <button 
                    onClick={() => handleEdit(variant)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteModal(variant.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Edit */}
        <dialog id="edit_variant2" className="modal">
          <div className="modal-box max-w-5xl">
            <div className="modal-action">
              {selectedVariant && <EditVariantForm setToggle={setToggle} data={selectedVariant} token={token}/>}
              <button className="btn" onClick={() => document.getElementById('edit_variant2').close()}>Close</button>
            </div>
          </div>
        </dialog>

        {/* Modal for Delete */}
        <dialog id="variant_delete_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Variant</h3>
            <p className="py-4">Are you sure you want to delete this variant?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={() => handleDelete(selectedVariantId)}>Delete</button>
              <button className="btn" onClick={() => document.getElementById('variant_delete_modal').close()}>Cancel</button>
            </div>
          </div>
        </dialog>
      </div>
      <ToastContainer  autoClose={3000} closeButton={true}/>
    </>
  );
};

export default VariantTable;