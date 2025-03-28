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
const ProductVariant = () => {
    const {id} = useParams();
    const [toggle, setToggle] = useState(Date.now());
    const handleAdd = async () => {
        document.getElementById('add_variant').showModal()
      }
      const [variants, setVariants] = useState([]);
      useEffect(() => {
         const fetchVariants = async () => {
           try {
             const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/product-variant-list/${id}`);
             const result = await response.json();
             setVariants(result.data);
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
            <Link to={`/admin/product/add-variant/${id}`} className="btn btn-info">Add Variant</Link>
            <VariantTable variants={variants} setToggle={setToggle}/>

        </div>
        </div> 
        <div className='z-50'>
        <ToastContainer />
        </div>
        </div>
  )
}

export default ProductVariant