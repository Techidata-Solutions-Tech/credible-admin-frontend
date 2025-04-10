import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAttribute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [attributes, setAttributes] = useState([
    {
      name: "",
      value: [""],
      type: "text",
      order: 0,
      metaTitle: "",
      metaKeyword: "",
      metaDescription: "",
    },
  ]);
  const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/get-attribute/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setAttributes(data);
          setIsMultiple(true);
        } else {
          setAttributes([data]);
          setIsMultiple(false);
        }
      } catch (error) {
        console.error("Failed to fetch attribute:", error);
        toast.error("Failed to load attribute.");
      }
    };

    fetchAttribute();
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedAttributes = [...attributes];
    if (field === "value") {
      updatedAttributes[index].value = value.split(",");
    } else {
      updatedAttributes[index][field] = value;
    }
    setAttributes(updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      {
        name: "",
        value: [""],
        type: "text",
        order: 0,
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
      },
    ]);
  };

  const removeAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isMultiple ? attributes : [attributes[0]];

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/update-attribute/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json",
            
          "Authorization": `Bearer ${token}`,

           },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("Attribute updated successfully!");
        setTimeout(() => navigate("/manage-attributes"), 2000);
      } else {
        toast.error("Failed to update attribute.");
      }
    } catch (error) {
      console.error("Error updating attribute:", error);
      toast.error("Error updating attribute.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <h1 className="text-3xl font-bold mb-6 uppercase">Edit Attribute</h1>

          <div className="flex items-center mb-4">
            <label className="mr-4">Mode:</label>
            <button
              onClick={() => setIsMultiple(false)}
              className={`px-4 py-2 rounded-lg ${
                !isMultiple ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              Single
            </button>
            <button
              onClick={() => setIsMultiple(true)}
              className={`ml-4 px-4 py-2 rounded-lg ${
                isMultiple ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              Multiple
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {attributes.map((attr, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg bg-white shadow-md"
              >
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold">Attribute Name</label>
                    <input
                      type="text"
                      value={attr.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold">Attribute Value</label>
                    <input
                      type="text"
                      value={attr.value.join(",")}
                      onChange={(e) =>
                        handleChange(index, "value", e.target.value)
                      }
                      placeholder="Separate values by comma"
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold">Type</label>
                    <select
                      value={attr.type}
                      onChange={(e) =>
                        handleChange(index, "type", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="text">Text</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold">Order</label>
                    <input
                      type="number"
                      value={attr.order}
                      onChange={(e) =>
                        handleChange(index, "order", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold">Meta Title</label>
                    <input
                      type="text"
                      value={attr.metaTitle}
                      onChange={(e) =>
                        handleChange(index, "metaTitle", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold">Meta Keywords</label>
                    <input
                      type="text"
                      value={attr.metaKeyword}
                      onChange={(e) =>
                        handleChange(index, "metaKeyword", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold">Meta Description</label>
                    <input
                      type="text"
                      value={attr.metaDescription}
                      onChange={(e) =>
                        handleChange(index, "metaDescription", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  {isMultiple && (
                    <button
                      type="button"
                      onClick={() => removeAttribute(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isMultiple && (
              <button
                type="button"
                onClick={addAttribute}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Attribute
              </button>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="reset"
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Reset
              </button>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={3000} closeButton={true} />
    </div>
  );
};

export default EditAttribute;
