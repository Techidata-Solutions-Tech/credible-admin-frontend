import React from 'react'
import EditVariantForm from './EditVariantForm'

const EditVariantModal = () => {
  return (
    <div>
      <dialog id="edit_variant" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg pb-5">Edit variant</h3>
          <EditVariantForm />
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

export default EditVariantModal