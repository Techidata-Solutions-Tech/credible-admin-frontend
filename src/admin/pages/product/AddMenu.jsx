import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '../../components/Breadcrumbs';
const AddMenu = () => {
  const token = localStorage.getItem('token')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch( `${import.meta.env.VITE_BASE_URL}/api/admin/all-category-hierarchy `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();      
        const flatCategories = [];
        const traverse = (nodes, depth = 0) => {
          nodes.forEach(node => {
            flatCategories.push({ id: node.id, name: node.name, depth });
            if (node.children.length) {
              traverse(node.children, depth + 1);
            }
          });
        };
        traverse(data);
        setCategories(flatCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const onSubmit = async (data) => {

    const payLoad = {
      name: data.name,
      seo_url: data.seo_url,
      parentCat: parseInt(data.parentCat),
      description: data.description,
      featureimage: 'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
      meta_title: data.meta_title,
      meta_keywords: data.meta_keywords,
      meta_description: data.meta_description,
      isFeatured: data.isFeatured,
      cat_type : true
    }
    try {
      const response = await fetch( `${import.meta.env.VITE_BASE_URL}/api/admin/add-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            
          "Authorization": `Bearer ${token}`,

           },
        body: JSON.stringify(payLoad),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Menu submitted successfully!")
        // alert("Menu submitted successfully!");
      } else {
        toast.error(`Error: ${result.message}`)
        // alert(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const breadcrumbItems = [
    { label: 'Product Management', href: '#' },
    { label: 'Menu', href: '/admin/product/menu' },
    { label: 'Add Menu', href: '/admin/product/attributes' },
  ];
  return (
    <div className=''>
      
      <div className='flex bg-gray-100'>
        
        <div className=' rounded shadow-lg p-4 w-screen m-2 bg-white'>
        <Breadcrumbs
              pageTitle="Add Menu"
              items={breadcrumbItems}
            />
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">

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
              <label htmlFor="seo_url" className="block text-sm font-semibold">SEO URL</label>
              <input
                id="seo_url"
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                {...register('seo_url', { required: 'Name is required' })}
              />
              {errors.seo_url && <p className="text-red-500 text-xs">{errors.seo_url.message}</p>}
            </div>
           </div>

           <div className='flex justify-evenly gap-[50px]'>
              <div className="mb-4 w-1/3">
                <label htmlFor="parentCat" className="block text-sm font-semibold">
                  Category
                </label>
                <select
                  id="parentCat"
                  className="w-full p-2 border rounded-md bg-transparent"
                //   {...register("parentCat")}
                >
                  <option value="0">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {"— ".repeat(cat.depth)} {cat.name}
                    </option>
                  ))}
                </select>
                {errors.parentCat && (
                  <p className="text-red-500 text-xs">{errors.parentCat.message}</p>
                )}
              </div>
              {/* <div className="mb-4 w-1/3">
                <label htmlFor="featureimage" className="block text-sm font-semibold">Upload Image</label>
                <input
                  id="featureimage"
                  type="file"
                  className="w-full p-2 border rounded-md bg-transparent"
                //   {...register('featureimage', { required: 'Image is required' })}
                />
                {errors.featureimage && <p className="text-red-500 text-xs">{errors.featureimage.message}</p>}
              </div> */}
              <div className="mb-4 w-1/3">
                <label htmlFor="cat_type" className="block text-sm font-semibold">
                  Category type
                </label>
                <select
                  id="cat_type"
                  className="w-full p-2 border rounded-md bg-transparent"
                //   {...register("cat_type")}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>False</option>
                </select>
                {errors.cat_type && (
                  <p className="text-red-500 text-xs">{errors.cat_type.message}</p>
                )}
              </div>
              {/* <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-semibold">Status</label>
                <select
                  id="status"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register('status', { required: 'Status is required' })}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
              </div> */}
           </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold">Description</label>
              <textarea
                id="description"
                className="w-full p-2 border rounded-md bg-transparent"
                // {...register('description', { required: 'Description is required' })}
                rows="4"
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="meta_title" className="block text-sm font-semibold">Meta Title</label>
              <input
                id="meta_title"
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                // {...register('meta_title', { required: 'Meta title is required' })}
              />
              {errors.meta_title && <p className="text-red-500 text-xs">{errors.meta_title.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="meta_keywords" className="block text-sm font-semibold">Meta Keywords</label>
              <input
                id="meta_keywords"
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                // {...register('meta_keywords', { required: 'Meta keywords are required' })}
              />
              {errors.meta_keywords && <p className="text-red-500 text-xs">{errors.meta_keywords.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="meta_description" className="block text-sm font-semibold">Meta Description</label>
              <textarea
                id=" meta_description"
                className="w-full p-2 border rounded-md bg-transparent"
                // {...register('meta_description', { required: 'Meta description is required' })}
                rows="3"
              />
              {errors.meta_description && <p className="text-red-500 text-xs">{errors.meta_description.message}</p>}
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                //   {...register('isFeatured')}
                />
                <span className="text-sm font-semibold">Is Featured?</span>
              </label>
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </form>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddMenu
