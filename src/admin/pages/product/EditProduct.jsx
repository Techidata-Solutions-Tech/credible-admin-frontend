import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import EditProductForm from '../../components/product/EditProductForm'
import Breadcrumbs from '../../components/Breadcrumbs'
const breadcrumbItems = [
  { label: 'Home', href: '/admin' },
  { label: 'Products', href: '/admin/product' },
  { label: 'Edit Product', href: '/admin/add-product' },
];
const EditProduct = () => {
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
              pageTitle="Edit Product"
              items={breadcrumbItems}
            />
          <div className="rounded shadow-lg p-4 bg-white">
            <EditProductForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct