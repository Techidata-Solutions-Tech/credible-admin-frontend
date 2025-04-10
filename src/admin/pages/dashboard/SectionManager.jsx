import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";

const SectionManager = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const breadcrumbItems = [
    { label: 'Website Setting', href: '/admin' },
    { label: 'Manage Sections', href: '/create-product-category' },
    { label: 'Sections', href: '/create-product-category' }
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/productHome`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.status) {
          setSections(data.data);
        } else {
          console.error("Failed to fetch sections:", data.message);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const updatedStatus = !currentStatus; 

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/productHome/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: updatedStatus }),
      });
      const data = await response.json();

      if (data.status) {
        setSections((prevSections) =>
          prevSections.map((section) =>
            section.id === id ? { ...section, status: updatedStatus } : section
          )
        );
        toast.success(data.message); 
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update status. Please try again later.");
    }
  };

  const deleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/productHome/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data.status) {
          toast.success(data.message);
          setSections((prevSections) => prevSections.filter((section) => section.id !== id));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error deleting section:", error);
        toast.error("Failed to delete section. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen">
      
      <div className="flex flex-col md:flex-row bg-gray-100">
        
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
        <Breadcrumbs
              pageTitle="Manage Sections"
              items={breadcrumbItems}
            />
       <div className="flex justify-end items-center mb-2">
          <Link to={'/admin/dashboard/section/create'}  className="bg-gray-700 text-white rounded-md p-3">Create section</Link>
          
       </div>
       <div className='flex gap-2 flex-wrap justify-between w-[100%] my-3'>
                             <div className="dropdown">
                                <div tabIndex={0} role="button" className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                    Filter
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow">
                                    <li><label><input type="checkbox" /></label></li>
                                    <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                    <li><label><input type="checkbox" /> Checkbox Label</label></li>
                                </ul>
                            </div>
                            <div className="">
                            <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                                <i className="ri-search-line"></i>
                                <input type="text" className="grow placeholder:text-center" placeholder="Sections" />
                            </label>
                        </div>
                           <select className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                                <option disabled selected>Sort</option>
                                <option>Homer</option>
                                <option>Marge</option>
                                <option>Bart</option>
                                <option>Lisa</option>
                                <option>Maggie</option>
                            </select>
                        </div>
       <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 uppercase">
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Order</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section,i) => (
                <tr key={section.id} className="text-center border border-gray-300">
                  <td className="border border-gray-300 p-2">{i+1}</td>
                  <td className="border border-gray-300 p-2">{section.id}</td>
                  <td className="border border-gray-300 p-2">{section.name}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => toggleStatus(section.id, section.status)}
                      className={`px-3 py-1 rounded text-white ${
                        section.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {section.status ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">{section.index}</td>
                  <td className="items-center p-2 flex justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/dashboard/section/${section.id}`)}
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteSection(section.id)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SectionManager;
