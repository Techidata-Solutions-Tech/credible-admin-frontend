import React from 'react'
import AddVariantForm from './AddVariantForm'

const AddVariantModal = ({ setToggle, id }) => {
  return (
    <div>
      <dialog id="add_variant" className="modal">
        <div className="modal-box max-w-[80vw] min-w-[900px]">
          <h3 className="font-bold text-lg pb-5">Add Variant</h3>
          <AddVariantForm setToggle={setToggle} id={id} />
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

export default AddVariantModal
