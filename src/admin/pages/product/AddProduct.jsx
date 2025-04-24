import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import AddProductForm from '../../components/product/AddProductForm'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useLocation } from 'react-router-dom'

const AddProduct = () => {
  const location = useLocation();

  const isAdmin = location.pathname.includes("admin")
  const isSupplier = location.pathname.includes("supplier")
  const breadcrumbItems = [
    { label: 'Product Management', href: '#' },
    { label: 'Products', href: '#' },
   { label: 'Add Product', href: `/${isAdmin ? "/admin": isSupplier ?"/supplier" :""}/add-product` },
  ];
  return (
    <div className="flex h-screen overflow-auto">
      
      
      
      
      <div className="flex-1 flex flex-col overflow-auto">
        
        
        
       
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