import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlus, FaMinus, FaTrash, FaSearch } from 'react-icons/fa';
import Select from 'react-select';

const PurchaseOrderCreation = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [orderId, setOrderId] = useState(null);
  const [orderDetailsFromStep2, setOrderDetailsFromStep2] = useState([]);

  const [formData, setFormData] = useState({
    supplier_id: '',
    order_status: 'new',
    order_date: new Date().toISOString().split('T')[0],
    warehouse_id: '',
    product_list: [],
    order_detail: [] 
  });

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || '',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const response = await api.get(`https://credible-api.techidata.com/v2/api/supplierSeller/all-supplier-list?active_status=pending`);
        setSuppliers(response.data.data || []);
      } catch (error) {
        toast.error('Failed to fetch suppliers');
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/warehouse`);
        setWarehouses(response.data.data || []);
      } catch (error) {
        toast.error('Failed to fetch warehouses');
        console.error('Error fetching warehouses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);
  
  const fetchProducts = async (page = 0) => {
    try {
      setLoading(true);
      // const response = await api.get(`https://credible-api.techidata.com/api/admin/product?limit=100000&page=0`);
      const response = await api.get(`https://credible-api.techidata.com/v2/api/supplierSeller/get-product-list-by-supplier-seller?added_by=supplier&added_by_id=${formData.supplier_id}`);
      // setProducts(response.data.data || []);
      setProducts(response.data.products || []);
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages
      });
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setFormData(prev => ({
      ...prev,
      product_list: selectedIds
    }));
  };

  const updateProductDetail = (index, field, value) => {
    const updatedDetails = [...formData.order_detail];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      order_detail: updatedDetails
    }));
  };

  const updateProductQuantity = (index, newQty) => {
    if (newQty < 1) return;
    
    const updatedDetails = [...formData.order_detail];
    updatedDetails[index] = {
      ...updatedDetails[index],
      product_qty: newQty
    };
    
    setFormData(prev => ({
      ...prev,
      order_detail: updatedDetails
    }));
  };

  const removeProduct = (index) => {
    const updatedDetails = formData.order_detail.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      order_detail: updatedDetails
    }));
  };

  const submitStep1 = async (e) => {
    e.preventDefault();
    if (!formData.supplier_id || !formData.warehouse_id) {
      toast.error('Please select both supplier and warehouse');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        step: 1,
        supplier_id: parseInt(formData.supplier_id),
        order_status: "new",
        order_date: formData.order_date,
        warehouse_id: parseInt(formData.warehouse_id)
      };
      const response = await api.post('https://credible-api.techidata.com/v2/api/supplierSeller/create-purchase-order', payload);
      
      if (response.data.message === "Step 1 saved successfully") {
        setOrderId(response.data.data.id);
        toast.success('Order created successfully! Proceeding to product selection.');
        setStep(2);
        await fetchProducts();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error('Failed to create order');
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitStep2 = async (e) => {
    e.preventDefault();
    if (formData.product_list.length === 0) {
      toast.error('Please select at least one product');
      return;
    }
  
    try {
      setLoading(true);
      const payload = {
        step: 2,
        id: orderId,
        product_list: formData.product_list
      };
  
      // First submit the selected products
      const response = await api.post('https://credible-api.techidata.com/v2/api/supplierSeller/create-purchase-order', payload);
      
      if (response.data && response.data.message === "Step 2 saved successfully") {
        // Then fetch the variants for these products
        const variantsResponse = await api.post(
          'https://credible-api.techidata.com/v2/api/supplierSeller/get-products-with-variants-order-list',
          { productIds: formData.product_list.map(id => parseInt(id)) }
        );
  
        const productsWithVariants = variantsResponse.data.data || [];
  
        // Prepare order details with variants
        const orderDetails = productsWithVariants.flatMap(product => {
          const baseProduct = {
            product_id: product.id,
            product_name: product.product_name,
            product_image: product.images?.[0] || "",
            product_price: product.purchase_price || 0
          };
  
          if (product.__productVariants__ && product.__productVariants__.length > 0) {
            return product.__productVariants__.map(variant => ({
              ...baseProduct,
              variant_id: variant.id,
              product_variant: variant.combinations,
              product_qty: 1, // Default quantity
              variant_price: variant.price,
              variant_mrp: variant.mrp,
              variant_sku: variant.skuId
            }));
          } else {
            // If no variants, just add the base product
            return [{
              ...baseProduct,
              product_qty: 1,
              product_variant: ""
            }];
          }
        });
  
        setFormData(prev => ({
          ...prev,
          order_detail: orderDetails
        }));
        
        toast.success('Products added to order! Please fill in product details.');
        setStep(3);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error('Failed to add products to order');
      console.error('Error adding products:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitStep3 = async (e) => {
    e.preventDefault();
    if (formData.order_detail.length === 0) {
      toast.error('Please fill in at least one product detail');
      return;
    }

    const incompleteDetails = formData.order_detail.some(item => 
      !item.product_id || !item.product_name || !item.product_qty || !item.product_price
    );
    
    if (incompleteDetails) {
      toast.error('Please fill in all required fields for each product');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        step: 3,
        id: orderId,
        order_detail: formData.order_detail
      };

      const response = await api.post('https://credible-api.techidata.com/v2/api/supplierSeller/create-purchase-order', payload);
      
      if (response.data) {
        toast.success('Purchase order finalized successfully!');
        // Reset form
        setFormData({
          supplier_id: '',
          order_status: 'new',
          order_date: new Date().toISOString().split('T')[0],
          warehouse_id: '',
          product_list: [],
          order_detail: []
        });
        setOrderId(null);
        setOrderDetailsFromStep2([]);
        setStep(1);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error('Failed to finalize purchase order');
      console.error('Error finalizing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      fetchProducts(newPage);
    }
  };

  const productOptions = products.map(product => ({
    value: product.id.toString(),
    label: `${product.product_name} (MRP: ₹${product.mrp})`,
    data: product 
  }));

  const selectedProducts = productOptions.filter(option => 
    formData.product_list.includes(option.value)
  );
  const supplierOptions = suppliers.map(supplier => ({
    value: supplier.supplier_id,
    label: supplier.promotor_name || supplier.company_name || `Supplier ${supplier.supplier_id}`,
  }));
  const warehouseOptions = warehouses.map(warehouse => ({
    value: warehouse.id,
    label: `${warehouse.name} (${warehouse.city}, ${warehouse.state})`,
  }));
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Purchase Order</h1>
          <p className="mt-2 text-sm text-gray-600">Follow the steps to create a new purchase order</p>
        </div>

        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step === stepNumber ? 'bg-indigo-600 text-white' : 
                  step > stepNumber ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}
              >
                {step > stepNumber ? (
                  <FaCheckCircle className="h-6 w-6" />
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${step >= stepNumber ? 'text-indigo-600' : 'text-gray-500'}`}>
                {stepNumber === 1 ? 'Order Info' : stepNumber === 2 ? 'Products' : 'Details'}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {loading && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          )}
          
          {step === 1 && (
            <form onSubmit={submitStep1}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700">
                    Supplier <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="supplier_id"
                    name="supplier_id"
                    value={supplierOptions.find(option => option.value === formData.supplier_id)}
                    onChange={selectedOption =>
                      handleInputChange({
                        target: { name: 'supplier_id', value: selectedOption?.value || '' }
                      })
                    }
                    options={supplierOptions}
                    placeholder="Select a supplier..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                <div>
                  <label htmlFor="warehouse_id" className="block text-sm font-medium text-gray-700">
                    Warehouse <span className="text-red-500">*</span>
                  </label>
                    <Select
                      id="warehouse_id"
                      name="warehouse_id"
                      value={warehouseOptions.find(option => option.value === formData.warehouse_id)}
                      onChange={selectedOption =>
                        handleInputChange({
                          target: { name: 'warehouse_id', value: selectedOption?.value || '' }
                        })
                      }
                      options={warehouseOptions}
                      placeholder="Select a warehouse..."
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                </div>

                <div>
                  <label htmlFor="order_date" className="block text-sm font-medium text-gray-700">
                    Order Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="order_date"
                    name="order_date"
                    value={formData.order_date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={loading}
                  >
                    Next <FaArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitStep2}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Products</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Products <span className="text-red-500">*</span>
                      </label>
                      <Select
                        isMulti
                        options={productOptions}
                        value={selectedProducts}
                        onChange={handleProductSelect}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Search and select products..."
                        noOptionsMessage={() => "No products found"}
                        loadingMessage={() => "Loading products..."}
                      />
                    </div>

                    {formData.product_list.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">{formData.product_list.length}</span> product(s) selected. 
                          Click next to proceed to details entry.
                        </p>
                      </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 0}
                        className={`px-3 py-1 rounded-md flex items-center ${pagination.page === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        <FaArrowLeft className="mr-1" /> Previous
                      </button>
                      <span className="text-sm text-gray-700">
                        Page {pagination.page + 1} of {pagination.totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages - 1}
                        className={`px-3 py-1 rounded-md flex items-center ${pagination.page >= pagination.totalPages - 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        Next <FaArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={loading}
                  >
                    <FaArrowLeft className="mr-2 h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={loading || formData.product_list.length === 0}
                  >
                    Next <FaArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          )}

{step === 3 && (
  <form onSubmit={submitStep3}>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Product Details</h3>
        
        {formData.order_detail.length > 0 ? (
          <div className="space-y-4">
            {formData.order_detail.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <p className="text-sm text-gray-900">{item.product_name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Variant
                    </label>
                    <p className="text-sm text-gray-900">{item.product_variant || "No variant"}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <p className="text-sm text-gray-900">₹{item.variant_price || item.product_price}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      MRP
                    </label>
                    <p className="text-sm text-gray-900">₹{item.variant_mrp || item.product_price}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <p className="text-sm text-gray-900">{item.variant_sku || "N/A"}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => updateProductQuantity(index, item.product_qty - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.product_qty}
                        onChange={(e) => updateProductQuantity(index, parseInt(e.target.value) || 1)}
                        className="w-full py-2 px-2 text-center border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => updateProductQuantity(index, item.product_qty + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  {item.product_image && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image
                      </label>
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="h-24 object-contain"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <FaTrash className="mr-1 h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-right font-medium text-gray-700">
                Total: ₹{formData.order_detail.reduce((sum, item) => 
                  sum + ((item.variant_price || item.product_price) * item.product_qty), 0)}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">
            No product details available. Please go back and select products.
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={formData.order_detail.length === 0}
        >
          Complete Order <FaCheckCircle className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </form>
)}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderCreation;