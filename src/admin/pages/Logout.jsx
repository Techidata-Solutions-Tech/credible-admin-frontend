import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('token');
   
    useEffect(()=>{
        navigate('/admin/login')
    },[])
  return (
    <div className='flex justify-center items-center h-screen'><span className="loading loading-dots w-16 h-16"></span></div>
  )
}

export default Logout