import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import Login from './admin/pages/Login'
import AdminContext from './context/AdminContext'
// import SellerRoutes from './routes/SellerRoutes'
// import SupplierRoutes from './routes/SupplierRoutes'
const App = () => {
  return (
   <div>
    <AdminContext>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        {/* <Route path='/seller/*' element={<SellerRoutes/>}/> */}
        {/* <Route path='/supplier/*' element={<SupplierRoutes/>}/> */}
      </Routes>
      </AdminContext>
   </div>
  )
}

export default App