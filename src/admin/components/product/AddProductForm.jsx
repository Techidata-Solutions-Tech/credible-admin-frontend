import React, { useEffect, useState , useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProductForm = () => {
  const [firstStep, setFirstStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [productId, setProductId] = useState(null);
  const { register, handleSubmit, setValue,watch, formState: { errors } } = useForm();

  

  const steps = [
    { number: 1, label: 'Category' },
    { number: 2, label: 'Product Details' },
    { number: 3, label: 'Features' },
    { number: 4, label: 'Dimensions' },
    { number: 5, label: 'Price' },
    { number: 6, label: 'Tax & Inventory' },
    { number: 7, label: 'Warehouse' },
    { number: 8, label: 'Shipping' },
    { number: 9, label: 'Manufacturing' },
    { number: 10, label: 'SEO' },
    { number: 11, label: 'Images' },
  ];


    // step 1
    const [ step1, setStep1]  = useState({
      childCategory: 0,
      isFeatured : false,
      mainCategory : 0,
      subCategory : 0
    });
    const [categoryParent, setCategoryParent] = useState([]);
    const [categorySub, setCategorySub] = useState([]);
    const [categoryChild, setCategoryChild] = useState([]);
    useEffect(() => {
      const fetchCategoryParent = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=0 `);
          const data = await response.json();      
          setCategoryParent(data.categories)
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

     
      fetchCategoryParent();
    }, []);

    const fetchCategorySub = async (id) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=${id}`);
        const data = await response.json();      
        setCategorySub(data.categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchCategoryChild = async (id) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=${id}`);
        const data = await response.json();      
        setCategoryChild(data.categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const stepSubmit = async (api,method,stepNo, stepName ,payLoad) =>{
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${api}`,{
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payLoad),
        });
        const data = await response.json();
        if(response.ok){
          if(stepNo === 1){
            setProductId(data.product_id)
          }
           toast.success(stepName)
           setCurrentStep(prev => prev + 1);
        }else{
          toast.error(`Error: ${data.message}`)
        }    
      } catch (error) {
        toast.error(`Error: ${error.message}`)
      }
    }


  const onSubmit = (data) => {
   
    if (currentStep < steps.length) {
      if(currentStep === 1 ){
        setFirstStep(true)
        const payLoad = {
          main_category:parseInt(data.mainCategory),
          sub_category:parseInt(data.subCategory),
          child_category:parseInt(data.childCategory),
          is_featured: data.isFeatured === "true"
        }
        stepSubmit('/api/admin/add-category-to-product','POST',1,'Category added to product',payLoad)
      }
      if(currentStep === 2){

        const  payLoad = {
          product_name: data.productName,
          brand_name: data.brandName,
          brand_auth_letter: 'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
          model_name: data.modelName,
          model_number: data.modelNumber,
          SKU: data.sku
        };
        stepSubmit(`/api/admin/add-update-product-detail/${productId}`,'PUT',2,'Product detail added successfully',payLoad)
      
      }

      if(currentStep === 3){

        const  payLoad = {
            material: data.material,
            color: data.color,
            capacity: data.capacity,
            widthLid: data.widthLid,
            finish: data.finish,
            nonStick: data.nonStick,
            packContains: data.packContains,
            productStatus: data.productStatus,
            productTag: data.productTag,
            customFeature: data.customFeature,
            scratchResistant: data.scratchResistant,
            breakResistant: data.breakResistant,
            microwaveSafe: data.microwaveSafe,
            disinfectantSafe: data.disinfectantSafe,
            disposable: data.disposable
          
        };
        stepSubmit(`/api/admin/add-update-product-specification/${productId}`,'POST',3,'Product specification added successfully',payLoad)
      
      }

      if(currentStep === 4){

        const  payLoad ={
          length: data.length,
          width: data.width,
          depth: data.depth,
          weight: data.weight,
          productDescription: data.productDescription
        };
        stepSubmit(`/api/admin/add-update-product-dimension/${productId}`,'POST',4,'Product dimension added successfully',payLoad)
      
      }
      if(currentStep === 5){

        const payLoad = {
          quantity: parseInt(data.bulkQuantity, 10),
          discount_price: parseInt(data.discountedPrice, 10),
          purchase_price: parseInt(data.purchasePrice, 10),
          mrp: parseInt(data.mrp, 10),
          seller_price: parseInt(data.sellerPrice, 10),
          gift_packaging: data.giftPacking === "yes",
          packing_price: parseInt(data.packingPrice, 10),
          start_date: data.startDate
        };
        stepSubmit(`/api/admin/add-update-product-detail/${productId}`,'PUT',5,'Product detail added successfully',payLoad)
      
      }

      if(currentStep === 6){

        const payLoad = {
          quantity: parseInt(data.bulkQuantity, 10),
          discount_price: parseInt(data.discountedPrice, 10),
          purchase_price: parseInt(data.purchasePrice, 10),
          mrp: parseInt(data.mrp, 10),
          seller_price: parseInt(data.sellerPrice, 10),
          gift_packaging: data.giftPacking === "yes",
          packing_price: parseInt(data.packingPrice, 10),
          start_date: data.startDate
        };
        stepSubmit(`/api/admin/add-update-product-detail/${productId}`,'PUT',5,'Product detail added successfully',payLoad)
      
      }

      if(currentStep === 6){

        const payLoad = {
          taxCountry: data.taxCountry,
          taxClass: data.taxClass,
          countryTaxCode: data.countryTaxCode,
          hsnSacCode: data.hsnSacCode,
          taxType: data.taxType,
          taxRate: parseInt(data.taxRate, 10),
          taxableAmount: parseInt(data.taxableAmount, 10),
          taxTitle: data.taxTitle,
          cessPercentage: parseInt(data.cessPercentage, 10),
          saleableQty: parseInt(data.saleableQty, 10),
          measuringUnits: data.measuringUnits,
          minimumQty: parseInt(data.minimumQty, 10),
          maximumQty: parseInt(data.maximumQty, 10),
          stockStatus: Boolean(data.stockStatus),
          lowStockAlert: parseInt(data.lowStockAlert, 10),
        };
        stepSubmit(`/api/admin/add-update-product-tax-inventory/${productId}`,'POST',6,'Product tax detail added successfully',payLoad)
      
      }
      if(currentStep === 7){

        const payLoad = {
          warehouseId: data.warehouseId,
          warrantyType: data.warrantyType,
          warehouseLocation: data.warehouseLocation,
          warehouseAddress: data.warehouseAddress,
          warrantyApplicable: data.warrantyApplicable,
          warrantyTypeDetails: data.warrantyTypeDetails,
          warranty: data.warranty ,
          warrantyLocation: data.warrantyLocation,
          warrantyDuration: parseInt(data.warrantyDuration, 10),
        };
        stepSubmit(`/api/admin/add-update-product-shipping-warehouse/${productId}`,'POST',7,'Product shipping warehouse added successfully',payLoad)
      
      }

      if(currentStep === 8){

        const payLoad = {
          codAvailable: data.codAvailable,
          ship_length: parseInt(data.ship_length, 10),
          ship_width: parseInt(data.ship_width, 10),
          ship_depth: parseInt(data.ship_depth, 10),
          ship_weight: parseInt(data.ship_weight, 10),
          shippingType: data.shippingType,
          shippingOrder: parseInt(data.shippingOrder, 10),
          shippingDays: parseInt(data.shippingDays, 10),
          shippingZone: data.shippingZone,
          shippingCharges: parseInt(data.shippingCharges, 10),
        };
        stepSubmit(`/api/admin/add-update-product-shipping-warehouse/${productId}`,'POST',8,'Product shipping warehouse added successfully',payLoad)
      
      }


      if(currentStep === 9){

        const payLoad = {
          manufacturingName: data.manufacturingName,
          manufacturingAddress: data.manufacturingAddress,
          manufacturingCountry: data.manufacturingCountry,
          countryOfOrigin: data.countryOfOrigin,
          importerName: data.importerName,
          importerAddress: data.importerAddress,
        };
        stepSubmit(`/api/admin/add-update-product-manufaturer/${productId}`,'POST',9,'Product product manufaturer added successfully',payLoad)
      
      }

      if(currentStep === 10){

        const payLoad = {
          metaTitle: data.metaTitle,
          metaURL: data.metaURL,
          metaKeyword: data.metaKeyword,
          metaDescription: data.metaDescription,
        };
        stepSubmit(`/api/admin/add-update-product-seo-info/${productId}`,'POST',10,'Product seo successfully',payLoad)
      
      }


     
     
      
    } else {
      if(currentStep === 11){

        const payLoad = {
          main_image:'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
          second_image:'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
          third_image:'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU='
        };
        stepSubmit(`/api/admin/add-update-product-detail/${productId}`,'PUT',11,'Product images added successfully',payLoad)
      
      }
      // Handle final submission
      console.log('Final form data:', data);
    }
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="container mx-auto shadow-md rounded-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">Main Category</label>
                <select
                 
                  {...register("mainCategory",)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                  onChange={(e)=>{
                    // setStep1((pre)=>({
                    //   ...pre, mainCategory:e.target.value
                    // }))
                    setValue('mainCategory',e.target.value)
                    fetchCategorySub(e.target.value);
                    setCategoryChild([]);
                  }}
                >
                   <option value="" selected>Select a Category</option>
                    {categoryParent?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                       {cat.name}
                      </option>
                    ))}
                </select>
                {errors.mainCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.mainCategory.message}</p>
                )}
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">Sub Category</label>
                <select
                  {...register("subCategory")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                  
                  onChange={(e)=>{
                    // setStep1((pre)=>({
                    //   ...pre, subCategory:e.target.value
                    // }))
                    fetchCategoryChild(e.target.value);
                  }}
                >
                  <option value="0" selected>Select sub category</option>
                  {categorySub?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                       {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Right Column */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">Child Category</label>
                <select
                  {...register("childCategory")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                  onChange={(e)=>{
                    // setStep1((pre)=>({
                    //   ...pre, childCategory:e.target.value
                    // }))
                  
                  }}
                >
                   <option value="0" selected>Select a Category</option>
                  {categoryChild?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                       {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">Is Featured</label>
                <select
                  {...register("isFeatured")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>
          </div>
        );


      case 2:
        return (
          <div className="container mx-auto shadow-md rounded-md p-6 space-y-6">
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                {...register("productName", { required: "Product name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
              />
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">Brand Name</label>
              <input
                {...register("brandName", { required: "Brand name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
              />
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">Brand Authorization Letter</label>
              <input
                type="file"
                {...register("brandAuthorization")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">Model Name</label>
                <input
                  {...register("modelName")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">Model Number</label>
                <input
                  {...register("modelNumber")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">SKU</label>
              <input
                {...register("sku", { required: "SKU is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
              />
            </div>
          </div>
        );



      case 3:
        return (
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Container */}
              <div className="space-y-4 container mx-auto shadow-lg rounded-md p-6">
                {/* Material */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    {...register("material", { required: "Material is required" })}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter material"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                  <input
                    type="text"
                    {...register("color")}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter color"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
                  <input
                    type="text"
                    {...register("capacity")}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter capacity"
                  />
                </div>

                {/* Width Lid */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Width Lid</label>
                  <input
                    type="text"
                    {...register("widthLid")}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter width lid"
                  />
                </div>

                {/* Finish */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Finish</label>
                  <input
                    type="text"
                    {...register("finish")}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter finish type"
                  />
                </div>
                 {/* Non-Stick */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Non-Stick</label>
                  <select {...register("nonStick")} className="w-full px-6 py-3 border rounded-md bg-transparent">
                    <option value="">Select option...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                 {/* Pack Contains */}
                 <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Pack Contains</label>
                  <input
                    type="text"
                    {...register("packContains")}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter pack details"
                  />
                </div>
              </div>

              {/* Right Container */}
              <div className="space-y-4 container mx-auto shadow-lg  rounded-md p-6">
                {/* Product Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product Status</label>
                  <select {...register("productStatus")} className="w-full px-6 py-3 border rounded-md bg-transparent">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Product Tag */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product Tag</label>
                  <select {...register("productTag")} className="w-full px-6 py-3 border rounded-md bg-transparent">
                    <option value="">Select tag...</option>
                    <option value="new">New</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>

                {/* Custom Feature Input */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">Custom Feature</label>
                  <input
                    type="text"
                    {...register("customFeature")}
                    className="w-full px-6 py-3 border rounded-md bg-transparent"
                    placeholder="Enter custom feature"
                  />
                </div>
                {/* Other Features */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Other Features</label>
                  <div className="space-y-2">
                    {[
                      { name: "scratchResistant", label: "Scratch Resistant" },
                      { name: "breakResistant", label: "Break Resistant" },
                      { name: "microwaveSafe", label: "Microwave Safe" },
                      { name: "disinfectantSafe", label: "Disinfectant Safe" },
                      { name: "disposable", label: "Disposable" },
                    ].map((feature) => (
                      <div key={feature.name} className="flex items-center justify-between space-x-4">
                        <span className="text-sm font-medium">{feature.label}</span>
                        <select {...register(feature.name)} className="px-4 py-2 border rounded-md bg-transparent">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 container mx-auto shadow-lg rounded-md p-6">
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Length (cm)</label>
              <input
                type="number"
                {...register("length", { required: "Length is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Width (cm)</label>
              <input
                type="number"
                {...register("width")}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Depth (cm)</label>
              <input
                type="number"
                {...register("depth")}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                {...register("weight")}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Product Description</label>
              <textarea
                {...register("productDescription")}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
                rows="4"
              ></textarea>
            </div>
          </div>
        );
        


      case 5:
        return (
          <div className="space-y-4 container shadow-lg rounded-md p-4">
            {/* Bulk Purchase Section */}
            <div>
              <label className="block text-md font-semibold mb-2">Allow Product to Bulk Purchase</label>
        
              {/* Quantity */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  {...register("bulkQuantity", { required: "Quantity is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  placeholder="Enter quantity"
                />
                {errors.bulkQuantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.bulkQuantity.message}</p>
                )}
              </div>
        
              {/* Discounted Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Discounted Price</label>
                <input
                  type="number"
                  {...register("discountedPrice", { required: "Discounted price is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  placeholder="Enter discounted price"
                />
                {errors.discountedPrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.discountedPrice.message}</p>
                )}
              </div>
            </div>
        
            {/* Price Details Section */}
            <div>
              <label className="block text-xl text-black font-semibold mb-4 text-center">Price Details</label>
        
              {/* Purchase Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Purchase Price</label>
                <input
                  type="number"
                  {...register("purchasePrice", { required: "Purchase price is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  placeholder="Enter purchase price"
                />
                {errors.purchasePrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.purchasePrice.message}</p>
                )}
              </div>
        
              {/* MRP */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">MRP</label>
                <input
                  type="number"
                  {...register("mrp", { required: "MRP is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  placeholder="Enter MRP"
                />
                {errors.mrp && (
                  <p className="text-red-500 text-sm mt-1">{errors.mrp.message}</p>
                )}
              </div>
        
              {/* Seller Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Seller Price</label>
                <input
                  type="number"
                  {...register("sellerPrice", { required: "Seller price is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  placeholder="Enter seller price"
                />
                {errors.sellerPrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.sellerPrice.message}</p>
                )}
              </div>
        
              {/* Gift Packing Available */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Gift Packing Available</label>
                <select {...register("giftPacking")} className="w-full px-4 py-2 border rounded-md bg-transparent">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
        
              {/* Packing Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Packing Price</label>
                <input
                  type="number"
                  {...register("packingPrice")}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  placeholder="Enter packing price"
                />
              </div>
        
              {/* Starting From Date */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Starting From Date</label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
              </div>
            </div>
          </div>
        );
        

      case 6:
        return (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Tax Details Section (Left Side) */}
            <div className="space-y-4 container shadow-lg p-4 rounded-md">
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Tax Country</label>
                <select
                  {...register("taxCountry", { required: "Tax country is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                >
                  <option value="">Select country...</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  {/* Add more countries as needed */}
                </select>
                {errors.taxCountry && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxCountry.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Tax Class</label>
                <select
                  {...register("taxClass", { required: "Tax class is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                >
                  <option value="">Select tax class...</option>
                  <option value="standard">Standard</option>
                  <option value="exempt">Exempt</option>
                </select>
                {errors.taxClass && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxClass.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Country Tax Code</label>
                <select
                  {...register("countryTaxCode", { required: "Country tax code is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                >
                  <option value="">Select tax code...</option>
                  <option value="GST">GST</option>
                  <option value="VAT">VAT</option>
                </select>
                {errors.countryTaxCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.countryTaxCode.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">HSN/SAC Code</label>
                <input
                  type="text"
                  {...register("hsnSacCode", { required: "HSN/SAC code is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.hsnSacCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.hsnSacCode.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Tax Type</label>
                <select
                  {...register("taxType", { required: "Tax type is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                >
                  <option value="">Select tax type...</option>
                  <option value="inclusive">Inclusive</option>
                  <option value="exclusive">Exclusive</option>
                </select>
                {errors.taxType && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxType.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Tax Rate</label>
                <input
                  type="number"
                  {...register("taxRate", { required: "Tax rate is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  step="0.01"
                />
                {errors.taxRate && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxRate.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Taxable Amount</label>
                <input
                  type="number"
                  {...register("taxableAmount", { required: "Taxable amount is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  step="0.01"
                />
                {errors.taxableAmount && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxableAmount.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Tax Title</label>
                <input
                  type="text"
                  {...register("taxTitle", { required: "Tax title is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.taxTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxTitle.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Cess %</label>
                <input
                  type="number"
                  {...register("cessPercentage", { required: "Cess percentage is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                  step="0.01"
                />
                {errors.cessPercentage && (
                  <p className="text-red-500 text-sm mt-1">{errors.cessPercentage.message}</p>
                )}
              </div>
            </div>
        
            {/* Inventory Details Section (Right Side) */}
            <div className="space-y-4 container shadow-lg p-4 rounded-md">
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Saleable Quantity</label>
                <input
                  type="number"
                  {...register("saleableQty", { required: "Saleable quantity is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.saleableQty && (
                  <p className="text-red-500 text-sm mt-1">{errors.saleableQty.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Measuring Units</label>
                <input
                  type="text"
                  {...register("measuringUnits", { required: "Measuring units are required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.measuringUnits && (
                  <p className="text-red-500 text-sm mt-1">{errors.measuringUnits.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Minimum Quantity</label>
                <input
                  type="number"
                  {...register("minimumQty", { required: "Minimum quantity is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.minimumQty && (
                  <p className="text-red-500 text-sm mt-1">{errors.minimumQty.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Maximum Quantity</label>
                <input
                  type="number"
                  {...register("maximumQty", { required: "Maximum quantity is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.maximumQty && (
                  <p className="text-red-500 text-sm mt-1">{errors.maximumQty.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Stock Status</label>
                <select
                  {...register("stockStatus", { required: "Stock status is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                >
                  <option value="">Select stock status...</option>
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                {errors.stockStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.stockStatus.message}</p>
                )}
              </div>
        
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Low Stock Alert</label>
                <input
                  type="number"
                  {...register("lowStockAlert", { required: "Low stock alert is required" })}
                  className="w-full px-4 py-2 border rounded-md bg-transparent"
                />
                {errors.lowStockAlert && (
                  <p className="text-red-500 text-sm mt-1">{errors.lowStockAlert.message}</p>
                )}
              </div>
            </div>
          </div>
        );
        



        case 7: return (
          <div className="space-y-4 container shadow-lg rounded-md p-4">
            {/* Warehouse Details Section */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warehouse ID</label>
              <input
                type="text"
                {...register("warehouseId", { required: "Warehouse ID is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
              {errors.warehouseId && (
                <p className="text-red-500 text-sm mt-1">{errors.warehouseId.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warranty Type</label>
              <select
                {...register("warrantyType", { required: "Warranty type is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              >
                <option value="">Select warranty type...</option>
                <option value="standard">Standard</option>
                <option value="extended">Extended</option>
                <option value="none">None</option>
              </select>
              {errors.warrantyType && (
                <p className="text-red-500 text-sm mt-1">{errors.warrantyType.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warehouse Location</label>
              <input
                type="text"
                {...register("warehouseLocation", { required: "Warehouse location is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
              {errors.warehouseLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.warehouseLocation.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warehouse Address</label>
              <textarea
                {...register("warehouseAddress", { required: "Warehouse address is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
                rows="3"
              />
              {errors.warehouseAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.warehouseAddress.message}</p>
              )}
            </div>
        
            {/* Warranty Details Section */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warranty Applicable</label>
              <select
                {...register("warrantyApplicable", { required: "Warranty applicable is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              >
                <option value="">Select warranty applicability...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.warrantyApplicable && (
                <p className="text-red-500 text-sm mt-1">{errors.warrantyApplicable.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warranty Type</label>
              <select
                {...register("warrantyTypeDetails", { required: "Warranty type is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              >
                <option value="">Select warranty type...</option>
                <option value="standard">Standard</option>
                <option value="extended">Extended</option>
                <option value="none">None</option>
              </select>
              {errors.warrantyTypeDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.warrantyTypeDetails.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warranty</label>
              <input
                type="text"
                {...register("warranty", { required: "Warranty is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
              {errors.warranty && (
                <p className="text-red-500 text-sm mt-1">{errors.warranty.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warranty Location</label>
              <input
                type="text"
                {...register("warrantyLocation", { required: "Warranty location is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
              {errors.warrantyLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.warrantyLocation.message}</p>
              )}
            </div>
        
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">Warranty Duration (months)</label>
              <input
                type="number"
                {...register("warrantyDuration", { required: "Warranty duration is required" })}
                className="w-full px-4 py-2 border rounded-md bg-transparent"
              />
              {errors.warrantyDuration && (
                <p className="text-red-500 text-sm mt-1">{errors.warrantyDuration.message}</p>
              )}
            </div>
          </div>
        );
        



      case 8: return (
        <div className="space-y-4">
          {/* Cancellation, Replacement and Return Policy Section */}
          <div>
            <label className="block text-sm font-medium mb-1">COD Available</label>
            <select
              {...register("codAvailable", { required: "COD availability is required" })}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select COD availability...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.codAvailable && (
              <p className="text-red-500 text-sm mt-1">{errors.codAvailable.message}</p>
            )}
          </div>

          {/* Packing and Shipping Details Section */}
          <div>
            <label className="block text-sm font-medium mb-1">Length (CM)</label>
            <input
              type="number"
              {...register("ship_length", { required: "Length is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.ship_length && (
              <p className="text-red-500 text-sm mt-1">{errors.ship_length.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Width (CM)</label>
            <input
              type="number"
              {...register("ship_width", { required: "Width is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.ship_width && (
              <p className="text-red-500 text-sm mt-1">{errors.ship_width.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Depth (CM)</label>
            <input
              type="number"
              {...register("ship_depth", { required: "Depth is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.ship_depth && (
              <p className="text-red-500 text-sm mt-1">{errors.ship_depth.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              {...register("ship_weight", { required: "Weight is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.ship_weight && (
              <p className="text-red-500 text-sm mt-1">{errors.ship_weight.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shipping Type</label>
            <select
              {...register("shippingType", { required: "Shipping type is required" })}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select shipping type...</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {errors.shippingType && (
              <p className="text-red-500 text-sm mt-1">{errors.shippingType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shipping Order</label>
            <input
              type="number"
              {...register("shippingOrder", { required: "Shipping order is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.shippingOrder && (
              <p className="text-red-500 text-sm mt-1">{errors.shippingOrder.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shipping Days</label>
            <input
              type="number"
              {...register("shippingDays", { required: "Shipping days are required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.shippingDays && (
              <p className="text-red-500 text-sm mt-1">{errors.shippingDays.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shipping Zone</label>
            <input
              type="text"
              {...register("shippingZone", { required: "Shipping zone is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.shippingZone && (
              <p className="text-red-500 text-sm mt-1">{errors.shippingZone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shipping Charges</label>
            <input
              type="number"
              {...register("shippingCharges", { required: "Shipping charges are required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.shippingCharges && (
              <p className="text-red-500 text-sm mt-1">{errors.shippingCharges.message}</p>
            )}
          </div>
        </div>
      );


      case 9: return (
        <div className="space-y-4">
          {/* Manufacturing Details Section */}
          <div>
            <label className="block text-sm font-medium mb-1">Manufacturing Name</label>
            <input
              type="text"
              {...register("manufacturingName", { required: "Manufacturing name is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.manufacturingName && (
              <p className="text-red-500 text-sm mt-1">{errors.manufacturingName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Manufacturing Address</label>
            <textarea
              {...register("manufacturingAddress", { required: "Manufacturing address is required" })}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            />
            {errors.manufacturingAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.manufacturingAddress.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              {...register("manufacturingCountry", { required: "Country is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.manufacturingCountry && (
              <p className="text-red-500 text-sm mt-1">{errors.manufacturingCountry.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country of Origin</label>
            <input
              type="text"
              {...register("countryOfOrigin", { required: "Country of origin is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.countryOfOrigin && (
              <p className="text-red-500 text-sm mt-1">{errors.countryOfOrigin.message}</p>
            )}
          </div>

          {/* Importer Details Section */}
          <div>
            <label className="block text-sm font-medium mb-1">Importer Name</label>
            <input
              type="text"
              {...register("importerName", { required: "Importer name is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.importerName && (
              <p className="text-red-500 text-sm mt-1">{errors.importerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Importer Address</label>
            <textarea
              {...register("importerAddress", { required: "Importer address is required" })}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            />
            {errors.importerAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.importerAddress.message}</p>
            )}
          </div>
        </div>
      );

      case 10: return (
        <div className="space-y-4">
          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <input
              type="text"
              {...register("metaTitle", { required: "Meta title is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.metaTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.metaTitle.message}</p>
            )}
          </div>

          {/* Meta URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Meta URL</label>
            <input
              type="text"
              {...register("metaURL", { required: "Meta URL is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.metaURL && (
              <p className="text-red-500 text-sm mt-1">{errors.metaURL.message}</p>
            )}
          </div>

          {/* Meta Keyword */}
          <div>
            <label className="block text-sm font-medium mb-1">Meta Keyword</label>
            <input
              type="text"
              {...register("metaKeyword", { required: "Meta keyword is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.metaKeyword && (
              <p className="text-red-500 text-sm mt-1">{errors.metaKeyword.message}</p>
            )}
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <textarea
              {...register("metaDescription", { required: "Meta description is required" })}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            />
            {errors.metaDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>
            )}
          </div>
        </div>
      );


      case 11:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border-2 border-dashed rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <i class="ri-upload-line w-8 h-8 text-gray-400"></i>
                    <span className="text-sm text-gray-500">Upload Image {index}</span>
                    <input
                      type="file"
                      {...register(`image${index}`)}
                      className="hidden"
                      accept="image/*"
                      id={`image${index}`}
                    />
                    <label
                      htmlFor={`image${index}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-green-600 text-center font-semibold mt-4 h-[200px] flex justify-center">
            <p>All details added successfully!</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto p-6">
      {/* Progress Stepper */}
      <div className="mb-8 pb-4 overflow-x-auto">
        <div className="flex flex-nowrap min-w-max">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-center">
              <button
               onClick={() => firstStep && setCurrentStep(step.number)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${step.number <= currentStep
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                  }`}
              >
                {step.number}
              </button>
              <span
                className={`ml-2 text-sm font-medium whitespace-nowrap
                  ${step.number <= currentStep ? 'text-blue-500' : 'text-gray-500'}`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2
                    ${step.number < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>


      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {renderFormFields()}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className={`px-6 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200
              ${currentStep === 1 ? 'invisible' : 'visible'}`}
          >
            Previous
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentStep === steps.length ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
       <ToastContainer />
    </div>
  );
};

export default AddProductForm;