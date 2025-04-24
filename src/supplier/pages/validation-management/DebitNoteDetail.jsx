import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../admin/components/Breadcrumbs';
const debitNoteDetail = {
    debitNoteDate: 'Banglore',
    againstInvoiceNo: 'Banglore',
    warehouseId: 'ABC-123',
    purchaseOrderNo: 'ABC-123',
    items: [
      {
        id: 1,
        productDescription: 'Kurta-Amarkali-White Color',
        hswSac: '60435',
        uom: 'Pcs',
        uip: '1',
        unitPrice: '100',
        qty: '1',
        taxableAmt: '100',
        igst: '-',
        sgst: '5% | 10.22',
        cgst: '5% | 10.22',
        cess: '20.44',
        taxAmt: '479.45'
      },
      {
        id: 2,
        productDescription: 'Dhoti-Cotton-Red',
        hswSac: '60546',
        uom: 'Pcs',
        uip: '1',
        unitPrice: '100',
        qty: '1',
        taxableAmt: '100',
        igst: '10%-20.44',
        sgst: '5% | 10.22',
        cgst: '5% | 10.22',
        cess: '20.44',
        taxAmt: '718.25'
      }
    ],
    subtotal: {
      taxableAmt: '718.25',
      igst: '20.44',
      sgst: '20.44',
      cgst: '20.44',
      cess: '20.44',
      grossAmt: '1197.50'
    },
    charges: [
      {
        name: 'Insurance Charges',
        amount: '100',
        igst: '10.22',
        sgst: '10.22',
        cgst: '20.44',
        grossAmt: '120.44'
      },
      {
        name: 'Freight Charges',
        amount: '100',
        igst: '10.22',
        sgst: '10.22',
        cgst: '20.44',
        grossAmt: '120.44'
      },
      {
        name: 'Packing Charges',
        amount: '',
        igst: '',
        sgst: '',
        cgst: '',
        grossAmt: ''
      }
    ],
    total: {
      amount: '200',
      igst: '20.44',
      sgst: '20.44',
      cgst: '40.88',
      grossAmt: '240.88'
    },
    amountInWords: 'THOUSAND SEVENHUNDRED SEVENTY PAISE'
  };
const DebitNoteDetail = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/supplier/debit-note');
  };
  const breadcrumbItems = [
    { label: 'Validation Management', href: '#' },
    { label: 'Debit Note', href: '#' },
    { label: 'Debit Note Detail', href: '/admin/approval/merchent/supplier' }
  ];
  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs
                  pageTitle="Debit Note Detail"
                  items={breadcrumbItems}
                />
      <button 
        onClick={handleBackClick}
        className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
      >
        Back
      </button>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold">Debit Note Date :</label>
          <span>{debitNoteDetail.debitNoteDate}</span>
        </div>
        <div>
          <label className="block font-semibold">Warehouse Id:</label>
          <span>{debitNoteDetail.warehouseId}</span>
        </div>
        <div>
          <label className="block font-semibold">Against Invoice No :</label>
          <span>{debitNoteDetail.againstInvoiceNo}</span>
        </div>
        <div>
          <label className="block font-semibold">Purchase Order No :</label>
          <span>{debitNoteDetail.purchaseOrderNo}</span>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1">NO</th>
              <th className="border border-gray-300 px-2 py-1">PRODUCT DESCRIPTION</th>
              <th className="border border-gray-300 px-2 py-1">HSW/SAC</th>
              <th className="border border-gray-300 px-2 py-1">UOM</th>
              <th className="border border-gray-300 px-2 py-1">UIP</th>
              <th className="border border-gray-300 px-2 py-1">UNIT PRICE</th>
              <th className="border border-gray-300 px-2 py-1">QTY</th>
              <th className="border border-gray-300 px-2 py-1">TAXABLE AMT</th>
              <th className="border border-gray-300 px-2 py-1">IGST</th>
              <th className="border border-gray-300 px-2 py-1">SGST</th>
              <th className="border border-gray-300 px-2 py-1">CGST</th>
              <th className="border border-gray-300 px-2 py-1">CESS</th>
              <th className="border border-gray-300 px-2 py-1">TAX AMT</th>
              <th className="border border-gray-300 px-2 py-1">GROSS AMT</th>
            </tr>
          </thead>
          <tbody>
            {debitNoteDetail.items.map((item) => (
              <tr key={item.id} className="bg-white">
                <td className="border border-gray-300 px-2 py-1">{item.id.toString().padStart(2, '0')}</td>
                <td className="border border-gray-300 px-2 py-1">{item.productDescription}</td>
                <td className="border border-gray-300 px-2 py-1">{item.hswSac}</td>
                <td className="border border-gray-300 px-2 py-1">{item.uom}</td>
                <td className="border border-gray-300 px-2 py-1">{item.uip}</td>
                <td className="border border-gray-300 px-2 py-1">{item.unitPrice}</td>
                <td className="border border-gray-300 px-2 py-1">{item.qty}</td>
                <td className="border border-gray-300 px-2 py-1">{item.taxableAmt}</td>
                <td className="border border-gray-300 px-2 py-1">{item.igst}</td>
                <td className="border border-gray-300 px-2 py-1">{item.sgst}</td>
                <td className="border border-gray-300 px-2 py-1">{item.cgst}</td>
                <td className="border border-gray-300 px-2 py-1">{item.cess}</td>
                <td className="border border-gray-300 px-2 py-1">{item.taxAmt}</td>
                <td className="border border-gray-300 px-2 py-1">{item.taxAmt}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td colSpan="7" className="border border-gray-300 px-2 py-1">SUB TOTAL</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.taxableAmt}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.igst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.sgst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.cgst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.cess}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.grossAmt}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.subtotal.grossAmt}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1"></th>
              <th className="border border-gray-300 px-2 py-1">Amount</th>
              <th className="border border-gray-300 px-2 py-1">IGST</th>
              <th className="border border-gray-300 px-2 py-1">SGST</th>
              <th className="border border-gray-300 px-2 py-1">CGST</th>
              <th className="border border-gray-300 px-2 py-1">GROSS AMT</th>
            </tr>
          </thead>
          <tbody>
            {debitNoteDetail.charges.map((charge, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-300 px-2 py-1">{charge.name}</td>
                <td className="border border-gray-300 px-2 py-1">{charge.amount}</td>
                <td className="border border-gray-300 px-2 py-1">{charge.igst}</td>
                <td className="border border-gray-300 px-2 py-1">{charge.sgst}</td>
                <td className="border border-gray-300 px-2 py-1">{charge.cgst}</td>
                <td className="border border-gray-300 px-2 py-1">{charge.grossAmt}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 px-2 py-1">SUB TOTAL</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.amount}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.igst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.sgst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.cgst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.grossAmt}</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 px-2 py-1">GROSS TOTAL</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.amount}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.igst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.sgst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.cgst}</td>
              <td className="border border-gray-300 px-2 py-1">{debitNoteDetail.total.grossAmt}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="font-semibold">AMOUNT IN WORDS</p>
        <p>{debitNoteDetail.amountInWords}</p>
      </div>
    </div>
  );
};

export default DebitNoteDetail;