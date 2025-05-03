import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const alertData = [
  { id: '01', product: 'Pickle', model: 'Mango', variant: '500 GM', uom: 'GM', warehouses: 10 },
  { id: '02', product: 'Pickle', model: 'Ginger', variant: '01 KG', uom: 'KG', warehouses: 5 },
];



 const AlertList = () =>{ 
    const breadcrumbItems = [
        { label: 'Purchase Management', href: '#' },
        { label: 'Purchase', href: '#' },
        { label: 'Stocks Alert', href: '/admin/approval/product/supplier' }
      ];
  
    return (
        <div className='p-4'>
                <Breadcrumbs
                  pageTitle="Stocks Alert"
                  items={breadcrumbItems}
                />   
    <div className="flex gap-2 mb-4">
      {["Stocks Alert", "order Acceptence", "Goods Deliver", "Goods Crosscheck", "Seller Payment", "Transport Payment"].map(btn => (
        <button key={btn} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{btn}</button>
      ))}
    </div>
 
    <table className="w-full border border-gray-400">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Model</th>
          <th>Varient</th>
          <th>UoM</th>
          <th>No Of Ware Houses</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {alertData.map((item, index) => (
          <tr key={item.id} className="text-center border border-gray-300">
            <td>{item.id}</td>
            <td className="font-bold">{item.product}</td>
            <td>{item.model}</td>
            <td>{item.variant}</td>
            <td>{item.uom}</td>
            <td className="bg-blue-100">{item.warehouses}</td>
            <td><Link to={`/admin/purchase/alert/${item.id}`} className="text-blue-600 underline">View</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)};
export default AlertList