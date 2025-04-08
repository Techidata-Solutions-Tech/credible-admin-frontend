import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import SelectImageModal from "./SelectImageModal";

const BannerTable = ({setToggle, banners }) => {
  const token = localStorage.getItem('token')
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedBanner) {
      setValue("redirectUrl", selectedBanner.redirectUrl);
      setValue("position", selectedBanner.position);
      setValue("type", selectedBanner.type);
      setValue("image", selectedBanner.image);
      setValue("index", selectedBanner.index);
      setImage(selectedBanner.image);
    }
  }, [selectedBanner, setValue]);

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setEditModal(true);
  };

  const handleCloseModal = () => {
    setEditModal(false);
    setSelectedBanner(null);
    setImage(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/get-banner/${id}`,
        {
          method: "DELETE",
          headers:{
             Authorization:`Bearer ${token}`
          }
        },
      );
      const result = await response.json();
      if (response.status) {
        setToggle(Date.now())
        toast.success("Banner deleted successfully!");
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      image: image,
      redirectUrl: data.redirectUrl,
      // type: data.type,
      position: data.position,
      index: parseInt(data.index),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/get-banner/${
          selectedBanner.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.status) {
        setToggle(Date.now())
        toast.success("Banner updated successfully!");
        handleCloseModal();
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full table-auto mb-10 min-w-[900px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Image
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Redirect URL
            </th>
          
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Position
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Index
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {banners?.map((banner) => (
            <tr
              key={banner.id}
              className="hover:bg-gray-50 border-b border-gray-300"
            >
              <td className="px-4 py-4 text-sm text-gray-900">{banner.id}</td>
              <td className="px-4 py-4 text-sm text-gray-900">
                <img
                  src={banner.image}
                  alt="Banner"
                  className="w-20 h-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-4 text-sm text-blue-500 underline">
                <a
                  href={banner.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {banner.redirectUrl}
                </a>
              </td>
              {/* <td className="px-4 py-4 text-sm text-gray-900">{banner.type}</td> */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {banner.position}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {banner.index}
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 flex  gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button
                    tabIndex={0}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <BsThreeDots className="mt-2 text-blue-500" size={28} />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white z-10 rounded-box w-52 shadow"
                  >
                    <li>
                      <button onClick={() => handleEdit(banner)}>Edit</button>
                    </li>
                    <li>
                      <button onClick={() => handleDelete(banner.id)}>
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border md:w-[60%] shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Banner
              </h3>
              <button
                className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>


              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 border rounded-md pt-[20px]"
              >
                <div className="flex justify-evenly gap-[50px]">
                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor="redirectUrl"
                      className="block text-sm font-semibold"
                    >
                      Redirect URL
                    </label>
                    <input
                      id="redirectUrl"
                      type="text"
                      className="w-full p-2 border rounded-md bg-transparent"
                      {...register("redirectUrl", {
                        required: "redirect URL is required",
                      })}
                    />
                    {errors.redirectUrl && (
                      <p className="text-red-500 text-xs">
                        {errors.redirectUrl.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 w-1/2">
                  <label
                    htmlFor="index"
                    className="block text-sm font-semibold"
                  >
                    Index
                  </label>
                  <input
                    id="index"
                    type="number"
                    min={0}
                    className="w-full p-2 border rounded-md bg-transparent"
                    {...register("index", { required: "Index is required" })}
                  />
                  {errors.index && (
                    <p className="text-red-500 text-xs">
                      {errors.index.message}
                    </p>
                  )}
                </div>
                </div>

                <div className="flex justify-evenly gap-[50px]">
                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor="position"
                      className="block text-sm font-semibold"
                    >
                      Position
                    </label>
                    <select
                      id="position"
                      className="w-full p-2 border rounded-md bg-transparent"
                      {...register("position")}
                    >
                      <option value="SLIDER">Slider</option>
                      {/* <option value="BELOW_POPULAR">Below Popular</option> */}
                      <option value="BANNER">Banner</option>
                    </select>
                    {errors.position && (
                      <p className="text-red-500 text-xs">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                  {/* <div className="mb-4 w-1/2">
                    <label
                      htmlFor="type"
                      className="block text-sm font-semibold"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      className="w-full p-2 border rounded-md bg-transparent"
                      {...register("type")}
                    >
                      <option value="HALF">Half</option>
                      <option value="FULL">Full</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-xs">
                        {errors.type.message}
                      </p>
                    )}
                  </div> */}
                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor="image"
                      className="block text-sm font-semibold"
                    >
                      Choose Image
                    </label>
                    <SelectImageModal setImage={setImage} />

                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="max-w-full h-auto rounded mt-2"
                      />
                    )}
                  </div>
                </div>

           
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BannerTable;
