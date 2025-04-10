import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from '../../components/dashboard/ImageGallery';
const UploadImage = () => {
  const token = localStorage.getItem('token');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [images, setImages] = useState([]);
  const [toggle, setToggle] = useState(Date.now());


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/images`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setImages(result.data)
      } catch (error) {
        // console.error("Error fetching categories:", error);
        toast.error("Failed to fetch images");
      }
    };

    fetchImages();
  }, [toggle])


  const onSubmit = async (data) => {
    const formData = new FormData();


    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    } else {
      toast.error("Please select an image.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-image`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setToggle(Date.now())
        toast.success("Image submitted successfully!");
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className='min-h-screen'>
      
      <div className='flex flex-col md:flex-row bg-gray-100'>
        
        <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>


          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">


            <div className="mb-4 w-1/2">
              <label htmlFor="image" className="block text-sm font-semibold">Upload Image</label>
              <input
                id="image"
                type="file"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('image', { required: 'Image is required' })}
              />
              {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </form>

          <ImageGallery images={images} />
        </div>
      </div>
      < ToastContainer />
    </div>
  )
}

export default UploadImage