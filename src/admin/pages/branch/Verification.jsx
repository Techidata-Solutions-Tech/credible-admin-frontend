import React, { useState } from 'react';
import SelectMultipleMedia from '../../components/product/SelectMultipleImages';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function VerificationForm() {
  const [formData, setFormData] = useState({
    stockistId: "",
    stockistLocation: "",
    status: "Accepted",
    mainReason: "",
    subReason: "",
    productCondition: "Accepectable",
    brandPacking1: "Available",
    priceTag: "Available",
    brandPacking2: "Available",
    brandPacking3: "Available",
    matched: true,
    mismatched: false,
    remarks: "",
    productRemarks: "",
    brandPacking1Remarks: "",
    priceTagRemarks: "",
    brandPacking2Remarks: "",
    brandPacking3Remarks: "",
    matchRemarks: "",
    imageAndVideo: {
      images: [],
      videos: []
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const breadcrumbItems = [
    { label: 'Warehouse Management', href: '#' },
    { label: 'Branch', href: '#' },
    { label: 'Verification', href: '/admin/warehouse/table' },
  ];
  return (
    <div className="min-h-screen flex flex-col  bg-white p-2">
          <Breadcrumbs
            pageTitle="Verification"
            items={breadcrumbItems}
          />
      <form onSubmit={handleSubmit}>
  
        
        {/* Top Row - Stockist Info */}
        <div className="flex flex-wrap gap-8 mb-6">
          <div className="flex items-center">
            <label className="font-semibold mr-2">Stockist Id :</label>
            <input
              type="text"
              name="stockistId"
              value={formData.stockistId}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
          
          <div className="flex items-center">
            <label className="font-semibold mr-2">Stockist Location:</label>
            <input
              type="text"
              name="stockistLocation"
              value={formData.stockistLocation}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        
        <div className="bg-blue-700 text-white py-2 px-4 text-center mb-6">
          <h3 className="text-lg font-bold">Status - {formData.status}</h3>
        </div>
        
        <SelectMultipleMedia formData={formData} setFormData={setFormData} />
        
        <div className="flex flex-wrap gap-8 my-6">
          <div className="flex items-center">
            <label className="font-semibold mr-2">Main Reason :</label>
            <input
              type="text"
              name="mainReason"
              value={formData.mainReason}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
          
          <div className="flex items-center">
            <label className="font-semibold mr-2">Sub Reason :</label>
            <input
              type="text"
              name="subReason"
              value={formData.subReason}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white p-2 w-48">
            <span className="font-bold">Product Condition</span>
          </div>
          
          <div className="flex items-center mx-4">
            <span className="mr-2">Accepectable</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.productCondition === 'Accepectable' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('productCondition', 'Accepectable')}
            >
              {formData.productCondition === 'Accepectable' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mr-4">
            <span className="mr-2">Unaccepectable</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.productCondition === 'Unaccepectable' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('productCondition', 'Unaccepectable')}
            >
              {formData.productCondition === 'Unaccepectable' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Remarks</span>
            <input
              type="text"
              name="productRemarks"
              value={formData.productRemarks}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white p-2 w-48">
            <span className="font-bold">Brand Packing</span>
          </div>
          
          <div className="flex items-center mx-4">
            <span className="mr-2">Available</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.brandPacking1 === 'Available' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('brandPacking1', 'Available')}
            >
              {formData.brandPacking1 === 'Available' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mr-4">
            <span className="mr-2">Unavailable</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.brandPacking1 === 'Unavailable' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('brandPacking1', 'Unavailable')}
            >
              {formData.brandPacking1 === 'Unavailable' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Remarks</span>
            <input
              type="text"
              name="brandPacking1Remarks"
              value={formData.brandPacking1Remarks}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white p-2 w-48">
            <span className="font-bold">Price Tag</span>
          </div>
          
          <div className="flex items-center mx-4">
            <span className="mr-2">Available</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.priceTag === 'Available' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('priceTag', 'Available')}
            >
              {formData.priceTag === 'Available' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mr-4">
            <span className="mr-2">Unavailable</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.priceTag === 'Unavailable' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('priceTag', 'Unavailable')}
            >
              {formData.priceTag === 'Unavailable' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Remarks</span>
            <input
              type="text"
              name="priceTagRemarks"
              value={formData.priceTagRemarks}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white p-2 w-48">
            <span className="font-bold">Brand Packing</span>
          </div>
          
          <div className="flex items-center mx-4">
            <span className="mr-2">Available</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.brandPacking2 === 'Available' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('brandPacking2', 'Available')}
            >
              {formData.brandPacking2 === 'Available' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mr-4">
            <span className="mr-2">Unavailable</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.brandPacking2 === 'Unavailable' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('brandPacking2', 'Unavailable')}
            >
              {formData.brandPacking2 === 'Unavailable' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Remarks</span>
            <input
              type="text"
              name="brandPacking2Remarks"
              value={formData.brandPacking2Remarks}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white p-2 w-48">
            <span className="font-bold">Brand Packing</span>
          </div>
          
          <div className="flex items-center mx-4">
            <span className="mr-2">Available</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.brandPacking3 === 'Available' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('brandPacking3', 'Available')}
            >
              {formData.brandPacking3 === 'Available' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mr-4">
            <span className="mr-2">Unavailable</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.brandPacking3 === 'Unavailable' ? 'border-blue-500' : ''}`}
              onClick={() => handleRadioChange('brandPacking3', 'Unavailable')}
            >
              {formData.brandPacking3 === 'Unavailable' && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Remarks</span>
            <input
              type="text"
              name="brandPacking3Remarks"
              value={formData.brandPacking3Remarks}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="flex items-center mr-8">
            <span className="font-semibold mr-2">Matched :</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.matched ? 'border-blue-500' : ''}`}
              onClick={() => {
                handleRadioChange('matched', true);
                handleRadioChange('mismatched', false);
              }}
            >
              {formData.matched && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mr-8">
            <span className="font-semibold mr-2">Misatched :</span>
            <div 
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer ${formData.mismatched ? 'border-blue-500' : ''}`}
              onClick={() => {
                handleRadioChange('matched', false);
                handleRadioChange('mismatched', true);
              }}
            >
              {formData.mismatched && (
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="font-semibold mr-2">Remarks</span>
            <input
              type="text"
              name="matchRemarks"
              value={formData.matchRemarks}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-80"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6 gap-4">
          <button 
            type="button" 
            className="bg-green-500 text-white px-8 py-2 font-bold"
          >
            Edit
          </button>
          <button 
            type="submit" 
            className="bg-green-500 text-white px-8 py-2 font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}