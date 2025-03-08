import { 
  LayoutDashboard, Users, User, UserCog, CheckCircle, ShoppingBag, Store, 
  PackageCheck, ShoppingCart, RotateCcw, Boxes, Tag, List, Settings, 
  Truck, Wallet, DollarSign, Receipt, Bell, Ticket, MessageSquare, Star, 
  Shield, Briefcase, FileText, File, Globe, BarChart, Database, Terminal, 
  UsersRound,
  Package,
  Undo2,
  Layers,
  Sliders,
  ReceiptText,
  Megaphone,
  Gift,
  Shuffle,
  TrendingUp,
  Zap,
  Flame,
  Speaker,
  ClipboardList,
  ClipboardCheck,
  CreditCard,
  Repeat,
  Warehouse,
  Building,
  Home,
  Inbox,
  BookOpen,
  Search,
  MapPin,
  Box,
  XCircle,
  RefreshCw,
  Banknote,
  Smartphone,
  RotateCw,
  Percent,
  Server,
  Code,
  Facebook,
  Image
} from "lucide-react";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-full"
      >
        <i className="ri-menu-line text-2xl"></i>
      </button>

      {/* Overlay - Only on mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative h-screen transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-[300px] lg:left-0'
          }`}
      >
        <div className="overflow-x-hidden text-gray-800 h-screen">
          <ul className="menu w-[300px] min-h-screen bg-white shadow-lg">
            {/* Logo Section */}
            <li className="p-1 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <img
                  src="/api/placeholder/32/32"
                  alt="Credible"
                  className="w-8 h-8 text-2xl font-semibold"
                />
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </li>

            {/* Dashboard Tab */}
            {/* <li
              className={`${props.activeTab === 1 ? ' text-gray-700' : ''
                }  hover:text-blue-500 hover:bg-200 transition duration-200 font-semibold`}
              role="tab"
            >
              <Link
                to="/admin"
                className="flex items-center gap-3 p-4 text-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="ri-dashboard-line text-xl"></i>
                <span>Dashboard</span>
              </Link>
            </li> */}
            {/* <li>
              <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
              <i className="ri-dashboard-line text-xl"></i>Dashboard
                </summary> */}
            {/* </li> */}
            <li>
        <details className="group">
          <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
          <i className="ri-dashboard-line text-xl"></i>Dashboard
          </summary>
          <ul className="ml-6">
            <li><Link to="#">Banner</Link>
              <ul>
                <li><Link to={"/admin/dashboard/banner/add-banner"}> Add banner</Link></li>
                <li><Link to={"/admin/dashboard/banner/table"}> Banner table</Link></li>
              </ul>
            </li>
          </ul>
          {/* <ul className="ml-6">
            <li><Link to="#">Slider</Link>
              <ul>
                <li><Link to={"/admin/dashboard/slider/add-slider"}> Add Slider</Link></li>
                <li><Link to={"/admin/dashboard/slider/table"}> Slider table</Link></li>
              </ul>
            </li>
          </ul> */}
          <ul className="ml-6">
            <li><Link to="#">Mange Section</Link>
              <ul>
                <li><Link to={"/admin/dashboard/section/manage"}>Manage Sections</Link></li>
                <li><Link to={"/admin/dashboard/section/create"}> Create Section</Link></li>
              </ul>
            </li>
          </ul>
          
          <ul className="ml-6">
            <li><Link to="#">Product</Link>
              <ul>
                <li><Link to={"/admin/dashboard/product/add-product"}> Add product to home</Link></li>
                <li><Link to={"/admin/dashboard/product/manage-product"}> Manage product to home</Link></li>
                {/* <li><Link to={"/admin/user/business"}> Business User</Link></li> */}
              </ul>
            </li>
          </ul>
          <ul className="ml-6">
            <li><Link to="#">Media settings</Link>
              <ul>
                <li><Link to={"/admin/dashboard/image/upload"}> Upload Image</Link></li>
                {/* <li><Link to={"/admin/user/business"}> Business User</Link></li> */}
              </ul>
            </li>
          </ul>
          <ul className="ml-6">
            <li><Link to="#">Category</Link>
              <ul>
                <li><Link to={"/admin/dashboard/category/popular"}> Popular category</Link></li>
                <li><Link to={"/admin/dashboard/category/popular-table"}> Popular category Table</Link></li>
                {/* <li><Link to={"/admin/user/business"}> Business User</Link></li> */}
              </ul>
            </li>
          </ul>
        </details>
            </li>
                  
            <li>
        <details className="group">
          <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
            <Users /> Customer Management
          </summary>
          <ul className="ml-6">
            <li><Link to="#"><UserCog /> Customers</Link>
              <ul>
                <li><Link to={"/admin/user/personal"}> Personal User</Link></li>
                <li><Link to={"/admin/user/business"}> Business User</Link></li>
              </ul>
            </li>
          </ul>
        </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Boxes /> Products Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Package /> Products</Link>
                    <ul>
                      <li><Link to={`/admin/product`}>Manage Products</Link></li>
                      <li><Link to="/admin/product/add-product">Add Products</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><Layers /> Categories</Link>
                    <ul>
                      <li><Link to={`/admin/product/category`}>Manage Categories</Link></li>
                      <li><Link to={`/admin/product/category/add-category`}>Add Categories</Link></li>
                    </ul>
                  </li>
                 
                  <li>
                    <Link to="#"><Sliders /> Attributes</Link>
                    <ul>
                      <li><Link to="/admin/product/attributes/">Manage Attributes</Link></li>
                      <li><Link to="/admin/product/attributes/add-attributes">Add Attributes</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><Tag /> Brands</Link>
                    <ul>
                      <li><Link to="/admin/product/brand">Manage Brands</Link></li>
                      <li><Link to="/admin/product/brand/add-brand">Add Brands</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><Layers /> Menu</Link>
                    <ul>
                      <li><Link to={`/admin/product/menu`}>Manage Menu</Link></li>
                      <li><Link to={`/admin/product/menu/add-menu`}>Add Menu</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                <Package />Order Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><ShoppingCart /> Sale Order</Link>
                    <ul >
                      <li><Link to={ `/admin/orders`}>My Orders</Link ></li>
                      <li><Link to="/admin/orders/branch">Branch Order</Link></li>
                      <li><Link to="/admin/orders/seller">Seller Order</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
     
                  <li>
                    <Link to="/admin/media-setting"><Image />Media Setting</Link>
                 
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                <ReceiptText /> Tax Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to=""><FileText /> Tax</Link>
                    <ul>
                      <li><Link to={`/admin/taxes/gst-tax`}>Manage GST/TAX</Link></li>
                      {/* <li><Link to="#">Create GST/TAX</Link></li> */}
                      <li><Link to="/admin/taxes/hsn-sac">Manage HSN/SAC</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Building /> Warehouse Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Home /> Warehouse</Link>
                    <ul>
                      <li><Link to="/admin/warehouse/table">Manage Warehouse</Link></li>
                      <li><Link to="/admin/warehouse/create">Create Warehouse</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <CheckCircle /> Approval Management
                </summary>
                <ul className="ml-6">
                  <li><Link to="#"><Store /> Merchant</Link>
                    <ul>
                      <li><Link to="/admin/approval/merchent/supplier"> Supplier Approval</Link></li>
                      <li><Link to="/admin/approval/merchent/seller"> Seller Approval</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><ShoppingBag /> Product</Link>
                    <ul>
                      <li><Link to="/admin/approval/product/supplier"> Supplier Product</Link></li>
                      <li><Link to="/admin/approval/product/seller"> Seller Product</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>

           



            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                <UsersRound />Merchant Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Store /> Merchants</Link>
                    <ul>
                      <li><Link to="/admin/merchent/supplier">Manage Supplier</Link></li>
                      <li><Link to="/admin/merchent/seller">Manage Seller</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>





            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Undo2 /> Return Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><RotateCcw /> Returns</Link>
                    <ul>
                      <li><Link to="/admin/returns">Purchase Returns</Link></li>
                      <li><Link to="/admin/returns/sale-verify">Sale Returns & Verify Returns</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            
      

    


            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Megaphone /> Marketing Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Ticket /> Coupons</Link>
                    <ul>
                      <li><Link to="/admin/marketing/admin-coupon">Admin Coupons</Link></li>
                      <li><Link to="/admin/marketing/create-coupon">Create Coupons</Link></li>
                      <li><Link to="/admin/marketing/seller-coupon">Seller Coupons</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><Gift /> Referral Code</Link>
                    <ul>
                      <li><Link to="/admin/marketing/referral-coupon">Manage Referral Code</Link></li>
                      <li><Link to="#">Create Referral Code</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><Shuffle /> Cross Sell</Link></li>
                  <li><Link to="#"><TrendingUp /> Upsell</Link></li>
                  <li><Link to="#"><Zap /> Flash Sale</Link></li>
                  <li><Link to="#"><Flame /> Hot Deals</Link></li>
                  <li><Link to="#"><Speaker /> Campaigning</Link></li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Truck /> Shipping Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Package /> Shipments</Link>
                    <ul>
                      <li><Link to="/admin/shipping/inward">Inward Shipment (Purchase)</Link></li>
                      <li><Link to="/admin/shipping/outward">Outward Shipment (Sale)</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>





            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <ShoppingCart /> Purchase Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><ClipboardList /> Procurement</Link>
                    <ul>
                      <li><Link to="#">Price Comparison</Link></li>
                      <li><Link to="#">Restock Alert</Link></li>
                      <li><Link to="#">Preferred Supplier</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><FileText /> Purchase</Link>
                    <ul>
                      <li><Link to="#">Manage Purchase Order</Link></li>
                      <li><Link to="#">Create Purchase Order</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><ClipboardCheck /> Validation</Link>
                    <ul>
                      <li><Link to="#">Goods Received Note (GRN)</Link></li>
                      <li><Link to="#">Invoice Matching</Link></li>
                      <li><Link to="#">Debit Note</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><BarChart /> Summary</Link>
                  </li>
                </ul>
              </details>
            </li>








            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <CreditCard /> Transaction Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Repeat /> Transactions</Link>
                    <ul>
                      <li><Link to="/admin/tansaction/purchase">Purchase Transactions</Link></li>
                      <li><Link to="/admin/tansaction/sale">Sale Transactions</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><RotateCcw /> Refunds</Link>
                    <ul>
                      <li><Link to="#">Return Refund</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><DollarSign /> Payments</Link>
                    <ul>
                      <li><Link to="/admin/tansaction/supplier">Supplier Payment</Link></li>
                      <li><Link to="/admin/tansaction/seller">Seller Payment</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>



            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Boxes /> Inventory Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Warehouse /> Inventory</Link>
                    <ul>
                      <li><Link to="/admin/inventory/branch">Branchwise Inventory</Link></li>
                      <li><Link to="/admin/inventory/seller">Sellerwise Inventory</Link></li>
                      <li><Link to="/admin/inventory/dead-stock">Manage Products (Across Country)</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
        

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Bell /> Notification Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Inbox /> Notifications</Link>
                    <ul>
                      <li>
                        <Link to="#">Customer Notifications</Link>
                        <ul>
                          <li><Link to="#">Add Notification</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link to="#">Seller Notifications</Link>
                        <ul>
                          <li><Link to="#">Add Notification</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link to="#">Supplier Notifications</Link>
                        <ul>
                          <li><Link to="#">Add Notification</Link></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Ticket /> Ticket Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Inbox /> Tickets</Link>
                    <ul>
                      <li><Link to="/admin/ticket/customer">Customer Tickets</Link></li>
                      <li><Link to="/admin/ticket/seller">Seller Tickets</Link></li>
                      <li><Link to="/admin/ticket/supplier">Suppliers Tickets</Link></li>
                      <li><Link to="/admin/ticket/reply-ticket">Reply Tickets</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Star /> Review Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <details className="group">
                      <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                        <Store /> Merchant Review
                      </summary>
                      <ul className="ml-6">
                        <li><Link to="#">Supplier Review</Link></li>
                        <li><Link to="#">Sellers Review</Link></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details className="group">
                      <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                        <ShoppingBag /> Product Review
                      </summary>
                      <ul className="ml-6">
                        <li><Link to="#">Supplier Product</Link></li>
                        <li><Link to="#">Seller Product</Link></li>
                        <li><Link to="#">Product</Link></li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Users /> Users Management
                </summary>
                <ul className="ml-6">
                  <li><Link to="#">Manage Users</Link></li>
                  <li><Link to="#">Add Users</Link></li>
                </ul>
              </details>
            </li>


            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <DollarSign /> Commission Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Globe /> Gateway Charges</Link>
                    <ul>
                      <li><Link to="#">Manage Shipping Gateway</Link></li>
                      <li><Link to="#">Add Shipping Gateway</Link></li>
                      <li><Link to="#">Manage Payment Gateway</Link></li>
                      <li><Link to="#">Add Payment Gateway</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><FileText /> Commission</Link>
                    <ul>
                      <li><Link to="#">Manage Marketplace Price</Link></li>
                      <li><Link to="#">Manage Aggregator Price</Link></li>
                      <li><Link to="#">Add Commission/Margin</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#"><Tag /> Catalogue Price</Link>
                    <ul>
                      <li><Link to="#">Manage Catalogue Price</Link></li>
                      <li><Link to="#">Add Catalogue Price</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <FileText /> Format Management
                </summary>
                <ul className="ml-6">
                  <li>
                    <Link to="#"><Layers /> Formats</Link>
                    <ul>
                      <li><Link to="#">Invoice Format (Customer)</Link></li>
                      <li><Link to="#">Invoice Format (Supplier)</Link></li>
                      <li><Link to="#">Invoice Format (Seller)</Link></li>
                      <li><Link to="#">Referral Code Formats</Link></li>
                      <li><Link to="#">Notification Formats</Link></li>
                      <li><Link to="#">Credit Note Format</Link></li>
                      <li><Link to="#">Debit Note Format</Link></li>
                      <li><Link to="#">Email Formats</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Tag /> Price Management
                </summary>
            </li>

            <li>
              <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
              <BookOpen />Price Management
                </summary>
            </li>

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <BarChart /> Reports Management
                </summary>
                <ul className="ml-6">
                  <li><Link to="#"><Search /> Search Report</Link>
                    <ul>
                      <li><Link to="#"><TrendingUp /> Maximum Search (Product)</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><ShoppingCart /> Sale Report</Link>
                    <ul>
                      <li><Link to="#"><MapPin /> Locationwise</Link></li>
                      <li><Link to="#"><Users /> Customerwise</Link></li>
                      <li><Link to="#"><Box /> Productwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><XCircle /> Cancelled Report</Link>
                    <ul>
                      <li><Link to="#"><Users /> Customerwise</Link></li>
                      <li><Link to="#"><Box /> Productwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><RotateCcw /> Return Report</Link>
                    <ul>
                      <li><Link to="#"><MapPin /> Locationwise</Link></li>
                      <li><Link to="#"><Users /> Customerwise</Link></li>
                      <li><Link to="#"><Box /> Productwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><RefreshCw /> Replacement Report</Link>
                    <ul>
                      <li><Link to="#"><MapPin /> Locationwise</Link></li>
                      <li><Link to="#"><Users /> Customerwise</Link></li>
                      <li><Link to="#"><Box /> Productwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><Layers /> Inventory Report</Link>
                    <ul>
                      <li><Link to="#"><Home /> Branchwise</Link></li>
                      <li><Link to="#"><Box /> Productwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><ClipboardList /> Purchase Report</Link>
                    <ul>
                      <li><Link to="#"><Truck /> Supplierwise Purchase</Link></li>
                      <li><Link to="#"><Box /> Productwise Purchase</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><Gift /> Referral Code Report</Link>
                    <ul>
                      <li><Link to="#"><CheckCircle /> Referral Code Utilization</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><Tag /> Coupon Code Report</Link>
                    <ul>
                      <li><Link to="#"><CheckCircle /> Coupon Code Utilization</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><DollarSign /> Earning Report</Link>
                    <ul>
                      <li><Link to="#"><Users /> Customerwise</Link></li>
                      <li><Link to="#"><Box /> Productwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><CreditCard /> Payment Report</Link>
                    <ul>
                      <li><Link to="#"><Users /> Customerwise (Received)</Link></li>
                      <li><Link to="#"><Users /> Customerwise (Refund)</Link></li>
                      <li><Link to="#"><Truck /> Supplierwise</Link></li>
                      <li><Link to="#"><Store /> Sellerwise</Link></li>
                      <li><Link to="#"><Package /> B2B Logistic</Link></li>
                      <li><Link to="#"><Truck /> B2C Logistic</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><CreditCard /> Payment Gateway Report</Link>
                    <ul>
                      <li><Link to="#"><Banknote /> Netbanking</Link></li>
                      <li><Link to="#"><CreditCard /> Credit Card</Link></li>
                      <li><Link to="#"><CreditCard /> Debit Card</Link></li>
                      <li><Link to="#"><Smartphone /> UPI</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><Truck /> Shipping Gateway Report</Link>
                    <ul>
                      <li><Link to="#"><CheckCircle /> Delivered - Prepaid</Link></li>
                      <li><Link to="#"><CheckCircle /> Delivered - COD</Link></li>
                      <li><Link to="#"><XCircle /> Undelivered</Link></li>
                      <li><Link to="#"><XCircle /> Cancelled (Before Ship)</Link></li>
                      <li><Link to="#"><RotateCw /> Return Pickup</Link></li>
                    </ul>
                  </li>
                  <li><Link to="#"><FileText /> Tax Report</Link>
                    <ul>
                      <li><Link to="#"><Percent /> Purchase (0% - 28%)</Link></li>
                      <li><Link to="#"><Percent /> Sale (0% - 28%)</Link></li>
                      <li><Link to="#"><Truck /> Supplierwise (0% - 28%)</Link></li>
                      <li><Link to="#"><Store /> Sellerwise (0% - 28%)</Link></li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Server /> API Management
                </summary>
                <ul className="ml-6">
                  <li><Link to="#"><Code /> API's</Link></li>
                  <li><Link to="#"><CreditCard /> Payment Gateway Integrations</Link></li>
                  <li><Link to="#"><Truck /> Shipping Gateway Integrations</Link></li>
                  <li><Link to="#"><Smartphone /> SMS Gateway Integrations</Link></li>
                  <li><Link to="#"><Facebook /> Facebook Pixels Integrations</Link></li>
                  <li><Link to="#"><BarChart /> Google E-commerce Analytics</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                  <Settings /> Settings Management
                </summary>
                <ul className="ml-6">
                  <li><Link to="#"><Home /> Home Page Settings</Link></li>
                  <li><Link to="#"><Globe /> Website Settings</Link></li>
                  <li><Link to="#"><Briefcase /> Business Settings</Link></li>
                </ul>
              </details>
            </li>


            </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;