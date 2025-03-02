import React, { useState } from "react";
import OrderDetailTableBranch from "./OrderDetailTableBranch";

const OrderDetailModal = (props) => {


  return (
    <div>
      <dialog id="product_detail" className="modal  ">
        <div className="modal-box max-w-[1200px] bg-white">
         <OrderDetailTableBranch/>

          <div className="modal-action bg-transparent">
            <form method="dialog">
              <button
                className="btn bg-red-500 text-white"
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

export default OrderDetailModal;
