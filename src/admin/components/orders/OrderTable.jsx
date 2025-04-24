import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import OrderDetailModal from "./OrderDetailModal";
import Pagination from "../Pagination";

const OrderTable = () => {
  const [orderId, setOrderId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      fetchOrders(selectedSupplier, orderStatus);
    }
  }, [selectedSupplier, orderStatus]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_V2
        }/api/supplierSeller/all-supplier-list`
      );
      const data = await response.json();

      if (data.message === "Suppliers fetched successfully") {
        const validSuppliers = data.data.filter(
          (supplier) => supplier.company_name || supplier.promoter_name
        );
        setSuppliers(validSuppliers);

        if (validSuppliers.length > 0) {
          setSelectedSupplier(validSuppliers[0].supplier_id);
        }
      } else {
        setApiError("Failed to fetch suppliers");
      }
    } catch (error) {
      setApiError("Error connecting to the server");
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchOrders = async (supplierId, status) => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_V2
        }/api/supplierSeller/get-all-order-list?user_type=supplier&supplier_id=${supplierId}&order_status=${status}`
      );
      const data = await response.json();

      if (data.message === "Order summary fetched successfully") {
        setApiError(null);
        setOrders(data.orders || []);
      } else {
        setApiError("Failed to fetch orders");
      }
    } catch (error) {
      setApiError("Error connecting to the server");
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleOrder = (id) => {
    setOrderId(id);
    const order = orders.find((order) => order.order_id === id);
    setModalData(order);
    document.getElementById("product_detail").showModal();
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEdit = (id) => {
    setOrderId(id);
    const order = orders.find((order) => order.order_id === id);
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (selectedSupplier) {
        fetchOrders(selectedSupplier, orderStatus);
      }

      setLoading(false);
      document.getElementById("my_modal_delete").close();
      alert("Order deleted successfully");
    } catch (error) {
      setLoading(false);
      setError("Failed to delete the order");
    }
  };

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSaveChanges = async () => {
    if (!modalData) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      fetchOrders(selectedSupplier, orderStatus);

      document.getElementById("my_modal_edit").close();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to update order");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg items-center">
      <div className="w-full mt-0 md:w-auto relative bottom-2">
          <label className="label">
            {/* <span className="label-text font-medium">Order Status</span> */}
          </label>
          <select
            className="select select-bordered w-full"
            value={orderStatus}
            onChange={handleStatusChange}
          >
            <option value="all">Filter</option>
            <option value="new">New</option>
            <option value="accepted">Accepted</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              className="grow text-blue-900 placeholder:text-center placeholder-blue-400"
              placeholder="Search customer..."
            />
          </label>
        </div>
        <div className="w-full md:w-auto">
          <select className="select min-w-[150px] text-center  w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
            <option disabled selected>
              Sort
            </option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
        </div>
      </div>
      <OrderDetailModal />
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="form-control w-full md:w-1/3">
          <label className="label">
            <span className="label-text font-medium">Select Supplier</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedSupplier}
            onChange={handleSupplierChange}
          >
            <option value="" disabled>
              Select a supplier
            </option>
            {suppliers.map((supplier) => (
              <option key={supplier.supplier_id} value={supplier.supplier_id}>
                {supplier.company_name ||
                  supplier.promoter_name ||
                  `Supplier ${supplier.supplier_id}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {apiError && (
        <div className="alert alert-error mb-4">
          <span>{apiError}</span>
        </div>
      )}

      {isLoadingOrders ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="w-full bg-white container rounded-lg shadow-sm overflow-auto">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-auto md:rounded-lg pb-20">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Order Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Supplier
                        </th>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Warehouse
                        </th>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Items
                        </th>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Total Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs md:text-[14px] font-semibold text-gray-700 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentRecords.length > 0 ? (
                        currentRecords.map((order) => (
                          <tr
                            key={order.order_id}
                            className="hover:bg-gray-50 border-b border-gray-300"
                          >
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              {formatDate(order.order_date)}
                            </td>
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              {order.order_id}
                            </td>
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              {order.supplier?.name || "N/A"}
                            </td>
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              {order.warehouse?.name || "N/A"}
                            </td>
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              {order.number_of_items}
                            </td>
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              ${order.total_amount?.toFixed(2) || "0.00"}
                            </td>
                            <td className="px-4 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  order.order_status === "new"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.order_status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : order.order_status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : order.order_status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.order_status === "dispatched"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.order_status}
                              </span>
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
                                    <a
                                      href="#"
                                      onClick={() =>
                                        handleOrder(order.order_id)
                                      }
                                    >
                                      View
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={() => handleEdit(order.order_id)}
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={() =>
                                        handleDelete(order.order_id)
                                      }
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-4 py-8 text-center text-gray-500"
                          >
                            No orders found. Please select a different supplier
                            or status.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {currentRecords.length > 0 && (
            <div className="mt-4">
              <Pagination
                totalRecords={orders.length}
                recordsPerPage={recordsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Supplier</span>
            </label>
            <input
              type="text"
              value={modalData?.supplier?.name || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Warehouse</span>
            </label>
            <input
              type="text"
              value={modalData?.warehouse?.name || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Order Status</span>
            </label>
            <select
              value={modalData?.order_status || ""}
              onChange={(e) =>
                setModalData({ ...modalData, order_status: e.target.value })
              }
              className="select select-bordered w-full"
            >
              <option value="new">New</option>
              <option value="accepted">Accepted</option>
              <option value="processing">Processing</option>
              <option value="dispatched">Dispatched</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("my_modal_delete").close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-error text-white"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </dialog>
    </>
  );
};

export default OrderTable;
