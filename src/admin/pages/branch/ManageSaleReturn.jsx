import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import Breadcrumbs from '../../components/Breadcrumbs';
const ManageSaleReturns = () => {
  const [activeTab, setActiveTab] = useState('Inward');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Tab data with counts
  const tabs = [
    { name: 'Inward', count: 100 },
    { name: 'Accepected', count: 40 },
    { name: 'Hold', count: 40 },
    { name: 'Rejected', count: 60 },
  ];

  // Sample data for all tables
  const tableData = [
    {
      id: '01',
      date: '02-03-022',
      orderId: '435637',
      customerDetails: 'Ghee',
      products: [
        {
          productName: 'Ghee',
          companyBrand: 'Ghee',
          model: '03',
          varient: '03',
          sku: '03',
          returnQty: '03',
          amount: '200',
          returnReason: 'Open',
          evidence: 'Open',
        },
        {
          productName: 'Shirt',
          companyBrand: 'Shirt',
          model: '05',
          varient: '05',
          sku: '05',
          returnQty: '05',
          amount: '03',
          returnReason: '03',
          evidence: '03',
        },
        {
          productName: 'Pant',
          companyBrand: 'Pant',
          model: '10',
          varient: '10',
          sku: '10',
          returnQty: '10',
          amount: '03',
          returnReason: '03',
          evidence: '03',
        },
      ],
    },
    {
      id: '02',
      date: '15-03-22',
      orderId: '435637',
      customerDetails: 'Areca Plates',
      products: [
        {
          productName: 'Areca Plates',
          companyBrand: 'Areca Plates',
          model: '05',
          varient: '05',
          sku: '05',
          returnQty: '05',
          amount: 'View',
          returnReason: 'View',
          evidence: 'View',
        },
      ],
    },
    {
      id: '03',
      date: '20-04-22',
      orderId: '435637',
      customerDetails: 'Bagas Bowls',
      products: [
        {
          productName: 'Bagas Bowls',
          companyBrand: 'Bagas Bowls',
          model: '01',
          varient: '01',
          sku: '01',
          returnQty: '01',
          amount: 'View',
          returnReason: 'View',
          evidence: 'View',
        },
      ],
    },
    {
      id: '04',
      date: '25-05-22',
      orderId: '435637',
      customerDetails: 'Rice',
      products: [
        {
          productName: 'Rice',
          companyBrand: 'Rice',
          model: '01',
          varient: '01',
          sku: '01',
          returnQty: '01',
          amount: 'View',
          returnReason: 'View',
          evidence: 'View',
        },
      ],
    },
  ];

  // Calculate total records (sum of all products across all orders)
  const totalRecords = tableData.reduce((sum, order) => sum + order.products.length, 0);

  // Function to handle page change
  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  // Function to get paginated data
  const getPaginatedData = () => {
    let productCount = 0;
    const paginatedData = [];
    
    // Flatten the tableData to get all products
    const allProducts = tableData.flatMap(order => 
      order.products.map((product, index) => ({
        ...order,
        productIndex: index,
        product
      }))
    );

    // Calculate start and end index
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
    
    return allProducts.slice(startIndex, endIndex);
  };

  // Function to render the appropriate table based on active tab
  const renderTable = () => {
    // All tables have these base columns
    const baseColumns = [
      'No',
      'Date',
      'Order Id',
      'Customer Details',
      'Product Name',
      'Company/Brand',
      'Model',
      'Varient',
      'SKU',
      'Return Qty',
      'Amount',
      'Return Reason',
      'Evidence',
    ];

    // Add "Remarks" column for Accepted, Hold, and Rejected tabs
    const columns = 
      activeTab === 'Inward' 
        ? baseColumns 
        : [...baseColumns, 'Remarks'];

    const paginatedData = getPaginatedData();

    return (<>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="bg-gray-600 text-white px-4 py-2 border border-gray-300"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(({ id, date, orderId, customerDetails, product, productIndex }) => (
              <tr key={`${id}-${productIndex}`} className="border-b">
                {/* Only show the main row data for the first product in each order */}
                {productIndex === 0 ? (
                  <>
                    <td className="px-4 py-2 border border-gray-300">{id}</td>
                    <td className="px-4 py-2 border border-gray-300">{date}</td>
                    <td className="px-4 py-2 border border-gray-300">{orderId}</td>
                    <td className="px-4 py-2 border border-gray-300">{customerDetails}</td>
                  </>
                ) : (
                  // Empty cells for subsequent products in the same order
                  <>
                    <td className="px-4 py-2 border border-gray-300"></td>
                    <td className="px-4 py-2 border border-gray-300"></td>
                    <td className="px-4 py-2 border border-gray-300"></td>
                    <td className="px-4 py-2 border border-gray-300"></td>
                  </>
                )}
                
                {/* Product specific data */}
                <td className="px-4 py-2 border border-gray-300">{product.productName}</td>
                <td className="px-4 py-2 border border-gray-300">{product.companyBrand}</td>
                <td className="px-4 py-2 border border-gray-300">{product.model}</td>
                <td className="px-4 py-2 border border-gray-300">{product.varient}</td>
                <td className="px-4 py-2 border border-gray-300">{product.sku}</td>
                <td className="px-4 py-2 border border-gray-300">{product.returnQty}</td>
                <td className="px-4 py-2 border border-gray-300">{product.amount}</td>
                <td className="px-4 py-2 border border-gray-300">{product.returnReason}</td>
                <td className="px-4 py-2 border border-gray-300">{product.evidence}</td>
                
                {/* Remarks column for tabs other than Inward */}
                {activeTab !== 'Inward' && (
                  <td className="px-4 py-2 border border-gray-300">
                    {productIndex === 0 ? 'Open' : '03'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      
        {/* Pagination */}
        <Pagination 
          totalRecords={totalRecords} 
          recordsPerPage={recordsPerPage} 
          onPageChange={handlePageChange}
        />
        </>
    );
  };

  const breadcrumbItems = [
    { label: 'Warehouse Management', href: '#' },
    { label: 'Branch', href: '#' },
    { label: 'Manage Sales Returns', href: '/admin/warehouse/table' },
  ];
  return (
    <div className="min-h-screen flex flex-col">
          <Breadcrumbs
            pageTitle="Manage Sales Returns"
            items={breadcrumbItems}
          />
      {/* Tabs */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 py-3 rounded-lg shadow-lg transform px-20 mb-5">
                               
  <div className="flex flex-wrap justify-center gap-2 p-1 rounded-full bg-gray-50">
    {tabs.map((tab) => (
      <button
        key={tab.name}
        onClick={() => {
          setActiveTab(tab.name);
          setCurrentPage(1); // Reset to first page when changing tabs
        }}
        className={`
         px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex flex-col gap-0 justify-center items-center
               ${`flex-1 text-center p-2 cursor-pointer ${
              activeTab === tab.name ? 'bg-cyan-500 text-white' : 'bg-gray-400 text-white'
            }`}`}
      >
        <span>{tab.name}</span>
        <span className="text-xs font-semibold">{tab.count}</span>
      </button>
    ))}
  </div>
</div>


 

      {/* Table */}
      {renderTable()}
    </div>
  );
};
export default ManageSaleReturns;
