import React from "react";
import AddProductForm from "../../components/product/AddProductForm";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
  const location = useLocation();

  const isAdmin = location.pathname.includes("admin");
  const isSupplier = location.pathname.includes("supplier");
  const breadcrumbItems = [
    { label: "Product Management", href: "#" },
    { label: "Products", href: "#" },
    {
      label: "Add Product",
      href: `/${
        isAdmin ? "/admin" : isSupplier ? "/supplier" : ""
      }/add-product`,
    },
  ];
  return (
        <div className="py-2 px-4 bg-white">
          <Breadcrumbs pageTitle="Add Product" items={breadcrumbItems} />
          <div className="rounded">
            <AddProductForm />
          </div>
        </div>
  );
};

export default AddProduct;
