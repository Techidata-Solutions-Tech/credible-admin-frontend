import React, { useState } from 'react';
import { FaSortDown, FaTimes } from 'react-icons/fa';

const CreateTaxModal = ({ isOpen, onClose, onSave }) => {
  const initialTaxData = {
    taxRate: '',
    cgst: '',
    sgst: '',
    igst: '',
    hsnCode: '',
    description: '',
    category: ''
  };

  const [taxData, setTaxData] = useState(initialTaxData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'taxRate') {
      // Extract numeric value, handling both with and without '%'
      let numericValue = value;
      if (value.includes('%')) {
        numericValue = value.replace('%', '');
      }
      
      numericValue = parseFloat(numericValue);
      
      if (!isNaN(numericValue)) {
        const halfValue = (numericValue / 2).toFixed(1);
        
        setTaxData({
          ...taxData,
          taxRate: numericValue + '%',
          cgst: halfValue,
          sgst: halfValue,
          // Not updating IGST - it will be manually entered
        });
      } else {
        setTaxData({
          ...taxData,
          taxRate: value
        });
      }
    } else if (name === 'igst') {
      // Convert IGST input to a number
      const numericValue = parseFloat(value);
      
      setTaxData({
        ...taxData,
        igst: isNaN(numericValue) ? '' : numericValue
      });
    } else {
      setTaxData({
        ...taxData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(taxData);
    onClose();
  };
  
  const handleReset = () => {
    setTaxData(initialTaxData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl">
        {/* Modal Header */}
        <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-semibold uppercase">Create Tax</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            {/* Tax Rate */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tax Rate (%)</label>
              <input 
                type="text"
                name="taxRate"
                value={taxData.taxRate}
                onChange={handleChange}
                className="form-input w-full border border-gray-300 rounded-md p-2"
                placeholder="5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* CGST */}
              <div>
                <label className="block text-gray-700 mb-2">CGST(%)</label>
                <input 
                  type="text"
                  name="cgst"
                  value={taxData.cgst}
                  readOnly
                  className="form-input w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  placeholder="2.5"
                />
              </div>

              {/* SGST/UTGST */}
              <div>
                <label className="block text-gray-700 mb-2">SGST/UTGST(%)</label>
                <input 
                  type="text"
                  name="sgst"
                  value={taxData.sgst}
                  readOnly
                  className="form-input w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  placeholder="2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* IGST */}
              <div>
                <label className="block text-gray-700 mb-2">IGST(%)</label>
                <input 
                  type="text"
                  name="igst"
                  value={taxData.igst}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 rounded-md p-2"
                  placeholder="5"
                />
              </div>

              {/* HSN Code */}
              <div>
                <label className="block text-gray-700 mb-2">HSN Code</label>
                <input 
                  type="text"
                  name="hsnCode"
                  value={taxData.hsnCode}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 rounded-md p-2"
                  placeholder="5"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-gray-700 mb-2">Categories</label>
                <div className="relative">
                  <select 
                    name="category" 
                    value={taxData.category}
                    onChange={handleChange}
                    className="form-select w-full border border-gray-300 rounded-md p-2 appearance-none"
                  >
                    <option value="">Categories</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Food">Food</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FaSortDown />
                  </div>
                </div>
              </div>
            </div>

            {/* Description of Goods */}
            <div>
              <label className="block text-gray-700 mb-2">Description of Goods</label>
              <textarea 
                type="text"
                name="description"
                value={taxData.description}
                onChange={handleChange}
                className="form-input w-full border border-gray-400 rounded p-2 h-[200px]"
                placeholder="e.g. Hair Oil | Face Cream | Shampoo"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaxModal;