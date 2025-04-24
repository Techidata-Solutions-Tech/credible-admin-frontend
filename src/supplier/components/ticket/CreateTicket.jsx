import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTicketPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setFileError('File size exceeds 1MB limit');
      return;
    }

    const validTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setFileError('Unsupported file type');
      return;
    }

    setFileError('');
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let mediaUrl = '';
      if (formData.file) {
        const uploadFormData = new FormData();
        uploadFormData.append('media', formData.file);
        
        let type = 'PDF';
        if (formData.file.type.startsWith('image/')) {
          type = 'IMAGE';
        } else if (formData.file.type.startsWith('video/')) {
          type = 'VIDEO';
        }
        uploadFormData.append('type', type);

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/admin/upload-media`, 
          uploadFormData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (response.data && response.data.imageUrl) {
          mediaUrl = response.data.imageUrl;
          toast.success("File uploaded successfully");
        } else {
          throw new Error("Invalid response from server");
        }
      }

      await onSubmit({
        subject: formData.subject,
        description: formData.description,
        mediaUrl
      });

      onClose();
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error(error.response?.data?.message || "Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      subject: '',
      description: '',
      file: null
    });
    setFileError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Tickets</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-4xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Seller Id</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              value="Automatically Display"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
                Upload File
            </label>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".gif,.jpg,.png,.jpeg,.pdf"
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-2">
                Supported Types: gif, jpg, png, jpeg, pdf. (Maximum File Support 1MB)
            </p>
            {fileError && (
                <p className="text-xs text-red-600 mt-1">
                {fileError}
                </p>
            )}
            </div>


          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketPopup;