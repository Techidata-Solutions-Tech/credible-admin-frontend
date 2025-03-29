import React from 'react'
import AddVariantForm from './AddVariantForm'

const AddVariantModal = ({setToggle,id}) => {
  return (
    <div>
      <dialog id="add_variant" className="modal">
        <div className="modal-box min-w-[70vw]">
          <h3 className="font-bold text-lg pb-5">Add variant</h3>
          <AddVariantForm  setToggle={setToggle} id={id}/>
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