import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEye } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SectionManager = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);

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
    const updatedStatus = !currentStatus; // Toggle the boolean status

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
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
       <div className="flex justify-between items-center mb-2">
       <h2 className="text-xl font-bold mb-4">Manage Sections</h2>
          <Link to={'/admin/dashboard/section/create'}  className="bg-gray-700 text-white rounded-md p-3">Create section</Link>
          
       </div>
       <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.id} className="text-center border border-gray-300">
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
                  <td className="items-center p-2 flex justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/dashboard/section/${section.id}`)}
                      className="text-blue-500"
                    >
                      <FaEye />
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
