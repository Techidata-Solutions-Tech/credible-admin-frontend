import React from 'react';
import { useForm } from 'react-hook-form';

const AddTaxForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md ">
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm text-gray-800 font-semibold">Category</label>
        <input
          id="category"
          type="text"
          className="w-full p-2 border rounded-md bg-transparent"
          {...register('category', { required: 'Category is required' })}
        />
        {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="product_name" className="block text-sm text-gray-800 font-semibold">Product Name</label>
        <input
          id="product_name"
          type="text"
          className="w-full p-2 border rounded-md bg-transparent"
          {...register('product_name', { required: 'Product name is required' })}
        />
        {errors.product_name && <p className="text-red-500 text-xs">{errors.product_name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="tax_rate" className="block text-sm text-gray-800 font-semibold">Tax Rate</label>
        <input
          id="tax_rate"
          type="number"
          step="0.01"
          min={0}
          className="w-full p-2 border rounded-md bg-transparent"
          {...register('tax_rate', { 
            required: 'Tax rate is required', 
            valueAsNumber: true, 
            min: { value: 0, message: 'Tax rate must be positive' } 
          })}
        />
        {errors.tax_rate && <p className="text-red-500 text-xs">{errors.tax_rate.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="hsn_code" className="block text-sm text-gray-800 font-semibold">HSN Code</label>
        <input
          id="hsn_code"
          type="text"
          className="w-full p-2 border rounded-md bg-transparent"
          {...register('hsn_code', { required: 'HSN code is required' })}
        />
        {errors.hsn_code && <p className="text-red-500 text-xs">{errors.hsn_code.message}</p>}
      </div>

      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">Submit</button>
    </form>
  );
};

export default AddTaxForm;
