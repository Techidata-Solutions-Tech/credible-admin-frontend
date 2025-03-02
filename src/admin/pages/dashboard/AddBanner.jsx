import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import SelectImageModal from '../../components/dashboard/SelectImageModal'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddBanner = () => {
      const [image, setImage] = useState(null);
      const { register, handleSubmit, setValue, formState: { errors } } = useForm();
      useEffect(()=>{
        setValue('image',image)
      },[image])
      const onSubmit = async (data) => {
        
        const payload = {
          image: data.image, 
          redirectUrl: data.redirectUrl,
          type: data.type,
          position: data.position,
          index: parseInt(data.index),
        };
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/add-banner`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          const result = await response.json();
          if (response.ok) {
            toast.success("Banner added successfully!");
          } else {
            toast.error(`Error: ${result.message}`);
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };
      
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex flex-col md:flex-row bg-gray-100'>
                <Sidebar />
                <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>
                   <SelectImageModal setImage={setImage}/>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md pt-[20px]">

                    <div className='flex justify-evenly gap-[50px]'>
                   
                    
                    <div className="mb-4 w-1/2">
                      <label htmlFor="redirectUrl" className="block text-sm font-semibold">Redirect URL</label>
                        <input
                            id="redirectUrl"
                            type="text"
                            className="w-full p-2 border rounded-md bg-transparent"
                            {...register('redirectUrl', { required: 'redirect URL is required' })}
                        />
                        {errors.redirectUrl && <p className="text-red-500 text-xs">{errors.redirectUrl.message}</p>}
                      </div>
                    </div>

                    <div className='flex justify-evenly gap-[50px]'>
                    <div className="mb-4 w-1/2">
                    <label htmlFor="position" className="block text-sm font-semibold">
                        Position
                    </label>
                    <select
                        id="position"
                        className="w-full p-2 border rounded-md bg-transparent"
                        {...register("position")}
                        >
                            <option value="HERO" selected>Hero</option>
                            <option value="BELOW_POPULAR">Below Popular</option>
                            <option value="BANNER">Banner</option>
                        </select>
                    {errors.position && (
                    <p className="text-red-500 text-xs">{errors.position.message}</p>
                    )}
                    </div>
                    <div className="mb-4 w-1/2">
                    <label htmlFor="position" className="block text-sm font-semibold">
                        Type
                    </label>
                    <select
                        id="type"
                        className="w-full p-2 border rounded-md bg-transparent"
                        {...register("type")}
                        >
                            <option value="HALF" selected>Half</option>
                            <option value="FULL">Full</option>
                        </select>
                    {errors.type && (
                    <p className="text-red-500 text-xs">{errors.type.message}</p>
                    )}
                    </div>
                    <div className="mb-4 w-1/2">
                    
                        <label htmlFor="image" className="block text-sm font-semibold">Choose Image</label>
                        <input

                        id="image"
                        type="text"
                        className="w-full p-2 border rounded-md bg-transparent hidden"
                        {...register('image', { required: 'Image is required' })}
                        />
                          <button
                                type="button"
                                onClick={() => document.getElementById('view_image').showModal()}
                                className="w-full p-2 border rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600"
                            >
                                Choose Image
                            </button>
                            {image && <img src={image} alt="Preview" className="max-w-full h-auto rounded mt-2" />}
                    </div>

                   
                    </div>

                    <div className="mb-4 w-1/2">
                        <label htmlFor="index" className="block text-sm font-semibold">Index</label>
                        <input
                            id="index"
                            type="number"
                            min={0}
                            className="w-full p-2 border rounded-md bg-transparent"
                            {...register('index', { required: 'Index is required' })}
                        />
                        {errors.index && <p className="text-red-500 text-xs">{errors.index.message}</p>}
                    </div>
                    <button type="submit" className=" p-2 bg-blue-600 text-white rounded-md">
                        Submit
                    </button>
                    </form>

                    
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddBanner