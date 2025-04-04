import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import TaxTable from '../../components/tax/TaxTable'
import PillTabs from '../../components/PillTabs'
import VariantTable from '../../components/variant/VariantTable'
import AddVariantModal from '../../components/variant/AddVariantModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from '../../components/Breadcrumbs'
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Product Variants', href: '/admin/products' }
];

const ProductVariant = () => {
  const token = localStorage.getItem("token");
    const {id} = useParams();
    const [toggle, setToggle] = useState(Date.now());
    const handleAdd = async () => {
        document.getElementById('add_variant').showModal()
      }
      const [variants, setVariants] = useState([]);
      useEffect(() => {
         const fetchVariants = async () => {
           try {
             const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/variant/${id}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
             });
             const result = await response.json();
             setVariants(result.data);

             console.log(result);
             
           } catch (error) {
             console.error("Error fetching categories:", error);
           }
         };
     
         fetchVariants();
       }, [toggle]);
  return (
        <div className=''>
            <Navbar/>
            <div className='flex bg-gray-100'>
            <Sidebar/>
            <div className=' rounded shadow-lg p-4 w-screen m-2 bg-white'>
            <Breadcrumbs
              pageTitle="Product Variants"
              items={breadcrumbItems}
            />
            <Link to={`/admin/product/add-variant/${id}`} className="btn btn-info">Add Variant</Link>
            <VariantTable variants={variants} setToggle={setToggle} token={token}/>

        </div>
        </div> 
        <div className='z-50'>
        <ToastContainer  autoClose={3000} closeButton={true}/>
        </div>
        </div>
  )
}

export default ProductVariant