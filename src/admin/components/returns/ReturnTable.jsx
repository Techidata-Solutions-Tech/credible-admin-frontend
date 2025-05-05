import React, { useState } from 'react';
import Pagination from '../Pagination';

const ReturnTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const returnData = [
    {
      id: 'R001',
      date: '2024-01-10',
      productName: 'Smartphone',
      brand: 'Samsung',
      model: 'Galaxy S21',
      variant: '128GB',
      SKU: 'SMG-S21-128',
      UoM: 'Piece',
      UiPReason: 'Defective Product',
      quantity: 2,
      unitPrice: 500,
      tax: '18%',
      taxAmount: 180,
      total: 1180,
    },
    {
      id: 'R002',
      date: '2024-02-05',
      productName: 'Laptop',
      brand: 'Dell',
      model: 'Inspiron 15',
      variant: '16GB RAM',
      SKU: 'DL-INS-16GB',
      UoM: 'Piece',
      UiPReason: 'Wrong Product',
      quantity: 1,
      unitPrice: 800,
      tax: '18%',
      taxAmount: 144,
      total: 944,
    },
    {
      id: 'R003',
      date: '2024-03-15',
      productName: 'Headphones',
      brand: 'Sony',
      model: 'WH-1000XM4',
      variant: 'Black',
      SKU: 'SONY-1000XM4',
      UoM: 'Piece',
      UiPReason: 'Customer Return',
      quantity: 3,
      unitPrice: 250,
      tax: '18%',
      taxAmount: 135,
      total: 885,
    },
    // 🔁 Add more rows here to test pagination
  ];

  const totalRecords = returnData.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = returnData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  return (<>
 <div className="flex justify-between items-center bg-white my-5 w-full">
  <div className="flex items-center space-x-2">
    <span className="font-bold text-gray-700">Warehouse ID:</span>
    <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-md">
      12345
    </span>
  </div>
  <div className="flex items-center space-x-2">
    <span className="font-bold text-gray-700">Supplier ID:</span>
    <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md">
      12345
    </span>
  </div>
</div>

    <div className="w-full bg-white rounded-lg shadow-sm overflow-auto pb-[100px]">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-auto ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="w-[45px] py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Product Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Brand</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Variant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">UoM</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Return Reason</th>
                  <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Unit Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Tax</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Tax Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">Gross Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRecords?.map((item,index) => (
                  <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-300">
                    <td className=" py-4 text-sm text-gray-900 whitespace-nowrap">{index+1}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.date}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.productName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.brand}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.model}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.variant}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.SKU}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.UoM}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{item.UiPReason}</td>
                    <td className="px-2 py-4 text-sm text-gray-900 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-4 py-4 text-sm text-green-500 whitespace-nowrap">${item.unitPrice}</td>
                    <td className="px-4 py-4 text-sm text-red-600 whitespace-nowrap">{item.tax}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">${item.taxAmount}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 px-4">
        <Pagination
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ReturnTable;
