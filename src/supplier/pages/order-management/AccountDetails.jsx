import React from "react";
import { useForm } from "react-hook-form";

const AccountDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      promotorFirstName: "",
      promotorLastName: "",
      promotorFirstName2: "",
      promotorLastName2: "",
      
      contactFirstName: "",
      contactLastName: "",
      contactPhone: "",
      contactEmail: "",
      contactAlternativeNumber: "",
      
      loginMobile: "",
      loginEmail: "",
      loginPassword: "",
      
      operatorFirstName: "",
      operatorLastName: "",
      operatorPhone: "",
      operatorEmail: "",
      
      pickupAddress: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      const promotorResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/promotor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.promotorFirstName,
          lastName: data.promotorLastName,
          firstName2: data.promotorFirstName2,
          lastName2: data.promotorLastName2,
        }),
      });
      
      if (!promotorResponse.ok) {
        throw new Error("Failed to update promotor details");
      }
      
      const contactResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.contactFirstName,
          lastName: data.contactLastName,
          phone: data.contactPhone,
          email: data.contactEmail,
          alternativeNumber: data.contactAlternativeNumber,
        }),
      });
      
      if (!contactResponse.ok) {
        throw new Error("Failed to update contact details");
      }
      
      const loginResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: data.loginMobile,
          email: data.loginEmail,
          password: data.loginPassword,
        }),
      });
      
      if (!loginResponse.ok) {
        throw new Error("Failed to update login details");
      }
      
      const operatorResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/operator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.operatorFirstName,
          lastName: data.operatorLastName,
          phone: data.operatorPhone,
          email: data.operatorEmail,
        }),
      });
      
      if (!operatorResponse.ok) {
        throw new Error("Failed to update operator details");
      }
      
      const addressResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: data.pickupAddress,
        }),
      });
      
      if (!addressResponse.ok) {
        throw new Error("Failed to update address details");
      }
      
      alert("All details updated successfully!");
      
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message: error.message || "Something went wrong. Please try again."
      });
    }
  };

  const handleEdit = (section) => {
    console.log(`Editing ${section} section`);
  };

  const handleUpdate = (section) => {
    const formData = {};
    
    switch(section) {
      case "promotor":
        handleSubmit((data) => {
          formData.firstName = data.promotorFirstName;
          formData.lastName = data.promotorLastName;
          formData.firstName2 = data.promotorFirstName2;
          formData.lastName2 = data.promotorLastName2;
          
          fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/promotor`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then(response => {
              if (!response.ok) throw new Error("Failed to update promotor details");
              alert("Promotor details updated successfully!");
            })
            .catch(error => {
              setError("root.serverError", {
                type: "server",
                message: error.message || "Failed to update promotor details"
              });
            });
        })();
        break;
        
      case "contact":
        handleSubmit((data) => {
          formData.firstName = data.contactFirstName;
          formData.lastName = data.contactLastName;
          formData.phone = data.contactPhone;
          formData.email = data.contactEmail;
          formData.alternativeNumber = data.contactAlternativeNumber;
          
          fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/contact`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then(response => {
              if (!response.ok) throw new Error("Failed to update contact details");
              alert("Contact details updated successfully!");
            })
            .catch(error => {
              setError("root.serverError", {
                type: "server",
                message: error.message || "Failed to update contact details"
              });
            });
        })();
        break;
        
      case "login":
        handleSubmit((data) => {
          formData.mobile = data.loginMobile;
          formData.email = data.loginEmail;
          formData.password = data.loginPassword;
          
          fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then(response => {
              if (!response.ok) throw new Error("Failed to update login details");
              alert("Login details updated successfully!");
            })
            .catch(error => {
              setError("root.serverError", {
                type: "server",
                message: error.message || "Failed to update login details"
              });
            });
        })();
        break;
        
      case "operator":
        handleSubmit((data) => {
          formData.firstName = data.operatorFirstName;
          formData.lastName = data.operatorLastName;
          formData.phone = data.operatorPhone;
          formData.email = data.operatorEmail;
          
          fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/operator`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then(response => {
              if (!response.ok) throw new Error("Failed to update operator details");
              alert("Operator details updated successfully!");
            })
            .catch(error => {
              setError("root.serverError", {
                type: "server",
                message: error.message || "Failed to update operator details"
              });
            });
        })();
        break;
        
      case "address":
        handleSubmit((data) => {
          formData.address = data.pickupAddress;
          
          fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/address`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then(response => {
              if (!response.ok) throw new Error("Failed to update address details");
              alert("Address details updated successfully!");
            })
            .catch(error => {
              setError("root.serverError", {
                type: "server",
                message: error.message || "Failed to update address details"
              });
            });
        })();
        break;
        
      default:
        break;
    }
  };

  const handleAddNew = () => {
    console.log("Adding new address");
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Account Details Header */}
        <div className="bg-green-600 text-white p-3 mb-4">
          <h2 className="text-lg font-semibold">Account Details :</h2>
        </div>

        {/* Promotor Details Section */}
        <div className="mb-6">
          <div className="bg-green-600 text-white p-3 mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Promotor Details :</h2>
            <span className="text-xl">—</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                className={`w-full border ${errors.promotorFirstName ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                {...register("promotorFirstName", { required: "First name is required" })}
              />
              {errors.promotorFirstName && (
                <p className="text-red-500 text-xs mt-1">{errors.promotorFirstName.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                className={`w-full border ${errors.promotorLastName ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                {...register("promotorLastName", { required: "Last name is required" })}
              />
              {errors.promotorLastName && (
                <p className="text-red-500 text-xs mt-1">{errors.promotorLastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                {...register("promotorFirstName2")}
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                {...register("promotorLastName2")}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => handleEdit("promotor")}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => handleUpdate("promotor")}
            >
              Update
            </button>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-6">
          <div className="bg-green-600 text-white p-3 mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Contact Details :</h2>
            <span className="text-xl">—</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                className={`w-full border ${errors.contactFirstName ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                {...register("contactFirstName", { required: "First name is required" })}
              />
              {errors.contactFirstName && (
                <p className="text-red-500 text-xs mt-1">{errors.contactFirstName.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                className={`w-full border ${errors.contactLastName ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                {...register("contactLastName", { required: "Last name is required" })}
              />
              {errors.contactLastName && (
                <p className="text-red-500 text-xs mt-1">{errors.contactLastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                className={`w-full border ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                {...register("contactPhone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.contactPhone.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Email ID</label>
              <input
                type="email"
                className={`w-full border ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                {...register("contactEmail", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.contactEmail.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Alternative Number</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded p-2"
                {...register("contactAlternativeNumber", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
              />
              {errors.contactAlternativeNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.contactAlternativeNumber.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => handleEdit("contact")}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => handleUpdate("contact")}
            >
              Update
            </button>
          </div>
        </div>

{/* Log-In Details Section */}
<div className="mb-6">
  <div className="bg-green-600 text-white p-3 mb-4 flex justify-between items-center">
    <h2 className="text-lg font-semibold">Log-In Details :</h2>
    <span className="text-xl">—</span>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div>
      <label className="block mb-1">Mobile Number</label>
      <input
        type="tel"
        className={`w-full border ${errors.loginMobile ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("loginMobile", { 
          required: "Mobile number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Please enter a valid 10-digit mobile number"
          }
        })}
      />
      {errors.loginMobile && (
        <p className="text-red-500 text-xs mt-1">{errors.loginMobile.message}</p>
      )}
    </div>
    <div>
      <label className="block mb-1">Email ID</label>
      <input
        type="email"
        className={`w-full border ${errors.loginEmail ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("loginEmail", { 
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email address"
          }
        })}
      />
      {errors.loginEmail && (
        <p className="text-red-500 text-xs mt-1">{errors.loginEmail.message}</p>
      )}
    </div>
    <div>
      <label className="block mb-1">Password</label>
      <input
        type="password"
        className={`w-full border ${errors.loginPassword ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("loginPassword", { 
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
          }
        })}
      />
      {errors.loginPassword && (
        <p className="text-red-500 text-xs mt-1">{errors.loginPassword.message}</p>
      )}
    </div>
  </div>
  
  <div className="flex justify-end space-x-2">
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => handleEdit("login")}
    >
      Edit
    </button>
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => handleUpdate("login")}
    >
      Update
    </button>
  </div>
</div>

{/* Account Operator Details Section */}
<div className="mb-6">
  <div className="bg-green-600 text-white p-3 mb-4 flex justify-between items-center">
    <h2 className="text-lg font-semibold">Account Operator Details :</h2>
    <span className="text-xl">—</span>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block mb-1">First Name</label>
      <input
        type="text"
        className={`w-full border ${errors.operatorFirstName ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("operatorFirstName", { required: "First name is required" })}
      />
      {errors.operatorFirstName && (
        <p className="text-red-500 text-xs mt-1">{errors.operatorFirstName.message}</p>
      )}
    </div>
    <div>
      <label className="block mb-1">Last Name</label>
      <input
        type="text"
        className={`w-full border ${errors.operatorLastName ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("operatorLastName", { required: "Last name is required" })}
      />
      {errors.operatorLastName && (
        <p className="text-red-500 text-xs mt-1">{errors.operatorLastName.message}</p>
      )}
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block mb-1">Phone Number</label>
      <input
        type="tel"
        className={`w-full border ${errors.operatorPhone ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("operatorPhone", { 
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Please enter a valid 10-digit phone number"
          }
        })}
      />
      {errors.operatorPhone && (
        <p className="text-red-500 text-xs mt-1">{errors.operatorPhone.message}</p>
      )}
    </div>
    <div>
      <label className="block mb-1">Email ID</label>
      <input
        type="email"
        className={`w-full border ${errors.operatorEmail ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
        {...register("operatorEmail", { 
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email address"
          }
        })}
      />
      {errors.operatorEmail && (
        <p className="text-red-500 text-xs mt-1">{errors.operatorEmail.message}</p>
      )}
    </div>
  </div>
  
  <div className="flex justify-end space-x-2">
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => handleEdit("operator")}
    >
      Edit
    </button>
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => handleUpdate("operator")}
    >
      Update
    </button>
  </div>
</div>

{/* Pickup Address Details Section */}
<div className="mb-6">
  <div className="bg-green-600 text-white p-3 mb-4 flex justify-between items-center">
    <h2 className="text-lg font-semibold">Pickup Address Details :</h2>
    <span className="text-xl">—</span>
  </div>
  
  <div className="mb-4">
    <label className="block mb-1">Address</label>
    <textarea
      className={`w-full border ${errors.pickupAddress ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
      rows="3"
      {...register("pickupAddress", { required: "Address is required" })}
    ></textarea>
    {errors.pickupAddress && (
      <p className="text-red-500 text-xs mt-1">{errors.pickupAddress.message}</p>
    )}
  </div>
  
  <div className="flex justify-end space-x-2">
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={handleAddNew}
    >
      Add New
    </button>
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => handleEdit("address")}
    >
      Edit
    </button>
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => handleUpdate("address")}
    >
      Update
    </button>
  </div>
</div>

{/* Form submission error message */}
{errors.root?.serverError && (
  <div className="text-red-500 mb-4">{errors.root.serverError.message}</div>
)}

{/* Submit button */}
<div className="flex justify-end">
  <button
    type="submit"
    className="bg-green-600 text-white px-6 py-2 rounded text-lg font-semibold"
  >
    Submit
  </button>
</div>
</form></div> )}

export default AccountDetailsForm;