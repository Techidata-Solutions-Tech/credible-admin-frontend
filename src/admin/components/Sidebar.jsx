import { 
  LayoutDashboard, Users, User, UserCog, CheckCircle, ShoppingBag, Store, 
  PackageCheck, ShoppingCart, RotateCcw, Boxes, Tag, List, Settings, 
  Truck, Wallet, DollarSign, Receipt, Bell, Ticket, MessageSquare, Star, 
  Shield, Briefcase, FileText, File, Globe, BarChart, Database, Terminal, 
  UsersRound, Package, Undo2, Layers, Sliders, ReceiptText, Megaphone, 
  Gift, Shuffle, TrendingUp, Zap, Flame, Speaker, ClipboardList, 
  ClipboardCheck, CreditCard, Repeat, Warehouse, Building, Home, Inbox, 
  BookOpen, Search, MapPin, Box, XCircle, RefreshCw, Banknote, Smartphone, 
  RotateCw, Percent, Server, Code, Facebook, Image, ChevronRight, ChevronDown, Menu, X
} from "lucide-react";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key, e) => {
    if (e) e.stopPropagation();
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-full"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay - Only on mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      <div
        className={`fixed lg:sticky top-0 h-screen transition-all duration-300 ${
          isSidebarOpen ? 'left-0' : '-left-[300px] lg:left-0'
        }`}
      >
        <div className="overflow-x-hidden text-gray-800 h-screen">
          <ul className="menu w-[300px] min-h-screen bg-white shadow-lg">
            {/* Logo Section */}
            <li className="p-1 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="Credible"
                  className="w-8 h-8 text-2xl font-semibold"
                />
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </li>

            {/* Website Setting */}
            <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('websiteSetting', e)}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span>Website Setting</span>
                </div>
                {openMenus['websiteSetting'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['websiteSetting'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('banner', e)}
                    >
                      <span>Banner</span>
                      {openMenus['banner'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['banner'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/dashboard/banner/add-banner" className="block p-2 hover:bg-gray-100">Add banner</Link></li>
                        <li><Link to="/admin/dashboard/banner/table" className="block p-2 hover:bg-gray-100">Banner table</Link></li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('manageSection', e)}
                    >
                      <span>Manage Section</span>
                      {openMenus['manageSection'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['manageSection'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/dashboard/section/manage" className="block p-2 hover:bg-gray-100">Manage Sections</Link></li>
                        <li><Link to="/admin/dashboard/section/create" className="block p-2 hover:bg-gray-100">Create Section</Link></li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('category', e)}
                    >
                      <span>Category</span>
                      {openMenus['category'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['category'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/dashboard/category/popular" className="block p-2 hover:bg-gray-100">Popular category</Link></li>
                        <li><Link to="/admin/dashboard/category/popular-table" className="block p-2 hover:bg-gray-100">Popular category Table</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            {/* Customer Management */}
            <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('customerManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Customer Management</span>
                </div>
                {openMenus['customerManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['customerManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('customers', e)}
                    >
                      <div className="flex items-center gap-2">
                        <UserCog className="w-5 h-5" />
                        <span>Customers</span>
                      </div>
                      {openMenus['customers'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['customers'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/user/personal" className="block p-2 hover:bg-gray-100">Personal User</Link></li>
                        <li><Link to="/admin/user/business" className="block p-2 hover:bg-gray-100">Business User</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
   {/* Approval Management */}
   <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('approvalManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Approval Management</span>
                </div>
                {openMenus['approvalManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['approvalManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('merchantApproval', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5" />
                        <span>Merchant</span>
                      </div>
                      {openMenus['merchantApproval'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['merchantApproval'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/approval/merchent/supplier" className="block p-2 hover:bg-gray-100">Supplier Approval</Link></li>
                        <li><Link to="/admin/approval/merchent/seller" className="block p-2 hover:bg-gray-100">Seller Approval</Link></li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('productApproval', e)}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Product</span>
                      </div>
                      {openMenus['productApproval'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['productApproval'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/approval/product/supplier" className="block p-2 hover:bg-gray-100">Supplier Product</Link></li>
                        <li><Link to="/admin/approval/product/seller" className="block p-2 hover:bg-gray-100">Seller Product</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

  {/* Merchant Management */}
  <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('merchantManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <UsersRound className="w-5 h-5" />
                  <span>Merchant Management</span>
                </div>
                {openMenus['merchantManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['merchantManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('merchants', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5" />
                        <span>Merchants</span>
                      </div>
                      {openMenus['merchants'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['merchants'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/merchent/supplier" className="block p-2 hover:bg-gray-100">Manage Supplier</Link></li>
                        <li><Link to="/admin/merchent/seller" className="block p-2 hover:bg-gray-100">Manage Seller</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
  {/* Order Management */}
  <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('orderManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span>Order Management</span>
                </div>
                {openMenus['orderManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['orderManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('saleOrder', e)}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Sale Order</span>
                      </div>
                      {openMenus['saleOrder'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['saleOrder'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/create-order" className="block p-2 hover:bg-gray-100">Create Order</Link></li>
                        <li><Link to="/admin/orders" className="block p-2 hover:bg-gray-100">My Orders</Link></li>
                        <li><Link to="/admin/orders/branch" className="block p-2 hover:bg-gray-100">Branch Order</Link></li>
                        <li><Link to="/admin/orders/seller" className="block p-2 hover:bg-gray-100">Seller Order</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>


            {/* Return Management */}
            <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('returnManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <Undo2 className="w-5 h-5" />
                  <span>Return Management</span>
                </div>
                {openMenus['returnManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['returnManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('returns', e)}
                    >
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-5 h-5" />
                        <span>Returns</span>
                      </div>
                      {openMenus['returns'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['returns'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/returns" className="block p-2 hover:bg-gray-100">Purchase Returns</Link></li>
                        <li><Link to="/admin/returns/sale-verify" className="block p-2 hover:bg-gray-100">Sale Returns & Verify Returns</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>


            {/* Products Management */}
            <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('productsManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <Boxes className="w-5 h-5" />
                  <span>Products Management</span>
                </div>
                {openMenus['productsManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['productsManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('products', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        <span>Products</span>
                      </div>
                      {openMenus['products'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['products'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/product" className="block p-2 hover:bg-gray-100">Manage Products</Link></li>
                        <li><Link to="/admin/product/add-product" className="block p-2 hover:bg-gray-100">Add Products</Link></li>
                      </ul>
                    )}
                  </li>
                  
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('categories', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        <span>Categories</span>
                      </div>
                      {openMenus['categories'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['categories'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/product/category" className="block p-2 hover:bg-gray-100">Manage Categories</Link></li>
                        <li><Link to="/admin/product/category/add-category" className="block p-2 hover:bg-gray-100">Add Categories</Link></li>
                      </ul>
                    )}
                  </li>
                  
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('attributes', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5" />
                        <span>Attributes</span>
                      </div>
                      {openMenus['attributes'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['attributes'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/product/attributes/" className="block p-2 hover:bg-gray-100">Manage Attributes</Link></li>
                        <li><Link to="/admin/product/attributes/add-attributes" className="block p-2 hover:bg-gray-100">Add Attributes</Link></li>
                      </ul>
                    )}
                  </li>
                  
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('brands', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        <span>Brands</span>
                      </div>
                      {openMenus['brands'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['brands'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/product/brand" className="block p-2 hover:bg-gray-100">Manage Brands</Link></li>
                        <li><Link to="/admin/product/brand/add-brand" className="block p-2 hover:bg-gray-100">Add Brands</Link></li>
                      </ul>
                    )}
                  </li>
                  
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('menu', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        <span>Menu</span>
                      </div>
                      {openMenus['menu'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['menu'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/product/menu" className="block p-2 hover:bg-gray-100">Manage Menu</Link></li>
                        <li><Link to="/admin/product/menu/add-menu" className="block p-2 hover:bg-gray-100">Add Menu</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

                      {/* Tax Management */}
                      <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('taxManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <ReceiptText className="w-5 h-5" />
                  <span>Tax Management</span>
                </div>
                {openMenus['taxManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['taxManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('tax', e)}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span>Tax</span>
                      </div>
                      {openMenus['tax'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['tax'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/taxes/gst-tax" className="block p-2 hover:bg-gray-100">Manage GST/TAX</Link></li>
                        <li><Link to="/admin/taxes/create-gst-tax" className="block p-2 hover:bg-gray-100">Create GST/TAX</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            {/* Media Setting */}
            <li>
              <Link to="/admin/media-setting" className="flex items-center gap-2 p-4 hover:bg-gray-100 font-bold">
                <Image className="w-5 h-5" />
                <span>Media Setting</span>
              </Link>
            </li>

           

       

         

          


            {/* Marketing Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('marketingManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Megaphone className="w-5 h-5" />
      <span>Marketing Management</span>
    </div>
    {openMenus['marketingManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['marketingManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('coupons', e)}
        >
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            <span>Coupons</span>
          </div>
          {openMenus['coupons'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['coupons'] && (
          <ul className="ml-4">
            <li><Link to="/admin/marketing/admin-coupon" className="block p-2 hover:bg-gray-100">Admin Coupons</Link></li>
            <li><Link to="/admin/marketing/create-coupon" className="block p-2 hover:bg-gray-100">Create Coupons</Link></li>
            <li><Link to="/admin/marketing/seller-coupon" className="block p-2 hover:bg-gray-100">Seller Coupons</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('referralCode', e)}
        >
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span>Referral Code</span>
          </div>
          {openMenus['referralCode'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['referralCode'] && (
          <ul className="ml-4">
            <li><Link to="/admin/marketing/referral-coupon" className="block p-2 hover:bg-gray-100">Manage Referral Code</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Create Referral Code</Link></li>
          </ul>
        )}
      </li>
      <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Shuffle className="w-5 h-5" /> Cross Sell</Link></li>
      <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><TrendingUp className="w-5 h-5" /> Upsell</Link></li>
      <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Zap className="w-5 h-5" /> Flash Sale</Link></li>
      <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Flame className="w-5 h-5" /> Hot Deals</Link></li>
      <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Speaker className="w-5 h-5" /> Campaigning</Link></li>
    </ul>
  )}
</li>

{/* Shipping Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('shippingManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Truck className="w-5 h-5" />
      <span>Shipping Management</span>
    </div>
    {openMenus['shippingManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['shippingManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('shipments', e)}
        >
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span>Shipments</span>
          </div>
          {openMenus['shipments'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['shipments'] && (
          <ul className="ml-4">
            <li><Link to="/admin/shipping/inward" className="block p-2 hover:bg-gray-100">Inward Shipment (Purchase)</Link></li>
            <li><Link to="/admin/shipping/outward" className="block p-2 hover:bg-gray-100">Outward Shipment (Sale)</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>

{/* Purchase Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('purchaseManagement', e)}
  >
    <div className="flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      <span>Purchase Management</span>
    </div>
    {openMenus['purchaseManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['purchaseManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('procurement', e)}
        >
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            <span>Procurement</span>
          </div>
          {openMenus['procurement'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['procurement'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Price Comparison</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Restock Alert</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Preferred Supplier</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('purchase', e)}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Purchase</span>
          </div>
          {openMenus['purchase'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['purchase'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Manage Purchase Order</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Create Purchase Order</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('validation', e)}
        >
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5" />
            <span>Validation</span>
          </div>
          {openMenus['validation'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['validation'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Goods Received Note (GRN)</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Invoice Matching</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Debit Note</Link></li>
          </ul>
        )}
      </li>
      <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><BarChart className="w-5 h-5" /> Summary</Link></li>
    </ul>
  )}
</li>

{/* Transaction Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('transactionManagement', e)}
  >
    <div className="flex items-center gap-2">
      <CreditCard className="w-5 h-5" />
      <span>Transaction Management</span>
    </div>
    {openMenus['transactionManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['transactionManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('transactions', e)}
        >
          <div className="flex items-center gap-2">
            <Repeat className="w-5 h-5" />
            <span>Transactions</span>
          </div>
          {openMenus['transactions'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['transactions'] && (
          <ul className="ml-4">
            <li><Link to="/admin/tansaction/purchase" className="block p-2 hover:bg-gray-100">Purchase Transactions</Link></li>
            <li><Link to="/admin/tansaction/sale" className="block p-2 hover:bg-gray-100">Sale Transactions</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('refunds', e)}
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            <span>Refunds</span>
          </div>
          {openMenus['refunds'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['refunds'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Return Refund</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('payments', e)}
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            <span>Payments</span>
          </div>
          {openMenus['payments'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['payments'] && (
          <ul className="ml-4">
            <li><Link to="/admin/tansaction/supplier" className="block p-2 hover:bg-gray-100">Supplier Payment</Link></li>
            <li><Link to="/admin/tansaction/seller" className="block p-2 hover:bg-gray-100">Seller Payment</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>
{/* Inventory Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('inventoryManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Boxes className="w-5 h-5" />
      <span>Inventory Management</span>
    </div>
    {openMenus['inventoryManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['inventoryManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('inventory', e)}
        >
          <div className="flex items-center gap-2">
            <Warehouse className="w-5 h-5" />
            <span>Inventory</span>
          </div>
          {openMenus['inventory'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['inventory'] && (
          <ul className="ml-4">
            <li><Link to="/admin/inventory/branch" className="block p-2 hover:bg-gray-100">Branchwise Inventory</Link></li>
            <li><Link to="/admin/inventory/seller" className="block p-2 hover:bg-gray-100">Sellerwise Inventory</Link></li>
            <li><Link to="/admin/inventory/dead-stock" className="block p-2 hover:bg-gray-100">Manage Products (Across Country)</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>
     {/* Warehouse Management */}
     <li>
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu('warehouseManagement', e)}
              >
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span>Warehouse Management</span>
                </div>
                {openMenus['warehouseManagement'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['warehouseManagement'] && (
                <ul className="ml-6">
                  <li>
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu('warehouse', e)}
                    >
                      <div className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        <span>Branch</span>
                      </div>
                      {openMenus['warehouse'] ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>
                    {openMenus['warehouse'] && (
                      <ul className="ml-4">
                        <li><Link to="/admin/warehouse/table" className="block p-2 hover:bg-gray-100">Manage Branch</Link></li>
                        <li><Link to="/admin/warehouse/create" className="block p-2 hover:bg-gray-100">Create Branch</Link></li>
                        <li><Link to="/admin/warehouse/manage-sale-returns" className="block p-2 hover:bg-gray-100">Manage Sale Returns</Link></li>
                        <li><Link to="/admin/warehouse/verification" className="block p-2 hover:bg-gray-100">Verification</Link></li>
                        <li><Link to="/admin/warehouse/sales-orders" className="block p-2 hover:bg-gray-100">Sales Orders</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
{/* Notification Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('notificationManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Bell className="w-5 h-5" />
      <span>Notification Management</span>
    </div>
    {openMenus['notificationManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['notificationManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('notifications', e)}
        >
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5" />
            <span>Notifications</span>
          </div>
          {openMenus['notifications'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['notifications'] && (
          <ul className="ml-4">
            <li>
              <div 
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                onClick={(e) => toggleMenu('customerNotifications', e)}
              >
                <span>Customer Notifications</span>
                {openMenus['customerNotifications'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['customerNotifications'] && (
                <ul className="ml-4">
                  <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Notification</Link></li>
                </ul>
              )}
            </li>
            <li>
              <div 
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                onClick={(e) => toggleMenu('sellerNotifications', e)}
              >
                <span>Seller Notifications</span>
                {openMenus['sellerNotifications'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['sellerNotifications'] && (
                <ul className="ml-4">
                  <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Notification</Link></li>
                </ul>
              )}
            </li>
            <li>
              <div 
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                onClick={(e) => toggleMenu('supplierNotifications', e)}
              >
                <span>Supplier Notifications</span>
                {openMenus['supplierNotifications'] ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
              {openMenus['supplierNotifications'] && (
                <ul className="ml-4">
                  <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Notification</Link></li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>

{/* Ticket Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('ticketManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Ticket className="w-5 h-5" />
      <span>Ticket Management</span>
    </div>
    {openMenus['ticketManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['ticketManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('tickets', e)}
        >
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5" />
            <span>Tickets</span>
          </div>
          {openMenus['tickets'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['tickets'] && (
          <ul className="ml-4">
            <li><Link to="/admin/ticket/customer" className="block p-2 hover:bg-gray-100">Customer Tickets</Link></li>
            <li><Link to="/admin/ticket/seller" className="block p-2 hover:bg-gray-100">Seller Tickets</Link></li>
            <li><Link to="/admin/ticket/supplier" className="block p-2 hover:bg-gray-100">Suppliers Tickets</Link></li>
            <li><Link to="/admin/ticket/reply-ticket" className="block p-2 hover:bg-gray-100">Reply Tickets</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>

{/* Review Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('reviewManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Star className="w-5 h-5" />
      <span>Review Management</span>
    </div>
    {openMenus['reviewManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['reviewManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('merchantReview', e)}
        >
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            <span>Merchant Review</span>
          </div>
          {openMenus['merchantReview'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['merchantReview'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Supplier Review</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Sellers Review</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('productReview', e)}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Product Review</span>
          </div>
          {openMenus['productReview'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['productReview'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Supplier Product</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Seller Product</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Product</Link></li>
          </ul>
        )}
      </li>

    </ul>
  )}
</li>
{/* Users Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('usersManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Users className="w-5 h-5" />
      <span>Users Management</span>
    </div>
    {openMenus['usersManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['usersManagement'] && (
    <ul className="ml-6">
      <li><Link to="/admin/users/manage" className="block p-2 hover:bg-gray-100">Manage Users</Link></li>
      <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Users</Link></li>
    </ul>
  )}
</li>

{/* Commission Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('commissionManagement', e)}
  >
    <div className="flex items-center gap-2">
      <DollarSign className="w-5 h-5" />
      <span>Commission Management</span>
    </div>
    {openMenus['commissionManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['commissionManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('gatewayCharges', e)}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>Gateway Charges</span>
          </div>
          {openMenus['gatewayCharges'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['gatewayCharges'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Manage Shipping Gateway</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Shipping Gateway</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Manage Payment Gateway</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Payment Gateway</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('commission', e)}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Commission</span>
          </div>
          {openMenus['commission'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['commission'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Manage Marketplace Price</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Manage Aggregator Price</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Commission/Margin</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('cataloguePrice', e)}
        >
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            <span>Catalogue Price</span>
          </div>
          {openMenus['cataloguePrice'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['cataloguePrice'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Manage Catalogue Price</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Add Catalogue Price</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>

{/* Format Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('formatManagement', e)}
  >
    <div className="flex items-center gap-2">
      <FileText className="w-5 h-5" />
      <span>Format Management</span>
    </div>
    {openMenus['formatManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['formatManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('formats', e)}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>Formats</span>
          </div>
          {openMenus['formats'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['formats'] && (
          <ul className="ml-4">
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Invoice Format (Customer)</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Invoice Format (Supplier)</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Invoice Format (Seller)</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Referral Code Formats</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Notification Formats</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Credit Note Format</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Debit Note Format</Link></li>
            <li><Link to="#" className="block p-2 hover:bg-gray-100">Email Formats</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>

{/* Price Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('priceManagement', e)}
  >
    <div className="flex items-center gap-2">
      <Tag className="w-5 h-5" />
      <span>Price Management</span>
    </div>
    {openMenus['priceManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
</li>

{/* Price Management (with BookOpen icon) */}
{/* <li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('priceManagementAlt', e)}
  >
    <div className="flex items-center gap-2">
      <BookOpen className="w-5 h-5" />
      <span>Price Management</span>
    </div>
    {openMenus['priceManagementAlt'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
</li> */}

{/* Reports Management */}
<li>
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
    onClick={(e) => toggleMenu('reportsManagement', e)}
  >
    <div className="flex items-center gap-2">
      <BarChart className="w-5 h-5" />
      <span>Reports Management</span>
    </div>
    {openMenus['reportsManagement'] ? 
      <ChevronDown className="w-5 h-5" /> : 
      <ChevronRight className="w-5 h-5" />
    }
  </div>
  {openMenus['reportsManagement'] && (
    <ul className="ml-6">
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('searchReport', e)}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span>Search Report</span>
          </div>
          {openMenus['searchReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['searchReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><TrendingUp className="w-5 h-5" /> Maximum Search (Product)</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('saleReport', e)}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Sale Report</span>
          </div>
          {openMenus['saleReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['saleReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><MapPin className="w-5 h-5" /> Locationwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('cancelledReport', e)}
        >
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            <span>Cancelled Report</span>
          </div>
          {openMenus['cancelledReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['cancelledReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('returnReport', e)}
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            <span>Return Report</span>
          </div>
          {openMenus['returnReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['returnReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><MapPin className="w-5 h-5" /> Locationwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('replacementReport', e)}
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            <span>Replacement Report</span>
          </div>
          {openMenus['replacementReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['replacementReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><MapPin className="w-5 h-5" /> Locationwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('inventoryReport', e)}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>Inventory Report</span>
          </div>
          {openMenus['inventoryReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['inventoryReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Home className="w-5 h-5" /> Branchwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('purchaseReport', e)}
        >
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            <span>Purchase Report</span>
          </div>
          {openMenus['purchaseReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['purchaseReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Truck className="w-5 h-5" /> Supplierwise Purchase</Link></li>
{/* Purchase Report (continued) */}
<li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise Purchase</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('referralCodeReport', e)}
        >
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span>Referral Code Report</span>
          </div>
          {openMenus['referralCodeReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['referralCodeReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CheckCircle className="w-5 h-5" /> Referral Code Utilization</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('couponCodeReport', e)}
        >
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            <span>Coupon Code Report</span>
          </div>
          {openMenus['couponCodeReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['couponCodeReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CheckCircle className="w-5 h-5" /> Coupon Code Utilization</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('earningReport', e)}
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            <span>Earning Report</span>
          </div>
          {openMenus['earningReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['earningReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Box className="w-5 h-5" /> Productwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('paymentReport', e)}
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Report</span>
          </div>
          {openMenus['paymentReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['paymentReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise (Received)</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Users className="w-5 h-5" /> Customerwise (Refund)</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Truck className="w-5 h-5" /> Supplierwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Package className="w-5 h-5" /> B2B Logistic</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Truck className="w-5 h-5" /> B2C Logistic</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('paymentGatewayReport', e)}
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Gateway Report</span>
          </div>
          {openMenus['paymentGatewayReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['paymentGatewayReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Banknote className="w-5 h-5" /> Netbanking</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CreditCard className="w-5 h-5" /> Credit Card</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CreditCard className="w-5 h-5" /> Debit Card</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Smartphone className="w-5 h-5" /> UPI</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('shippingGatewayReport', e)}
        >
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            <span>Shipping Gateway Report</span>
          </div>
          {openMenus['shippingGatewayReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['shippingGatewayReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CheckCircle className="w-5 h-5" /> Delivered - Prepaid</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CheckCircle className="w-5 h-5" /> Delivered - COD</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><XCircle className="w-5 h-5" /> Undelivered</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><XCircle className="w-5 h-5" /> Cancelled (Before Ship)</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><RotateCw className="w-5 h-5" /> Return Pickup</Link></li>
          </ul>
        )}
      </li>
      <li>
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          onClick={(e) => toggleMenu('taxReport', e)}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Tax Report</span>
          </div>
          {openMenus['taxReport'] ? 
            <ChevronDown className="w-5 h-5" /> : 
            <ChevronRight className="w-5 h-5" />
          }
        </div>
        {openMenus['taxReport'] && (
          <ul className="ml-4">
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Percent className="w-5 h-5" /> Purchase (0% - 28%)</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Percent className="w-5 h-5" /> Sale (0% - 28%)</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Truck className="w-5 h-5" /> Supplierwise (0% - 28%)</Link></li>
            <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Store className="w-5 h-5" /> Sellerwise (0% - 28%)</Link></li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>
<li> <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold" onClick={(e) => toggleMenu('apiManagement', e)} > <div className="flex items-center gap-2"> <Server className="w-5 h-5" /> <span>API Management</span> </div> {openMenus['apiManagement'] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" /> } </div> {openMenus['apiManagement'] && ( <ul className="ml-6"> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Code className="w-5 h-5" /> API's</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><CreditCard className="w-5 h-5" /> Payment Gateway Integrations</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Truck className="w-5 h-5" /> Shipping Gateway Integrations</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Smartphone className="w-5 h-5" /> SMS Gateway Integrations</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Facebook className="w-5 h-5" /> Facebook Pixels Integrations</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><BarChart className="w-5 h-5" /> Google E-commerce Analytics</Link></li> </ul> )} </li>
{/* Settings Management */}

<li> <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold" onClick={(e) => toggleMenu('settingsManagement', e)} > <div className="flex items-center gap-2"> <Settings className="w-5 h-5" /> <span>Settings Management</span> </div> {openMenus['settingsManagement'] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" /> } </div> {openMenus['settingsManagement'] && ( <ul className="ml-6"> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Home className="w-5 h-5" /> Home Page Settings</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Globe className="w-5 h-5" /> Website Settings</Link></li> <li><Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-100"><Briefcase className="w-5 h-5" /> Business Settings</Link></li> </ul> )} </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
