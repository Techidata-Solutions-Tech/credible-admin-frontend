import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectImageModal from "../../components/dashboard/SelectImageModal";
const EditCategory = () => {
  const [featureImage, setFeatureImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [formType, setFormType] = useState("category");
  const [isLoading, setIsLoading] = useState(true);

  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [currentParentId, setCurrentParentId] = useState(null);
  const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);

  const watchParentCat = watch("parentCat");
  const watchSubCat = watch("subCat");

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found!");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/single-category-info-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch category details");

        const categoryData = await response.json();
        const category = categoryData.category;

        if (category.parentCat === 0) {
          setFormType("category");
          resetForm(category);
        } else {
          const parentResponse = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/admin/single-category-info-by-id/${category.parentCat}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!parentResponse.ok) throw new Error("Failed to fetch parent category");

          const parentData = await parentResponse.json();
          const parentCategory = parentData.category;

          if (parentCategory.parentCat === 0) {
            setFormType("subcategory");
            setCurrentParentId(category.parentCat);
            resetForm(category);
          } else {
            setFormType("childcategory");
            setCurrentParentId(parentCategory.parentCat);
            setCurrentSubcategoryId(category.parentCat);
            resetForm(category, parentCategory.parentCat, category.parentCat);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching category details:", error);
        toast.error("Failed to fetch category details");

      }
    };

    const resetForm = (category, parentId = null, subcategoryId = null) => {
      reset({
        name: category.name,
        seo_url: category.seo_url,
        parentCat: formType === "subcategory" ? category.parentCat :
          (formType === "childcategory" ? parentId : ""),
        subCat: formType === "childcategory" ? subcategoryId : "",
        description: category.description,
        meta_title: category.meta_title,
        meta_keywords: category.meta_keywords,
        meta_description: category.meta_description,
        isFeatured: category.isFeatured,
      });
    };

    fetchCategoryDetails();
  }, [id, reset, navigate, setValue, formType]);

  useEffect(() => {
    const fetchParentCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch parent categories");

        const data = await response.json();
        setParentCategories(data.categories);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    fetchParentCategories();
  }, []);

  useEffect(() => {
    if (formType === "childcategory" && currentParentId) {
      const fetchSubCategories = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=${currentParentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch subcategories");

          const data = await response.json();
          setSubCategories(data.categories);

          if (currentSubcategoryId) {
            setValue("subCat", currentSubcategoryId);
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      fetchSubCategories();
    }
  }, [formType, currentParentId, currentSubcategoryId, setValue]);

  const handleParentChange = (e) => {
    const newParentId = e.target.value;
    setCurrentParentId(newParentId);
    setValue("parentCat", newParentId);

    if (formType === "childcategory") {
      setSubCategories([]);
      setCurrentSubcategoryId(null);
      setValue("subCat", "");
    }
  };

  const handleSubcategoryChange = (e) => {
    const newSubcategoryId = e.target.value;
    setCurrentSubcategoryId(newSubcategoryId);
    setValue("subCat", newSubcategoryId);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    console.log('abd');
    if (!token) {
      toast.error("No token found!");
      return;
    }

    let parentId;
    if (formType === "category") {
      parentId = 0;
    } else if (formType === "subcategory") {
      parentId = parseInt(data.parentCat);
    } else if (formType === "childcategory") {
      parentId = parseInt(data.subCat);
    }

    const payLoad = {
      name: data.name,
      seo_url: data.seo_url,
      parentCat: parentId,
      description: data.description,
      featureimage: featureImage || "/image.jpg",
      meta_title: data.meta_title,
      meta_keywords: data.meta_keywords,
      meta_description: data.meta_description,
      isFeatured: data.isFeatured || false,
      cat_type: formType,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/update-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payLoad),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(`${formType} updated successfully!`);

      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleImageModalClick = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex bg-gray-100">
          <Sidebar />
          <div className="rounded shadow-lg p-4 w-screen m-2 bg-white flex justify-center items-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="rounded shadow-lg p-4 w-screen m-2 bg-white">
          <h1 className="text-4xl text-center mb-2">Edit {formType}</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border rounded-md grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">
                  {formType === "category" ? "Parent Category" : formType === "subcategory" ? "Sub Category" : 'Child Category'}
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border border-black rounded-md bg-transparent"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>



              <div>
                <label htmlFor="seo_url" className="block text-sm mb-1">
                  SEO URL
                </label>
                <input
                  id="seo_url"
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("seo_url", { required: "SEO URL is required" })}
                />
                {errors.seo_url && (
                  <p className="text-red-500 text-xs">{errors.seo_url.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="meta_title" className="block text-sm mb-1">
                  Meta Title
                </label>
                <input
                  id="meta_title"
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("meta_title")}
                />
              </div>

              <div>
                <label htmlFor="meta_keywords" className="block text-sm mb-1">
                  Meta Keywords
                </label>
                <input
                  id="meta_keywords"
                  type="text"
                  className="w-full p-2 border rounded-md bg-transparent"
                  {...register("meta_keywords")}
                />
              </div>

              <div>
                <label htmlFor="meta_description" className="block text-sm mb-1">
                  Meta Description
                </label>
                <textarea
                  id="meta_description"
                  className="w-full p-2 border rounded-md bg-transparent"
                  rows="3"
                  {...register("meta_description")}
                ></textarea>
              </div>
              

              <div>
                <label htmlFor="description" className="block text-sm mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border rounded-md bg-transparent"
                  rows="3"
                  {...register("description")}
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="isFeatured"
                  type="checkbox"
                  className="mr-2"
                  {...register("isFeatured")}
                />
                <label htmlFor="isFeatured" className="text-sm">
                  Is Featured Category
                </label>
              </div>
              <div className="mt-4 w-full" onClick={handleImageModalClick}>
                    <SelectImageModal setImage={setFeatureImage} />
                  </div>
            </div>

            <div className="space-y-4 flex justify-center items-center ">
              <div className="mb-4 w-full max-w-[300px]">
                {featureImage && (
                  <div>
                    <div className="w-full aspect-square">
                      <img
                        src={featureImage}
                        alt="Selected Feature"
                        className="w-full h-full object-cover rounded-md shadow-md"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="px-4 p-2 bg-blue-600 text-white rounded-md mt-4"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditCategory;