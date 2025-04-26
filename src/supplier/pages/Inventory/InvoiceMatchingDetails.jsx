import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InvoiceMatchingDetails() {
  const { id } = useParams(); 
  const [productData, setProductData] = useState([]);
  
  useEffect(() => {
    const fetchData = () => {
 
      const mockData = [
        { 
          id: 1,
          date: '01-01-2025',
          productName: 'Ghee',
          company: '10 / PC',
          model: '100000',
          variant: '100000',
          sku: '100000',
          unitPrice: '10-00',
          invQty: '100',
          invValue: '1000',
          damage: '-',
          defective: '-',
          shortage: '10',
          deductionQty: '10',
          deductionAmt: '100',
          netQty: '90',
          netAmt: '900'
        },
        {
          id: 2,
          date: '01-01-2025',
          productName: 'Ghee',
          company: '10 (PC)',
          model: '50000',
          variant: '50000',
          sku: '50000',
          unitPrice: '20-00',
          invQty: '200',
          invValue: '2000',
          damage: '50000',
          defective: '60000',
          shortage: '70000',
          deductionQty: '20',
          deductionAmt: '200',
          netQty: '50000',
          netAmt: '50000'
        },
        {
          id: 3,
          date: '01-01-2025',
          productName: 'Apple',
          company: '20 - KG',
          model: '75000',
          variant: '75000',
          sku: '75000',
          unitPrice: '30-00',
          invQty: '300',
          invValue: '3000',
          damage: '75000',
          defective: '75000',
          shortage: '75000',
          deductionQty: '30',
          deductionAmt: '300',
          netQty: '75000',
          netAmt: '75000'
        }
      ];
      
      setProductData(mockData);
    };
    
    fetchData();
  }, [id]);
  
  const totals = {
    invQty: productData.reduce((sum, item) => sum + parseInt(item.invQty || 0), 0),
    deductionQty: productData.reduce((sum, item) => sum + parseInt(item.deductionQty || 0), 0),
    deductionAmt: productData.reduce((sum, item) => sum + parseInt(item.deductionAmt || 0), 0),
    netQty: productData.reduce((sum, item) => {
      const num = isNaN(parseInt(item.netQty)) ? 0 : parseInt(item.netQty);
      return sum + num;
    }, 0),
    netAmt: productData.reduce((sum, item) => {
      const num = isNaN(parseInt(item.netAmt)) ? 0 : parseInt(item.netAmt);
      return sum + num;
    }, 0)
  };
  
  return (
    <div className="container">
      <h2>14. Validation Management - Manage Invoice Matching</h2>
      
      <div className="invoice-matching-section">
        <div className="section-header">
          <span className="section-title">Invoice Matching</span>
        </div>
        

        <div className="flex justify-between items-center">
        <div className="">Purchase Order No: 24
          </div>
          
          <div className="">
           Warehouse Id: 20
          </div>
        
      </div>
      <div className=' overflow-auto'>
      <table className="product-table">
        <thead>
            <tr className="group-header bg-sky-500 text-white text-sm text-center">
                <th rowSpan="2" className="text-center border px-2 py-1 border-black min-w-[110px]">Date</th>
                <th rowSpan="2" className="text-center border px-2 py-1 border-black">Product Name</th>
                <th rowSpan="2" className="text-center border px-2 py-1 border-black">Company/Brand</th>
                <th colSpan="3" className="text-center border px-2 py-1 border-black">Product</th>
                <th colSpan="3" className="text-center border px-2 py-1 border-black">Inward</th>
                <th colSpan="3" className="text-center border px-2 py-1 border-black">Goods Status</th>
                <th colSpan="2" className="text-center border px-2 py-1 border-black">Deduction</th>
                <th colSpan="2" className="text-center border px-2 py-1 border-black">Net Payable</th>
            </tr>
            <tr className="sub-header bg-sky-300 text-black text-sm text-center">
                <th className="border px-2 py-1 border-black">Model</th>
                <th className="border px-2 py-1 border-black">Varient</th>
                <th className="border px-2 py-1 border-black">SKU</th>
                <th className="border px-2 py-1 border-black">Unit Price</th>
                <th className="border px-2 py-1 border-black">Inv. Qty</th>
                <th className="border px-2 py-1 border-black">Inv Value</th>
                <th className="border px-2 py-1 border-black">Damage</th>
                <th className="border px-2 py-1 border-black">Defective</th>
                <th className="border px-2 py-1 border-black">Shortage</th>
                <th className="border px-2 py-1 border-black">Qty</th>
                <th className="border px-2 py-1 border-black">Amt</th>
                <th className="border px-2 py-1 border-black">Net Qty</th>
                <th className="border px-2 py-1 border-black">Net Amt</th>
            </tr>
        </thead>

          <tbody>
            {productData.map((product, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 border-black">{product.date}</td>
                <td className="border px-2 py-1 border-black">{product.productName}</td>
                <td className="border px-2 py-1 border-black">{product.company}</td>
                <td className="border px-2 py-1 border-black">{product.model}</td>
                <td className="border px-2 py-1 border-black">{product.variant}</td>
                <td className="border px-2 py-1 border-black">{product.sku}</td>
                <td className="border px-2 py-1 border-black">{product.unitPrice}</td>
                <td className="border px-2 py-1 border-black">{product.invQty}</td>
                <td className="border px-2 py-1 border-black">{product.invValue}</td>
                <td className="border px-2 py-1 border-black">{product.damage}</td>
                <td className="border px-2 py-1 border-black">{product.defective}</td>
                <td className="border px-2 py-1 border-black">{product.shortage}</td>
                <td className="border px-2 py-1 border-black">{product.deductionQty}</td>
                <td className="border px-2 py-1 border-black">{product.deductionAmt}</td>
                <td className="border px-2 py-1 border-black">{product.netQty}</td>
                <td className="border px-2 py-1 border-black">{product.netAmt}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td className="border px-2 py-1 border-black" colSpan="7">Total</td>
              <td className="border px-2 py-1 border-black">{totals.invQty}</td>
              <td className="border px-2 py-1 border-black">{productData.reduce((sum, item) => sum + parseInt(item.invValue || 0), 0)}</td>
              <td colSpan="3">-</td>
              <td className="border px-2 py-1 border-black">{totals.deductionQty}</td>
              <td className="border px-2 py-1 border-black">{totals.deductionAmt}</td>
              <td className="border px-2 py-1 border-black">{totals.netQty}</td>
              <td className="border px-2 py-1 border-black">{totals.netAmt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default InvoiceMatchingDetails;
