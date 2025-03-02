import React, { useState } from "react";
import axios from "axios";

const ToggleModal = (props) => {
  const {current_status} = props
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    props.setCurrent_status(newStatus); // Update state first
    await handleSubmit(newStatus);
  };

  const handleSubmit = async (status) => {
    const id = parseInt(props?.id, 10);
    const updatedStatus = parseInt(status, 10);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}${props.api}`, {
        id: id,
        status: updatedStatus,
      });

      if (response.status === 200) {
      
        props.setIsToggled(Date.now()); // Notify the parent of the update
        document.getElementById("my_modal_3").close(); // Close the modal
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("An error occurred while updating the status");
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {props.name} #{props.id}
          </h3>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Change the status of the product</span>
              <span className="label-text-alt">Status* {props?.current_status}</span>
            </div>
            <select
              className="select select-bordered"
              value={current_status !== undefined ? current_status : ''}
              onChange={handleStatusChange}
            >
              <option disabled selected>
                Pick one
              </option>
              <option value={1}>Approved</option>
              <option value={0}>Pending</option>
              <option value={2}>Suspended</option>
              <option value={3}>Blocked</option>
            </select>
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ToggleModal;
