import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProductTable from '../../components/product/ProductTable'
import { Link } from 'react-router-dom'
import PillTabs from '../../components/PillTabs'
import { BsThreeDots } from 'react-icons/bs'
import { useForm, useFieldArray } from "react-hook-form";
const AddAttributes = () => {
  const tabs_status = [
    { id: 1, label: 'All (200)' },
    { id: 2, label: 'Active (100)' },
    { id: 3, label: 'Inactive (20)' },
    { id: 4, label: 'Instock (05)' },
    { id: 5, label: 'Out of stock (10)' },
  ];
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      attributeName: "",
      attributeValues: [{ value: "" }],
      attributeTypes: [{ type: "" }],
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const { fields: valueFields, append: appendValue, remove: removeValue } = useFieldArray({
    control,
    name: "attributeValues",
  });

  const { fields: typeFields, append: appendType, remove: removeType } = useFieldArray({
    control,
    name: "attributeTypes",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={1} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <div className="rounded shadow-lg p-2 sm:p-4 bg-white">
           

          

            {/* Product Table */}
            <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label>Attribute Name:</label>
                    <input {...register("attributeName")} className="border p-2 w-full" />
                </div>

                <div className="flex justify-between gap-6 items-start">
  {/* Attribute Values Section */}
  <div className="w-1/2">
    <label className="block mb-2">Attribute Values:</label>
    {valueFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2">
        <input
          {...register(`attributeValues.${index}.value`)}
          className="border p-2 w-full"
        />
        <button
          type="button"
          className="bg-red-500 text-white px-2 rounded"
          onClick={() => removeValue(index)}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => appendValue({ value: "" })}
    >
      + Add Value
    </button>
  </div>

  {/* Attribute Types Section */}
  <div className="w-1/2">
    <label className="block mb-2">Attribute Types:</label>
    {typeFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2">
        <input
          {...register(`attributeTypes.${index}.type`)}
          className="border p-2 w-full"
        />
        <button
          type="button"
          className="bg-red-500 text-white px-2 rounded"
          onClick={() => removeType(index)}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      className="bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => appendType({ type: "" })}
    >
      + Add Type
    </button>
  </div>
                </div>


                <div>
                    <label>Meta Title:</label>
                    <input {...register("metaTitle")} className="border p-2 w-full" />
                </div>

                <div>
                    <label>Meta Description:</label>
                    <textarea {...register("metaDescription")} className="border p-2 w-full" />
                </div>

                <div>
                    <label>Meta Keywords:</label>
                    <input {...register("metaKeywords")} className="border p-2 w-full" />
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
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

export default AddAttributes