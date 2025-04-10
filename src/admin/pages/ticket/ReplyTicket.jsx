import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/Breadcrumbs';

const ReplyTicket = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Reply Data:', data);
  };

  const breadcrumbItems = [
    { label: 'Ticket Management', href: '#' },
    { label: 'Tickets', href: '#' },
    { label: 'Reply Ticket', href: '/admin/marketing/create-coupon' }
  ];
 
    return (
      <div className=" p-4">
         <Breadcrumbs
              pageTitle="Reply Ticket"
              items={breadcrumbItems}
            />  
      <div className='flex bg-gray-100'>
        
        <div className='rounded shadow-lg p-4 w-screen m-2 bg-white'>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">

            {/* Customer ID (Disabled) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Customer ID</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed"
                {...register('customerId')}
                disabled
                value="CUST-001"
              />
            </div>

            {/* Category (Disabled) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Category</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed"
                {...register('category')}
                disabled
                value="Payment Issues"
              />
            </div>

            {/* Subject (Disabled) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Subject</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed"
                {...register('subject')}
                disabled
                value="Refund request for Order #12345"
              />
            </div>

            {/* Description (Editable) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('description', { required: 'Description is required' })}
                rows="4"
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>

            {/* Answer (Editable) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Answer</label>
              <textarea
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('answer', { required: 'Answer is required' })}
                rows="4"
              />
              {errors.answer && <p className="text-red-500 text-xs">{errors.answer.message}</p>}
            </div>

            {/* Buttons: Save & Submit */}
            <div className="flex gap-4">
              <button type="button" className="w-full p-2 bg-gray-500 text-white rounded-md">
                Save
              </button>
              <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
                Submit
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ReplyTicket;
