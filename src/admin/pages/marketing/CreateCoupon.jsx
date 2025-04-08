import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Select from 'react-select';

const CreateCoupon = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAllProducts, setIsAllProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/all-category-hierarchy`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/getAllProducts`);
        const data = await response.json();
        
        const prodData = data?.data;
        console.log(prodData);
        
        setProducts(prodData?.map(product => ({ value: product.id, label: product.product_name, sku: product.SKU, brand: product.brand_name })));
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleParentChange = (e) => {
    const parentId = e.target.value;
    const parent = categories.find(cat => cat.id === parseInt(parentId));
    if (parent) {
      setSelectedParent(parent);
      setSubCategories(parent.children || []);
      setChildCategories([]);
      setValue('parentCategory', parent.name);
    }
  };

  const handleSubChange = (e) => {
    const subId = e.target.value;
    const sub = subCategories.find(cat => cat.id === parseInt(subId));
    if (sub) {
      setSelectedSub(sub);
      setChildCategories(sub.children || []);
      setValue('subCategory', sub.name);
    }
  };

  const handleChildChange = (e) => {
    const childId = e.target.value;
    const child = childCategories.find(cat => cat.id === parseInt(childId));
    if (child) {
      setValue('childCategory', child.name);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        products: selectedProducts.map(product => ({
          id: product.value,
          name: product.label,
          sku: product.sku,
          brand: product.brand
        }))
      };

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/create-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.success) {
        toast.success('Coupon created successfully!');
      } else {
        toast.error(result.message || 'Failed to create coupon');
      }
    } catch (error) {
      toast.error('An error occurred while creating the coupon');
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className='flex bg-gray-100 '>
        <Sidebar />
        <div className='rounded shadow-lg p-4 w-screen m-2 bg-white '>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md py-[50px]">
            <div className='flex justify-evenly'>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Parent Category</label>
                <select
                  className="w-full p-2 border rounded-md bg-transparent"
                  onChange={handleParentChange}
                >
                  <option value="">Select Parent Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.parentCategory && <p className="text-red-500 text-xs">{errors.parentCategory.message}</p>}
              </div>

              {/* Sub-Category Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Sub Category</label>
                <select
                  className="w-full p-2 border rounded-md bg-transparent"
                  onChange={handleSubChange}
                  disabled={!selectedParent}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.subCategory && <p className="text-red-500 text-xs">{errors.subCategory.message}</p>}
              </div>

              {/* Child Category Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">Child Category</label>
                <select
                  className="w-full p-2 border rounded-md bg-transparent"
                  onChange={handleChildChange}
                  disabled={!selectedSub}
                >
                  <option value="">Select Child Category</option>
                  {childCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.childCategory && <p className="text-red-500 text-xs">{errors.childCategory.message}</p>}
              </div>
            </div>
            <div className='flex justify-evenly gap-2'>
              {/* Checkbox for "ALL Products" */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={isAllProducts}
                    onChange={(e) => setIsAllProducts(e.target.checked)}
                  />
                  {' '}ALL Products
                </label>
              </div>

              {/* Product Name Dropdown */}
              {!isAllProducts && (
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-semibold">Product Name</label>
                  <Select
                    isMulti
                    options={products}
                    onChange={(selectedOptions) => {
                      setSelectedProducts(selectedOptions);
                      setValue('products', selectedOptions);
                    }}
                    className="w-full flex-1"
                  />
                  {errors.products && <p className="text-red-500 text-xs">{errors.products.message}</p>}
                </div>
              )}
            </div>
            {/* Render Selected Products as a Table */}
            {!isAllProducts && selectedProducts.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold">Selected Products</label>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">Product Name</th>
                        <th className="px-4 py-2 border-b border-l border-r">SKU</th>
                        <th className="px-4 py-2 border-b">Brand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.map(product => (
                        <tr key={product.value}>
                          <td className="px-4 py-2 border-b">{product.label}</td>
                          <td className="px-4 py-2 border-b border-l border-r">{product.sku}</td>
                          <td className="px-4 py-2 border-b">{product.brand}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className='flex justify-evenly'>
              {/* Discount Type */}
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
// {
//   "name":"",
//   "category":2,
//   "subCategoty":3,
//   "subSubCategory":4,
//   "couponType":"SELECTED",--------
//   "productIds":[1,3.5],
//   "couponName":"",
//   "couponCode":"",
//   "discountType":"FIXED",
//   "minimumOrderValue":23,
//   "minimumQuantity":2,
//   "limitPerCoupon":2,
//   "couponUsed":5,
//   "startDate":"",
//   "endDate":""
// }