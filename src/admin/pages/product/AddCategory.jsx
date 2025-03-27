import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectImageModal from "../../components/dashboard/SelectImageModal";
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [featureImage, setFeatureImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formType, setFormType] = useState("category");
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found!");
        return;
      }

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/admin/get-child-categories?parentId=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [count]);

  useEffect(() => {
    if (selectedParentId) {
      const fetchSubcategories = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found!");
          return;
        }

        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/admin/get-child-categories?parentId=${selectedParentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch subcategories");

          const data = await response.json();
          setSubcategories(data.categories);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          toast.error("Failed to fetch subcategories");
        }
      };

      fetchSubcategories();
    }
  }, [selectedParentId]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
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
      featureimage: featureImage ||"/image.jpg",
      meta_title: data.meta_title,
      meta_keywords: data.meta_keywords,
      meta_description: data.meta_description,
      isFeatured: data.isFeatured || false,
      cat_type: formType,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/add-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payLoad),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(`${formType} submitted successfully!`);
        reset();
        setSelectedParentId(null);
        setCount((prev) => prev + 1);
        setSubcategories([]);
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="rounded shadow-lg p-4 w-screen m-2 bg-white">
          <h1 className="text-4xl text-center mb-2">Add Category</h1>
          <div className="flex justify-around mb-4">
            <button
              className={`px-4 py-2 rounded ${
                formType === "category"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setFormType("category")}
            >
              Create Category
            </button>
            <button
              className={`px-4 py-2 rounded ${
                formType === "subcategory"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setFormType("subcategory")}
            >
              Create Subcategory
            </button>
            <button
              className={`px-4 py-2 rounded ${
                formType === "childcategory"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setFormType("childcategory")}
            >
              Create Child Category
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border rounded-md"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Name
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

              <div className="mb-4">
                <label
                  htmlFor="seo_url"
                  className="block text-sm font-semibold"
                >
                  SEO URL
                </label>
                <input
                  id="seo_url"
                  type="text"
                  className="w-full p-2 border border-black rounded-md bg-transparent"
                  {...register("seo_url", { required: "SEO URL is required" })}
                />
                {errors.seo_url && (
                  <p className="text-red-500 text-xs">
                    {errors.seo_url.message}
                  </p>
                )}
              </div>

              {formType !== "category" && (
                <div className="mb-4">
                  <label
                    htmlFor="parentCat"
                    className="block text-sm font-semibold"
                  >
                    Parent Category
                  </label>
                  <select
                    id="parentCat"
                    className="w-full p-2 border border-black rounded-md bg-transparent"
                    {...register("parentCat", { required: true })}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                  >
                    <option value="">Select a Parent Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formType === "childcategory" && (
                <div className="mb-4">
                  <label
                    htmlFor="subCat"
                    className="block text-sm font-semibold"
                  >
                    Subcategory
                  </label>
                  <select
                    id="subCat"
                    className="w-full p-2 border border-black rounded-md bg-transparent"
                    {...register("subCat", { required: true })}
                  >
                    <option value="">Select a Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4 col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border border-black rounded-md bg-transparent"
                  rows="3"
                  {...register("description")}
                ></textarea>
              </div>
             <div className="grid sm:grid-cols-2 gap-5"> <SelectImageModal setImage={setFeatureImage} />
             <img src={featureImage} alt="featureImage" /></div>
              <div className="mb-4">
                <label
                  htmlFor="meta_title"
                  className="block text-sm font-semibold"
                >
                  Meta Title
                </label>
                <input
                  id="meta_title"
                  type="text"
                  className="w-full p-2 border border-black rounded-md bg-transparent"
                  {...register("meta_title")}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="meta_keywords"
                  className="block text-sm font-semibold"
                >
                  Meta Keywords
                </label>
                <input
                  id="meta_keywords"
                  type="text"
                  className="w-full p-2 border border-black rounded-md bg-transparent"
                  {...register("meta_keywords")}
                />
              </div>

              <div className="mb-4 col-span-2">
                <label
                  htmlFor="meta_description"
                  className="block text-sm font-semibold"
                >
                  Meta Description
                </label>
                <textarea
                  id="meta_description"
                  className="w-full p-2 border border-black rounded-md bg-transparent"
                  rows="3"
                  {...register("meta_description")}
                ></textarea>
              </div>

              {/* Is Featured */}
              <div className="mb-4 flex items-center">
                <input
                  id="isFeatured"
                  type="checkbox"
                  className="mr-2"
                  {...register("isFeatured")}
                />
                <label htmlFor="isFeatured" className="text-sm font-semibold">
                  Is Featured Category
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
