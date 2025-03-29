import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { ToastContainer } from 'react-toastify'
import AddVariantForm from '../../components/variant/AddVariantForm'

const AddVariant = () => {
    const {id} = useParams()
  return (
    <div className=''>
    <Navbar/>
    <div className='flex bg-gray-100'>
    <Sidebar/>
    <div className=' rounded shadow-lg p-4 w-screen m-2 bg-white'>
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