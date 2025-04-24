import React from 'react'
import Home from '../admin/pages/Home'
import { Route, Routes } from 'react-router-dom'
import Product from '../admin/pages/product/Product'
import AddProduct from '../admin/pages/product/AddProduct'
import EditProduct from '../admin/pages/product/EditProduct'
import Login from '../admin/pages/Login'
import Logout from '../admin/pages/Logout'
import ProductVariant from '../admin/pages/product/ProductVariant'
import AddVariant from '../admin/pages/product/AddVariant'
import SupplierContext from '../context/SupplierContext'
import ApprovalsTable from '../supplier/pages/ApprovalManagement'
import OrderMain from '../supplier/pages/order-management/OrderMain'
import OrderDetails from '../supplier/pages/order-management/OrderDetails'
import SupplierLayout from '../supplier/pages/SupplierLayout'
import AccountDetailsForm from '../supplier/pages/order-management/AccountDetails'
import ProductSellerApproval from '../admin/pages/approval/ProductSellerApproval'
import ProductSupplierApproval from '../admin/pages/approval/ProductSupplierApproval'
import Attributes from '../admin/pages/product/Attributes'
import AddAttributes from '../admin/pages/product/AddAttributes'
import EditAttribute from '../admin/pages/product/EditAttribute'
import Brand from '../admin/pages/product/Brand'
import AddBrand from '../admin/pages/product/AddBrand'
import DebitNoteList from '../supplier/pages/validation-management/Validationmanagement'
import DebitNoteDetail from '../supplier/pages/validation-management/DebitNoteDetail'
import SupplierTicket from '../supplier/pages/ticket/SupplierTicket'
import SupplierPayment from '../supplier/pages/transaction/SupplierPayment'
import SupplierTransaction from '../supplier/pages/transaction/SupplierTransaction'
import SupplierTax from '../supplier/pages/tax/TaxManagement'
import SupplierProtectWrapper from '../wrappers/SupplierProtectWrapper'
import Inventory from '../supplier/pages/Inventory/ManageInventory'
import ShippingManagement from '../supplier/pages/shipping/ShippingManagement'
import ManageReturns from '../supplier/pages/return/ManageReturns'
import ReturnDetails from '../supplier/pages/return/ReturnDetails'
const SupplierRoutes = () => {
  return (
<SupplierProtectWrapper>
<SupplierLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={  <Product/>}/>
        <Route path='/product/add-product' element={  <AddProduct/>}/>
        <Route path='/product/edit-product' element={  <EditProduct/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/approval-management' element={<ApprovalsTable />}/>
        <Route path='/order' element={<OrderMain />}/>
        <Route path='/order/:id' element={<OrderDetails />}/>
        <Route path='/account-details' element={<AccountDetailsForm />}/>
        <Route path='/approval/product/supplier' element={ <ProductSupplierApproval/>}/>
        <Route path='/product/attributes/' element={ <Attributes/>}/>
        <Route path='/product/attributes/add-attributes' element={ <AddAttributes/>}/>
        <Route path='/product/brand' element={ <Brand/>}/>
        <Route path='/product/brand/add-brand' element={ <AddBrand/>}/>
        <Route path='/product/variant/:id' element={ <ProductVariant/>}/>
        <Route path='/product/attributes/:id' element={<EditAttribute/>}/>
        <Route path='/product/add-variant/:id' element={<AddVariant/>}/>
        <Route path='/product/brand/:id' element={ <AddBrand/>}/>
        <Route path='/debit-note' element={ <DebitNoteList/>}/>
        <Route path='/debit-note/:id' element={ <DebitNoteDetail/>}/>
        <Route path='/ticket' element={ <SupplierTicket/>}/>
        <Route path='/payment' element={ <SupplierPayment/>}/>
        <Route path='/transaction' element={ <SupplierTransaction/>}/>
        <Route path='/tax' element={ <SupplierTax/>}/>
        <Route path='/inventory' element={ <Inventory/>}/>
        <Route path='/shipping' element={ <ShippingManagement/>}/>
        <Route path='/returns' element={ <ManageReturns/>}/>
        <Route path='/returns/:id' element={ <ReturnDetails/>}/>
      </Routes>
      </SupplierLayout>
</SupplierProtectWrapper>
  )
}

export default SupplierRoutes