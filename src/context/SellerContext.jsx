import { createContext } from "react";
import { useState } from "react"

export const SellerDataContext = createContext();

const SellerContext = ({children}) => {
    const [seller,  setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateSeller = (sellerData)=>{
        setSeller(sellerData)
    }
    const value = {
        seller,
        setSeller,
        isLoading,
        setIsLoading,
        error,setError,
        updateSeller
    };
  return (
   <SellerDataContext.Provider value={value}>
    {children}
   </SellerDataContext.Provider>
  );
}

export default SellerContext