import React from "react";

const ProductTable = () => {
  const products = [
    {
      id: 1,
      category: "Fashion",
      image: "https://img.icons8.com/ios-filled/50/000000/phone.png",
      productName: "Mens-Shirt",
      company: "Raymond",
      model: "Solid",
      variant: "XXL",
      sku: "KU1209",
      uom: "PC",
      qty: 2,
      amount: 1000,
    },
    {
      id: 2,
      category: "Fashion",
      image: "https://img.icons8.com/ios-filled/50/000000/phone.png",
      productName: "Mens-Trousure",
      company: "Raymond",
      model: "Solid",
      variant: "XL",
      sku: "KU1210",
      uom: "PC",
      qty: 2,
      amount: 1000,
    },
  ];

  const groupedProducts = [];
  let lastCategory = "";
  let rowSpanMap = {};

  products.forEach((product, index) => {
    if (product.category !== lastCategory) {
      rowSpanMap[product.category + index] = 1;
      lastCategory = product.category;
    } else {
      const prevIndex = groupedProducts.length - 1;
      const prevKey = products[prevIndex].category + prevIndex;
      rowSpanMap[prevKey]++;
      rowSpanMap[product.category + index] = 0; 
    }
    groupedProducts.push(product);
  });

  const totalQty = products.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border px-2 py-1">No</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Product Name</th>
            <th className="border px-2 py-1">Company/Brand</th>
            <th className="border px-2 py-1">Model</th>
            <th className="border px-2 py-1">Variant</th>
            <th className="border px-2 py-1">SKU</th>
            <th className="border px-2 py-1">UoM</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {groupedProducts.map((product, index) => (
            <tr key={product.id}>
              <td className="border px-2 py-1">{String(index + 1).padStart(2, '0')}</td>

              {rowSpanMap[product.category + index] > 0 && (
                <td
                  className="border px-2 py-1"
                  rowSpan={rowSpanMap[product.category + index]}
                >
                  {product.category}
                </td>
              )}

              <td className="border px-2 py-1">
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-6 h-6 bg-blue-200 p-1 rounded"
                  />
                </div>
              </td>
              <td className="border px-2 py-1">{product.productName}</td>
              <td className="border px-2 py-1">{product.company}</td>
              <td className="border px-2 py-1">{product.model}</td>
              <td className="border px-2 py-1">{product.variant}</td>
              <td className="border px-2 py-1">{product.sku}</td>
              <td className="border px-2 py-1">{product.uom}</td>
              <td className="border px-2 py-1">{String(product.qty).padStart(2, '0')}</td>
              <td className="border px-2 py-1">{product.amount}</td>
            </tr>
          ))}

          <tr className="bg-gray-700 text-white font-bold">
            <td className="border px-2 py-1">
              {String(products.length).padStart(2, '0')}
            </td>
            <td className="border px-2 py-1" colSpan={8}>
            </td>
            <td className="border px-2 py-1">
              {String(totalQty).padStart(2, '0')}
            </td>
            <td className="border px-2 py-1">Submit</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
