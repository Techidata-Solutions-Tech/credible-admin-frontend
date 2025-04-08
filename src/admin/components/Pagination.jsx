"use client"
import React, { useState } from "react";

const Pagination = ({ totalRecords, recordsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(recordsPerPage);
  const totalPages = Math.ceil(totalRecords / perPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, perPage);
  };

  const getPaginationRange = () => {
    const totalNumbers = 5;
    const siblingCount = 1; 

    if (totalPages <= totalNumbers) return [...Array(totalPages)]?.map((_, i) => i + 1);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    let range = [1];

    if (leftSiblingIndex > 2) range.push("...");
    
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      range.push(i);
    }

    if (rightSiblingIndex < totalPages - 1) range.push("...");
    range.push(totalPages);

    return range;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg w-full my-8 mx-auto border border-gray-200">
      {/* Records Per Page & Total Records */}
      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <select
          className="border rounded px-2 py-1 text-gray-700"
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
            onPageChange(1, Number(e.target.value));
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span className="flex items-center">
          🌐 Show from {(currentPage - 1) * perPage + 1} to{" "}
          {Math.min(currentPage * perPage, totalRecords)} in
          <span className="ml-1 px-2 py-1 inline-block mr-2 bg-gray-600 text-white rounded-md font-semibold">
            {totalRecords}
          </span>
          records
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-1 border rounded-lg ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>

        {getPaginationRange()?.map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded-lg ${
              currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            } ${page === "..." ? "cursor-default" : ""}`}
            onClick={() => page !== "..." && handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-3 py-1 border rounded-lg ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
