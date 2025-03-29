import React, { useState } from "react";

const UploadCsvModal = ({ onUploadSuccess, isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const data = new FormData();
    data.set("file", file);

    try {
      setLoading(true);
      const result = await fetch("/api/admin/upload/csv", {
        method: "POST",
        body: data,
      });
      const response = await result.json();

      if (result.ok) {
        alert(response.message);
        if (onUploadSuccess && response.uploadedUrl) {
          onUploadSuccess(response.uploadedUrl);
        }
        onClose(); 
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/2 h-60 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload CSV</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-col items-center space-y-4 w-full">
          <input
            type="file"
            accept=".csv"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="border border-gray-400 px-3 py-2 rounded-md w-full"
          />
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-lg disabled:bg-gray-500 w-full"
          >
            {loading ? "Uploading..." : "Upload CSV"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCsvModal;