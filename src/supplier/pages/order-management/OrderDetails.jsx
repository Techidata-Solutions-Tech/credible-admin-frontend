// DetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState('ABC-123');
  const [comments, setComments] = useState('');
  const [revisedDate, setRevisedDate] = useState('21-01-2023');
  const [deliveryDate, setDeliveryDate] = useState('21-01-2023');

  useEffect(() => {
    // Simulating API call to fetch order details
    const fetchOrderDetails = async () => {
      // Mock data based on the image
      const mockData = {
        id: id,
        purchaseOrderId: 'ABC-123-12345',
        orderDate: '12-01-2023',
        responsibleBy: 'Narentha G',
        shippingPartner: 'TCS',
        shippingTerms: 'Freight On Board',
        shippingMethod: 'By Land',
        paymentTerms: 'As per Agreement',
        expectedDeliveryDate: '22 May 2023',
        billFrom: {
          name: 'Sumith Industry',
          street: 'Street',
          city: 'City',
          pincode: 'Pincode',
          district: 'District',
          state: 'State',
          phoneNumber: 'Phone Number',
          email: 'Email ID'
        },
        billTo: {
          name: 'Prudence Priority Pvt Ltd',
          street: 'Street',
          city: 'City',
          pincode: 'Pincode',
          district: 'District',
          state: 'State',
          phoneNumber: 'Phone Number',
          email: 'Email ID'
        },
        products: [
          { id: '01', name: 'Ghee', company: 'Aashirvaad', model: 'Gh', variant: '500 ML', sku: '0.5 Kg', uom: '500', uip: '500', location: 'Bhadravathi', warehouseAddress: 'ABC, Hatha Colony, Bhadravathi-577301', cgst: '10% | 10.00', sgst: '-', igst: '-', cess: '-', taxAmt: '10.00', unitPrice: '500', quantity: '05 Pac', totalAmt: '5500' },
          { id: '02', name: 'Onion', company: '-', model: '-', variant: '-', sku: '-', uom: '20', uip: '20', location: 'Shimoga', warehouseAddress: 'ABC, Hatha Colony, Bhadravathi-577301', cgst: '-', sgst: '5% | 10.00', igst: '5% | 10.00', cess: '-', taxAmt: '20.00', unitPrice: '20', quantity: '15 Kg', totalAmt: '300' },
          { id: '03', name: 'Apple', company: '-', model: '-', variant: '-', sku: '-', uom: '100', uip: '100', location: 'Shikaripur', warehouseAddress: 'ABC, Hatha Colony, Bhadravathi-577301', cgst: 'CGST', sgst: '5% | 10.00', igst: '5% | 10.00', cess: 'CGST', taxAmt: '20.00', unitPrice: '100', quantity: '12 Kg', totalAmt: '2000' },
        ],
        revisedOrder: [
          { id: '01', name: 'Ghee', company: 'Aashirvaad', model: 'Gh', variant: '500 ML', orderQty: '05 Pac', revisedQty: '05 Pac', totalAmt: '5500' },
          { id: '02', name: 'Onion', company: '-', model: '-', variant: '-', orderQty: '15 Kg', revisedQty: '15 Kg', totalAmt: '300' },
          { id: '03', name: 'Apple', company: '-', model: '-', variant: '-', orderQty: '12 Kg', revisedQty: '12 Kg', totalAmt: '2000' },
        ],
        deliverables: [
          { id: '01', name: 'Ghee', company: 'Aashirvaad', model: 'Gh', variant: '500 ML', revisedQty: '05 Pac', deliveredQty: '05 Pac', totalAmt: '5500' },
          { id: '02', name: 'Onion', company: '-', model: '-', variant: '-', revisedQty: '15 Kg', deliveredQty: '15 Kg', totalAmt: '300' },
          { id: '03', name: 'Apple', company: '-', model: '-', variant: '-', revisedQty: '12 Kg', deliveredQty: '12 Kg', totalAmt: '2000' },
        ],
        instructions: [
          'Packing',
          '[1]',
          '[2]',
          '[3]',
          '[4]',
          '[5]'
        ],
        totals: {
          taxTotal: '18% | 15.00, 5% | 20.00, 5% | 20.00',
          grandTotal: '7800-00'
        }
      };
      setOrderDetails(mockData);
    };

    fetchOrderDetails();
  }, [id]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Bill From and Bill To section */}
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <div className="bg-green-500 text-white p-2 font-bold">Bill From</div>
          <div className="border border-gray-300 p-2">
            <p className="font-bold">{orderDetails.billFrom.name}</p>
            <p>{orderDetails.billFrom.street}</p>
            <p>{orderDetails.billFrom.city}</p>
            <p>{orderDetails.billFrom.pincode}</p>
            <p>{orderDetails.billFrom.district}</p>
            <p>{orderDetails.billFrom.state}</p>
            <p>{orderDetails.billFrom.phoneNumber}</p>
            <p>{orderDetails.billFrom.email}</p>
          </div>
        </div>
        <div className="w-1/2 ml-2">
          <div className="bg-green-500 text-white p-2 font-bold">Bill To</div>
          <div className="border border-gray-300 p-2">
            <p className="font-bold">{orderDetails.billTo.name}</p>
            <p>{orderDetails.billTo.street}</p>
            <p>{orderDetails.billTo.city}</p>
            <p>{orderDetails.billTo.pincode}</p>
            <p>{orderDetails.billTo.district}</p>
            <p>{orderDetails.billTo.state}</p>
            <p>{orderDetails.billTo.phoneNumber}</p>
            <p>{orderDetails.billTo.email}</p>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="border border-gray-300 p-2">Purchase Order No</th>
            <th className="border border-gray-300 p-2">Order Date</th>
            <th className="border border-gray-300 p-2">Requested By</th>
            <th className="border border-gray-300 p-2">Shipping Partner</th>
            <th className="border border-gray-300 p-2">Shipping Terms</th>
            <th className="border border-gray-300 p-2">Shipping Method</th>
            <th className="border border-gray-300 p-2">Payment Terms</th>
            <th className="border border-gray-300 p-2">Expected Dispatch Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">{orderDetails.purchaseOrderId}</td>
            <td className="border border-gray-300 p-2">{orderDetails.orderDate}</td>
            <td className="border border-gray-300 p-2">{orderDetails.responsibleBy}</td>
            <td className="border border-gray-300 p-2">{orderDetails.shippingPartner}</td>
            <td className="border border-gray-300 p-2">{orderDetails.shippingTerms}</td>
            <td className="border border-gray-300 p-2">{orderDetails.shippingMethod}</td>
            <td className="border border-gray-300 p-2">{orderDetails.paymentTerms}</td>
            <td className="border border-gray-300 p-2">{orderDetails.expectedDeliveryDate}</td>
          </tr>
        </tbody>
      </table>

      {/* Product Information */}
      <div className="mb-4">
        <div className="flex mb-2">
          <div className="w-1/2 text-center">Product</div>
          <div className="w-1/4 text-center">Measurement</div>
          <div className="w-1/4 text-center">Delivery</div>
          <div className="w-1/4 text-center">Tax</div>
          <div className="w-1/4 text-center">Price</div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-xs">
              <th className="border border-gray-300 p-1">No</th>
              <th className="border border-gray-300 p-1">Product Name</th>
              <th className="border border-gray-300 p-1">Company/Brand</th>
              <th className="border border-gray-300 p-1">Model</th>
              <th className="border border-gray-300 p-1">Variant</th>
              <th className="border border-gray-300 p-1">SKU</th>
              <th className="border border-gray-300 p-1">UOM</th>
              <th className="border border-gray-300 p-1">UIP</th>
              <th className="border border-gray-300 p-1">Location</th>
              <th className="border border-gray-300 p-1">Warehouse Address</th>
              <th className="border border-gray-300 p-1">CGST</th>
              <th className="border border-gray-300 p-1">SGST</th>
              <th className="border border-gray-300 p-1">IGST</th>
              <th className="border border-gray-300 p-1">CESS</th>
              <th className="border border-gray-300 p-1">Tax Amt</th>
              <th className="border border-gray-300 p-1">Unit Price</th>
              <th className="border border-gray-300 p-1">Quantity</th>
              <th className="border border-gray-300 p-1">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product) => (
              <tr key={product.id} className="text-xs">
                <td className="border border-gray-300 p-1">{product.id}</td>
                <td className="border border-gray-300 p-1">{product.name}</td>
                <td className="border border-gray-300 p-1">{product.company}</td>
                <td className="border border-gray-300 p-1">{product.model}</td>
                <td className="border border-gray-300 p-1">{product.variant}</td>
                <td className="border border-gray-300 p-1">{product.sku}</td>
                <td className="border border-gray-300 p-1">{product.uom}</td>
                <td className="border border-gray-300 p-1">{product.uip}</td>
                <td className="border border-gray-300 p-1">{product.location}</td>
                <td className="border border-gray-300 p-1">{product.warehouseAddress}</td>
                <td className="border border-gray-300 p-1">{product.cgst}</td>
                <td className="border border-gray-300 p-1">{product.sgst}</td>
                <td className="border border-gray-300 p-1">{product.igst}</td>
                <td className="border border-gray-300 p-1">{product.cess}</td>
                <td className="border border-gray-300 p-1">{product.taxAmt}</td>
                <td className="border border-gray-300 p-1">{product.unitPrice}</td>
                <td className="border border-gray-300 p-1">{product.quantity}</td>
                <td className="border border-gray-300 p-1">{product.totalAmt}</td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td colSpan="14" className="border border-gray-300 p-1 text-right">Tax Total:</td>
              <td colSpan="4" className="border border-gray-300 p-1">{orderDetails.totals.taxTotal}</td>
            </tr>
            <tr className="bg-gray-100">
              <td colSpan="14" className="border border-gray-300 p-1 text-right">Grand Total:</td>
              <td colSpan="4" className="border border-gray-300 p-1">{orderDetails.totals.grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Revised Order Section */}
      <div className="mb-4">
        <div className="bg-green-500 text-white p-2 font-bold">Revised Order</div>
        <div className="text-right mb-2">
          <span>Date: </span>
          <input
            type="text"
            value={revisedDate}
            onChange={(e) => setRevisedDate(e.target.value)}
            className="border border-gray-300 p-1"
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white text-sm">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Company/Brand</th>
              <th className="border border-gray-300 p-2">Model</th>
              <th className="border border-gray-300 p-2">Variant</th>
              <th className="border border-gray-300 p-2">Order Qty</th>
              <th className="border border-gray-300 p-2">Revised Qty</th>
              <th className="border border-gray-300 p-2">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.revisedOrder.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.company}</td>
                <td className="border border-gray-300 p-2">{item.model}</td>
                <td className="border border-gray-300 p-2">{item.variant}</td>
                <td className="border border-gray-300 p-2">{item.orderQty}</td>
                <td className="border border-gray-300 p-2">{item.revisedQty}</td>
                <td className="border border-gray-300 p-2">{item.totalAmt}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="7" className="border border-gray-300 p-2 text-right font-bold">Total:</td>
              <td className="border border-gray-300 p-2 font-bold">7800-00</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-2">
          <button className="bg-blue-500 text-white px-4 py-2 mr-2">Accept Partial & Submit</button>
          <button className="bg-green-500 text-white px-4 py-2">Accept Full & Submit</button>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="mb-4">
        <div className="bg-green-500 text-white p-2 font-bold">Deliverables</div>
        <div className="flex justify-between mb-2">
          <div>
            <span>Invoice No: </span>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="border border-gray-300 p-1"
            />
            <button className="bg-blue-500 text-white px-2 py-1 ml-2">Upload Here</button>
          </div>
          <div>
            <span>Date: </span>
            <input
              type="text"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white text-sm">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Company/Brand</th>
              <th className="border border-gray-300 p-2">Model</th>
              <th className="border border-gray-300 p-2">Variant</th>
              <th className="border border-gray-300 p-2">Revised Qty</th>
              <th className="border border-gray-300 p-2">Delivered Qty</th>
              <th className="border border-gray-300 p-2">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.deliverables.map((item,i) => (
              <tr key={item.id} className="text">


                <td className="border border-gray-300 p-1">{i+1}</td>
                <td className="border border-gray-300 p-1">{item.productname}</td>
                <td className="border border-gray-300 p-1">{item.brand}</td>
                <td className="border border-gray-300 p-1">{item.model}</td>
                <td className="border border-gray-300 p-1">{item.variant}</td>
                <td className="border border-gray-300 p-1">{item.revisedQuantity}</td>
                <td className="border border-gray-300 p-1">{item.quantity}</td>
                <td className="border border-gray-300 p-1">{item.totalAmt}</td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td colSpan="14" className="border border-gray-300 p-1 text-right">Tax Total:</td>
              <td colSpan="4" className="border border-gray-300 p-1">{orderDetails.totals.taxTotal}</td>
            </tr>
            <tr className="bg-gray-100">
              <td colSpan="14" className="border border-gray-300 p-1 text-right">Grand Total:</td>
              <td colSpan="4" className="border border-gray-300 p-1">{orderDetails.totals.grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Revised Order Section */}
      <div className="mb-4">
        <div className="bg-green-500 text-white p-2 font-bold">Revised Order</div>
        <div className="text-right mb-2">
          <span>Date: </span>
          <input
            type="text"
            value={revisedDate}
            onChange={(e) => setRevisedDate(e.target.value)}
            className="border border-gray-300 p-1"
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white text-sm">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Company/Brand</th>
              <th className="border border-gray-300 p-2">Model</th>
              <th className="border border-gray-300 p-2">Variant</th>
              <th className="border border-gray-300 p-2">Order Qty</th>
              <th className="border border-gray-300 p-2">Revised Qty</th>
              <th className="border border-gray-300 p-2">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.revisedOrder.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.company}</td>
                <td className="border border-gray-300 p-2">{item.model}</td>
                <td className="border border-gray-300 p-2">{item.variant}</td>
                <td className="border border-gray-300 p-2">{item.orderQty}</td>
                <td className="border border-gray-300 p-2">{item.revisedQty}</td>
                <td className="border border-gray-300 p-2">{item.totalAmt}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="7" className="border border-gray-300 p-2 text-right font-bold">Total:</td>
              <td className="border border-gray-300 p-2 font-bold">7800-00</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-2">
          <button className="bg-blue-500 text-white px-4 py-2 mr-2">Accept Partial & Submit</button>
          <button className="bg-green-500 text-white px-4 py-2">Accept Full & Submit</button>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="mb-4">
        <div className="bg-green-500 text-white p-2 font-bold">Deliverables</div>
        <div className="flex justify-between mb-2">
          <div>
            <span>Invoice No: </span>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="border border-gray-300 p-1"
            />
            <button className="bg-blue-500 text-white px-2 py-1 ml-2">Upload Here</button>
          </div>
          <div>
            <span>Date: </span>
            <input
              type="text"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white text-sm">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Company/Brand</th>
              <th className="border border-gray-300 p-2">Model</th>
              <th className="border border-gray-300 p-2">Variant</th>
              <th className="border border-gray-300 p-2">Revised Qty</th>
              <th className="border border-gray-300 p-2">Delivered Qty</th>
              <th className="border border-gray-300 p-2">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.deliverables.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.company}</td>
                <td className="border border-gray-300 p-2">{item.model}</td>
                <td className="border border-gray-300 p-2">{item.variant}</td>
                <td className="border border-gray-300 p-2">{item.revisedQty}</td>
                <td className="border border-gray-300 p-2">{item.deliveredQty}</td>
                <td className="border border-gray-300 p-2">{item.totalAmt}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="7" className="border border-gray-300 p-2 text-right font-bold">Total:</td>
              <td className="border border-gray-300 p-2 font-bold">7800-00</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-2">
          <button className="bg-blue-500 text-white px-4 py-2">Invoice Accept</button>
          <button className="bg-green-500 text-white px-4 py-2">Submit</button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full border border-gray-300 p-2"
          rows="4"
          placeholder="Comment if any important note"
        ></textarea>
      </div>

      {/* Instructions Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Instructions:</h2>
        <ul className="list-disc pl-5">
          {orderDetails.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>

      {/* Submit Button */}
      <div className="text-center mb-4">
        <button className="bg-green-500 text-white px-8 py-2 text-lg">Submit</button>
      </div>

      {/* Signature */}
      <div className="mt-8 text-right">
        <div className="bg-red-600 text-white p-4 inline-block">
          <p className="font-bold">PRUDENCE PRIORITY PVT LTD</p>
          <p>AUTHORIZED SIGNATURE</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
