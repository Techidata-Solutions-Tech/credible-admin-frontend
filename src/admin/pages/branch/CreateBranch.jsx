import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/Breadcrumbs";

const CreateWarehouse = () => {
  const [formData, setFormData] = useState({
    warehouseId: "",
    password: "",
    date: "",
    state: "",
    city: "",
    location: "",
    pinCode: "",
    address: "",
    name: "",
    email: "",
    phone: "",
    alternateNumber: "",
    product: false,
    inventory: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.warehouseId) newErrors.warehouseId = "Warehouse ID is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    // alternateNumber is optional, so no validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const token = localStorage.getItem('token');
    try {
      // Convert date to ISO format
      const isoDate = formData.date ? new Date(formData.date).toISOString() : null;

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/warehouse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: isoDate,
        }),
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create warehouse");
      }

      toast.success("Warehouse created successfully!");
      setFormData({
        warehouseId: "",
        password: "",
        date: "",
        state: "",
        city: "",
        location: "",
        pinCode: "",
        address: "",
        name: "",
        email: "",
        phone: "",
        alternateNumber: "",
        product: false,
        inventory: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  const handleReset = () => {
    setFormData({
      warehouseId: "",
      password: "",
      date: "",
      state: "",
      city: "",
      location: "",
      pinCode: "",
      address: "",
      name: "",
      email: "",
      phone: "",
      alternateNumber: "",
      product: false,
      inventory: false,
    });
    setErrors({});
    toast.info("Form reset");
  };
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Manage Warehouses', href: '/admin/warehouse/table' },
    { label: 'Add Warehouses', href: '/admin/warehouse/table' },
  ];
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
        <Breadcrumbs
              pageTitle="Create Warehouse"
              items={breadcrumbItems}
            />
          <form onSubmit={handleSubmit}>
            {/* Warehouse Details */}
            <div className="mb-4 p-4 border rounded-md">
              <h3 className="text-lg font-semibold bg-green-600 text-white p-2 rounded-md">
                Warehouse Details
              </h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {/* Warehouse ID */}
                <div>
                  <label className="block font-medium">Warehouse ID:</label>
                  <input
                    name="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.warehouseId}</p>
                </div>

                {/* Password */}
                <div>
                  <label className="block font-medium">Password:</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="password"
                  />
                  <p className="text-red-600 text-sm">{errors.password}</p>
                </div>

                {/* Date */}
                <div>
                  <label className="block font-medium">Date:</label>
                  <input
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="date"
                  />
                  <p className="text-red-600 text-sm">{errors.date}</p>
                </div>

                {/* State */}
                <div>
                  <label className="block font-medium">State:</label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.state}</p>
                </div>

                {/* City */}
                <div>
                  <label className="block font-medium">City:</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.city}</p>
                </div>

                {/* Location */}
                <div>
                  <label className="block font-medium">Location:</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.location}</p>
                </div>

                {/* Pin Code */}
                <div>
                  <label className="block font-medium">Pin Code:</label>
                  <input
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.pinCode}</p>
                </div>

                {/* Address */}
                <div>
                  <label className="block font-medium">Address:</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.address}</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-medium">Name:</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.name}</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium">Email:</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="email"
                  />
                  <p className="text-red-600 text-sm">{errors.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-medium">Phone:</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.phone}</p>
                </div>

                {/* Alternate Number */}
                <div>
                  <label className="block font-medium">Alternate Number:</label>
                  <input
                    name="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                    type="text"
                  />
                  <p className="text-red-600 text-sm">{errors.alternateNumber}</p>
                </div>
              </div>
            </div>

            {/* Activation Details */}
            <div className="mb-4 p-4 border rounded-md">
              <h3 className="text-lg font-semibold bg-green-600 text-white p-2 rounded-md">
                Activation Details
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Product */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="product"
                    checked={formData.product}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="font-medium">Product</label>
                </div>

                {/* Inventory */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="inventory"
                    checked={formData.inventory}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="font-medium">Inventory</label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateWarehouse;