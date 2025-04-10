import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSlider = () => {
  const token = localStorage.getItem('token');
  const [image, setImage] = useState(null);
  const [sliders, setSliders] = useState([]); 
  const [editData, setEditData] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("image", image);
  }, [image]);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/get-banner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSliders(result.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/delete-banner/${id}`, { 
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success("Banner deleted successfully!");
      fetchSliders();
    } catch (error) {
      toast.error("Failed to delete banner!");
    }
  };

  const toggleStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/update-banner-status/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Status updated successfully!");
        fetchSliders(); 
      } else {
        toast.error("Failed to update status!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const openEditModal = (slider) => {
    setEditData(slider);
    setIsEditModalOpen(true);
    setValue("redirectUrl", slider.redirectUrl);
    setValue("altText", slider.altText);
    setValue("position", slider.position);
    setValue("visibility", slider.visibility);
    setValue("index", slider.index);
    setImage(slider.image); 
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-image`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        setImage(result.imageUrl);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image!");
      }
    } catch (error) {
      toast.error("Something went wrong during image upload!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditSubmit = async (data) => {
    const payload = {
      image: image, 
      altText: data.altText,
      redirectUrl: data.redirectUrl,
      type: data.type,
      position: data.position,
      visibility: data.visibility,
      index: parseInt(data.index),
      status: editData.status, 
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/update-banner/${editData._id}`, {
        method: "PUT",
        headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,

         },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Banner updated successfully!");
        fetchSliders();
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update banner!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditData(null);
    reset();
  };

  return (
    <div className="min-h-screen">
      
      <div className="flex flex-col md:flex-row bg-gray-100">
        
        <div className="flex-1 p-4 m-2 bg-white rounded shadow-lg">
          <table className="mt-6 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Alt Text</th>
                <th className="p-2 border">Visibility</th>
                <th className="p-2 border">Position</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((slider) => (
                <tr key={slider._id} className="text-center">
                  <td className="p-2 border"><img src={slider.image} alt={slider.altText} className="h-16 mx-auto" /></td>
                  <td className="p-2 border">{slider.altText}</td>
                  <td className="p-2 border">{slider.visibility}</td>
                  <td className="p-2 border">{slider.position}</td>
                  <td className="p-2 border">
                    <span style={{ color: slider.status ? 'green' : 'red' }}>
                      {slider.status ? 'Active' : 'Inactive'}
                    </span>
                    <br />
                    <button
                      onClick={() => toggleStatus(slider._id, !slider.status)}
                      className="text-blue-500 underline"
                    >
                      Change Status
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => openEditModal(slider)} className="px-2 py-1 bg-green-500 text-white rounded-md mx-1">Edit</button>
                    <button onClick={() => handleDelete(slider._id)} className="px-2 py-1 bg-red-500 text-white rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold uppercase">Edit Slider</h2>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Image</label>
              <div className="flex items-center gap-4">
                {image && <img src={image} alt="Selected" className="h-16 w-16 object-cover rounded-md" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="p-2 border rounded-md"
                  disabled={isUploading}
                />
                {isUploading && <span className="text-sm text-gray-500">Uploading...</span>}
              </div>
            </div>
            <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Redirect URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("redirectUrl", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Alt Text</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("altText", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Position</label>
                <select
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("position")}
                >
                  <option value="HERO">Hero</option>
                  <option value="BELOW_POPULAR">Below Popular</option>
                  <option value="BANNER">Banner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold">Visibility</label>
                <select
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("visibility")}
                >
                  <option value="MOBILE">Only Mobile</option>
                  <option value="DESKTOP">Only Desktop</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isUploading}
              >
                {isUploading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditSlider;