import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import OrderDetailModal from "./OrderDetailModal";
const OrderTable = () => {
  const [orderId, setOrderId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleOrder = (id) => {
    setOrderId(id);
    document.getElementById("product_detail").showModal();
  };
  const orderData = [
    {
      date: "2024-01-10",
      id: "001",
      customerName: "John Doe",
      branchId: "BR001",
      items: 5,
      qty: 10,
      orderValue: 250.0,
    },
    {
      date: "2024-02-15",
      id: "002",
      customerName: "Jane Smith",
      branchId: "BR002",
      items: 3,
      qty: 7,
      orderValue: 150.5,
    },
    {
      date: "2024-03-20",
      id: "003",
      customerName: "Alice Johnson",
      branchId: "BR003",
      items: 8,
      qty: 20,
      orderValue: 400.75,
    },
  ];

  const handleEdit = (id) => {
    setOrderId(id);
    const order = orderData.find((order) => order.id === id);
    setModalData(order);
    document.getElementById("my_modal_edit").showModal();
  };

  const handleDelete = (id) => {
    setOrderId(id);
    document.getElementById("my_modal_delete").showModal();
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => resolve("Order deleted"), 2000)
      );
      setLoading(false);
      document.getElementById("my_modal_delete").close();
      alert("Order deleted successfully");
    } catch (error) {
      setLoading(false);
      setError("Failed to delete the order");
    }
  };

  return (
    <>
      {" "}
      <OrderDetailModal />
      <div className="w-full bg-white container rounded-lg shadow-sm overflow-hidden pb-[100px]">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Customer Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Branch ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Order Value ($)
                    </th>
                    <th className="px-6 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderData?.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 border-b border-gray-300"
                    >
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {order.branchId}
                      </td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {order.items}
                      </td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {order.qty}
                      </td>
                      <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        ${order.orderValue.toFixed(2)}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 flex justify-center gap-1">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <button
                            tabIndex={0}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <BsThreeDots
                              className="mt-2 text-blue-500"
                              size={28}
                            />
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu rounded-box w-52 shadow bg-white z-20"
                          >
                            <li>
                              <a href="#" onClick={() => handleOrder(order.id)}>
                                View
                              </a>
                            </li>
                            <li>
                              <a href="#" onClick={() => handleEdit(order.id)}>
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={() => handleDelete(order.id)}
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_edit" className="modal">
        <form method="dialog" className="modal-box">
          <button
            type="button"
            className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => document.getElementById("my_modal_edit").close()}
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold uppercase">Edit Order</h2>
          <input
            type="text"
            value={modalData?.customerName || ""}
            onChange={(e) =>
              setModalData({ ...modalData, customerName: e.target.value })
            }
            className="input input-bordered w-full mt-2"
            placeholder="Customer Name"
          />
          <input
            type="text"
            value={modalData?.branchId || ""}
            onChange={(e) =>
              setModalData({ ...modalData, branchId: e.target.value })
            }
            className="input input-bordered w-full mt-2"
            placeholder="Branch ID"
          />
          <input
            type="number"
            value={modalData?.items || ""}
            onChange={(e) =>
              setModalData({ ...modalData, items: e.target.value })
            }
            className="input input-bordered w-full mt-2"
            placeholder="Items"
          />
          <input
            type="number"
            value={modalData?.qty || ""}
            onChange={(e) =>
              setModalData({ ...modalData, qty: e.target.value })
            }
            className="input input-bordered w-full mt-2"
            placeholder="Quantity"
          />
          <input
            type="number"
            value={modalData?.orderValue || ""}
            onChange={(e) =>
              setModalData({ ...modalData, orderValue: e.target.value })
            }
            className="input input-bordered w-full mt-2"
            placeholder="Order Value"
          />
          <button className="btn btn-primary mt-4">Save Changes</button>
        </form>
      </dialog>
      <dialog id="my_modal_delete" className="modal">
        <form method="dialog" className="modal-box">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => document.getElementById("my_modal_delete").close()}
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold">
            Are you sure you want to delete this order?
          </h2>
          <button
            className="btn btn-danger mt-4"
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </dialog>
    </>
  );
};

export default OrderTable;
