import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className=''>
        <Navbar/>
        <div className='flex bg-gray-100'>
        <Sidebar/>
        <div className=' rounded shadow-lg p-4 w-screen m-2 bg-white'>
        
  Home

</div>
        </div> 
        </div>
  )
}

export default Home