import React from 'react'
import AddTaxForm from './AddTaxForm'

const AddTaxModal = () => {
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg pb-5">Add a tax</h3>
          <AddTaxForm />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-500 text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AddTaxModal