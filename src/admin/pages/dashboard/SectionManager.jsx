import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";

const SectionManager = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filters, setFilters] = useState({
    active: false,
    inactive: false,
  });
  const [loading, setLoading] = useState(true); // Add loading state

  const breadcrumbItems = [
    { label: 'Website Setting', href: '/admin' },
    { label: 'Manage Sections', href: '/create-product-category' },
    { label: 'Sections', href: '/create-product-category' }
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true); // Set loading to true when starting fetch
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
          toast.error("Failed to fetch sections");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        toast.error("Error fetching sections");
      } finally {
        setLoading(false); // Set loading to false when done (success or error)
      }
    };

    fetchSections();
  }, []);

  // Filter and sort sections
  const filteredSections = useMemo(() => {
    let result = [...sections];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(section =>
        section.name.toLowerCase().includes(term) ||
        section.id.toString().includes(term)
      );
    }
    
    // Apply status filters
    if (filters.active || filters.inactive) {
      result = result.filter(section => {
        if (filters.active && filters.inactive) return true;
        if (filters.active) return section.status;
        if (filters.inactive) return !section.status;
        return true;
      });
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'order-asc':
        result.sort((a, b) => a.index - b.index);
        break;
      case 'order-desc':
        result.sort((a, b) => b.index - a.index);
        break;
      case 'status-asc':
        result.sort((a, b) => (a.status === b.status) ? 0 : a.status ? -1 : 1);
        break;
      case 'status-desc':
        result.sort((a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1);
        break;
      default:
        // Default sorting (by ID or as returned from API)
        break;
    }
    
    return result;
  }, [sections, searchTerm, filters, sortOption]);

  const toggleStatus = async (id, currentStatus) => {
    const updatedStatus = !currentStatus; 

    try {
      setLoading(true); // Show loader during status update
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
    } finally {
      setLoading(false); // Hide loader after status update
    }
  };

  const deleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        setLoading(true); // Show loader during deletion
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
      } finally {
        setLoading(false); // Hide loader after deletion
      }
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
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
            <Link to={'/admin/dashboard/section/create'} className="bg-gray-700 text-white rounded-md p-3">Create section</Link>
          </div>
          
          <div className='flex gap-2 flex-wrap justify-between w-[100%] my-3'>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base">
                Filter
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow">
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.active}
                      onChange={() => handleFilterChange('active')}
                    />
                    Active Sections
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.inactive}
                      onChange={() => handleFilterChange('inactive')}
                    />
                    Inactive Sections
                  </label>
                </li>
              </ul>
            </div>
            
            <div className="">
              <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                <i className="ri-search-line"></i>
                <input 
                  type="text" 
                  className="grow placeholder:text-center" 
                  placeholder="Search Sections" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>
            
            <select 
              className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-sm sm:text-base"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="order-asc">Order (Low to High)</option>
              <option value="order-desc">Order (High to Low)</option>
              <option value="status-asc">Status (Active First)</option>
              <option value="status-desc">Status (Inactive First)</option>
            </select>
          </div>
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {/* Content (only show when not loading) */}
          {!loading && (
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
                {filteredSections.length > 0 ? (
                  filteredSections.map((section, i) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {sections.length === 0 ? 'No sections found' : 'No sections match your filters'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SectionManager;