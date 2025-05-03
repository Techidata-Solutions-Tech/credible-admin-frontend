import {useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";
const ViewMerchantSupplier = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const allProducts = [
    {
      id: 1,
      category: "Pyjam",
      productName: "Pyjam",
      image: "Pyjam",
      brand: "RAYMOND",
      model: "450",
      variant: "450",
      sku: "450",
      uom: "KG",
      cop: "100",
      qty: "01",
      hsn: "100",
      gst: "01",
      batchNo: "01",
      mfgDate: "100",
      expDate: "01",
      unitPrice: "100",
      grossPrice: "105",
      supplier: "NAME & ID",
    },
    {
      id: 2,
      category: "Chilli Powder",
      productName: "Chilli Powder",
      image: "Chilli Powder",
      brand: "100",
      model: "100",
      variant: "100",
      sku: "100",
      uom: "KG",
      cop: "1/5",
      qty: "1",
      hsn: "1/5",
      gst: "1",
      batchNo: "1",
      mfgDate: "1/5",
      expDate: "1",
      unitPrice: "100",
      grossPrice: "100",
      supplier: "100",
    },
    {
      id: 3,
      category: "Sandels",
      productName: "Sandels",
      image: "Sandels",
      brand: "50",
      model: "70",
      variant: "70",
      sku: "70",
      uom: "PC",
      cop: "PC",
      qty: "50",
      hsn: "PC",
      gst: "50",
      batchNo: "50",
      mfgDate: "PC",
      expDate: "50",
      unitPrice: "50",
      grossPrice: "50",
      supplier: "50",
    },
    {
      id: 4,
      category: "Tea Tabel",
      productName: "Tea Tabel",
      image: "Tea Tabel",
      brand: "30",
      model: "80",
      variant: "80",
      sku: "80",
      uom: "Box",
      cop: "25",
      qty: "100",
      hsn: "25",
      gst: "100",
      batchNo: "100",
      mfgDate: "25",
      expDate: "100",
      unitPrice: "0",
      grossPrice: "500",
      supplier: "500",
    },
  ];
  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    setRecordsPerPage(perPage);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allProducts.slice(indexOfFirstRecord, indexOfLastRecord);

  
  const breadcrumbItems = [
    { label: 'Merchant Management', href: '#' },
    { label: 'Merchants', href: '#' },
    { label: 'View Supplier', href: '/admin/approval/product/supplier' }
  ];

return (
    <div className='min-h-screen'>
            <Breadcrumbs
              pageTitle="View Supplier"
              items={breadcrumbItems}
            /> 
             <div className='flex flex-col md:flex-row gap-4 md:gap-2 md:justify-between mb-4 bg-blue-50 p-4 rounded-lg'>
                            <div className='w-full md:w-auto'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">Filter</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white">
                                        <li><label><input type="checkbox" /></label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                        <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Search Input */}
                            <div className="flex-1 max-w-md">
                                <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                              <input type="text" className="grow text-blue-900 placeholder:text-center placeholder-blue-400" placeholder=" Search " />
                               
                             </label>
                            </div>
                            <div className='w-full md:w-auto'>
                                <select className="select min-w-[150px] text-center  w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                    <option disabled selected>Sort</option>
                                    <option>Homer</option>
                                    <option>Marge</option>
                                    <option>Bart</option>
                                    <option>Lisa</option>
                                    <option>Maggie</option>
                                </select>
                            </div>
                        </div>
     <div className="max-w-full overflow-auto">
     <table className="min-w-full border border-gray-400">
        <thead>
          <tr className="bg-green-600 text-white text-center text-sm">
            <th className="border border-gray-300 p-2">
              <input type="checkbox" />
            </th>
            <th className="border border-gray-300 p-2">NO</th>
            <th className="border border-gray-300 p-2">CATEGORY</th>
            <th className="border border-gray-300 p-2">PRODUCT NAME</th>
            <th className="border border-gray-300 p-2">IMAGE</th>
            <th className="border border-gray-300 p-2">BRAND/COMPANY</th>
            <th className="border border-gray-300 p-2">MODEL</th>
            <th className="border border-gray-300 p-2">VARIENT</th>
            <th className="border border-gray-300 p-2">SKU</th>
            <th className="border border-gray-300 p-2">UOM</th>
            <th className="border border-gray-300 p-2">COP</th>
            <th className="border border-gray-300 p-2">QTY</th>
            <th className="border border-gray-300 p-2">HSN/SAC</th>
            <th className="border border-gray-300 p-2">GST</th>
            <th className="border border-gray-300 p-2">BATCH NO</th>
            <th className="border border-gray-300 p-2">MFG. DATE</th>
            <th className="border border-gray-300 p-2">EXP. DATE</th>
            <th className="border border-gray-300 p-2">UNIT PRICE</th>
            <th className="border border-gray-300 p-2">GROSS PRICE</th>
            <th className="border border-gray-300 p-2">SUPPLIER</th>
          </tr>
        </thead>

        <tbody>
        {currentRecords.map((product, index) => (
              <tr key={product.id} className="text-center text-sm">
              <td className="border border-gray-300 p-2">
                <input type="checkbox" />
              </td>
              <td className="border border-gray-300 p-2">
              {String(indexOfFirstRecord + index + 1).padStart(2, "0")}
              </td>
              <td className="border border-gray-300 p-2 bg-lime-100">
                {product.category}
              </td>
              <td className="border border-gray-300 p-2 bg-lime-100">
                {product.productName}
              </td>
              <td className="border border-gray-300 p-2 bg-lime-100">
                {product.image}
              </td>
              <td className="border border-gray-300 p-2">{product.brand}</td>
              <td className="border border-gray-300 p-2">{product.model}</td>
              <td className="border border-gray-300 p-2">{product.variant}</td>
              <td className="border border-gray-300 p-2">{product.sku}</td>
              <td className="border border-gray-300 p-2">{product.uom}</td>
              <td className="border border-gray-300 p-2">{product.cop}</td>
              <td className="border border-gray-300 p-2">{product.qty}</td>
              <td className="border border-gray-300 p-2">{product.hsn}</td>
              <td className="border border-gray-300 p-2">{product.gst}</td>
              <td className="border border-gray-300 p-2">{product.batchNo}</td>
              <td className="border border-gray-300 p-2">{product.mfgDate}</td>
              <td className="border border-gray-300 p-2">{product.expDate}</td>
              <td className="border border-gray-300 p-2 bg-lime-100">
                {product.unitPrice}
              </td>
              <td className="border border-gray-300 p-2 bg-lime-100">
                {product.grossPrice}
              </td>
              <td className="border border-gray-300 p-2 bg-lime-100">
                {product.supplier}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
     </div>
     <Pagination
        totalRecords={allProducts.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewMerchantSupplier;
