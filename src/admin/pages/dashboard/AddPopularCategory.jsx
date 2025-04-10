import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import SelectImageModal from '../../components/dashboard/SelectImageModal'
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '../../components/Breadcrumbs';
const AddPopularCategory = () => {
  const token = localStorage.getItem('token');
  const { register, handleSubmit,setValue, formState: { errors } } = useForm();
   const [image, setImage] = useState(null);
   useEffect(()=>{
           setValue('image',image)
   },[image])
  
  const onSubmit = async (data) => {

    const payLoad = {
      name: data.name,
      image: 'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
      redirectUrl: data.redirectUrl,
      index: parseInt(data.index),
    }
    try {
      const response = await fetch( `${import.meta.env.VITE_BASE_URL}/api/admin/popularCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payLoad),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Category submitted successfully!")
        // alert("Category submitted successfully!");
      } else {
        toast.error(`Error: ${result.message}`)
        // alert(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const breadcrumbItems = [
    { label: 'Website Setting', href: '/admin' },
    { label: 'Popular Category', href: '/admin/dashboard/category/popular-table' },
    { label: 'Add Popular Category', href: '/admin/dashboard/category/popular' }
  ];
    return (
        <div className='min-h-screen'>
            
            <div className='flex flex-col md:flex-row bg-gray-100'>
                
                <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>
                <Breadcrumbs
              pageTitle="Add Popular Category"
              items={breadcrumbItems}
            />
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md pt-[30px]">

                    <div className='flex justify-evenly gap-[50px]'>
                    <div className="mb-4 w-1/2">
                    <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full p-2 border rounded-md bg-transparent"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4 w-1/2">
                    
                        <label htmlFor="image" className="block text-sm font-semibold">Choose Image</label>
                        <input

                        id="image"
                        type="text"
                        className="w-full p-2 border rounded-md bg-transparent hidden"
                        {...register('image', { required: 'Image is required' })}
                        />
                                         <SelectImageModal setImage={setImage}/>

                            {image && <img src={image} alt="Preview" className="max-w-full h-auto rounded mt-2" />}
                    </div>
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
                    <div className="mb-4 w-1/2">
                        <label htmlFor="index" className="block text-sm font-semibold">Order</label>
                        <input
                            id="index"
                            type="number"
                            className="w-full p-2 border rounded-md bg-transparent"
                            {...register('index', { required: 'Order is required' })}
                        />
                        {errors.index && <p className="text-red-500 text-xs">{errors.index.message}</p>}
                        </div>
                    </div>


                    
                        <button type="submit" className="p-2 bg-blue-600 text-white rounded-md">
                            Submit
                        </button>
                    </form>

                    <ToastContainer/>
                </div>
            </div>
        </div>
    )
}

export default AddPopularCategory