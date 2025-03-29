import React, { useState } from 'react';
import { FaSortDown, FaTimes } from 'react-icons/fa';

const CreateTaxModal = ({ isOpen, onClose, onSave }) => {
  const [taxData, setTaxData] = useState({
    taxRate: '5%',
    cgst: '2.5',
    sgst: '2.5',
    igst: '5',
    hsnCode: '',
    description: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxData({
      ...taxData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(taxData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        {/* Modal Header */}
        <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-semibold">Create Tax</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Tax Rate */}
            <div>
              <label className="block text-gray-700 mb-2">Tax Rate</label>
              <div className="flex items-center">
                <select 
                  name="taxRate" 
                  value={taxData.taxRate}
                  onChange={handleChange}
                  className="form-select w-full border rounded p-2"
                >
                  <option value="0%">0%</option>
                  <option value="5%">5%</option>
                  <option value="12%">12%</option>
                  <option value="18%">18%</option>
                  <option value="28%">28%</option>
                </select>
                
              </div>
            </div>

            {/* CGST & SGST */}
            <div>
              <label className="block text-gray-700 mb-2">CGST & SGST</label>
              <div className="flex items-center">
                <input 
                  type="text"
                  name="cgst"
                  value={taxData.cgst}
                  onChange={handleChange}
                  className="form-input w-1/2 border rounded p-2 mr-1"
                  placeholder="CGST"
                />
                <span className="mx-1">|</span>
                <input 
                  type="text"
                  name="sgst"
                  value={taxData.sgst}
                  onChange={handleChange}
                  className="form-input w-1/2 border rounded p-2 ml-1"
                  placeholder="SGST"
                />
                
              </div>
            </div>

            {/* IGST */}
            <div>
              <label className="block text-gray-700 mb-2">IGST</label>
              <div className="flex items-center">
                <input 
                  type="text"
                  name="igst"
                  value={taxData.igst}
                  onChange={handleChange}
                  className="form-input w-full border rounded p-2"
                  placeholder="IGST"
                />
                
              </div>
            </div>

            {/* HSN Code */}
            <div>
              <label className="block text-gray-700 mb-2">HSN Code</label>
              <input 
                type="text"
                name="hsnCode"
                value={taxData.hsnCode}
                onChange={handleChange}
                className="form-input w-full border rounded p-2"
                placeholder="e.g. ABC-123"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Description of Goods */}
            <div>
              <label className="block text-gray-700 mb-2">Description of Goods</label>
              <input 
                type="text"
                name="description"
                value={taxData.description}
                onChange={handleChange}
                className="form-input w-full border rounded p-2"
                placeholder="e.g. Hair Oil | Face Cream | Shampoo"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select 
                name="category" 
                value={taxData.category}
                onChange={handleChange}
                className="form-select w-full border rounded p-2"
              >
                <option value="">Select a category</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Electronics">Electronics</option>
                <option value="Appliances">Appliances</option>
                <option value="Furniture">Furniture</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaxModal;