import { createContext } from "react";
import { useState } from "react"

export const SupplierDataContext = createContext();

const SupplierContext = ({children}) => {
    const [supplier,  setSupplier] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateSupplier = (supplierData)=>{
        setSupplier(supplierData)
    }
    const value = {
        supplier,
        setSupplier,
        isLoading,
        setIsLoading,
        error,setError,
        updateSupplier
    };
  return (
   <SupplierDataContext.Provider value={value}>
    {children}
   </SupplierDataContext.Provider>
  );
}

export default SupplierContext