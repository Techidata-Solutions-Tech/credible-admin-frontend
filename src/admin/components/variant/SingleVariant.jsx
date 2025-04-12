import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Select from 'react-select';

const SingleVariantPopup = ({ 
  attributes, 
  onClose, 
  onSubmit, 
  initialVariant = null 
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [expandedAttributes, setExpandedAttributes] = useState({});

  // Initialize form with default values if editing
  useEffect(() => {
    if (initialVariant) {
      const initialValues = {};
      const initialSelectedAttrs = [];
      const initialSelectedVals = {};
      
      initialVariant.attributes.forEach(attr => {
        initialValues[attr.name.toLowerCase()] = attr.option;
        
        const matchingAttr = attributes.find(a => a.name === attr.name);
        if (matchingAttr) {
          initialSelectedAttrs.push(matchingAttr);
          initialSelectedVals[matchingAttr.id] = [attr.option];
        }
      });
      
      setSelectedAttributes(initialSelectedAttrs);
      setSelectedValues(initialSelectedVals);
      
      reset({
        ...initialValues,
        price: initialVariant.price,
        quantity: initialVariant.stock_quantity,
        sku: initialVariant.sku,
        weight: initialVariant.weight,
        width: initialVariant.dimensions?.width,
        length: initialVariant.dimensions?.length,
        height: initialVariant.dimensions?.height,
        cost_per_item: initialVariant.cost_per_item,
        allow_out_of_stock: initialVariant.allow_out_of_stock
      });
    }
  }, [initialVariant, attributes, reset]);

  const toggleAttributeExpansion = (attributeId) => {
    setExpandedAttributes(prev => ({
      ...prev,
      [attributeId]: !prev[attributeId]
    }));
  };

  const toggleAttributeSelection = (attribute) => {
    setSelectedAttributes(prev => {
      const isSelected = prev.some(a => a.id === attribute.id);
      if (isSelected) {
        // Remove attribute from selection
        const newValues = {...selectedValues};
        delete newValues[attribute.id];
        setSelectedValues(newValues);
        return prev.filter(a => a.id !== attribute.id);
      } else {
        // Add attribute to selection with no values selected by default
        const newValues = {
          ...selectedValues,
          [attribute.id]: []
        };
        setSelectedValues(newValues);
        return [...prev, attribute];
      }
    });
  };

  const handleValueChange = (attributeId, selectedOptions) => {
    setSelectedValues(prev => ({
      ...prev,
      [attributeId]: selectedOptions.map(option => option.value)
    }));
  };

  const onSubmitForm = (data) => {
    // Prepare variant data
    const variantAttributes = selectedAttributes.map(attr => ({
      name: attr.name,
      option: selectedValues[attr.id]?.[0] || '' // Only take the first selected value
    }));

    const variantData = {
      ...data,
      attributes: variantAttributes,
      dimensions: {
        width: data.width || '',
        length: data.length || '',
        height: data.height || ''
      }
    };

    onSubmit(variantData);
  };

  // Convert attribute values to react-select format
  const getSelectOptions = (values) => {
    return values.map(value => ({
      value,
      label: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold uppercase">
            {initialVariant ? 'Edit Variant' : 'Add Single Variant'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="p-4">
          <div className="mb-6">
            <h3 className="font-medium mb-3">Select attributes:</h3>
            
            <div className="space-y-3">
              {attributes.map(attribute => (
                <div key={attribute.id} className="border border-gray-200 rounded-lg overflow-auto">
                  <div 
                    className="flex items-center justify-between p-3 cursor-pointer bg-gray-50"
                    onClick={() => toggleAttributeExpansion(attribute.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAttributes.some(a => a.id === attribute.id)}
                        onChange={() => toggleAttributeSelection(attribute)}
                        className="mr-3 h-4 w-4"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="font-medium">{attribute.name}</span>
                    </div>
                    {expandedAttributes[attribute.id] ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </div>
                  
                  {expandedAttributes[attribute.id] && selectedAttributes.some(a => a.id === attribute.id) && (
                    <div className="p-3 bg-white">
                      <Select
                        options={getSelectOptions(attribute.values)}
                        value={getSelectOptions(selectedValues[attribute.id] || [])}
                        onChange={(selected) => handleValueChange(attribute.id, selected)}
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder={`Select ${attribute.name} values`}
                      />
                      <p className="text-xs text-gray-500 mt-1">Select one value for single variant</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {selectedAttributes.map(attr => (
              <div key={attr.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {attr.name} *
                </label>
                <select
                  {...register(attr.name.toLowerCase(), { required: `${attr.name} is required` })}
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedValues[attr.id]?.[0] || ''}
                  onChange={(e) => handleValueChange(attr.id, [{ value: e.target.value }])}
                >
                  <option value="">Select {attr.name.toLowerCase()}</option>
                  {attr.values.map((value, i) => (
                    <option key={i} value={value}>{value}</option>
                  ))}
                </select>
                {errors[attr.name.toLowerCase()] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[attr.name.toLowerCase()].message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                {...register('sku')}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Auto-generated if empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-2">$</span>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="w-full p-2 pl-8 border border-gray-300 rounded"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost per item</label>
              <input
                type="text"
                {...register('cost_per_item')}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter cost per item"
              />
              <p className="text-xs text-gray-500 mt-1">Customers won't see this price.</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Inventory</h3>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                {...register('quantity', { min: 0 })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  {...register('allow_out_of_stock')}
                  className="mr-2"
                />
                <span className="text-sm">Allow checkout when out of stock</span>
              </label>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Shipping</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Weight (g)</label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register('weight')}
                      className="w-full p-2 pr-8 border border-gray-300 rounded"
                    />
                    <span className="absolute right-3 top-2 text-xs">g</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register('width')}
                      className="w-full p-2 pr-8 border border-gray-300 rounded"
                    />
                    <span className="absolute right-3 top-2 text-xs">cm</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Length (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register('length')}
                      className="w-full p-2 pr-8 border border-gray-300 rounded"
                    />
                    <span className="absolute right-3 top-2 text-xs">cm</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Height (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register('height')}
                      className="w-full p-2 pr-8 border border-gray-300 rounded"
                    />
                    <span className="absolute right-3 top-2 text-xs">cm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialVariant ? 'Update Variant' : 'Add Variant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleVariantPopup;