import React, { useState } from 'react';

const CreateGstPopup = ({ isOpen, onClose, onSave }) => {
  const [entries, setEntries] = useState([
    { category: '', productName: '', taxRate: '', hsnCode: '' }
  ]);

  if (!isOpen) return null;

  const handleChange = (index, e) => {
    const updatedEntries = [...entries];
    updatedEntries[index][e.target.name] = e.target.value;
    setEntries(updatedEntries);
  };

  const handleAddRow = () => {
    setEntries([...entries, { category: '', productName: '', taxRate: '', hsnCode: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleSubmit = () => {
    onSave(entries);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl shadow-lg border border-dotted relative">
        <h2 className="text-xl font-bold text-center mb-6">
         Create GST/TAX
        </h2>

        <div className="mb-4">
          <button
            onClick={handleAddRow}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
          >
            Create GST/TAX
          </button>
        </div>

        {entries.map((entry, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={entry.category}
                onChange={(e) => handleChange(index, e)}
                className="border border-black bg-gray-200 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                value={entry.productName}
                onChange={(e) => handleChange(index, e)}
                className="border border-black bg-gray-200 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Tax Rate</label>
              <input
                type="text"
                name="taxRate"
                value={entry.taxRate}
                onChange={(e) => handleChange(index, e)}
                className="border border-black bg-gray-200 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">HSN Code</label>
              <input
                type="text"
                name="hsnCode"
                value={entry.hsnCode}
                onChange={(e) => handleChange(index, e)}
                className="border border-black bg-gray-200 p-2 rounded"
              />
            </div>

            <div className="flex gap-2 mt-2 col-span-4">
              <button
                onClick={handleAddRow}
                className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded"
              >
                ➕
              </button>
              {entries.length > 1 && (
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded"
                >
                  ✖️
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded"
          >
            Submit
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CreateGstPopup;
