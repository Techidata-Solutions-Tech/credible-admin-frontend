import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination"; // Adjust path as needed

const ManageReturn = () => {
  const allReturnsData = [
    { id: 1, grnNo: "PO156789", poNo: "Harshitha", supplier: "Harshitha", warehouse: "Shimoga", returnProducts: 30, returnValue: 100000 },
    { id: 1, grnNo: "PO156789", poNo: "Harshitha", supplier: "Harshitha", warehouse: "Shikaripura", returnProducts: 20, returnValue: 90000 },
    { id: 1, grnNo: "PO156789", poNo: "Harshitha", supplier: "Harshitha", warehouse: "Sagara", returnProducts: 10, returnValue: 80000 },
    { id: 2, grnNo: "PO156790", poNo: "Shreyas", supplier: "Shreyas", warehouse: "Hubli", returnProducts: 15, returnValue: 75000 },
    { id: 2, grnNo: "PO156790", poNo: "Shreyas", supplier: "Shreyas", warehouse: "Dharwad", returnProducts: 25, returnValue: 125000 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  // Pagination logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = allReturnsData.slice(indexOfFirst, indexOfLast);

  // Grouping logic for rowSpan
  const groupedData = currentRecords.reduce((acc, item) => {
    const key = `${item.grnNo}-${item.poNo}-${item.supplier}`;
    if (!acc[key]) {
      acc[key] = {
        count: 0,
        rows: [],
      };
    }
    acc[key].rows.push(item);
    acc[key].count++;
    return acc;
  }, {});

  const breadcrumbItems = [
    { label: 'Return Management', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Manage Purchase Returns', href: '/admin/approval/product/supplier' }
  ];

  return (
    <div className="p-4">
      <Breadcrumbs pageTitle="Manage Purchase Returns" items={breadcrumbItems} />

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="text-center border border-gray-300 p-2">No</th>
              <th className="text-center border border-gray-300 p-2">GRN NO</th>
              <th className="text-center border border-gray-300 p-2">PO NO</th>
              <th className="text-center border border-gray-300 p-2">SUPPLIER</th>
              <th className="text-center border border-gray-300 p-2">WAREHOUSE</th>
              <th className="text-center border border-gray-300 p-2">RETURN PRODUCTS</th>
              <th className="text-center border border-gray-300 p-2">RETURN VALUE</th>
              <th className="text-center border border-gray-300 p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedData).map((group, groupIndex) =>
              group.rows.map((item, rowIndex) => (
                <tr key={`${item.grnNo}-${item.warehouse}`}>
                  {rowIndex === 0 && (
                    <>
                      <td rowSpan={group.count} className="text-center border border-gray-300 p-2 align-middle">
                        {String(indexOfFirst + groupIndex + 1).padStart(2, "0")}
                      </td>
                      <td rowSpan={group.count} className="text-center border border-gray-300 p-2 align-middle">
                        {item.grnNo}
                      </td>
                      <td rowSpan={group.count} className="text-center border border-gray-300 p-2 align-middle">
                        {item.poNo}
                      </td>
                      <td rowSpan={group.count} className="text-center border border-gray-300 p-2 align-middle">
                        {item.supplier}
                      </td>
                    </>
                  )}
                  <td className="border border-gray-300 p-2">{item.warehouse}</td>
                  <td className="border border-gray-300 p-2">{item.returnProducts}</td>
                  <td className="border border-gray-300 p-2">{item.returnValue}</td>
                  <td className="border border-gray-300 p-2">
                    <Link to={`/admin/returns/${item.id}`} className="text-blue-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalRecords={allReturnsData.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ManageReturn;
