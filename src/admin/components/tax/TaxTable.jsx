import React, { useState } from 'react';
import { FaSortDown, FaTrash } from 'react-icons/fa';
import CreateTax from "./CreateTax";
import UploadCsv from "./UploadCsv";
import { FiEdit } from 'react-icons/fi';

const TaxTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [taxes, setTaxes] = useState([
    {
      id: 1,
      taxRate: '5%',
      cgst: '2.5',
      sgst: '2.5',
      igst: '5',
      hsnCode: 'ABC-123',
      description: 'Hair Oil | Face Cream | Shampoo',
      category: 'Personal Care'
    }
  ]);

  const [newTax, setNewTax] = useState({
    taxRate: '',
    cgst: '',
    sgst: '',
    igst: '',
    hsnCode: '',
    description: '',
    category: ''
  });

  const handleAddRow = () => {
    setTaxes([...taxes, { id: taxes.length + 1, ...newTax }]);
    setNewTax({
      taxRate: '',
      cgst: '',
      sgst: '',
      igst: '',
      hsnCode: '',
      description: '',
      category: ''
    });
  };

  const handleRemoveRow = () => {
    if (taxes.length > 0) {
      const newTaxes = [...taxes];
      newTaxes.pop();
      setTaxes(newTaxes);
    }
  };

  const handleSaveTax = (newTax) => {
    setTaxes([...taxes, {
      id: taxes.length + 1,
      ...newTax
    }]);
  };

  // New handler for CSV upload success
  const handleCsvUploadSuccess = (url) => {
    // In a real application, you would fetch and parse the CSV data from the URL
    console.log("CSV uploaded successfully to:", url);

    // Example of adding sample taxes from a CSV (mock implementation)
    const mockCsvTaxes = [
      {
        id: taxes.length + 1,
        taxRate: '12%',
        cgst: '6',
        sgst: '6',
        igst: '12',
        hsnCode: 'XYZ-456',
        description: 'Laptop | Computer | Electronics',
        category: 'Electronics'
      },
      {
        id: taxes.length + 2,
        taxRate: '18%',
        cgst: '9',
        sgst: '9',
        igst: '18',
        hsnCode: 'PQR-789',
        description: 'Food | Beverages',
        category: 'Food'
      }
    ];

    setTaxes([...taxes, ...mockCsvTaxes]);
  };

  return (
    <div className="w-full shadow-lg rounded-lg border overflow-hidden py-8">
      {/* Header */}
      <div className="flex justify-between p-4">
        <h1 className='text-black font-semibold text-2xl px-4 py-2 rounded uppercase'>
          Manage Tax
        </h1>
         {/* Create buttons */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Create Single
          </button>
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Bulk
          </button>
        </div>
      </div>
      </div>

     

      {/* Table */}
      <div className="px-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">
                <div className="flex items-center">
                  Tax Rate(%)
                </div>
              </th>
              <th className="px-4 py-2 text-left">
                <div className="flex items-center">
                  CGST(%)
                  
                </div>
              </th>
              <th className="px-4 py-2 text-left">
                <div className="flex items-center">
                   SGST & UTGST(%)
                  
                </div>
              </th>
              <th className="px-4 py-2 text-left">
                <div className="flex items-center">
                  IGST(%)
                 
                </div>
              </th>
              <th className="px-4 py-2 text-left">HSN Code</th>
              <th className="px-4 py-2 text-left">Description of Goods</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax.id} className="bg-blue-100 border-b border-gray-300">
                <td className="px-4 py-2">{tax.taxRate}</td>
                <td className="px-4 py-2">{tax.cgst}</td>
                <td className="px-4 py-2">{tax.sgst}</td>
                <td className="px-4 py-2">{tax.igst}</td>
                <td className="px-4 py-2">{tax.hsnCode}</td>
                <td className="px-4 py-2">
                  {tax.description.split(',').join(' | ')}
                </td>
                <td className="px-4 py-2">{tax.category}</td>
                <td className="px-4 py-2 flex gap-4 items-center">
                  <button><FiEdit/></button>
                  <button><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      {/* Single tax creation modal */}
      <CreateTax
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTax}
      />

      {/* CSV upload modal */}
      <UploadCsv
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onUploadSuccess={handleCsvUploadSuccess}
      />
    </div>
  );
};

export default TaxTable;