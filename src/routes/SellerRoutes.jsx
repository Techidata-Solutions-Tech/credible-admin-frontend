import React from 'react'
import Home from '../admin/pages/Home'
import { Route, Routes } from 'react-router-dom'
import Product from '../admin/pages/product/Product'
import AddProduct from '../admin/pages/product/AddProduct'
import EditProduct from '../admin/pages/product/EditProduct'
import Login from '../admin/pages/Login'
import Logout from '../admin/pages/Logout'
import SellerContext from '../context/SellerContext'
import ApprovalsTable from '../supplier/pages/ApprovalManagement'

const SellerRoutes = () => {
  return (
    <>  
      <SellerContext>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product' element={  <Product/>}/>
          <Route path='/product/add-product' element={  <AddProduct/>}/>
          <Route path='/product/edit-product' element={  <EditProduct/>}/>
          <Route path='/approval-management' element={<ApprovalsTable />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
      </SellerContext>
    </>
  )
}

export default SellerRoutes