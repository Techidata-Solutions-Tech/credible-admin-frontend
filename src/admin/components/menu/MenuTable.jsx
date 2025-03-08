import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import axios from 'axios';
const MenuTable = ({categories,setToggle}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Sample category data
  // const categories = [
  //   {
  //     id: 'C001',
  //     image: '/51.png',
  //     parentCategory: 'Electronics',
  //     parentCategoryId: 'P001',
  //     subCategory: 'Mobile Phones',
  //     subCategoryId: 'S001',
  //     childCategory: 'Smartphones',
  //     status: 'Active',
  //     createdAt: '2024-01-10',
  //   },
  //   {
  //     id: 'C002',
  //     image: '/56.png',
  //     parentCategory: 'Fashion',
  //     parentCategoryId: 'P002',
  //     subCategory: 'Men',
  //     subCategoryId: 'S002',
  //     childCategory: 'T-Shirts',
  //     status: 'Inactive',
  //     createdAt: '2024-02-15',
  //   },
  //   {
  //     id: 'C003',
  //     image: '/53.png',
  //     parentCategory: 'Home Appliances',
  //     parentCategoryId: 'P003',
  //     subCategory: 'Kitchen',
  //     subCategoryId: 'S003',
  //     childCategory: 'Blenders',
  //     status: 'Active',
  //     createdAt: '2024-03-20',
  //   },
  // ];

  const handleDeletePopUp = async (id) =>{
    setSelectedCategoryId(id)
    document.getElementById('delete_modal').showModal()

  }
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/delete-single-category/${selectedCategoryId}`);
      setToggle(Date.now())
      if (response.status === 200) {
        document.getElementById('delete_modal').close()
         toast.success("Menu deleted successfully");
      }
    } catch (error) {
       toast.error("Failed to delete Menu");
      setToggle(Date.now())
    }
  };

  const handleStatusChange = async (id) =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/toggle-category-status/${id}`);
      setToggle(Date.now())
      if (response.status === 200) {
         toast.success("Menu status changed");
      }
    } catch (error) {
       toast.error("Failed to Menu status changed");
      setToggle(Date.now())
    }
  }

  return (
    <>
    
      <div>
        <dialog id="delete_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Alert !</h3>
            <h1 className="font-bold text-xl pt-[30px]">
              Are you sure you want to delete?
            </h1>
            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden ">
       <div className="overflow-x-auto pb-[100px]">
      <table className="w-full table-auto mb-15">
        <thead className="bg-gray-50 text-black">
          <tr>
            <th className="px-6 py-3 text-left text-md font-medium">Name</th>
            {/* <th className="px-6 py-3 text-left text-md font-medium">Image</th> */}
            <th className="px-6 py-3 text-left text-md font-medium">SEO URL</th>
            {/* <th className="px-6 py-3 text-left text-md font-medium">Parent Category</th>
            <th className="px-6 py-3 text-left text-md font-medium">Parent Category ID</th>
            <th className="px-6 py-3 text-left text-md font-medium">Sub Category</th>
            <th className="px-6 py-3 text-left text-md font-medium">Sub Category ID</th>
            <th className="px-6 py-3 text-left text-md font-medium">Child Category</th> */}

            <th className="px-6 py-3 text-left text-md font-medium">Status</th>
            {/* <th className="px-6 py-3 text-left text-md font-medium">Created At</th> */}
            <th className="px-6 py-3 text-left text-md font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories?.map((category) => (
            <tr key={category.id} className="hover:bg-gray-100 border-b border-gray-300">
              <td className="px-6 py-4 text-sm text-gray-900">{"— ".repeat(category.depth)} {category.name}</td>
              {/* <td className="px-6 py-4 text-sm">
                <img src={category.featureimage} alt="menu" className="w-14 h-14 rounded-md object-cover" />
              </td> */}
              {/* <td className="px-6 py-4 text-sm text-gray-900">{category.parentCategory}</td> */}
              {/* <td className="px-6 py-4 text-sm text-gray-900">{category.parentCategoryId}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{category.subCategory}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{category.subCategoryId}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{category.childCategory}</td> */}
               <td className="px-6 py-4 text-sm text-gray-900">{category.seo_url}</td> 

              <td className="px-4 py-2">
                <button
                  onClick={() => handleStatusChange(category.id)}
                  className={`w-full px-4 py-2 text-sm text-white font-semibold rounded-lg cursor-pointer transition duration-300 ${
                    category.status === true ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {category.status === true ? "Active" : "Inactive"}
                </button>
              </td>


              {/* <td className="px-6 py-4 text-sm text-gray-900">{category.createdAt}</td> */}
              <td className="px-6 py-4 text-sm text-gray-900 flex justify-center gap-1">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <button tabIndex={0} className="text-gray-600 hover:text-gray-800">
                    <BsThreeDots className='mt-2 text-blue-500' size={28} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg shadow-md w-48 text-sm text-gray-700 z-10">
                    <li>
                      <Link to={`/admin/product/menu/edit-menu/${category.id}`} className="hover:text-blue-500">
                        Edit
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDeletePopUp(category.id)}
                        className="hover:text-red-500"
                      >
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
      </div>
    </div>
    </>

   
  );
};

export default MenuTable;
