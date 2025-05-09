import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const alertDetailData = [
    { id: '01', date: '01-01-2022', product: 'Pickle', brand: 'Godrej', model: 'Mango', variant: '500', uom: 'GM', sku: 'PKL-MNG-500GM', stock: 25, warehouse: 'BLR-560079-001', supplier: 'BLR-560079-001' },
    { id: '02', date: '01-01-2022', product: 'Pickle', brand: 'Godrej', model: 'Ginger', variant: '01', uom: 'KG', sku: 'PKL-GNGR-500GM', stock: 25, warehouse: 'BLR-560079-002', supplier: 'BLR-560079-002' },
    { id: '03', date: '02-01-2022', product: 'Sugar', brand: 'Tata', model: 'Brown', variant: '500', uom: 'GM', sku: 'ONN-MNG-500GM', stock: 25, warehouse: 'BLR-560079-001', supplier: 'BLR-560079-001' },
    { id: '04', date: '02-01-2022', product: 'Tea Powder', brand: 'Red Label', model: 'A1', variant: '01', uom: 'KG', sku: 'RCE-GNGR-500GM', stock: 25, warehouse: 'BLR-560079-002', supplier: 'BLR-560079-001' },
    { id: '05', date: '02-01-2022', product: 'Coffee Powder', brand: 'Red Lebel', model: 'A1', variant: '500', uom: 'GM', sku: 'PKL-MNG-500GM', stock: 25, warehouse: 'BLR-560079-001', supplier: 'BLR-560079-001' },
    { id: '06', date: '03-01-2022', product: 'Rice', brand: 'Reliance', model: 'Bullet', variant: '01', uom: 'KG', sku: 'PKL-GNGR-500GM', stock: 25, warehouse: 'BLR-560079-002', supplier: 'BLR-560079-002' },
    { id: '07', date: '03-01-2022', product: 'Wheat', brand: 'Tata', model: 'Premium', variant: '500', uom: 'GM', sku: 'PKL-MNG-500GM', stock: 25, warehouse: 'BLR-560079-001', supplier: 'BLR-560079-003' },
    { id: '08', date: '04-01-2022', product: 'Oil', brand: 'Tata', model: 'Sunflower', variant: '01', uom: 'LTR', sku: 'PKL-GNGR-500GM', stock: 25, warehouse: 'BLR-560079-002', supplier: 'BLR-560079-003' },
  ];

  const AlertDetail = () => {
    const { id } = useParams();
    const details = alertDetailData.filter((item) => item.id === id);
  
    const breadcrumbItems = [
        { label: 'Purchase Management', href: '#' },
        { label: 'Purchase', href: '#' },
        { label: 'Alert Details', href: '/admin/approval/product/supplier' }
      ];
  
    return (
        <div className='p-4'>
                <Breadcrumbs
                  pageTitle="Alert Details"
                  items={breadcrumbItems}
                />   
              <div
      tabIndex={0}
      role="button"
      className="min-w-[150px] text-center w-full md:w-auto bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-3 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base flex items-center justify-center gap-2"
    >
      Filter
      {/* Dropdown icon */}
      <svg
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
      </svg>
    </div>
        <table className="w-full border bg-white border-gray-400">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="border"><input type="checkbox" checked readOnly /></th>
              <th className="border">No</th>
              <th className="border">Date</th>
              <th className="border">Product Name</th>
              <th className="border">Company/Brand</th>
              <th className="border">Model</th>
              <th className="border">Varient</th>
              <th className="border">UoM</th>
              <th className="border">SKU</th>
              <th className="border">Stocks In Hand</th>
              <th className="border">Wearhouse ID</th>
              <th className="border">Supplier ID</th>
            </tr>
          </thead>
          <tbody>
            {details.map(item => (
              <tr key={item.id} className="text-center border border-gray-300">
                <td  className="border border-gray-600"><input type="checkbox" checked readOnly /></td>
                <td  className="border border-gray-600">{item.id}</td>
                <td  className="border border-gray-600">{item.date}</td>
                <td  className="border border-gray-600">{item.product}</td>
                <td  className="border border-gray-600">{item.brand}</td>
                <td  className="border border-gray-600">{item.model}</td>
                <td  className="border border-gray-600">{item.variant}</td>
                <td  className="border border-gray-600">{item.uom}</td>
                <td  className="border border-gray-600">{item.sku}</td>
                <td  className="border border-gray-600">{item.stock}</td>
                <td  className="border border-gray-600">{item.warehouse}</td>
                <td  className="border border-gray-600">{item.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
        <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded">Move to Procurement</button>

        </div>
      </div>
    );
  };
  export default AlertDetail;