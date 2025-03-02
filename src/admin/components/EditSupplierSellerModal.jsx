import React from 'react'
import EditSellerSupplierForm from './forms/EditSellerSupplierForm'

const EditSellerSupplierModal = (props) => {
  return (
    <div>
    <dialog id="my_modal_5" className="modal">
<div className="modal-box max-w-[1000px]">
  <h3 className="font-bold text-lg">Product #{props.id}</h3>

<EditSellerSupplierForm/>
 

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

export default EditSellerSupplierModal