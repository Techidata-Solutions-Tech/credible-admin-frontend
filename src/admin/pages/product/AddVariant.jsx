import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { ToastContainer } from 'react-toastify'
import AddVariantForm from '../../components/variant/AddVariantForm'
import Breadcrumbs from '../../components/Breadcrumbs'

const AddVariant = () => {
    const {id} = useParams()
    const breadcrumbItems = [
      { label: 'Home', href: '/admin' },
      { label: 'Products', href: '/admin/product' },
      { label: 'Manage Variants', href: `/admin/product/variant/${id}` },
      { label: 'Add Variant', href: '/admin/product' },
    ];
  return (
    <div className=''>
    <Navbar/>
    <div className='flex bg-gray-100'>
    <Sidebar/>
    <div className='flex-1 rounded shadow-lg p-4 w-screen m-2 bg-white'>
    <Breadcrumbs
              pageTitle="Add Variant"
              items={breadcrumbItems}
            />
<AddVariantForm id={id}/>
</div>
</div> 
<div className='z-50'>
<ToastContainer />
</div>
</div>
  )
}

export default AddVariant