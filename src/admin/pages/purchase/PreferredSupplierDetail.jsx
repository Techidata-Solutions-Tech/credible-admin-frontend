import {useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";

const ViewPreferredSupplier = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const allProducts = [
        {
            id: 1,
            priority: "03",
            productName: "Cow Ghee",
            brand: "abc",
            model: "-",
            variant: "-",
            sku: "AM-CG-L00GM",
            uom: "LTR",
            qou: "LTR",
            qty: "1",
            unitPrice: "500",
            grossPrice: "550"
        },
        {
            id: 2,
            priority: "01",
            productName: "Oil",
            brand: "def",
            model: "-",
            variant: "-",
            sku: "PT-CG-L00GM",
            uom: "LTR",
            qou: "LTR",
            qty: "1/2",
            unitPrice: "600",
            grossPrice: "600"
        },
        {
            id: 3,
            priority: "02",
            productName: "Plates",
            brand: "ghi",
            model: "-",
            variant: "-",
            sku: "RA-CG-L00GM",
            uom: "LTR",
            qou: "LTR",
            qty: "1/2",
            unitPrice: "700",
            grossPrice: "700"
        },
        {
            id: 4,
            priority: "04",
            productName: "Bowls",
            brand: "jkl",
            model: "-",
            variant: "-",
            sku: "PA-CG-L00GM",
            uom: "LTR",
            qou: "LTR",
            qty: "1/2",
            unitPrice: "800",
            grossPrice: "800"
        }
    ];

    const handlePageChange = (page, perPage) => {
        setCurrentPage(page);
        setRecordsPerPage(perPage);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = allProducts.slice(indexOfFirstRecord, indexOfLastRecord);

    const breadcrumbItems = [
        { label: 'Purchase Management', href: '#' },
        { label: 'Preferred', href: '#' },
        { label: 'View Preferred Supplier', href: '/admin/approval/product/supplier' }
    ];

    return (
        <div className='min-h-screen'>
            <Breadcrumbs
                pageTitle="View Preferred Supplier"
                items={breadcrumbItems}
            /> 
            <div className="font-bold inline-block text-3xl border border-gray-700 my-4 px-4 py-2 rounded-md bg-white">
                Supplier Name
            </div>
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
                        <option>Priority</option>
                        <option>Product Name</option>
                        <option>Brand</option>
                    </select>
                </div>
            </div>
            <div className="max-w-full overflow-auto">
                <table className="min-w-full border border-gray-400">
                    <thead>
                        <tr className="bg-gray-600 text-white text-center text-sm">
                            <th className="border border-gray-300 p-2">
                                <input type="checkbox" />
                            </th>
                            <th className="border border-gray-300 p-2">NO</th>
                            <th className="border border-gray-300 p-2">PRIORITY</th>
                            <th className="border border-gray-300 p-2">PRODUCT NAME</th>
                            <th className="border border-gray-300 p-2">BRAND/COMPANY</th>
                            <th className="border border-gray-300 p-2">MODEL</th>
                            <th className="border border-gray-300 p-2">VARIANT</th>
                            <th className="border border-gray-300 p-2">SKU</th>
                            <th className="border border-gray-300 p-2">UOM</th>
                            <th className="border border-gray-300 p-2">QOU</th>
                            <th className="border border-gray-300 p-2">QTY</th>
                            <th className="border border-gray-300 p-2">UNIT PRICE</th>
                            <th className="border border-gray-300 p-2">GROSS PRICE</th>
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
                                <td className="border border-gray-300 p-2">
                                    {product.priority}
                                </td>
                                <td className="border border-gray-300 p-2 bg-lime-100">
                                    {product.productName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.brand}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.model}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.variant}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.sku}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.uom}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.qou}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {product.qty}
                                </td>
                                <td className="border border-gray-300 p-2 bg-lime-100">
                                    {product.unitPrice}
                                </td>
                                <td className="border border-gray-300 p-2 bg-lime-100">
                                    {product.grossPrice}
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

export default ViewPreferredSupplier;