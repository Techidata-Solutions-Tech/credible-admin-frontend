import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const SellerProtectWrapper = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    if (!token) {
        navigate('/seller/login')
    }

   useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/seller`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 200) {
            setIsLoading(false)
        }
    })
        .catch(err => {
            localStorage.removeItem('token')
            navigate('/seller/logout')
        })

       
   },[token])

   if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'><span className="loading loading-dots w-16 h-16"></span></div>
        )
    }

  return (
   <>{children}</>
  )
}

export default SellerProtectWrapper