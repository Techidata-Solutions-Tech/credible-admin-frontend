import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import SelectMultipleMedia from "../../components/product/SelectMultipleImages";

const EditVariantForm = ({ data, setToggle, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  // Initialize formData to match SelectMultipleMedia's expected structure
  const [formData, setFormData] = useState({
    imageAndVideo: {
      images: data?.images || [],
      videos: data?.videos || []
    }
  });

  // Set initial form values
  React.useEffect(() => {
    if (data) {
      setValue('combinations', data.combinations);
      setValue('skuId', data.skuId);
      setValue('price', data.price);
      setValue('mrp', data.mrp);
      setValue('quantity', data.quantity);
      setValue('attributeIds', data.attributeIds.join(','));
      // Initialize with the correct structure
      setFormData({
        imageAndVideo: {
          images: data.images || [],
          videos: data.videos || []
        }
      });
    }
  }, [data, setValue]);

  const onSubmit = async (formValues) => {
    // Extract images and videos from the nested structure
    const { images, videos } = formData.imageAndVideo;
    
    const payLoad = {
      ...formValues,
      images: images || [],
      videos: videos || [],
      attributeIds: formValues.attributeIds.split(',').map(id => id.trim())
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/variant/${data.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payLoad),
      });

      const result = await response.json();
      if (response.ok) {
        document.getElementById('edit_variant2').close();
        setToggle(Date.now());
        toast.success('Variant updated successfully');
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Variant</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Combination</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('combinations', { required: 'Combination is required' })}
            />
            {errors.combinations && <p className="mt-1 text-sm text-red-600">{errors.combinations.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('skuId', { required: 'SKU ID is required' })}
            />
            {errors.skuId && <p className="mt-1 text-sm text-red-600">{errors.skuId.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min={0}
              step="0.01"
              {...register('price', { required: 'Price is required', valueAsNumber: true })}
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min={0}
              step="0.01"
              {...register('mrp', { required: 'MRP is required', valueAsNumber: true })}
            />
            {errors.mrp && <p className="mt-1 text-sm text-red-600">{errors.mrp.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min={0}
              {...register('quantity', { required: 'Quantity is required', valueAsNumber: true })}
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Attribute IDs (comma separated)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('attributeIds', { required: 'Attribute IDs are required' })}
          />
          {errors.attributeIds && <p className="mt-1 text-sm text-red-600">{errors.attributeIds.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Media</label>
          <SelectMultipleMedia 
            formData={formData} 
            setFormData={setFormData} 
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => document.getElementById('edit_variant2').close()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Variant
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditVariantForm;