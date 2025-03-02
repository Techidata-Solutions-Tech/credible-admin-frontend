import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CreateCoupon = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Coupon Data:', data);
  };

  return (
    <div>
      <Navbar />
      <div className='flex bg-gray-100 '>
        <Sidebar />
        <div className='rounded shadow-lg p-4 w-screen m-2 bg-white '>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md py-[50px]">
            
           <div className='flex justify-evenly'>
            <div className="mb-4">
                <label className="block text-sm font-semibold">Parent Category</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register('parentCategory', { required: 'Parent category is required' })}
                />
                {errors.parentCategory && <p className="text-red-500 text-xs">{errors.parentCategory.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Sub Category</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register('subCategory', { required: 'Sub category is required' })}
                />
                {errors.subCategory && <p className="text-red-500 text-xs">{errors.subCategory.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Child Category</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register('childCategory', { required: 'Child category is required' })}
                />
                {errors.childCategory && <p className="text-red-500 text-xs">{errors.childCategory.message}</p>}
              </div>
           </div>
           <div className='flex justify-evenly'>
           <div className="mb-4">
              <label className="block text-sm font-semibold">Brand/Company</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('brand', { required: 'Brand is required' })}
              />
              {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
            </div>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Product Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('product', { required: 'Product name is required' })}
              />
              {errors.product && <p className="text-red-500 text-xs">{errors.product.message}</p>}
            </div>

            {/* SKU */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">SKU</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('SKU', { required: 'SKU is required' })}
              />
              {errors.SKU && <p className="text-red-500 text-xs">{errors.SKU.message}</p>}
            </div>
           </div>
           
           <div className='flex justify-evenly'>
           <div className="mb-4">
              <label className="block text-sm font-semibold">Discount Type</label>
              <select
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('discountType', { required: 'Discount type is required' })}
              >
                <option value="">Select Discount Type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              {errors.discountType && <p className="text-red-500 text-xs">{errors.discountType.message}</p>}
            </div>

            {/* Discount Value */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Discount Value</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('discountValue')}
              />
            </div>

            {/* User Group */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">User Group</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('userGroup', { required: 'User group is required' })}
              />
              {errors.userGroup && <p className="text-red-500 text-xs">{errors.userGroup.message}</p>}
            </div>
           </div>
           <div className='flex justify-evenly'>
            {/* Minimum Order Amount */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Min Order Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('minOrderAmount')}
              />
            </div>

            {/* Minimum Order Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Min Order Quantity</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('minOrderQuantity')}
              />
            </div>

            {/* Limit Per Coupon */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Limit Per Coupon</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('limitPerCoupon')}
              />
            </div>
           </div>
           

           <div className='flex justify-evenly'>
              {/* Coupon Used */}
              <div className="mb-4">
              <label className="block text-sm font-semibold">Coupon Used</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('couponUsed')}
              />
            </div>

            {/* Start Date & Time */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Start Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('startDateTime')}
              />
            </div>

            {/* End Date & Time */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">End Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('endDateTime')}
              />
            </div>
           </div>
            {/* Submit Button */}
            <button type="submit" className=" p-2 bg-blue-600 text-white rounded-md my-10">
              Submit
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
