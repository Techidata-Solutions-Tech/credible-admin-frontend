import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Pagination from "../Pagination";

const CustomerTicketTable = () => {
  const [ticketId, setTicketId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const ticketData = [
    {
      id: "001",
      ticketNo: "TCK-1001",
      customerId: "CUST-01",
      subject: "Login issue",
      replies: 2,
      agent: "John Doe",
      created_at: "2024-01-15",
      updated_at: "2024-01-16",
      status: 1,
    },
    {
      id: "002",
      ticketNo: "TCK-1002",
      customerId: "CUST-02",
      subject: "Payment not processed",
      replies: 5,
      agent: "Jane Smith",
      created_at: "2024-02-01",
      updated_at: "2024-02-03",
      status: 2,
    },
    {
      id: "003",
      ticketNo: "TCK-1003",
      customerId: "CUST-03",
      subject: "Unable to reset password",
      replies: 1,
      agent: "Alice Johnson",
      created_at: "2024-02-10",
      updated_at: "2024-02-12",
      status: 3,
    },
  ];

  const statusLabels = {
    1: "Open",
    2: "In Progress",
    3: "Resolved",
    4: "Closed",
  };

  const statusColors = {
    1: "text-blue-500",
    2: "text-yellow-500",
    3: "text-green-500",
    4: "text-gray-500",
  };

  // Calculate the index for slicing the ticket data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentTickets = ticketData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Handle the page change when pagination is used
  const handlePageChange = (pageNumber, recordsPerPage) => {
    setCurrentPage(pageNumber);
    setRecordsPerPage(recordsPerPage);
  };

  const handleEdit = (id) => {
    setTicketId(id);
    document.getElementById("my_modal_edit").showModal();
  };

  const handleDelete = (id) => {
    setTicketId(id);
    document.getElementById("my_modal_delete").showModal();
  };

  const handleStatusChange = (id) => {
    setTicketId(id);
    document.getElementById("my_modal_status").showModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[900px]">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Ticket No
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Customer ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Subject
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Replies
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Agent
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Created Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Updated Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentTickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-50 border-b border-gray-300"
            >
              <td className="px-4 py-4 text-sm text-gray-900">{ticket.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.ticketNo}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.customerId}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.subject}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.replies}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.agent}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.created_at}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {ticket.updated_at}
              </td>
              <td
                className={`px-4 py-4 text-sm font-semibold ${
                  statusColors[ticket.status]
                }`}
              >
                {statusLabels[ticket.status]}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button
                    tabIndex={0}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <BsThreeDots className="mt-2 text-blue-500" size={28} />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow"
                  >
                    <li>
                      <a href="#" onClick={() => handleEdit(ticket.id)}>
                        Edit
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => handleDelete(ticket.id)}>
                        Delete
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => handleStatusChange(ticket.id)}>
                        Change Status
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalRecords={ticketData.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CustomerTicketTable;
