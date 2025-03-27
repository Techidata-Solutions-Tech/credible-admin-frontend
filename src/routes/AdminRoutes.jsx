import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../admin/pages/Home'
import Login from '../admin/pages/Login'
// import AdminProtectWrapper from '../wrappers/AdminProtectWrapper'
import Logout from '../admin/pages/Logout'
import Product from '../admin/pages/product/Product'
import Taxes from '../admin/pages/tax/Taxes'
import TaxHSNSAC from '../admin/pages/tax/TaxHSNSAC'
import User from '../admin/pages/user/User'
import Category from '../admin/pages/product/Category'
import AdminContext from '../context/AdminContext';
import AddProduct from '../admin/pages/product/AddProduct'
import Orders from '../admin/pages/orders/Orders'
import OrdersBranch from '../admin/pages/orders/OrdersBranch'
import OrdersSeller from '../admin/pages/orders/OrdersSeller'
import EditProduct from '../admin/pages/product/EditProduct'
import ProductVariant from '../admin/pages/product/ProductVariant'
import AddCategory from '../admin/pages/product/AddCategory'
import EditCategory from '../admin/pages/product/EditCategory'
import Returns from '../admin/pages/returns/Returns'
import TransactionSale from '../admin/pages/tansactions/TransactionSale'
import Reviews from '../admin/pages/reviews/Reviews'
import CustomerPersonalUser from '../admin/pages/customer/CustomerPersonalUser'
import CustomerBuisnessUser from '../admin/pages/customer/CustomerBuisnessUser'
import MerchantSellerApproval from '../admin/pages/approval/MerchantSellerApproval'
import MerchantSupplierApproval from '../admin/pages/approval/MerchantSupplierApproval'
import ProductSellerApproval from '../admin/pages/approval/ProductSellerApproval'
import ProductSupplierApproval from '../admin/pages/approval/ProductSupplierApproval'
import MerchantSeller from '../admin/pages/merchant/MerchantSeller'
import MerchantSupplier from '../admin/pages/merchant/MerchantSupplier'
import SaleVerifyReturns from '../admin/pages/returns/SaleVerifyReturns'
import Attributes from '../admin/pages/product/Attributes'
import AddAttributes from '../admin/pages/product/AddAttributes'
import Brand from '../admin/pages/product/Brand'
import AddBrand from '../admin/pages/product/AddBrand'
import ShippingInward from '../admin/pages/shipping/ShippingInward'
import ShippingOutward from '../admin/pages/shipping/ShippingOutward'
import AdminCoupon from '../admin/pages/marketing/AdminCoupon'
import CreateCoupon from '../admin/pages/marketing/CreateCoupon'
import SellerCoupon from '../admin/pages/marketing/SellerCoupon'
import ReferralCode from '../admin/pages/marketing/ReferralCode'
import TransactionPurchase from '../admin/pages/tansactions/TransactionPurchase'
import SellerPayment from '../admin/pages/tansactions/SellerPayment'
import SupplierPayment from '../admin/pages/tansactions/SupplierPayment'
import InventoryManagementBranch from '../admin/pages/inventory/InventoryManagementBranch'
import InventoryManagementDeadStock from '../admin/pages/inventory/InventoryManagementDeadStock'
import InventoryManagementSeller from '../admin/pages/inventory/InventoryManagementSeller'
import CutomerTicket from '../admin/pages/ticket/CutomerTicket'
import SupplierTicket from '../admin/pages/ticket/SupplierTicket'
import SellerTicket from '../admin/pages/ticket/SellerTicket'
import ReplyTicket from '../admin/pages/ticket/ReplyTicket'

