import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../components/product/ProductTable'
import { Link } from 'react-router-dom'
import PillTabs from '../../components/PillTabs'
import { BsThreeDots } from 'react-icons/bs'
import { useForm, useFieldArray } from "react-hook-form";
import Breadcrumbs from '../../components/Breadcrumbs'
const AddBrand = () => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
          category: "",
          companyName: "",
          brandName: "",
          brandLogo: null,
          product: "",
          country: "",
          metaTitle: "",
          metaKeywords: "",
          metaDescription: "",
        },
      });
    
      const [preview, setPreview] = useState(null);
    
      const onSubmit = (data) => {
        console.log("Submitted Data:", data);
      };
    
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setValue("brandLogo", file);
          setPreview(URL.createObjectURL(file));
        }
      };

      const breadcrumbItems = [
        { label: 'Product Management', href: '#' },
        { label: 'Brands', href: '#' },
        { label: 'Add Brand', href: '/admin/product/attributes' },
      ];
      return (
          
            
            <div className=' rounded shadow-lg p-4  m-2 bg-white'>
            <Breadcrumbs
                  pageTitle="Add Brand"
                  items={breadcrumbItems}
                />
          
      
      
      <div className="flex-1 flex flex-col overflow-auto">
        
        
        
       
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
           

          

            {/* Product Table */}
            <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
               
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
                {/* Category */}
                <div>
                    <label className="block mb-1 font-semibold">Category:</label>
                    <input {...register("category")} className="border p-2 w-full" />
                </div>

                {/* Company Name */}
                <div>
                    <label className="block mb-1 font-semibold">Company Name:</label>
                    <input {...register("companyName")} className="border p-2 w-full" />
                </div>

                {/* Brand Name */}
                <div>
                    <label className="block mb-1 font-semibold">Brand Name:</label>
                    <input {...register("brandName")} className="border p-2 w-full" />
                </div>

                {/* Brand Logo Upload */}
                <div>
                    <label className="block mb-1 font-semibold">Brand Logo:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
                    {preview && <img src={preview} alt="Brand Logo Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>

                {/* Single Product Input */}
                <div>
                    <label className="block mb-1 font-semibold">Product:</label>
                    <input {...register("product")} className="border p-2 w-full" />
                </div>

                {/* Country */}
                <div>
                    <label className="block mb-1 font-semibold">Country:</label>
                    <input {...register("country")} className="border p-2 w-full" />
                </div>

                {/* Meta Title */}
                <div>
                    <label className="block mb-1 font-semibold">Meta Title:</label>
                    <input {...register("metaTitle")} className="border p-2 w-full" />
                </div>

                {/* Meta Keywords */}
                <div>
                    <label className="block mb-1 font-semibold">Meta Keywords:</label>
                    <input {...register("metaKeywords")} className="border p-2 w-full" />
                </div>

                {/* Meta Description */}
                <div>
                    <label className="block mb-1 font-semibold">Meta Description:</label>
                    <textarea {...register("metaDescription")} className="border p-2 w-full" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Submit</button>
                </form>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="join shadow-lg">
                <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200">«</button>
                <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200 px-6">Page 22</button>
                <button className="join-item btn bg-white hover:bg-blue-50 text-blue-700 border-blue-200">»</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBrand