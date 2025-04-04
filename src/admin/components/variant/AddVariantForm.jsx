import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX, FiPlus, FiChevronDown, FiChevronUp, FiImage, FiVideo } from 'react-icons/fi';
import Select, { components } from 'react-select';
import { useParams } from 'react-router-dom';
const VariantManager = ({ productId, onClose }) => {
  const {id} = useParams()
  const [variants, setVariants] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [showAddVariantForm, setShowAddVariantForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [generatedVariants, setGeneratedVariants] = useState([]);
  const [editingGeneratedVariant, setEditingGeneratedVariant] = useState(null);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [expandedVariant, setExpandedVariant] = useState(null);
  const [mediaType, setMediaType] = useState('images');
  const [media, setMedia] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedGalleryMedia, setSelectedGalleryMedia] = useState([]);
  const token = localStorage.getItem('token');
  const [editGeneratedVariantModal, setEditGeneratedVariantModal] = useState(null);
const initialSelectionMode = 'all'
  const handleEditGeneratedVariant = (index) => {
    setEditGeneratedVariantModal(index);
  };
  const saveEditedGeneratedVariant = (data) => {
    const newVariants = [...generatedVariants];
    newVariants[editGeneratedVariantModal] = {
      ...newVariants[editGeneratedVariantModal],
      ...data,
      dimensions: {
        width: data.width || '',
        length: data.length || '',
        height: data.height || ''
      }
    };
    setGeneratedVariants(newVariants);
    setEditGeneratedVariantModal(null);
    toast.success('Variant updated successfully');
  };
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();

  // Fetch attributes, variants, and media on component mount
  useEffect(() => {
    fetchAttributes();
    fetchVariants();
    fetchMedia();
  }, []);
  useEffect(() => {
    if (attributes.length === 0) return;

    const newSelectedValues = {};
    const newSelectedAttributes = [];

    attributes.forEach(attribute => {
      if (initialSelectionMode === 'all') {
        // Select all values by default
        newSelectedValues[attribute.id] = [...attribute.values];
        newSelectedAttributes.push(attribute);
      } else if (initialSelectionMode === 'none') {
        // Start with nothing selected
        newSelectedValues[attribute.id] = [];
      } else if (typeof initialSelectionMode === 'object') {
        // Custom initial selections
        if (initialSelectionMode[attribute.id]) {
          newSelectedValues[attribute.id] = [...initialSelectionMode[attribute.id]];
          newSelectedAttributes.push(attribute);
        } else {
          newSelectedValues[attribute.id] = [];
        }
      }
    });

    setSelectedValues(newSelectedValues);
    setSelectedAttributes(newSelectedAttributes);
  }, [attributes, initialSelectionMode]);
  const areAllValuesSelected = (attributeId) => {
    const attribute = attributes.find(attr => attr.id === attributeId);
    if (!attribute) return false;
    
    const selected = selectedValues[attributeId] || [];
    return selected.length === attribute.values.length;
  };

  // Toggle all values for an attribute
  const toggleAllValues = (attribute) => {
    setSelectedValues(prev => {
      const newValues = { ...prev };
      
      if (areAllValuesSelected(attribute.id)) {
        // Deselect all
        newValues[attribute.id] = [];
        setSelectedAttributes(prevAttrs => prevAttrs.filter(a => a.id !== attribute.id));
      } else {
        // Select all
        newValues[attribute.id] = [...attribute.values];
        setSelectedAttributes(prevAttrs => 
          prevAttrs.some(a => a.id === attribute.id) 
            ? prevAttrs 
            : [...prevAttrs, attribute]
        );
      }
      
      return newValues;
    });
  };

  // Toggle single value selection
  const toggleValueSelection = (attributeId, value) => {
    setSelectedValues(prev => {
      const currentValues = prev[attributeId] || [];
      const newValues = { ...prev };
      
      if (currentValues.includes(value)) {
        // Remove value
        newValues[attributeId] = currentValues.filter(v => v !== value);
        
        // Remove attribute from selection if no values left
        if (newValues[attributeId].length === 0) {
          setSelectedAttributes(prevAttrs => prevAttrs.filter(a => a.id !== attributeId));
        }
      } else {
        // Add value
        newValues[attributeId] = [...currentValues, value];
        
        // Add attribute to selection if not already there
        setSelectedAttributes(prevAttrs => 
          prevAttrs.some(a => a.id === attributeId) 
            ? prevAttrs 
            : [...prevAttrs, attributes.find(a => a.id === attributeId)]
        );
      }
      
      return newValues;
    });
  };
  const fetchAttributes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/attribute`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch attributes');
      
      const data = await response.json();
      
      if (data.status && data.data) {
        setAttributes(data.data.map(attr => ({
          id: attr.id,
          name: attr.name,
          values: Array.isArray(attr.value) ? attr.value : [attr.value]
        })));
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchVariants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/variants/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch variants');
      
      const data = await response.json();
      
      if (data.status && data.data) {
        setVariants(data.data);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch media');
      
      const data = await response.json();
      setMedia(data.data || []);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Single variant management
  const handleAddVariant = () => {
    setEditingVariant(null);
    setShowAddVariantForm(true);
    setSelectedAttributes([])
    reset();
  };
  const isColorAttribute = (name) => {
    const colorNames = ['color', 'colours', 'colors', 'colour'];
    return colorNames.some(colorName => 
      name.toLowerCase().includes(colorName.toLowerCase())
    );
  };
  
  // Custom color option component for react-select
  const ColorOption = ({ innerProps, data, isSelected }) => (
    <div 
      {...innerProps} 
      className={`flex items-center p-2 ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
    >
      {isColorAttribute(data.attributeName) && (
        <div 
          className="h-4 w-4 rounded-full mr-2 border border-gray-300" 
          style={{ backgroundColor: data.value }}
        />
      )}
      <span>{data.label}</span>
    </div>
  );

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
    setShowAddVariantForm(true);
    reset({
      color: variant.attributes.find(a => a.name === 'Color')?.option,
      size: variant.attributes.find(a => a.name === 'Size')?.option,
      price: variant.price,
      quantity: variant.stock_quantity,
      weight: variant.weight,
      width: variant.dimensions?.width,
      length: variant.dimensions?.length,
      height: variant.dimensions?.height,
      sku: variant.sku,
      cost_per_item: variant.cost_per_item,
      allow_out_of_stock: variant.allow_out_of_stock
    });
  };


  const handleDeleteVariant = async (variantId) => {
    if (!window.confirm('Are you sure you want to delete this variant?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/variants/${variantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete variant');
      
      toast.success('Variant deleted successfully');
      fetchVariants();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };


  const generateVariants = () => {
    const invalidAttributes = selectedAttributes.filter(
      attr => !selectedValues[attr.id] || selectedValues[attr.id].length === 0
    );
    
    if (invalidAttributes.length > 0) {
      toast.error(`Please select values for: ${invalidAttributes.map(a => a.name).join(', ')}`);
      return;
    }

    const generateCombinations = (attributes, current = {}, index = 0, result = []) => {
      if (index === attributes.length) {
        result.push({
          attributes: { ...current },
          sku: '',
          price: '',
          quantity: '',
          weight: '',
          dimensions: {
            width: '',
            length: '',
            height: ''
          },
          images: [],
          videos: []
        });
        return;
      }

      const attribute = attributes[index];
      for (const value of selectedValues[attribute.id]) {
        current[attribute.name] = value;
        generateCombinations(attributes, current, index + 1, result);
        delete current[attribute.name];
      }

      return result;
    };

    const newVariants = generateCombinations(selectedAttributes);
    setGeneratedVariants(newVariants);
    setShowSidebar(false);
    setShowAddVariantForm(false)
    toast.success(`Generated ${newVariants.length} variants`);
  };

  const saveGeneratedVariants = async () => {
    try {
      // Get all unique attribute IDs from the generated variants
      const attributeIds = [...new Set(
        generatedVariants.flatMap(variant => 
          Object.keys(variant.attributes).map(attrName => {
            const attr = attributes.find(a => a.name === attrName);
            return attr ? attr.id : null;
          }).filter(Boolean)
        )
      )].join(',');
  
      // Prepare the payload in the required format
      const payload = generatedVariants.map(variant => {
        // Handle both single and multiple attributes
        let attributeCombination;
        const attributeEntries = Object.entries(variant.attributes);
        
        if (attributeEntries.length === 0) {
          attributeCombination = '';
        } else {
          attributeCombination = attributeEntries
            .map(([name, value]) => `${value}`)
            .join('+');
        }
  
        return {
          attribute: attributeCombination,
          mrp: parseFloat(variant.price) || 0,
          price: parseFloat(variant.price) || 0,
          quantity: parseInt(variant.quantity) || 0,
          skuId: variant.sku || generateSKU(),
          images: variant.images || [],
          videos: variant.videos || []
        };
      });
      console.log("Line 363", attributeIds);
      
  console.log("Line 365",payload);
  
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/variant/${id}?ids=${attributeIds}`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify(payload) 
        }
      );
  console.log(response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save variants');
      } else {
        toast.success("Variants saved in Db successfully")
      }
  
      const result = await response.json();
      
      if (!result.status) {
        throw new Error(result.message || 'Variant save operation failed');
      }
  
      toast.success(`${payload.length} variants added successfully`);
      setGeneratedVariants([]);
      fetchVariants();
    } catch (error) {
      console.error('Variants submission error:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const generateSKU = () => {
    const timestamp = Date.now().toString(36).slice(-4);
    const random = Math.random().toString(36).substring(2, 6);
    return `VAR-${timestamp}${random}`.toUpperCase();
  };

  const toggleVariantAccordion = (index) => {
    setExpandedVariant(expandedVariant === index ? null : index);
  };

  // Media handling functions
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async (variantIndex) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    const formDataUpload = new FormData();
    selectedFiles.forEach(file => formDataUpload.append('media', file)); 

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-multiple-images`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload
      });

      const result = await response.json();

      if (result && result.mediaUrls) { 
        toast.success("Media uploaded successfully");

        const newVariants = [...generatedVariants];
        newVariants[variantIndex][mediaType] = [
          ...newVariants[variantIndex][mediaType],
          ...result.mediaUrls
        ];
        setGeneratedVariants(newVariants);

        setSelectedFiles([]);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Error uploading media");
    }
  };

  const handleGallerySelect = (mediaUrl) => {
    if (selectedGalleryMedia.includes(mediaUrl)) {
      setSelectedGalleryMedia(selectedGalleryMedia.filter(item => item !== mediaUrl));
    } else {
      setSelectedGalleryMedia([...selectedGalleryMedia, mediaUrl]);
    }
  };

  const handleAddGalleryMedia = (variantIndex) => {
    if (selectedGalleryMedia.length === 0) {
      toast.error("No media selected!");
      return;
    }

    const newVariants = [...generatedVariants];
    newVariants[variantIndex][mediaType] = [
      ...newVariants[variantIndex][mediaType],
      ...selectedGalleryMedia
    ];
    setGeneratedVariants(newVariants);

    toast.success("Media added successfully");
    setSelectedGalleryMedia([]);
    setShowMediaUpload(false);
  };

  const removeMedia = (variantIndex, mediaType, mediaIndex) => {
    const newVariants = [...generatedVariants];
    newVariants[variantIndex][mediaType].splice(mediaIndex, 1);
    setGeneratedVariants(newVariants);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
     { editGeneratedVariantModal !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-[60%] h-[80vh] overflow-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold uppercase">Edit Variant #{editGeneratedVariantModal + 1}</h2>
        <button 
          onClick={() => setEditGeneratedVariantModal(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(saveEditedGeneratedVariant)}>
        <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {selectedAttributes.map(attr => (
            <div key={attr.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{attr.name}</label>
              <input
                type="text"
                value={generatedVariants[editGeneratedVariantModal].attributes[attr.name]}
                readOnly
                className="w-full p-2 border border-gray-400 rounded bg-gray-100"
              />
            </div>
          ))}

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              type="text"
              defaultValue={generatedVariants[editGeneratedVariantModal].sku}
              {...register('sku')}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <div className="relative">
              <span className="absolute left-3 top-2">$</span>
              <input
                type="number"
                step="0.01"
                defaultValue={generatedVariants[editGeneratedVariantModal].price}
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
                className="w-full p-2 pl-8 border border-gray-400 rounded"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              defaultValue={generatedVariants[editGeneratedVariantModal].quantity}
              {...register('quantity')}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Shipping</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Weight (g)</label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={generatedVariants[editGeneratedVariantModal].weight}
                    {...register('weight')}
                    className="w-full p-2 pr-8 border border-gray-400 rounded"
                  />
                  <span className="absolute right-3 top-2 text-xs">g</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Width (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={generatedVariants[editGeneratedVariantModal].dimensions.width}
                    {...register('width')}
                    className="w-full p-2 pr-8 border border-gray-400 rounded"
                  />
                  <span className="absolute right-3 top-2 text-xs">cm</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Length (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={generatedVariants[editGeneratedVariantModal].dimensions.length}
                    {...register('length')}
                    className="w-full p-2 pr-8 border border-gray-400 rounded"
                  />
                  <span className="absolute right-3 top-2 text-xs">cm</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Height (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={generatedVariants[editGeneratedVariantModal].dimensions.height}
                    {...register('height')}
                    className="w-full p-2 pr-8 border border-gray-400 rounded"
                  />
                  <span className="absolute right-3 top-2 text-xs">cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Media</h3>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={() => {
                  setEditingGeneratedVariant(editGeneratedVariantModal);
                  setMediaType('images');
                  setShowMediaUpload(true);
                }}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FiImage className="mr-1" /> Edit Images
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingGeneratedVariant(editGeneratedVariantModal);
                  setMediaType('videos');
                  setShowMediaUpload(true);
                }}
                className="flex items-center text-sm text-green-600 hover:text-green-800"
              >
                <FiVideo className="mr-1" /> Edit Videos
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {generatedVariants[editGeneratedVariantModal].images?.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="" className="w-16 h-16 object-cover rounded" />
                  <button
                    onClick={() => {
                      const newVariants = [...generatedVariants];
                      newVariants[editGeneratedVariantModal].images.splice(i, 1);
                      setGeneratedVariants(newVariants);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    style={{ transform: 'translate(30%, -30%)' }}
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
              {generatedVariants[editGeneratedVariantModal].videos?.map((video, i) => (
                <div key={`video-${i}`} className="relative">
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <FiVideo className="text-gray-500" />
                  </div>
                  <button
                    onClick={() => {
                      const newVariants = [...generatedVariants];
                      newVariants[editGeneratedVariantModal].videos.splice(i, 1);
                      setGeneratedVariants(newVariants);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    style={{ transform: 'translate(30%, -30%)' }}
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={() => setEditGeneratedVariantModal(null)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold uppercase">Product Variants</h2>
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
            onClick={() => setShowSidebar(true)}
          >
            <FiPlus className="mr-2" />
            Generate variants
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            onClick={handleAddVariant}
          >
            <FiPlus className="mr-2" />
            Add single variant
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded"
        />
      </div>

      {/* Generated Variants Section */}
      {generatedVariants.length > 0 && (
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-end items-center mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setGeneratedVariants([])}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
              type='button'
                onClick={saveGeneratedVariants}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Save All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">#</th>
                  {selectedAttributes.map(attr => (
                    <th key={attr.id} className="px-4 py-2 text-left">{attr.name}</th>
                  ))}
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">SKU</th>
                  <th className="px-4 py-2 text-left">Media</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {generatedVariants.map((variant, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    {selectedAttributes.map(attr => (
                      <td key={attr.id} className="px-4 py-2">
                        {variant.attributes[attr.name]}
                      </td>
                    ))}
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => {
                          const newVariants = [...generatedVariants];
                          newVariants[index].price = e.target.value;
                          setGeneratedVariants(newVariants);
                        }}
                        className="w-full p-1 border border-gray-400 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={variant.quantity}
                        onChange={(e) => {
                          const newVariants = [...generatedVariants];
                          newVariants[index].quantity = e.target.value;
                          setGeneratedVariants(newVariants);
                        }}
                        className="w-full p-1 border border-gray-400 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => {
                          const newVariants = [...generatedVariants];
                          newVariants[index].sku = e.target.value;
                          setGeneratedVariants(newVariants);
                        }}
                        className="w-full p-1 border border-gray-400 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-1">
                        {variant.images?.slice(0, 3).map((img, i) => (
                          <div key={i} className="relative">
                            <img src={img} alt="" className="w-8 h-8 object-cover rounded" />
                            {i === 2 && variant.images.length > 3 && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                                +{variant.images.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                        {variant.images?.length === 0 && (
                          <span className="text-gray-400 text-xs">No images</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
  <div className="flex space-x-2">
    <button
      onClick={() => handleEditGeneratedVariant(index)}
      className="text-blue-600 hover:text-blue-800"
      title="Edit variant"
    >
      <FiEdit size={16} />
    </button>
    {/* <button
      onClick={() => {
        setEditingGeneratedVariant(index);
        setMediaType('images');
        setShowMediaUpload(true);
      }}
      className="text-blue-600 hover:text-blue-800"
      title="Edit images"
    >
      <FiImage size={16} />
    </button>
    <button
      onClick={() => {
        setEditingGeneratedVariant(index);
        setMediaType('videos');
        setShowMediaUpload(true);
      }}
      className="text-green-600 hover:text-green-800"
      title="Edit videos"
    >
      <FiVideo size={16} />
    </button> */}
    <button
      onClick={() => {
        const newVariants = [...generatedVariants];
        newVariants.splice(index, 1);
        setGeneratedVariants(newVariants);
      }}
      className="text-red-600 hover:text-red-800"
      title="Delete variant"
    >
      <FiTrash2 size={16} />
    </button>
  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Existing Variants Table */}
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">IMAGE</th>
              <th className="px-4 py-2 text-left">COLOR</th>
              <th className="px-4 py-2 text-left">SIZE</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">QUANTITY</th>
              <th className="px-4 py-2 text-left">IS DEFAULT</th>
              <th className="px-4 py-2 text-left">OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {variants.length > 0 ? (
              variants.map((variant, index) => (
                <React.Fragment key={variant.id}>
                  <tr className="border-b">
                    <td className="px-4 py-2">{variant.id}</td>
                    <td className="px-4 py-2">
                      {variant.images?.[0] ? (
                        <img 
                          src={variant.images[0]} 
                          alt="Variant" 
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded"></div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {variant.attributes.find(a => a.name === 'Color')?.option}
                    </td>
                    <td className="px-4 py-2">
                      {variant.attributes.find(a => a.name === 'Size')?.option}
                    </td>
                    <td className="px-4 py-2">${variant.price}</td>
                    <td className="px-4 py-2">{variant.stock_quantity}</td>
                    <td className="px-4 py-2">
                      <input 
                        type="checkbox" 
                        checked={variant.is_default} 
                        onChange={() => {}}
                      />
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditVariant(variant)}
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteVariant(variant.id)}
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <button
                        onClick={() => toggleVariantAccordion(index)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        {expandedVariant === index ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </button>
                    </td>
                  </tr>
                  {expandedVariant === index && (
                    <tr>
                      <td colSpan="8" className="px-4 py-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>SKU: {variant.sku || 'N/A'}</div>
                              <div>Weight: {variant.weight || 'N/A'}g</div>
                              <div>Dimensions:</div>
                              <div>
                                {variant.dimensions?.length || 'N/A'}cm × 
                                {variant.dimensions?.width || 'N/A'}cm × 
                                {variant.dimensions?.height || 'N/A'}cm
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Media</h4>
                            <div className="flex flex-wrap gap-2">
                              {variant.images?.map((img, i) => (
                                <img key={i} src={img} alt="" className="w-16 h-16 object-cover rounded" />
                              ))}
                              {variant.images?.length === 0 && (
                                <span className="text-sm text-gray-500">No images</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No variants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}

      <div className="mt-4 text-sm text-gray-600">
        Showing {variants.length} of {variants.length} records
      </div>

      {/* Single Variant Form */}
      {showAddVariantForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold uppercase">Product Variants</h2>
          <button 
            onClick={() => setShowAddVariantForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="mb-4 max-h-[70vh] overflow-y-auto">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 font-semibold text-center w-[200px] border-r">
                    Attribute Name
                  </th>
                  <th className="p-4 font-semibold text-center border-r">
                    Attribute Values
                  </th>
                  <th className="p-4 font-semibold text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Selected attributes rows */}
                {selectedAttributes.map(attribute => (
                  <tr key={attribute.id} className="border-b last:border-b-0">
                    <td className="p-4 font-medium border-r">
                      {attribute.name}
                    </td>
                    <td className="p-4  border-r">
                    <Select
  isMulti
  options={attribute.values.map(value => ({ 
    value, 
    label: value,
    attributeName: attribute.name
  }))}
  value={(selectedValues[attribute.id] || []).map(value => ({ 
    value, 
    label: value,
    attributeName: attribute.name
  }))}
  onChange={(selected) => {
    const newValues = selected ? selected.map(option => option.value) : [];
    setSelectedValues({
      ...selectedValues,
      [attribute.id]: newValues
    });
  }}
  placeholder={`Select ${attribute.name} values...`}
  className="basic-multi-select"
  classNamePrefix="select"
  components={{
    Option: ColorOption,
    MultiValue: ColorMultiValue
  }}
  menuPortalTarget={document.body}
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    multiValueLabel: (base) => ({
      ...base,
      padding: 0,
      paddingLeft: 0
    }),
    multiValue: (base) => ({
      ...base,
      margin: '2px',
      backgroundColor: 'transparent'
    })
  }}
/>
                    </td>
                    <td className="p-4  flex justify-center items-center">
                      <button
                        onClick={() => {
                          setSelectedAttributes(selectedAttributes.filter(a => a.id !== attribute.id));
                          const newValues = {...selectedValues};
                          delete newValues[attribute.id];
                          setSelectedValues(newValues);
                        }}
                        className="text-red-500 hover:text-red-700"
                        title="Remove attribute"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {/* Add new attribute row */}
                <tr>
                  <td className="p-4 border-r">
                    <Select
                      options={attributes.filter(attr => 
                        !selectedAttributes.some(a => a.id === attr.id)
                      )}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      onChange={(selected) => {
                        if (selected) {
                          setSelectedAttributes([...selectedAttributes, {
                            id: selected.id,
                            name: selected.name,
                            values: selected.values
                          }]);
                          setSelectedValues({
                            ...selectedValues,
                            [selected.id]: []
                          });
                        }
                      }}
                      placeholder="Select Attribute Name"
                      className="basic-select"
                      classNamePrefix="select"
                      isClearable
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 })
                      }}
                    />
                  </td>
                  <td colSpan="2" className="p-4 text-center text-gray-500 italic">
                    Select Attribute Name First
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={generateVariants}
            className={`px-4 py-2 rounded ${
              selectedAttributes.length === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={selectedAttributes.length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
)}

      {/* Generate Variants Sidebar */}

{showSidebar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold uppercase">Generate variants</h2>
          <button 
            onClick={() => setShowSidebar(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-3">Select attributes to create variants:</h3>
          
          <div className="grid grid-cols-3 gap-6">
              {attributes.map(attribute => (
                <div key={attribute.id} className="border border-gray-400 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium">{attribute.name}</label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={areAllValuesSelected(attribute.id)}
                        onChange={() => toggleAllValues(attribute)}
                        className="mr-2"
                      />
                      <span className="text-sm">All</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    {attribute.values.map((value, i) => (
                      <label key={i} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(selectedValues[attribute.id] || []).includes(value)}
                          onChange={() => toggleValueSelection(attribute.id, value)}
                          className="mr-2"
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={() => setShowSidebar(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={generateVariants}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
)}

      {/* Media Upload Modal */}
      {showMediaUpload && editingGeneratedVariant !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold uppercase">
                Edit {mediaType === 'images' ? 'Images' : 'Videos'} 
              </h2>
              <button 
                onClick={() => setShowMediaUpload(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex border-b mb-5">
              <button type='button'
                  className={`p-2 w-1/2 ${mediaType === 'images' ? 'border-2 border-blue-500 font-bold bg-gray-100' : ''}`}
                  onClick={() => setMediaType('images')}>
                  Images
              </button>
              <button type='button'
                  className={`p-2 w-1/2 ${mediaType === 'videos' ? 'border-2 border-blue-500 font-bold bg-gray-100' : ''}`}
                  onClick={() => setMediaType('videos')}>
                  Videos
              </button>
            </div>

            <div className="flex border-b mb-5">
              
             
            </div>

            {selectedGalleryMedia.length > 0 ? (
              <div>
                <div className="max-h-[20rem] grid grid-cols-3 gap-4 overflow-y-auto">
                  {media?.map((item, index) => (
                    <div key={index}
                      className={`p-2 border border-gray-400 rounded-lg cursor-pointer ${selectedGalleryMedia.includes(item                        ) ? 'border-blue-500 bg-blue-50' : ''}`}
                      onClick={() => handleGallerySelect(item)}
                  >
                    {mediaType === 'images' ? (
                      <img 
                        src={item} 
                        alt={`Media ${index}`} 
                        className="w-full h-24 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
                        <FiVideo size={24} className="text-gray-500" />
                      </div>
                    )}
                    <div className="mt-2 text-xs truncate">
                      {item.split('/').pop()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMediaUpload(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAddGalleryMedia(editingGeneratedVariant)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Selected
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept={mediaType === 'images' ? 'image/*' : 'video/*'}
                  className="hidden"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    {mediaType === 'images' ? (
                      <FiImage size={24} className="text-blue-600" />
                    ) : (
                      <FiVideo size={24} className="text-blue-600" />
                    )}
                  </div>
                  <p className="font-medium">Click to browse or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {mediaType === 'images' 
                      ? 'JPG, PNG up to 10MB' 
                      : 'MP4, MOV up to 50MB'}
                  </p>
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Selected files:</h4>
                  <ul className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                        <button
                          onClick={() => {
                            const newFiles = [...selectedFiles];
                            newFiles.splice(index, 1);
                            setSelectedFiles(newFiles);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMediaUpload(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleUpload(editingGeneratedVariant)}
                  disabled={selectedFiles.length === 0}
                  className={`px-4 py-2 rounded ${selectedFiles.length === 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    <ToastContainer position="bottom-right" autoClose={3000} />
  </div>
);
};

export default VariantManager;


const ColorMultiValue = ({ children, ...props }) => {
  const getColor = (value) => {
    const colorMap = {
      'Red': '#ff0000',
      'Blue': '#0000ff',
      'Green': '#00ff00',
      'Yellow': '#ffff00',
      'Black': '#000000',
      'White': '#ffffff',
      // Add more mappings as needed
    };
    return colorMap[value] || '#cccccc';
  };

  return (
    <components.MultiValue {...props}>
      <div className="flex items-center" style={{ padding: '2px 5px' }}>
        <div 
          className="w-3 h-3 rounded-full mr-1 border border-gray-300"
          style={{ backgroundColor: getColor(props.data.value) }}
        />
        <span className="text-sm">{children}</span>
      </div>
    </components.MultiValue>
  );
};