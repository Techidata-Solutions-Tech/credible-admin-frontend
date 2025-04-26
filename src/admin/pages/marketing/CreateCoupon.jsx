import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import Breadcrumbs from '../../components/Breadcrumbs';

const CreateCoupon = () => {
  const token = localStorage.getItem("token");
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/all-category-hierarchy`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/product`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
        products: selectedProducts?.map(product => ({
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
          Authorization:`Bearer ${token}`
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

  const breadcrumbItems = [
    { label: 'Marketing Management', href: '#' },
    { label: 'Coupons', href: '#' },
    { label: 'Create Coupon', href: '/admin/marketing/create-coupon' }
  ];
 
    return (
     
      <div className="overflow-x-auto p-4 min-h-screen ">
      <Breadcrumbs pageTitle="Create Coupon" items={breadcrumbItems} />
      <ToastContainer />
      <div className="max-w-5xl mx-auto my-8 ">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="grid grid-cols-1 gap-y-8"
        >
          {/* Category Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Parent Category</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                onChange={handleParentChange}
              >
                <option value="">Select Parent Category</option>
                {categories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.parentCategory && <p className="text-red-500 text-xs">{errors.parentCategory.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Sub Category</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                onChange={handleSubChange}
                disabled={!selectedParent}
              >
                <option value="">Select Sub Category</option>
                {subCategories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.subCategory && <p className="text-red-500 text-xs">{errors.subCategory.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Child Category</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                onChange={handleChildChange}
                disabled={!selectedSub}
              >
                <option value="">Select Child Category</option>
                {childCategories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.childCategory && <p className="text-red-500 text-xs">{errors.childCategory.message}</p>}
            </div>
          </div>

          {/* Product Selection */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="inline-flex items-center text-sm font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={isAllProducts}
                  onChange={(e) => setIsAllProducts(e.target.checked)}
                  className="mr-2 accent-blue-600"
                />
                ALL Products
              </label>
            </div>
            {!isAllProducts && (
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Product Name</label>
                <Select
                  isMulti
                  options={products}
                  onChange={(selectedOptions) => {
                    setSelectedProducts(selectedOptions);
                    setValue('products', selectedOptions);
                  }}
                  className="w-full"
                />
                {errors.products && <p className="text-red-500 text-xs">{errors.products.message}</p>}
              </div>
            )}
            {!isAllProducts && selectedProducts.length > 0 && (
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Selected Products</label>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">Product Name</th>
                        <th className="px-4 py-2 border-b border-l border-r">SKU</th>
                        <th className="px-4 py-2 border-b">Brand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts?.map(product => (
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
          </div>

          {/* Discount, User Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Discount Type</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('discountType', { required: 'Discount type is required' })}
              >
                <option value="">Select Discount Type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              {errors.discountType && <p className="text-red-500 text-xs">{errors.discountType.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Discount Value</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('discountValue')}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">User Group</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('userGroup', { required: 'User group is required' })}
              />
              {errors.userGroup && <p className="text-red-500 text-xs">{errors.userGroup.message}</p>}
            </div>
          </div>

          {/* Order & Coupon Limits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Min Order Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('minOrderAmount')}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Min Order Quantity</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('minOrderQuantity')}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Limit Per Coupon</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('limitPerCoupon')}
              />
            </div>
          </div>

          {/* Usage & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Coupon Used</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('couponUsed')}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Start Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('startDateTime')}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">End Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('endDateTime')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Submit
            </button>
          </div>
        </form>
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