import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../admin/components/Breadcrumbs';
const debitNotes = [
    {
      id: 1,
      poNo: 'PO156789',
      grnNo: 'PO156789',
      debitNoteNo: '100',
      invoiceValue: '100',
      debitedValue: '100',
      warehouseId: 'Silharipura'
    },
    {
      id: 2,
      poNo: 'PO156789',
      grnNo: 'PO156789',
      debitNoteNo: '100',
      invoiceValue: 'View',
      debitedValue: 'Shimoga',
      warehouseId: 'View'
    },
    {
      id: 3,
      poNo: 'PO156789',
      grnNo: 'PO156789',
      debitNoteNo: '100',
      invoiceValue: 'View',
      debitedValue: 'Segara',
      warehouseId: 'View'
    }
  ];
  
const DebitNoteList = () => {
  const navigate = useNavigate();

  const handleViewClick = (id) => {
    navigate(`/supplier/debit-note/${id}`);
  };

  const breadcrumbItems = [
    { label: 'Validation Management', href: '#' },
    { label: 'Debit Note', href: '#' },
    { label: 'Manage Debit Note', href: '/admin/approval/merchent/supplier' }
  ];
  return (
   
    <div className="container mx-auto p-4">
      <Breadcrumbs
                  pageTitle="Manage Debit Note"
                  items={breadcrumbItems}
                />

      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">PO ND</th>
              <th className="border border-gray-300 px-4 py-2">GRN ND</th>
              <th className="border border-gray-300 px-4 py-2">DEBIT NOTE NO</th>
              <th className="border border-gray-300 px-4 py-2">Invoice Value</th>
              <th className="border border-gray-300 px-4 py-2">Debited Value</th>
              <th className="border border-gray-300 px-4 py-2">Warehouse Id</th>
              <th className="border border-gray-300 px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {debitNotes.map((note, index) => (
              <tr key={note.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{note.poNo}</td>
                <td className="border border-gray-300 px-4 py-2">{note.grnNo}</td>
                <td className="border border-gray-300 px-4 py-2">{note.debitNoteNo}</td>
                <td className="border border-gray-300 px-4 py-2">{note.invoiceValue}</td>
                <td className="border border-gray-300 px-4 py-2">{note.debitedValue}</td>
                <td className="border border-gray-300 px-4 py-2">{note.warehouseId}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    onClick={() => handleViewClick(note.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
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
  );
};

export default DebitNoteList;