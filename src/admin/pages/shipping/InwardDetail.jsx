import Breadcrumbs from '../../components/Breadcrumbs';
const tableData = [
    {
      no: "01",
      shippingPartner: "01-01-2024",
      shippingUOM: "Box",
      quantity: "50",
      weight: "Kg",
      shipFrom: "500",
      shipTo: "700",
      ewayBillNo: "700",
      invoiceNo: "700",
    },
  ];
const ShippingInwardDetail = () => {
    const breadcrumbItems = [
        { label: 'Shipping Management', href: '#' },
        { label: 'Shipments', href: '#' },
        { label: 'View Shipping Inward', href: '/admin/marketing/create-coupon' }
      ];
     
        return (
          <div className=" p-4">
             <Breadcrumbs
                  pageTitle="View Shipping Inward"
                  items={breadcrumbItems}
                />            
<div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label className="font-semibold">Date :</label>
          <input
            type="text"
            value="Banglore"
            className="border border-gray-400 px-2 py-1 rounded-sm"
            readOnly
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="font-semibold">Supplier :</label>
          <input
            type="text"
            value="ABC-123"
            className="border border-gray-400 px-2 py-1 rounded-sm"
            readOnly
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white text-center">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Shipping Partner</th>
              <th className="border border-gray-300 px-4 py-2">Shipping UOM</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Weight</th>
              <th className="border border-gray-300 px-4 py-2">Ship From</th>
              <th className="border border-gray-300 px-4 py-2">Ship To</th>
              <th className="border border-gray-300 px-4 py-2">Eway Bill No</th>
              <th className="border border-gray-300 px-4 py-2">Invoice No</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.no}</td>
                <td className="border border-gray-300 px-4 py-2">{item.shippingPartner}</td>
                <td className="border border-gray-300 px-4 py-2">{item.shippingUOM}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{item.weight}</td>
                <td className="border border-gray-300 px-4 py-2">{item.shipFrom}</td>
                <td className="border border-gray-300 px-4 py-2">{item.shipTo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.ewayBillNo}</td>
                <td className="border border-gray-300 px-4 py-2">{item.invoiceNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ShippingInwardDetail;