import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

const InputField = ({ label, type = 'text', className = '', ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      className={`border rounded px-3 py-1 text-sm ${className}`}
      {...props}
    />
  </div>
);

const SelectField = ({ label, options = [], className = '', ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select className={`border rounded px-3 py-1 text-sm ${className}`} {...props}>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Section = ({ title, children }) => (
  <div className="border p-4 rounded-md mb-6 bg-white shadow">
    <h2 className="bg-green-600 text-white font-semibold px-3 py-1 rounded text-sm w-fit mb-4">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

export default function PurchaseOrderForm() {
  const breadcrumbItems = [
    { label: 'Purchase Management', href: '#' },
    { label: 'Purchases', href: '#' },
    { label: 'Create Purchase Order', href: '/admin/approval/product/supplier' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

                <Breadcrumbs
                  pageTitle="Create Purchase Order"
                  items={breadcrumbItems}
                /> 
                

      <Section title="General Information :">
        <InputField label="Purchase Order No" defaultValue="ABCDE-12345" />
        <InputField label="PO Request Date" type="date" defaultValue="2023-01-01" />
        <InputField label="Exp. Delivery Date" type="date" defaultValue="2023-01-01" />
        <SelectField label="Order Type" options={['Standard']} />
        <SelectField label="Category" options={['Product']} />
        <InputField label="Requester" defaultValue="Dinesh Kumar BH" />
      </Section>

      <Section title="Billing Information :">
        <SelectField label="Supply From" options={['Select Supplier']} />
        <SelectField label="Bill To" options={['Complete Address']} />
      </Section>

      <Section title="Shipping Details :">
        <SelectField label="Shipping Class" options={['Domestic', 'International']} />
        <InputField label="Shipping Partner" defaultValue="TCI" />
        <SelectField label="Shipping Method" options={['By Road']} />
        <SelectField label="Shipping Terms" options={['FOB']} />
        <InputField label="Shipping Date" type="date" />
        <InputField label="Tracking Number" defaultValue="ABCDE-12345" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Transport Receipt</label>
          <input type="file" className="border rounded px-3 py-1 text-sm" />
        </div>
      </Section>

      <Section title="Payment Terms :">
        <SelectField label="Payment Type" options={['Pre Payment', 'Post Payment', 'Pre.Pmt & Post.Pmt']} />

        {/* Pre Payment */}
        <SelectField label="Pre Payment Rule" options={['Advance']} />
        <SelectField label="1st Phase" options={['50%']} />
        <SelectField label="2nd Phase" options={['50%']} />

        {/* Post Payment */}
        <SelectField label="Post Payment Rule" options={['Partial', 'Full', 'Both']} />
        <SelectField label="Percentage" options={['50 & 50']} />
        <SelectField label="Period/Duration" options={['Net 15 & Net 30']} />

        {/* Pre & Post Payment */}
        <SelectField label="Pre Pmt & Post Pmt Rule" options={['']} />
        <SelectField label="Percentage" options={['']} />
        <SelectField label="Period/Duration" options={['Net 15 & Net 30']} />
      </Section>
    </div>
  );
}
