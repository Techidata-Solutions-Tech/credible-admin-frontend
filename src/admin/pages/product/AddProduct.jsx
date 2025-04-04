import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import AddProductForm from '../../components/product/AddProductForm'
import Breadcrumbs from '../../components/Breadcrumbs'

const AddProduct = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/admin' },
    { label: 'Products', href: '/admin/product' },
    { label: 'Add Product', href: '/admin/add-product' },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <Breadcrumbs
              pageTitle="Add Product"
              items={breadcrumbItems}
            />
          <div className="rounded shadow-lg p-4 bg-white">
            <AddProductForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct