import React from 'react';
import axios from 'axios';

const DeleteModal = (props) => {
  
  if(props?.api){
    const handleDelete = async () => {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}${props.api}`, {
          data: { id: props.id },
        });
        props.setIsToggled(Date.now())
        if (response.status === 200) {
          document.getElementById('my_modal_2').close()
          alert("User deleted successfully");
        }
      } catch (error) {
        props.setIsToggled(Date.now())
      }
    };
  
    return (
      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello! {props.id}</h3>
            <h1 className="font-bold text-xl pt-[30px]">
              Are you sure you want to delete?
            </h1>
            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
  }
  return null
}

export default DeleteModal;
