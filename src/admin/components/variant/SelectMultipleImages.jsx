import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectMultipleMedia = ({ formData, setFormData, onClose, initialMediaType = 'images' }) => {
    const [media, setMedia] = useState([]);
    const [activeTab, setActiveTab] = useState('gallery');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedGalleryMedia, setSelectedGalleryMedia] = useState([]);
    const [mediaType, setMediaType] = useState(initialMediaType);

    useEffect(() => {
        const fetchMedia = async () => {
          try {
            const token = localStorage.getItem('token'); 
            const type = mediaType === 'images' ? 'IMAGE' : 'VIDEO';
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=${type}`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`, 
                  'Content-Type': 'application/json',
                },
              }
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch media');
            }
            
            const result = await response.json();
            setMedia(result.data);
          } catch (error) {
            toast.error("Failed to fetch media: " + error.message);
          }
        };
        
        fetchMedia();
      }, [mediaType]);
      

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
          toast.error("Please select files to upload");
          return;
        }
      
        const formDataUpload = new FormData();
        selectedFiles.forEach(file => formDataUpload.append('media', file));
        formDataUpload.append('type', mediaType === 'images' ? 'IMAGE' : 'VIDEO');
      
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-media`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formDataUpload
          });
      
          const result = await response.json();
      console.log(result);
      
          if (result && result.imageUrl) {
            toast.success("Media uploaded successfully");
      
            const updatedMedia = {
                imageAndVideo: {
                  ...formData.imageAndVideo,
                  [mediaType]: [
                    ...(formData.imageAndVideo?.[mediaType] || []),
                    result.imageUrl
                  ]
                }
              };
      
              setFormData(updatedMedia);
              setSelectedFiles([]);
            
            const type = mediaType === 'images' ? 'IMAGE' : 'VIDEO';
            const refreshResponse = await fetch(
              `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=${type}`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            const refreshResult = await refreshResponse.json();
            setMedia(refreshResult.data);
          } else {
            toast.error("Upload failed");
          }
        } catch (error) {
          toast.error("Error uploading media");
        }
      };
    const handleGallerySelect = (mediaUrl) => {
        if (selectedGalleryMedia.includes(mediaUrl)) {
            setSelectedGalleryMedia(selectedGalleryMedia.filter(item => item !== mediaUrl));
        } else {
            setSelectedGalleryMedia([...selectedGalleryMedia, mediaUrl]);
        }
    };

    const handleAddGalleryMedia = () => {
        if (selectedGalleryMedia.length === 0) {
          toast.error("No media selected!");
          return;
        }
        
        const updatedFormData = {
          ...formData,
          imageAndVideo: {
            ...formData.imageAndVideo,
            [mediaType]: [
              ...(formData.imageAndVideo?.[mediaType] || []),
              ...selectedGalleryMedia
            ]
          }
        };
        
        setFormData(updatedFormData);
        toast.success("Gallery media added successfully");
        setSelectedGalleryMedia([]);
      };
      

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-4xl p-8 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-5">Choose {mediaType === 'images' ? 'Images' : 'Videos'}</h3>

                <div className="flex border-b mb-5">
                    <button type='button'
                        className={`p-2 w-1/2 ${activeTab === 'gallery' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab('gallery')}>
                        Choose from Gallery
                    </button>
                    <button type='button'
                        className={`p-2 w-1/2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab('upload')}>
                        Upload New {mediaType === 'images' ? 'Images' : 'Videos'}
                    </button>
                </div>

                {activeTab === 'gallery' ? (
                    <div>
                        <div className="max-h-[20rem] grid grid-cols-3 gap-4 overflow-y-auto">
                            {media?.map((item, index) => (
                                <div key={index}
                                    className={`p-2 border rounded-lg cursor-pointer ${selectedGalleryMedia.includes(item) ? 'border-blue-500' : ''}`}
                                    onClick={() => handleGallerySelect(item)}>
                                    {mediaType === 'images' ? (
                                        <img src={item} alt="Gallery" className="w-full h-32 object-cover" />
                                    ) : (
                                        <video className="w-full h-32 object-cover">
                                            <source src={item} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button 
                                type='button'
                                onClick={handleAddGalleryMedia}
                                className="bg-green-500 text-white px-4 py-2 rounded">
                                Add Selected {mediaType === 'images' ? 'Images' : 'Videos'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <input
                            type="file"
                            multiple
                            accept={mediaType === 'images' ? 'image/*' : 'video/*'}
                            onChange={handleFileChange}
                            className="p-2 border rounded w-full"
                        />
                        <button 
                            type='button'
                            onClick={handleUpload}
                            className="bg-blue-500 text-white p-2 rounded w-full">
                            Upload {mediaType === 'images' ? 'Images' : 'Videos'}
                        </button>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <button
                        type='button'
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectMultipleMedia;