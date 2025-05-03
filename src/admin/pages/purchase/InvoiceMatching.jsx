import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

function InvoiceMatching() {
  const navigate = useNavigate();

  const invoiceData = [
    { id: 1, no: '01', poNo: 'PO158789', grnNo: '100000-00', invoiceValue: '100000-00', supplier: 'Matching', deduction: '100000', payable: '100000', warehouse: 'Bhairavanpalli' },
    { id: 2, no: '01', poNo: 'PO158789', grnNo: '200000-00', invoiceValue: '200000-00', supplier: '20', deduction: '100025', payable: '100025', warehouse: 'Shirting' },
    { id: 3, no: '01', poNo: 'PO158789', grnNo: '300000-00', invoiceValue: '300000-00', supplier: '20', deduction: '100011', payable: '100011', warehouse: 'Shikharjpur' }
  ];

  const handleView = (id) => {
    navigate(`/admin/purchase/invoice-matching/${id}`);
  };

  const breadcrumbItems = [
    { label: 'Purchase Management', href: '#' },
    { label: 'Invoice', href: '#' },
    { label: 'Manage Invoice Matching', href: '/admin/approval/product/supplier' }
  ];

return (
    <div className='p-4'>
            <Breadcrumbs
              pageTitle="Manage Invoice Matching"
              items={breadcrumbItems}
            />   
    

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-5">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto text-sm text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">GRN NO</th>

                <th className="border px-4 py-2">PO NO</th>
                <th className="border px-4 py-2">SUPPLIER</th>

                <th className="border px-4 py-2">WAREHOUSE</th>
                <th className="border px-4 py-2">INVOICE VALUE</th>
                <th className="border px-4 py-2">DEDUCTION</th>
                <th className="border px-4 py-2">PAYABLE</th>
                <th className="border px-4 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="border px-4 py-2">{index + 1 }</td>
                  <td className="border px-4 py-2">{invoice.grnNo}</td>

                  <td className="border px-4 py-2">{invoice.poNo}</td>
                  <td className="border px-4 py-2">{invoice.supplier}</td>

                  <td className="border px-4 py-2">{invoice.warehouse}</td>

                  <td className="border px-4 py-2">{invoice.invoiceValue}</td>
                  <td className="border px-4 py-2">{invoice.deduction}</td>
                  <td className="border px-4 py-2">{invoice.payable}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleView(invoice.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InvoiceMatching;
