// ManageReturns.js (Main Page)
import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../admin/components/Breadcrumbs';

const mockReturns = [
  {
    id: 'PO156789',
    grnList: ['View', 'View', 'View'],
    debitList: ['View', 'View', 'View'],
    items: [30, 20, 10],
    returnValues: [100000, 90000, 80000],
    warehouses: ['Shimoga', 'Shikarpura', 'Sagara']
  }
];
const breadcrumbItems = [
    { label: 'Return Management', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Manage Returns', href: '/admin/marketing/create-coupon' }
  ];
const ManageReturns = () => {
  return (
    <div className="p-4 border border-dotted">
         <Breadcrumbs
              pageTitle="Manage Returns"
              items={breadcrumbItems}
            />  
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-green-700 text-white">
            <th>No</th>
            <th>PO NO</th>
            <th>GRN NO</th>
            <th>DEBIT NOTE NO</th>
            <th>NO OF ITEMS</th>
            <th>RETURN VALUE</th>
            <th>WAREHOUSE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {mockReturns.map((item, index) => (
            item.grnList.map((_, subIndex) => (
              <tr key={`${index}-${subIndex}`} className="text-center">
                {subIndex === 0 && <td rowSpan={item.grnList.length}>{index + 1}</td>}
                {subIndex === 0 && <td rowSpan={item.grnList.length}>{item.id}</td>}
                <td><button className="text-blue-600 underline">View</button></td>
                <td><button className="text-blue-600 underline">View</button></td>
                <td>{item.items[subIndex]}</td>
                <td>{item.returnValues[subIndex]}</td>
                <td>{item.warehouses[subIndex]}</td>
                <td>
                  <Link to={`/supplier/returns/${item.id}`} className="text-blue-600 underline">View</Link>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReturns;
