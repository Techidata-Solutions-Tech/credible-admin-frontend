import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
const AddVariantForm = ({ id,setToggle }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({});

  const onSubmit = async (data) => {
    const payLoad = {
      variant_name: data.variant_name,
      variant_seo_name: data.variant_seo_name,
      variant_value: data.variant_value,
      stock_status: data.stock_status,
      stock_qty: data.stock_qty,
      image_url: 'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
      price: data.price,
      discount_price: data.discount_price,
      description: data.description,
      review: data.review
  }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/add-variant/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payLoad)
      });
      const result = await response.json();
      if(response.status === 201){
        document.getElementById('add_variant').close()
        setToggle(Date.now)
        toast.success('Variant added sucessfully')
      }else{
        toast.error(`Error: ${result.message}`)
      }
    } catch (error) {
     toast.error(`Error: ${error.message}`)
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">
      <div className="mb-4">
        <label className="block text-sm font-semibold">Variant Name</label>
        <input type="text" className="w-full p-2 border rounded-md" {...register('variant_name', { required: 'Variant name is required' })} />
        {errors.variant_name && <p className="text-red-500 text-xs">{errors.variant_name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Variant SEO Name</label>
        <input type="text" className="w-full p-2 border rounded-md" {...register('variant_seo_name')} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Variant Value</label>
        <input type="text" className="w-full p-2 border rounded-md" {...register('variant_value', { required: 'Value is required' })} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Stock Status</label>
        <select className="w-full p-2 border rounded-md" {...register('stock_status', { required: 'Stock status is required' })}>
          <option value={true}>In Stock</option>
          <option value={false}>Out of Stock</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Stock Quantity</label>
        <input type="number" className="w-full p-2 border rounded-md" {...register('stock_qty', { required: 'Stock quantity is required', valueAsNumber: true })} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Image URL</label>
        <input type="file" className="w-full p-2 border rounded-md" {...register('image_url')} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Price</label>
        <input type="number" className="w-full p-2 border rounded-md" min={0} {...register('price', { required: 'Price is required', valueAsNumber: true })} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Discount Price</label>
        <input type="number" className="w-full p-2 border rounded-md" min={0} {...register('discount_price', { valueAsNumber: true })} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Description</label>
        <textarea className="w-full p-2 border rounded-md" {...register('description')} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Review</label>
        <input type="number" className="w-full p-2 border rounded-md" {...register('review', { valueAsNumber: true })} />
      </div>

      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
        Submit
      </button>
    </form>

   
     </>
  );
};

export default AddVariantForm;
