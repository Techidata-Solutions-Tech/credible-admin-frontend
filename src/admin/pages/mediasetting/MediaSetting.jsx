import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ImageGallery = () => {
  const token = localStorage.getItem('token');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/images`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setImages(result.data || []);
    } catch (error) {
      toast.error("Failed to fetch images");
    }
  };

  const handleSelect = (url) => {
    setSelectedImages((prevSelected) => {
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
    if (selectedImages.size === 0) {
      toast.error("No images selected for deletion");
      return;
    }
    if (window.confirm("Are you sure to delete selected images?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/images`,
          {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
             },
            body: JSON.stringify({ images: Array.from(selectedImages) }),
          }
        );
        if (response.ok) {
          toast.success("Images deleted successfully");
          setImages(images.filter((img) => !selectedImages.has(img)));
          setSelectedImages(new Set());
        } else {
          toast.error("Failed to delete images");
        }
      } catch (error) {
        toast.error("Error deleting images");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/upload-image`,
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Image uploaded successfully");
        setImages([...images, result.imageUrl]);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="flex justify-between mb-4">
            <div>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="p-2 border rounded"
              />
              <button
                onClick={handleUpload}
                className="btn bg-blue-500 text-white ml-2"
              >
                Upload
              </button>
            </div>
            <button
              onClick={handleDelete}
              className="btn bg-red-500 text-white"
            >
              Delete Selected
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative border rounded p-2">
                <img
                  src={url}
                  alt="Uploaded"
                  className="w-full h-auto cursor-pointer"
                  onClick={() => handleSelect(url)}
                />
                {selectedImages.has(url) && (
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
