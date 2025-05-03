import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import SelectImageModal from '../../components/product/SelectImageModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const isSupplier = location.pathname.includes("supplier");
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      category_id: "",
      company_name: "",
      brand_name: "",
      product_id: "",
      country: "",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
    },
  });
  

  useEffect(() => {
    const fetchBrandData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://credible-api.techidata.com/v2/api/supplierSeller/get-single-brand-info/${id}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch brand data');
          }
          
          const res = await response.json();
          const data = res.data
          
          if (data) {
            setIsEditing(true);
            setValue("category_id", data.category_id);
            setValue("company_name", data.company_name);
            setValue("brand_name", data.brand_name);
            setValue("product_id", data.product_id);
            setValue("country", data.country);
            setValue("meta_title", data.meta_title || "");
            setValue("meta_keywords", data.meta_keywords || "");
            setValue("meta_description", data.meta_description || "");
            setImageUrl(data.brand_logo);
          }
        } catch (error) {
          console.error("Error fetching brand data:", error);
          toast.error("Failed to load brand data");
          navigate(-1); // Go back if error occurs
        } finally {
          setIsLoading(false);
        }
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/all-category?sort=asc`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
    if (id) {
      fetchBrandData();
    }
  }, [id, token, setValue, navigate]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      brand_logo: imageUrl,
      added_by: localStorage.getItem('userRole'),
      admin_id: localStorage.getItem('userId') || null,
      supplier_id: localStorage.getItem('userId') || null,
      status: "inactive"
    };
  
    if (isEditing && id) {
      payload.id = id;
    }
  
    try {
      setIsLoading(true);
      const endpoint = isEditing 
        ? `https://credible-api.techidata.com/v2/api/supplierSeller/add-brand-update`
        : `https://credible-api.techidata.com/v2/api/supplierSeller/add-brand-update`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success(isEditing ? "Brand updated successfully!" : "Brand added successfully!");
        if (!isEditing) {
          reset();
          setImageUrl(null);
        } else {
          // Optionally redirect after successful update
          navigate(-1);
        }
      } else {
        throw new Error(result.message || "Failed to process request");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.message || "An error occurred while submitting the form");
    } finally {
      setIsLoading(false);
    }
  };
  
  const breadcrumbItems = [
    { label: 'Product Management', href: '#' },
    { label: 'Brands', href: `/${isAdmin ? "admin" : "supplier"}/brands` },
    { label: isEditing ? 'Edit Brand' : 'Add Brand', href: '#' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='rounded p-5 bg-white min-h-screen'>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Breadcrumbs pageTitle={isEditing ? "Edit Brand" : "Add Brand"} items={breadcrumbItems} />
   
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto grid grid-cols-3 gap-4  "
            >
              {/* Category Dropdown */}
              <div>
                <label className="block mb-1 font-semibold">Category:</label>
                <select
                  {...register("category_id", { required: true })}
                  className="border p-2 border-gray-600 w-full"
                  disabled={isLoading}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">Company Name:</label>
                <input 
                  {...register("company_name", { required: true })} 
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Brand Name:</label>
                <input 
                  {...register("brand_name", { required: true })} 
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Brand Logo:</label>
                <SelectImageModal 
                  setImage={(url) => setImageUrl(url)} 
                  disabled={isLoading}
                  initialImage={imageUrl}
                />
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Selected Logo" 
                    className="mt-2 w-32 h-32 object-cover border" 
                  />
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold">Product ID:</label>
                <input 
                  {...register("product_id")} 
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Country:</label>
                <input 
                  {...register("country")} 
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Meta Title:</label>
                <input 
                  {...register("meta_title")} 
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Meta Keywords:</label>
                <input 
                  {...register("meta_keywords")} 
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-3">
                <label className="block mb-1 font-semibold">Meta Description:</label>
                <textarea 
                  {...register("meta_description")} 
                  rows={3}
                  className="border p-2 border-gray-600 w-full" 
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-3 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : isEditing ? 'Update Brand' : 'Add Brand'}
                </button>
              </div>
            </form>
      </div>
  );
};

export default AddBrand;