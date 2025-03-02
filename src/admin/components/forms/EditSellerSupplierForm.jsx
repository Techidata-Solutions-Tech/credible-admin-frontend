import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditSellerSupplierForm = ({ supplierId, name }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Fetch existing supplier data
  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/suppliers/${supplierId}`); // Replace with your API endpoint
        const data = await response.json();
        setInitialData(data);
        reset(data); // Populate the form with the fetched data
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (supplierId) {
      fetchSupplierData();
    }
  }, [supplierId, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'PUT', // Use PUT or PATCH as per your API design
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update supplier data');
      }

      console.log('Supplier data updated successfully');
    } catch (error) {
      console.error('Error updating supplier data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold">{name} Name</label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border rounded-md"
          {...register('name', { required: `${name} name is required` })}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold">Email</label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded-md"
          {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email format' } })}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-semibold">Password</label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded-md"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
        <input
          id="phone"
          type="text"
          className="w-full p-2 border rounded-md"
          {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' } })}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="company_name" className="block text-sm font-semibold">Company Name</label>
        <input
          id="company_name"
          type="text"
          className="w-full p-2 border rounded-md"
          {...register('company_name', { required: 'Company Name is required' })}
        />
        {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="gst_number" className="block text-sm font-semibold">GST Number</label>
        <input
          id="gst_number"
          type="text"
          className="w-full p-2 border rounded-md"
          {...register('gst_number', { required: 'GST Number is required' })}
        />
        {errors.gst_number && <p className="text-red-500 text-xs">{errors.gst_number.message}</p>}
      </div>

      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default EditSellerSupplierForm;
