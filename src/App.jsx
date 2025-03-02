import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
// import SellerRoutes from './routes/SellerRoutes'
// import SupplierRoutes from './routes/SupplierRoutes'
const App = () => {
  return (
   <div>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes/>}/>
        {/* <Route path='/seller/*' element={<SellerRoutes/>}/> */}
        {/* <Route path='/supplier/*' element={<SupplierRoutes/>}/> */}
      </Routes>
   </div>
  )
}

export default App