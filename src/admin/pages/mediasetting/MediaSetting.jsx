import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Loader } from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

const MediaGallery = () => {
  const token = localStorage.getItem('token');
  const [activeTab, setActiveTab] = useState('images'); 
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, [activeTab]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === 'images' 
        ? `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=IMAGE`
        : `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=VIDEO`;
      
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setMedia(result.data || []);
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (url) => {
    setSelectedMedia((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(url)) {
        updatedSelection.delete(url);
      } else {
        updatedSelection.add(url);
      }
      return new Set(updatedSelection);
    });
  };

  const handleDelete = async () => {
    if (selectedMedia.size === 0) {
      toast.error(`No ${activeTab} selected for deletion`);
      return;
    }
    
    if (window.confirm(`Are you sure to delete selected ${activeTab}?`)) {
      try {
        const endpoint = activeTab === 'images'
          ? `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=IMAGE`
          : `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=VIDEO`;
        
        const response = await fetch(endpoint, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            [activeTab]: Array.from(selectedMedia) 
          }),
        });
        
        if (response.ok) {
          toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} deleted successfully`);
          setMedia(media.filter((item) => !selectedMedia.has(item)));
          setSelectedMedia(new Set());
        } else {
          toast.error(`Failed to delete ${activeTab}`);
        }
      } catch (error) {
        toast.error(`Error deleting ${activeTab}`);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error(`Please select a file to upload`);
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    const fieldName = activeTab === 'images' ? 'image' : 'video';
    formData.append(fieldName, selectedFile);

    try {
      const endpoint = activeTab === 'images'
        ? `${import.meta.env.VITE_BASE_URL}/api/admin/upload-image`
        : `${import.meta.env.VITE_BASE_URL}/api/admin/upload-video`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      const result = await response.json();
      if (response.ok) {
        toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} uploaded successfully`);
        setMedia([...media, result[fieldName + 'Url']]);
        setSelectedFile(null);
        // Clear file input
        document.getElementById('fileInput').value = '';
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error(`Error uploading ${activeTab}`);
    } finally {
      setIsUploading(false);
    }
  };
  const breadcrumbItems = [
    { label: 'Home', href: '/admin' },
    { label: 'Media Setting', href: '/admin/media' },
  ];
  return (
    <div className="flex h-screen overflow-auto">
      
      <div className="flex-1 flex flex-col overflow-auto">
        

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <Breadcrumbs
              pageTitle="Media Settings"
              items={breadcrumbItems}
            />
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'images' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('images')}
            >
              Images
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'videos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <input
                id="fileInput"
                type="file"
                accept={activeTab === 'images' ? 'image/*' : 'video/*'}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="p-2 border rounded"
                disabled={isUploading}
              />
              <button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
                className="btn bg-blue-500 text-white ml-2 disabled:bg-blue-300 flex items-center disabled:text-black"
              >
                {isUploading ? (
                  <>
                    <Loader className="animate-spin mr-2" size={18} />
                    Uploading...
                  </>
                ) : (
                  'Upload'
                )}
              </button>
            </div>
            <button
              onClick={handleDelete}
              disabled={selectedMedia.size === 0}
              className="btn bg-red-500 text-white disabled:bg-red-300 disabled:text-black"
            >
              Delete Selected
            </button>
          </div>

          {/* Media Grid */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin" size={32} />
                <span className="ml-2">Loading {activeTab}...</span>
              </div>
            ) : media.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No {activeTab} found
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {media?.map((url, index) => (
                  <div key={index} className="relative border rounded p-2 group">
                    {activeTab === 'images' ? (
                      <img
                        src={url}
                        alt="Media"
                        className="w-full h-auto cursor-pointer object-cover aspect-square"
                        onClick={() => handleSelect(url)}
                      />
                    ) : (
                      <video
                        className="w-full h-auto cursor-pointer object-cover aspect-square"
                        onClick={() => handleSelect(url)}
                      >
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {selectedMedia.has(url) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none">
                        <div className="bg-white rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;