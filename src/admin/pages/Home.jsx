import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import AddProduct from '../components/product/AddProductForm'

const Home = () => {
  return (
    <div className=''>
        <div className='flex bg-gray-100'>
          <Sidebar activeTab={1}/>

          <div className=' rounded shadow-lg w-screen m-2 bg-white'>
        <Navbar/>

          </div>
        </div>       
    </div>
  )
}

export default Home