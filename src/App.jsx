import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import Login from './admin/pages/Login'
import AdminContext from './context/AdminContext'
import SupplierContext from './context/SupplierContext'
// import SellerRoutes from './routes/SellerRoutes'
import SupplierRoutes from './routes/SupplierRoutes'
import SupplierLogin from './supplier/pages/Login'
const App = () => {
  return (
    <AdminContext>
    <SupplierContext>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/supplier/*' element={<SupplierRoutes />} />
        <Route path='/supplier-login' element={<SupplierLogin />} />
      </Routes>
    </SupplierContext>
  </AdminContext>
  )
}

export default App