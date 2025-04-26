import {
  LayoutDashboard,
  Users,
  User,
  UserCog,
  CheckCircle,
  ShoppingBag,
  Store,
  PackageCheck,
  ShoppingCart,
  RotateCcw,
  Boxes,
  Tag,
  List,
  Settings,
  Truck,
  Wallet,
  DollarSign,
  Receipt,
  Bell,
  Ticket,
  MessageSquare,
  Star,
  Shield,
  Briefcase,
  FileText,
  File,
  Globe,
  BarChart,
  Database,
  Terminal,
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
  Image,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key, e) => {
    if (e) e.stopPropagation();
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
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
          isSidebarOpen ? "left-0" : "-left-[300px] lg:left-0"
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
            {/* <li>
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
                        <li><Link to="/supplier/dashboard/banner/add-banner" className="block p-2 hover:bg-gray-100">Add banner</Link></li>
                        <li><Link to="/supplier/dashboard/banner/table" className="block p-2 hover:bg-gray-100">Banner table</Link></li>
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
                        <li><Link to="/supplier/dashboard/section/manage" className="block p-2 hover:bg-gray-100">Manage Sections</Link></li>
                        <li><Link to="/supplier/dashboard/section/create" className="block p-2 hover:bg-gray-100">Create Section</Link></li>
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
                        <li><Link to="/supplier/dashboard/category/popular" className="block p-2 hover:bg-gray-100">Popular category</Link></li>
                        <li><Link to="/supplier/dashboard/category/popular-table" className="block p-2 hover:bg-gray-100">Popular category Table</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li> */}

            {/* Customer Management */}
            {/* <li>
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
                        <li><Link to="/supplier/user/personal" className="block p-2 hover:bg-gray-100">Personal User</Link></li>
                        <li><Link to="/supplier/user/business" className="block p-2 hover:bg-gray-100">Business User</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li> */}
            {/* Approval Management */}
            <li>
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu("approvalManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Approval Management</span>
                </div>
                {openMenus["approvalManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["approvalManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("merchantApproval", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5" />
                        <span>Merchant</span>
                      </div>
                      {openMenus["merchantApproval"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["merchantApproval"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/approval/merchent/supplier"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Supplier Approval
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/approval/merchent/seller"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Seller Approval
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("productApproval", e)}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Product</span>
                      </div>
                      {openMenus["productApproval"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["productApproval"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/approval/product/supplier"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Supplier Product
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/approval/product/seller"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Seller Product
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
{/* Account Detail Management */}
<li>
<div 
  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
  onClick={(e) => toggleMenu('accountDetailManagement', e)}
>
  <div className="flex items-center gap-2">
    <Package className="w-5 h-5" />
    <span>Account Management</span>
  </div>
  {openMenus['accountDetailManagement'] ? 
    <ChevronDown className="w-5 h-5" /> : 
    <ChevronRight className="w-5 h-5" />
  }
</div>
{openMenus['accountDetailManagement'] && (
  <ul className="ml-6">
    <li>
      <div 
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
        onClick={(e) => toggleMenu('accountDetail', e)}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Account Detail</span>
        </div>
        {openMenus['accountDetail'] ? 
          <ChevronDown className="w-5 h-5" /> : 
          <ChevronRight className="w-5 h-5" />
        }
      </div>
      {openMenus['accountDetail'] && (
        <ul className="ml-4">
          <li><Link to="/supplier/account-details" className="block p-2 hover:bg-gray-100">Account Detail Form</Link></li>
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
                onClick={(e) => toggleMenu("merchantManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <UsersRound className="w-5 h-5" />
                  <span>Merchant Management</span>
                </div>
                {openMenus["merchantManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["merchantManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("merchants", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5" />
                        <span>Merchants</span>
                      </div>
                      {openMenus["merchants"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["merchants"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/merchent/supplier"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Supplier
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/merchent/seller"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Seller
                          </Link>
                        </li>
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
                onClick={(e) => toggleMenu("orderManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span>Order Management</span>
                </div>
                {openMenus["orderManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["orderManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("saleOrder", e)}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Orders</span>
                      </div>
                      {openMenus["saleOrder"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["saleOrder"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/order"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/orders/branch"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Branch Order
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/orders/seller"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Seller Order
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            {/* Debit Note Management*/}
            <li>
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu("validationManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span>Validation Management</span>
                </div>
                {openMenus["validationManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["validationManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("debitNote", e)}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Validations</span>
                      </div>
                      {openMenus["debitNote"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["debitNote"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/debit-note"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Debit Notes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/manage-goods-received-note"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Goods Received Note(GRN)
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/manage-invoice-matching"
                            className="block p-2 hover:bg-gray-100"
                          >
                           Manage Invoice Matching
                          </Link>
                        </li>
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
                onClick={(e) => toggleMenu("returnManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Undo2 className="w-5 h-5" />
                  <span>Return Management</span>
                </div>
                {openMenus["returnManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["returnManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("returns", e)}
                    >
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-5 h-5" />
                        <span>Returns</span>
                      </div>
                      {openMenus["returns"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["returns"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/returns"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Returns
                          </Link>
                        </li>
                     
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
                onClick={(e) => toggleMenu("productsManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Boxes className="w-5 h-5" />
                  <span>Products Management</span>
                </div>
                {openMenus["productsManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["productsManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("products", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        <span>Products</span>
                      </div>
                      {openMenus["products"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["products"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/product"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/product/add-product"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Add Products
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("categories", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        <span>Categories</span>
                      </div>
                      {openMenus["categories"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["categories"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/product/category"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/product/category/add-category"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Add Categories
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("attributes", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5" />
                        <span>Attributes</span>
                      </div>
                      {openMenus["attributes"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["attributes"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/product/attributes/"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Attributes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/product/attributes/add-attributes"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Add Attributes
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("brands", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        <span>Brands</span>
                      </div>
                      {openMenus["brands"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["brands"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/product/brand"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Brands
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/product/brand/add-brand"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Add Brands
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("menu", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        <span>Menu</span>
                      </div>
                      {openMenus["menu"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["menu"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/product/menu"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Menu
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/product/menu/add-menu"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Add Menu
                          </Link>
                        </li>
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
                onClick={(e) => toggleMenu("taxManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <ReceiptText className="w-5 h-5" />
                  <span>Tax Management</span>
                </div>
                {openMenus["taxManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["taxManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("tax", e)}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span>Tax</span>
                      </div>
                      {openMenus["tax"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["tax"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/tax"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Taxes
                          </Link>
                        </li>
                        {/* <li><Link to="/supplier/taxes/hsn-sac" className="block p-2 hover:bg-gray-100">Manage HSN/SAC</Link></li> */}
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            {/* Marketing Management */}
            {/* <li>
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu("marketingManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  <span>Marketing Management</span>
                </div>
                {openMenus["marketingManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["marketingManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("coupons", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5" />
                        <span>Coupons</span>
                      </div>
                      {openMenus["coupons"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["coupons"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/marketing/supplier-coupon"
                            className="block p-2 hover:bg-gray-100"
                          >
                            supplier Coupons
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/marketing/create-coupon"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Create Coupons
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/marketing/seller-coupon"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Seller Coupons
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("referralCode", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        <span>Referral Code</span>
                      </div>
                      {openMenus["referralCode"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["referralCode"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/marketing/referral-coupon"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Referral Code
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Create Referral Code
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <Shuffle className="w-5 h-5" /> Cross Sell
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <TrendingUp className="w-5 h-5" /> Upsell
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <Zap className="w-5 h-5" /> Flash Sale
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <Flame className="w-5 h-5" /> Hot Deals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <Speaker className="w-5 h-5" /> Campaigning
                    </Link>
                  </li>
                </ul>
              )}
            </li> */}

            {/* Shipping Management */}
            <li>
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu("shippingManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>Shipping Management</span>
                </div>
                {openMenus["shippingManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["shippingManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("shipments", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        <span>Shipments</span>
                      </div>
                      {openMenus["shipments"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["shipments"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/shipping"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Shipments
                          </Link>
                        </li>
                       
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
                onClick={(e) => toggleMenu("purchaseManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Purchase Management</span>
                </div>
                {openMenus["purchaseManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["purchaseManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("procurement", e)}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" />
                        <span>Procurement</span>
                      </div>
                      {openMenus["procurement"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["procurement"] && (
                      <ul className="ml-4">
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Price Comparison
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Restock Alert
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Preferred Supplier
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("purchase", e)}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span>Purchase</span>
                      </div>
                      {openMenus["purchase"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["purchase"] && (
                      <ul className="ml-4">
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Manage Purchase Order
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Create Purchase Order
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("validation", e)}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="w-5 h-5" />
                        <span>Validation</span>
                      </div>
                      {openMenus["validation"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["validation"] && (
                      <ul className="ml-4">
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Goods Received Note (GRN)
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Invoice Matching
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Debit Note
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <BarChart className="w-5 h-5" /> Summary
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Transaction Management */}
            <li>
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 font-bold"
                onClick={(e) => toggleMenu("transactionManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Transaction Management</span>
                </div>
                {openMenus["transactionManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["transactionManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("transactions", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Repeat className="w-5 h-5" />
                        <span>Transactions</span>
                      </div>
                      {openMenus["transactions"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["transactions"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/transaction"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Purchase Transactions
                          </Link>
                        </li>
                       
                      </ul>
                    )}
                  </li>
                  {/* <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("refunds", e)}
                    >
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-5 h-5" />
                        <span>Refunds</span>
                      </div>
                      {openMenus["refunds"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["refunds"] && (
                      <ul className="ml-4">
                        <li>
                          <Link to="#" className="block p-2 hover:bg-gray-100">
                            Return Refund
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li> */}
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("payments", e)}
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <span>Payments</span>
                      </div>
                      {openMenus["payments"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["payments"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/payment"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Supplier Payment
                          </Link>
                        </li>
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
                onClick={(e) => toggleMenu("inventoryManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Boxes className="w-5 h-5" />
                  <span>Inventory Management</span>
                </div>
                {openMenus["inventoryManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["inventoryManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("inventory", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Warehouse className="w-5 h-5" />
                        <span>Inventory</span>
                      </div>
                      {openMenus["inventory"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["inventory"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/inventory"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Inventory Management
                          </Link>
                        </li>
                       
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
                onClick={(e) => toggleMenu("warehouseManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span>Warehouse Management</span>
                </div>
                {openMenus["warehouseManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["warehouseManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("warehouse", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        <span>Branch</span>
                      </div>
                      {openMenus["warehouse"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["warehouse"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/warehouse/table"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Branch
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/supplier/warehouse/create"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Create Branch
                          </Link>
                        </li>
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
                onClick={(e) => toggleMenu("notificationManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Management</span>
                </div>
                {openMenus["notificationManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["notificationManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("notifications", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Inbox className="w-5 h-5" />
                        <span>Notifications</span>
                      </div>
                      {openMenus["notifications"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["notifications"] && (
                      <ul className="ml-4">
                        <li>
                          <div
                            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                            onClick={(e) =>
                              toggleMenu("customerNotifications", e)
                            }
                          >
                            <span>Customer Notifications</span>
                            {openMenus["customerNotifications"] ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </div>
                          {openMenus["customerNotifications"] && (
                            <ul className="ml-4">
                              <li>
                                <Link
                                  to="#"
                                  className="block p-2 hover:bg-gray-100"
                                >
                                  Add Notification
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                        <li>
                          <div
                            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                            onClick={(e) =>
                              toggleMenu("sellerNotifications", e)
                            }
                          >
                            <span>Seller Notifications</span>
                            {openMenus["sellerNotifications"] ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </div>
                          {openMenus["sellerNotifications"] && (
                            <ul className="ml-4">
                              <li>
                                <Link
                                  to="#"
                                  className="block p-2 hover:bg-gray-100"
                                >
                                  Add Notification
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                        <li>
                          <div
                            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                            onClick={(e) =>
                              toggleMenu("supplierNotifications", e)
                            }
                          >
                            <span>Supplier Notifications</span>
                            {openMenus["supplierNotifications"] ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </div>
                          {openMenus["supplierNotifications"] && (
                            <ul className="ml-4">
                              <li>
                                <Link
                                  to="#"
                                  className="block p-2 hover:bg-gray-100"
                                >
                                  Add Notification
                                </Link>
                              </li>
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
                onClick={(e) => toggleMenu("ticketManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  <span>Ticket Management</span>
                </div>
                {openMenus["ticketManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["ticketManagement"] && (
                <ul className="ml-6">
                  <li>
                    <div
                      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => toggleMenu("tickets", e)}
                    >
                      <div className="flex items-center gap-2">
                        <Inbox className="w-5 h-5" />
                        <span>Tickets</span>
                      </div>
                      {openMenus["tickets"] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                    {openMenus["tickets"] && (
                      <ul className="ml-4">
                        <li>
                          <Link
                            to="/supplier/ticket"
                            className="block p-2 hover:bg-gray-100"
                          >
                            Manage Tickets
                          </Link>
                        </li>
                        {/* <li><Link to="/supplier/ticket/seller" className="block p-2 hover:bg-gray-100">Seller Tickets</Link></li>
            <li><Link to="/supplier/ticket/supplier" className="block p-2 hover:bg-gray-100">Suppliers Tickets</Link></li>
            <li><Link to="/supplier/ticket/reply-ticket" className="block p-2 hover:bg-gray-100">Reply Tickets</Link></li> */}
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
                onClick={(e) => toggleMenu("usersManagement", e)}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Users Management</span>
                </div>
                {openMenus["usersManagement"] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {openMenus["usersManagement"] && (
                <ul className="ml-6">
                  <li>
                    <Link
                      to="/supplier/users/manage"
                      className="block p-2 hover:bg-gray-100"
                    >
                      Manage Users
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block p-2 hover:bg-gray-100">
                      Add Users
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