import AddBanner from '../admin/pages/dashboard/AddBanner'
import AddProductHome from '../admin/pages/dashboard/AddProductHome'
import AddPopularCategory from '../admin/pages/dashboard/AddPopularCategory'
import UploadImage from '../admin/pages/dashboard/UploadImage'
import Banner from '../admin/pages/dashboard/Banner'
import PopularCategory from '../admin/pages/dashboard/PopularCategory'
import CreateWarehouse from '../admin/pages/branch/CreateBranch'
import WarehouseTable from '../admin/pages/branch/Branch'
import ProductHome from '../admin/pages/dashboard/ManageProductHome'
import AddSlider from '../admin/pages/dashboard/AddSlider'
import Slider from '../admin/pages/dashboard/Slider'
import SectionManager from '../admin/pages/dashboard/SectionManager'
import CreateSection from '../admin/pages/dashboard/CreateSection'
import SectionDetail from '../admin/pages/dashboard/EditSection'
import Menu from '../admin/pages/product/Menu'
import AddMenu from '../admin/pages/product/AddMenu'
import EditMenu from '../admin/pages/product/Editmenu'
import MediaSetting from '../admin/pages/mediasetting/MediaSetting'
import ManageUsers from '../admin/pages/users/ManageUsers'
import EditAttribute from '../admin/pages/product/EditAttribute'
const AdminRoutes = () => {
  return (
  <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/media-setting' element={<MediaSetting/>}/>
          {/* dashboard */}
          <Route path='/dashboard/section/manage' element={<SectionManager/>}/>
          <Route path='/dashboard/section/:id' element={<SectionDetail/>}/>
          <Route path='/dashboard/section/create' element={<CreateSection/>}/>
          <Route path='/dashboard/banner/add-banner' element={<AddBanner/>}/>
          <Route path='/dashboard/banner/table' element={<Banner/>}/>
          <Route path='/dashboard/slider/add-slider' element={<AddSlider/>}/>
          <Route path='/dashboard/slider/table' element={<Slider/>}/>
          <Route path='/dashboard/product/add-product' element={<AddProductHome/>}/>
          <Route path='/dashboard/product/manage-product' element={<ProductHome/>}/>
          <Route path='/dashboard/image/upload' element={<UploadImage />}/>
          <Route path='/dashboard/category/popular' element={<AddPopularCategory/>}/>
          <Route path='/dashboard/category/popular-table' element={<PopularCategory/>}/>
          
          {/* user  */}
          <Route path='/user/personal' element={<CustomerPersonalUser/>}/>
          <Route path='/user/business' element={<CustomerBuisnessUser/>}/>
          {/* approval  */}
          <Route path='/approval/merchent/seller' element={<MerchantSellerApproval/>}/>
          <Route path='/approval/merchent/supplier' element={<MerchantSupplierApproval/>}/>
          <Route path='/approval/product/seller' element={<ProductSellerApproval/>}/>
          <Route path='/approval/product/supplier' element={<ProductSupplierApproval/>}/>
          {/* merchent */}
          <Route path='/merchent/seller' element={<MerchantSeller/>}/>
          <Route path='/merchent/supplier' element={<MerchantSupplier/>}/>
          {/* orders */}
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/orders/branch' element={<OrdersBranch/>}/>
          <Route path='/orders/seller' element={<OrdersSeller/>}/>
          {/* Warehouse */}
          <Route path='/warehouse/create' element={<CreateWarehouse/>}/>
          <Route path='/warehouse/table' element={<WarehouseTable/>}/>
          {/* return  */}
          <Route path='/returns/' element={<Returns/>}/>
          <Route path='/returns/sale-verify' element={<SaleVerifyReturns/>}/>
          {/* products */}
          <Route path='/product' element={<Product/>}/>
          <Route path='/product/add-product' element={<AddProduct/>}/>
          <Route path='/product/edit-product' element={<EditProduct/>}/>
          <Route path='/product/category' element={<Category/>}/>
          <Route path='/product/category/add-category' element={<AddCategory/>}/>
          <Route path='/product/category/edit-category/:id' element={<EditCategory/>}/>
          <Route path='/product/menu' element={<Menu/>}/>
          <Route path='/product/menu/add-menu' element={<AddMenu/>}/>
          <Route path='/product/menu/edit-menu/:id' element={<EditMenu/>}/>
          <Route path='/product/attributes/' element={<Attributes/>}/>
          <Route path='/product/attributes/:id' element={<EditAttribute/>}/>
          <Route path='/product/attributes/add-attributes' element={<AddAttributes/>}/>
          <Route path='/product/brand' element={<Brand/>}/>
          <Route path='/product/brand/add-brand' element={<AddBrand/>}/>
          <Route path='/product/variant/:id' element={<ProductVariant/>}/>
          {/* taxes */}
          <Route path='/taxes/hsn-sac' element={<TaxHSNSAC/>}/>
          <Route path='/taxes/gst-tax' element={<Taxes/>}/>
          {/* Users */}
          <Route path='/users/manage' element={<ManageUsers/>}/>
          {/* Marketing */}
          <Route path='/marketing/admin-coupon' element={<AdminCoupon/>}/>
          <Route path='/marketing/create-coupon' element={<CreateCoupon/>}/>
          <Route path='/marketing/seller-coupon' element={<SellerCoupon/>}/>
          <Route path='/marketing/referral-coupon' element={<ReferralCode/>}/>
          {/* shipping  */}
          <Route path='/shipping/inward' element={<ShippingInward/>}/>
          <Route path='/shipping/outward' element={<ShippingOutward/>}/>
          {/* tansaction */}
          <Route path='/tansaction/sale' element={<TransactionSale/>}/>
          <Route path='/tansaction/purchase' element={<TransactionPurchase/>}/>
          <Route path='/tansaction/supplier' element={<SellerPayment/>}/>
          <Route path='/tansaction/seller' element={<SupplierPayment/>}/>
          {/* inventory */}
          <Route path='/inventory/branch' element={<InventoryManagementBranch/>}/>
          <Route path='/inventory/dead-stock' element={<InventoryManagementDeadStock/>}/>
          <Route path='/inventory/seller' element={<InventoryManagementSeller/>}/>
          {/* ticket  */}
          <Route path='/ticket/customer' element={<CutomerTicket/>}/>
          <Route path='/ticket/supplier' element={<SupplierTicket/>}/>
          <Route path='/ticket/seller' element={<SellerTicket/>}/>
          <Route path='/ticket/reply-ticket' element={<ReplyTicket/>}/>
        
          <Route path='/reviews' element={<Reviews/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
  </>
  )
}

export default AdminRoutes;
// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from '../admin/pages/Home'
// import Login from '../admin/pages/Login'
// import AdminProtectWrapper from '../wrappers/AdminProtectWrapper'
// import Logout from '../admin/pages/Logout'
// import Product from '../admin/pages/product/Product'
// import Taxes from '../admin/pages/tax/Taxes'
// import TaxHSNSAC from '../admin/pages/tax/TaxHSNSAC'
// import User from '../admin/pages/user/User'
// import Category from '../admin/pages/product/Category'
// import AdminContext from '../context/AdminContext';
// import AddProduct from '../admin/pages/product/AddProduct'
// import Orders from '../admin/pages/orders/Orders'
// import OrdersBranch from '../admin/pages/orders/OrdersBranch'
// import OrdersSeller from '../admin/pages/orders/OrdersSeller'
// import EditProduct from '../admin/pages/product/EditProduct'
// import ProductVariant from '../admin/pages/product/ProductVariant'
// import AddCategory from '../admin/pages/product/AddCategory'
// import EditCategory from '../admin/pages/product/EditCategory'
// import Returns from '../admin/pages/returns/Returns'
// import TransactionSale from '../admin/pages/tansactions/TransactionSale'
// import Reviews from '../admin/pages/reviews/Reviews'
// import CustomerPersonalUser from '../admin/pages/customer/CustomerPersonalUser'
// import CustomerBuisnessUser from '../admin/pages/customer/CustomerBuisnessUser'
// import MerchantSellerApproval from '../admin/pages/approval/MerchantSellerApproval'
// import MerchantSupplierApproval from '../admin/pages/approval/MerchantSupplierApproval'
// import ProductSellerApproval from '../admin/pages/approval/ProductSellerApproval'
// import ProductSupplierApproval from '../admin/pages/approval/ProductSupplierApproval'
// import MerchantSeller from '../admin/pages/merchant/MerchantSeller'
// import MerchantSupplier from '../admin/pages/merchant/MerchantSupplier'
// import SaleVerifyReturns from '../admin/pages/returns/SaleVerifyReturns'
// import Attributes from '../admin/pages/product/Attributes'
// import AddAttributes from '../admin/pages/product/AddAttributes'
// import Brand from '../admin/pages/product/Brand'
// import AddBrand from '../admin/pages/product/AddBrand'
// import ShippingInward from '../admin/pages/shipping/ShippingInward'
// import ShippingOutward from '../admin/pages/shipping/ShippingOutward'
// import AdminCoupon from '../admin/pages/marketing/AdminCoupon'
// import CreateCoupon from '../admin/pages/marketing/CreateCoupon'
// import SellerCoupon from '../admin/pages/marketing/SellerCoupon'
// import ReferralCode from '../admin/pages/marketing/ReferralCode'
// import TransactionPurchase from '../admin/pages/tansactions/TransactionPurchase'
// import SellerPayment from '../admin/pages/tansactions/SellerPayment'
// import SupplierPayment from '../admin/pages/tansactions/SupplierPayment'
// import InventoryManagementBranch from '../admin/pages/inventory/InventoryManagementBranch'
// import InventoryManagementDeadStock from '../admin/pages/inventory/InventoryManagementDeadStock'
// import InventoryManagementSeller from '../admin/pages/inventory/InventoryManagementSeller'
// import CutomerTicket from '../admin/pages/ticket/CutomerTicket'
// import SupplierTicket from '../admin/pages/ticket/SupplierTicket'
// import SellerTicket from '../admin/pages/ticket/SellerTicket'
// import ReplyTicket from '../admin/pages/ticket/ReplyTicket'

// import AddBanner from '../admin/pages/dashboard/AddBanner'
// import AddProductHome from '../admin/pages/dashboard/AddProductHome'
// import AddPopularCategory from '../admin/pages/dashboard/AddPopularCategory'
// import UploadImage from '../admin/pages/dashboard/UploadImage'
// import Banner from '../admin/pages/dashboard/Banner'
// import PopularCategory from '../admin/pages/dashboard/PopularCategory'
// import CreateWarehouse from '../admin/pages/branch/CreateBranch'
// import WarehouseTable from '../admin/pages/branch/Branch'
// import ProductHome from '../admin/pages/dashboard/ManageProductHome'
// import AddSlider from '../admin/pages/dashboard/AddSlider'
// import Slider from '../admin/pages/dashboard/Slider'
// import SectionManager from '../admin/pages/dashboard/SectionManager'
// import CreateSection from '../admin/pages/dashboard/CreateSection'
// import SectionDetail from '../admin/pages/dashboard/EditSection'
// import Menu from '../admin/pages/product/Menu'
// import AddMenu from '../admin/pages/product/AddMenu'
// import EditMenu from '../admin/pages/product/Editmenu'
// import MediaSetting from '../admin/pages/mediasetting/MediaSetting'
// const AdminRoutes = () => {
//   return (
//   <>
//         <Routes>
//           <Route path='/' element={ <AdminProtectWrapper><Home/></AdminProtectWrapper>}/>
//           <Route path='/media-setting' element={ <AdminProtectWrapper><MediaSetting/></AdminProtectWrapper>}/>
//           {/* dashboard */}
//           <Route path='/dashboard/section/manage' element={ <AdminProtectWrapper><SectionManager/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/section/:id' element={ <AdminProtectWrapper><SectionDetail/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/section/create' element={ <AdminProtectWrapper><CreateSection/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/banner/add-banner' element={ <AdminProtectWrapper><AddBanner/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/banner/table' element={ <AdminProtectWrapper><Banner/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/slider/add-slider' element={ <AdminProtectWrapper><AddSlider/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/slider/table' element={ <AdminProtectWrapper><Slider/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/product/add-product' element={ <AdminProtectWrapper><AddProductHome/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/product/manage-product' element={ <AdminProtectWrapper><ProductHome/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/image/upload' element={ <AdminProtectWrapper><UploadImage /></AdminProtectWrapper>}/>
//           <Route path='/dashboard/category/popular' element={ <AdminProtectWrapper><AddPopularCategory/></AdminProtectWrapper>}/>
//           <Route path='/dashboard/category/popular-table' element={ <AdminProtectWrapper><PopularCategory/></AdminProtectWrapper>}/>
          
//           {/* user  */}
//           <Route path='/user/personal' element={ <AdminProtectWrapper><CustomerPersonalUser/></AdminProtectWrapper>}/>
//           <Route path='/user/business' element={ <AdminProtectWrapper><CustomerBuisnessUser/></AdminProtectWrapper>}/>
//           {/* approval  */}
//           <Route path='/approval/merchent/seller' element={ <AdminProtectWrapper><MerchantSellerApproval/></AdminProtectWrapper>}/>
//           <Route path='/approval/merchent/supplier' element={ <AdminProtectWrapper><MerchantSupplierApproval/></AdminProtectWrapper>}/>
//           <Route path='/approval/product/seller' element={ <AdminProtectWrapper><ProductSellerApproval/></AdminProtectWrapper>}/>
//           <Route path='/approval/product/supplier' element={ <AdminProtectWrapper><ProductSupplierApproval/></AdminProtectWrapper>}/>
//           {/* merchent */}
//           <Route path='/merchent/seller' element={ <AdminProtectWrapper><MerchantSeller/></AdminProtectWrapper>}/>
//           <Route path='/merchent/supplier' element={ <AdminProtectWrapper><MerchantSupplier/></AdminProtectWrapper>}/>
//           {/* orders */}
//           <Route path='/orders' element={ <AdminProtectWrapper><Orders/></AdminProtectWrapper>}/>
//           <Route path='/orders/branch' element={ <AdminProtectWrapper><OrdersBranch/></AdminProtectWrapper>}/>
//           <Route path='/orders/seller' element={ <AdminProtectWrapper><OrdersSeller/></AdminProtectWrapper>}/>
//           {/* Warehouse */}
//           <Route path='/warehouse/create' element={ <AdminProtectWrapper><CreateWarehouse/></AdminProtectWrapper>}/>
//           <Route path='/warehouse/table' element={ <AdminProtectWrapper><WarehouseTable/></AdminProtectWrapper>}/>
//           {/* return  */}
//           <Route path='/returns/' element={ <AdminProtectWrapper><Returns/></AdminProtectWrapper>}/>
//           <Route path='/returns/sale-verify' element={ <AdminProtectWrapper><SaleVerifyReturns/></AdminProtectWrapper>}/>
//           {/* products */}
//           <Route path='/product' element={ <AdminProtectWrapper><Product/></AdminProtectWrapper>}/>
//           <Route path='/product/add-product' element={ <AdminProtectWrapper><AddProduct/></AdminProtectWrapper>}/>
//           <Route path='/product/edit-product' element={ <AdminProtectWrapper><EditProduct/></AdminProtectWrapper>}/>
//           <Route path='/product/category' element={ <AdminProtectWrapper><Category/></AdminProtectWrapper>}/>
//           <Route path='/product/category/add-category' element={ <AdminProtectWrapper><AddCategory/></AdminProtectWrapper>}/>
//           <Route path='/product/category/edit-category/:id' element={ <AdminProtectWrapper><EditCategory/></AdminProtectWrapper>}/>
//           <Route path='/product/menu' element={ <AdminProtectWrapper><Menu/></AdminProtectWrapper>}/>
//           <Route path='/product/menu/add-menu' element={ <AdminProtectWrapper><AddMenu/></AdminProtectWrapper>}/>
//           <Route path='/product/menu/edit-menu/:id' element={ <AdminProtectWrapper><EditMenu/></AdminProtectWrapper>}/>
//           <Route path='/product/attributes/' element={ <AdminProtectWrapper><Attributes/></AdminProtectWrapper>}/>
//           <Route path='/product/attributes/add-attributes' element={ <AdminProtectWrapper><AddAttributes/></AdminProtectWrapper>}/>
//           <Route path='/product/brand' element={ <AdminProtectWrapper><Brand/></AdminProtectWrapper>}/>
//           <Route path='/product/brand/add-brand' element={ <AdminProtectWrapper><AddBrand/></AdminProtectWrapper>}/>
//           <Route path='/product/variant/:id' element={ <AdminProtectWrapper><ProductVariant/></AdminProtectWrapper>}/>
//           {/* taxes */}
//           <Route path='/taxes/hsn-sac' element={ <AdminProtectWrapper><TaxHSNSAC/></AdminProtectWrapper>}/>
//           <Route path='/taxes/gst-tax' element={ <AdminProtectWrapper><Taxes/></AdminProtectWrapper>}/>
//           {/* Marketing */}
//           <Route path='/marketing/admin-coupon' element={ <AdminProtectWrapper><AdminCoupon/></AdminProtectWrapper>}/>
//           <Route path='/marketing/create-coupon' element={ <AdminProtectWrapper><CreateCoupon/></AdminProtectWrapper>}/>
//           <Route path='/marketing/seller-coupon' element={ <AdminProtectWrapper><SellerCoupon/></AdminProtectWrapper>}/>
//           <Route path='/marketing/referral-coupon' element={ <AdminProtectWrapper><ReferralCode/></AdminProtectWrapper>}/>
//           {/* shipping  */}
//           <Route path='/shipping/inward' element={ <AdminProtectWrapper><ShippingInward/></AdminProtectWrapper>}/>
//           <Route path='/shipping/outward' element={ <AdminProtectWrapper><ShippingOutward/></AdminProtectWrapper>}/>
//           {/* tansaction */}
//           <Route path='/tansaction/sale' element={ <AdminProtectWrapper><TransactionSale/></AdminProtectWrapper>}/>
//           <Route path='/tansaction/purchase' element={ <AdminProtectWrapper><TransactionPurchase/></AdminProtectWrapper>}/>
//           <Route path='/tansaction/supplier' element={ <AdminProtectWrapper><SellerPayment/></AdminProtectWrapper>}/>
//           <Route path='/tansaction/seller' element={ <AdminProtectWrapper><SupplierPayment/></AdminProtectWrapper>}/>
//           {/* inventory */}
//           <Route path='/inventory/branch' element={ <AdminProtectWrapper><InventoryManagementBranch/></AdminProtectWrapper>}/>
//           <Route path='/inventory/dead-stock' element={ <AdminProtectWrapper><InventoryManagementDeadStock/></AdminProtectWrapper>}/>
//           <Route path='/inventory/seller' element={ <AdminProtectWrapper><InventoryManagementSeller/></AdminProtectWrapper>}/>
//           {/* ticket  */}
//           <Route path='/ticket/customer' element={ <AdminProtectWrapper><CutomerTicket/></AdminProtectWrapper>}/>
//           <Route path='/ticket/supplier' element={ <AdminProtectWrapper><SupplierTicket/></AdminProtectWrapper>}/>
//           <Route path='/ticket/seller' element={ <AdminProtectWrapper><SellerTicket/></AdminProtectWrapper>}/>
//           <Route path='/ticket/reply-ticket' element={ <AdminProtectWrapper><ReplyTicket/></AdminProtectWrapper>}/>
        
//           <Route path='/reviews' element={ <AdminProtectWrapper><Reviews/></AdminProtectWrapper>}/>
//           <Route path='/login' element={ <AdminProtectWrapper><Login/></AdminProtectWrapper>}/>
//           <Route path='/logout' element={ <AdminProtectWrapper><Logout/></AdminProtectWrapper>}/>
//         </Routes>
//   </>
//   )
// }

// export default AdminRoutes;