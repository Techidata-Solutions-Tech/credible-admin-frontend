import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX, FiPlus, FiChevronDown, FiChevronUp, FiImage, FiVideo } from 'react-icons/fi';

const VariantManager = ({ productId, onClose }) => {
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
    reset();
  };

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

  const onSubmitVariant = async (data) => {
    try {
      const variantData = {
        product_id: productId,
        attributes: [
          { name: 'Color', option: data.color },
          { name: 'Size', option: data.size }
        ],
        sku: data.sku || generateSKU(),
        price: data.price,
        stock_quantity: data.quantity,
        weight: data.weight,
        dimensions: {
          width: data.width,
          length: data.length,
          height: data.height
        },
        cost_per_item: data.cost_per_item,
        allow_out_of_stock: data.allow_out_of_stock,
        images: data.images || [],
        videos: data.videos || []
      };

      const url = editingVariant 
        ? `${import.meta.env.VITE_BASE_URL}/api/admin/variants/${editingVariant.id}`
        : `${import.meta.env.VITE_BASE_URL}/api/admin/variants`;

      const method = editingVariant ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(variantData)
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Failed to save variant');

      toast.success(`Variant ${editingVariant ? 'updated' : 'added'} successfully`);
      fetchVariants();
      setShowAddVariantForm(false);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
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
        // Add attribute to selection with all values selected by default
        const newValues = {
          ...selectedValues,
          [attribute.id]: [...attribute.values] // Select all values by default
        };
        setSelectedValues(newValues);
        return [...prev, attribute];
      }
    });
  };

  // Improved toggleAttributeValue function
  const toggleAttributeValue = (attributeId, value) => {
    setSelectedValues(prev => {
      const currentValues = prev[attributeId] || [];
      const isSelected = currentValues.includes(value);
      
      if (isSelected) {
        const newValues = {
          ...prev,
          [attributeId]: currentValues.filter(v => v !== value)
        };
        
        // If no values are selected, remove the attribute
        if (newValues[attributeId].length === 0) {
          const finalValues = {...newValues};
          delete finalValues[attributeId];
          setSelectedValues(finalValues);
          setSelectedAttributes(prevAttrs => prevAttrs.filter(a => a.id !== attributeId));
          return finalValues;
        }
        
        return newValues;
      } else {
        return {
          ...prev,
          [attributeId]: [...currentValues, value]
        };
      }
    });
  };



  // New function to handle "All" checkbox change
  const handleAllCheckboxChange = (attribute) => {
    if (areAllValuesSelected(attribute.id)) {
      // Deselect all values
      const newValues = {...selectedValues};
      delete newValues[attribute.id];
      setSelectedValues(newValues);
      setSelectedAttributes(prevAttrs => prevAttrs.filter(a => a.id !== attribute.id));
    } else {
      // Select all values
      const newValues = {
        ...selectedValues,
        [attribute.id]: [...attribute.values]
      };
      setSelectedValues(newValues);
      
      // Add to selectedAttributes if not already there
      if (!selectedAttributes.some(a => a.id === attribute.id)) {
        setSelectedAttributes(prev => [...prev, attribute]);
      }
    }
  };


  const generateVariations = () => {
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
    toast.success(`Generated ${newVariants.length} variants`);
  };

  const saveGeneratedVariants = async () => {
    try {
      const payload = generatedVariants.map(variant => ({
        product_id: productId,
        attributes: Object.entries(variant.attributes).map(([name, option]) => ({
          name,
          option
        })),
        sku: variant.sku || generateSKU(),
        price: variant.price || '0',
        stock_quantity: variant.quantity || 0,
        weight: variant.weight || '',
        dimensions: {
          width: variant.dimensions.width || '',
          length: variant.dimensions.length || '',
          height: variant.dimensions.height || ''
        },
        images: variant.images || [],
        videos: variant.videos || []
      }));

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/variants`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ variants: payload })
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Failed to add variants');

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
        <h2 className="text-xl font-semibold">Edit Variant #{editGeneratedVariantModal + 1}</h2>
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
        <h2 className="text-xl font-semibold">Product Variations</h2>
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">New Variations ({generatedVariants.length})</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setGeneratedVariants([])}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
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
    <button
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
    </button>
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
      <div className="overflow-x-auto">
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
                        onChange={() => {/* Toggle default */}}
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
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {variants.length} of {variants.length} records
      </div>

      {/* Single Variant Form */}
      {showAddVariantForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[80vw] h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingVariant ? 'Edit variation' : 'Add new variation'}
              </h2>
              <button 
                onClick={() => setShowAddVariantForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmitVariant)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
                  <select
                    {...register('color', { required: 'Color is required' })}
                    className="w-full p-2 border border-gray-400 rounded"
                  >
                    <option value="">Select color</option>
                    {attributes.find(a => a.name === 'Color')?.values.map((value, i) => (
                      <option key={i} value={value}>{value}</option>
                    ))}
                  </select>
                  {errors.color && (
                    <p className="text-red-500 text-xs mt-1">{errors.color.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    {...register('sku')}
                    className="w-full p-2 border border-gray-400 rounded"
                    placeholder="Auto-generated if empty"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                  <select
                    {...register('size', { required: 'Size is required' })}
                    className="w-full p-2 border border-gray-400 rounded"
                  >
                    <option value="">Select size</option>
                    {attributes.find(a => a.name === 'Size')?.values.map((value, i) => (
                      <option key={i} value={value}>{value}</option>
                    ))}
                  </select>
                  {errors.size && (
                    <p className="text-red-500 text-xs mt-1">{errors.size.message}</p>
                  )}
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
                      className="w-full p-2 pl-8 border border-gray-400 rounded"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code per item</label>
                  <input
                    type="text"
                    {...register('cost_per_item')}
                    className="w-full p-2 border border-gray-400 rounded"
                    placeholder="Enter cost per item"
                  />
                  <p className="text-xs text-gray-500 mt-1">Customers won't see this price.</p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">With storehouse management</h3>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    {...register('quantity', { min: 0 })}
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      {...register('allow_out_of_stock')}
                      className="mr-2"
                    />
                    <span className="text-sm">Allow customer checkout when this product is out of stock</span>
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
                          {...register('height')}
                          className="w-full p-2 pr-8 border border-gray-400 rounded"
                        />
                        <span className="absolute right-3 top-2 text-xs">cm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <button type="button" className="text-blue-600 text-sm font-medium">
                    Add Images
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddVariantForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Variations Sidebar */}
     {/* Replace the Generate Variations Sidebar section with this new popup */}
{showSidebar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Generate variants</h2>
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
            onClick={generateVariations}
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
              <h2 className="text-xl font-semibold">
                Edit {mediaType === 'images' ? 'Images' : 'Videos'} for Variant #{editingGeneratedVariant + 1}
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
                  className={`p-2 w-1/2 ${mediaType === 'images' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                  onClick={() => setMediaType('images')}>
                  Images
              </button>
              <button type='button'
                  className={`p-2 w-1/2 ${mediaType === 'videos' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                  onClick={() => setMediaType('videos')}>
                  Videos
              </button>
            </div>

            <div className="flex border-b mb-5">
              <button type='button'
                  className={`p-2 w-1/2 ${selectedGalleryMedia.length === 0 ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                  onClick={() => setSelectedGalleryMedia([])}>
                  Upload New
              </button>
              <button type='button'
                  className={`p-2 w-1/2 ${selectedGalleryMedia.length > 0 ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                  onClick={() => setSelectedGalleryMedia(media)}>
                  Choose from Gallery
              </button>
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