import React from 'react'
import { useForm } from 'react-hook-form';

const ActionReviewModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
    <dialog id="action_review" className="modal">
<div className="modal-box ">
  <h3 className="font-bold text-lg pb-5">Manage Review</h3>



  <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">
      <div className="mb-4">
        <label htmlFor="review" className="block text-sm font-semibold">Review</label>
        <textarea
          id="review"
          className="w-full p-2 border rounded-md"
          rows="4"
         disabled
         value={'Very good product'}
        ></textarea>
       
      </div>

      <div className="mb-4">
        <label htmlFor="remark" className="block text-sm font-semibold">Remark</label>
        <textarea
          id="remark"
          className="w-full p-2 border rounded-md"
          rows="4"
          {...register('remark', { required: 'Remark is required' })}
        ></textarea>
        {errors.remark && <p className="text-red-500 text-xs">{errors.remark.message}</p>}
      </div>

      <div className="flex justify-between gap-2">
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded-md">Approve</button>
        <button type="button" className="w-full p-2 bg-yellow-500 text-white rounded-md">Hold</button>
        <button type="button" className="w-full p-2 bg-red-600 text-white rounded-md">Deny</button>
      </div>
    </form>
  <div className="modal-action">
    <form method="dialog">
      <button className="btn">Close</button>
    </form>
  </div>
</div>
</dialog>
  </div>
  )
}

export default ActionReviewModal