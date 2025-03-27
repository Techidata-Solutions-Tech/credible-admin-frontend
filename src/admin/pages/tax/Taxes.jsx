import { useEffect, useState } from "react";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaxTable = () => {
  const token = localStorage.getItem('token');
  const [taxes, setTaxes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editTax, setEditTax] = useState(null);
  const [newTax, setNewTax] = useState({ name: "", percentage: "", displayName: "" });

  const fetchTaxes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      const data = await res.json();
      setTaxes(data.data);
    } catch (error) {
      toast.error("Failed to fetch taxes");
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  const toggleStatus = async (id, status) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ status: !status })
      });
      toast.success("Status updated");
      fetchTaxes();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const setDefault = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax/${id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      toast.success("Default tax updated");
      fetchTaxes();
    } catch (error) {
      toast.error("Failed to set default tax");
    }
  };

  const deleteTax = async (id) => {
    if (window.confirm("Are you sure you want to delete this tax?")) {
      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/tax/${id}`, { 
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        toast.success("Tax deleted");
        fetchTaxes();
      } catch (error) {
        toast.error("Failed to delete tax");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const url = editTax ? `${import.meta.env.VITE_BASE_URL}/api/admin/tax/${editTax.id}` : `${import.meta.env.VITE_BASE_URL}/api/admin/tax`;
      const method = editTax ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
           'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newTax),
      });
      toast.success(editTax ? "Tax updated successfully" : "Tax added successfully");
      setShowPopup(false);
      setEditTax(null);
      setNewTax({ name: "", percentage: "", displayName: "" });
      fetchTaxes();
    } catch (error) {
      toast.error("Failed to save tax");
    }
  };
  

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="p-6">
     <div className="flex justify-between items-center">
     <h2 className="text-xl font-bold mb-4">Tax Setting</h2>
          <button onClick={() => setShowPopup(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">+ Add New Tax</button>
       
     </div>
        <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Sr. No</th>
                <th className="p-2 border">Display Name</th>
                <th className="p-2 border">Tax Name</th>
                <th className="p-2 border">Tax Amount(%)</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Default</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map((tax, index) => (
                <tr key={tax.id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{tax.displayName}</td>
                  <td className="p-2 border">{tax.name}</td>
                  <td className="p-2 border">{tax.percentage}%</td>
                  <td className="p-2 border">
                    <span
                      onClick={() => toggleStatus(tax.id, tax.status)}
                      className={`cursor-pointer px-2 py-1 text-white rounded ${tax.status ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {tax.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-2 border">
                    {tax.isDefault ? (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded">Default</span>
                    ) : (
                      <button onClick={() => setDefault(tax.id)} className="text-blue-500 underline">
                        Make Default
                      </button>
                    )}
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => deleteTax(tax.id)} className="text-red-500 mr-2">🗑</button>
                    <button onClick={() => { setEditTax(tax); setNewTax(tax); setShowPopup(true); }} className="text-blue-500">✏</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-lg font-bold mb-4">{editTax ? "Edit Tax" : "Add Tax"}</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={newTax.name}
                  onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="number"
                  placeholder="Percentage"
                  value={newTax.percentage}
                  onChange={(e) => setNewTax({ ...newTax, percentage: e.target.value })}
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Display Name"
                  value={newTax.displayName}
                  onChange={(e) => setNewTax({ ...newTax, displayName: e.target.value })}
                  className="border p-2 w-full mb-2"
                />
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => { setShowPopup(false); setEditTax(null); setNewTax({ name: "", percentage: "", displayName: "" }); }} className="ml-2 px-4 py-2 border rounded">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaxTable;