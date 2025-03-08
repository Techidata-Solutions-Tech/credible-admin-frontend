import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const SectionManager = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    { id: 1, name: "Section A", status: "Active" },
    { id: 2, name: "Section B", status: "Inactive" },
    { id: 3, name: "Section C", status: "Active" },
  ]);

  const toggleStatus = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? { ...section, status: section.status === "Active" ? "Inactive" : "Active" }
          : section
      )
    );
  };

  const deleteSection = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setSections((prevSections) => prevSections.filter((section) => section.id !== id));
    }
  };

  return (
    <div className='min-h-screen'>
    <Navbar />
    <div className='flex flex-col md:flex-row bg-gray-100'>
        <Sidebar />
        <div className='flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white'>
      <h2 className="text-xl font-bold mb-4">Sections</h2>
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
                  onClick={() => toggleStatus(section.id)}
                  className={`px-3 py-1 rounded text-white ${
                    section.status === "Active" ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {section.status}
                </button>
              </td>
              <td className="items-center p-2 flex justify-center space-x-3">
                <button onClick={() => navigate(`/admin/dashboard/section/${section.id}`)} className="text-blue-500">
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
    </div></div></div>
  );
};

export default SectionManager;
