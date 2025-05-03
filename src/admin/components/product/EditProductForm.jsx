import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "./Accordion";
import SelectMultipleMedia from "./SelectMultipleImages";

const EditProductForm = ({productId}) => {
  const token = localStorage.getItem('token');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: {
      category: 0,
      // subCategory: "",
      // childCategory: "",
    },
    productDetails: {
      product_name: "",
      brand_name: "",
      brand_auth_letter: "https://credible.storage.s3.ap-south-1.amazonaws.com/1741850469797-bus-stop.png",
      model_name: "",
      model_number: "",
      modelSeries: "",
      standardProductIdentifier: "",
      standardProductIdentifierNumber: "",
      SKU: "",
    },
    productFeatured: {
      material: "",
      color: "",
      capacity: 0,
      withLid: "",
      finish: "",
      nonStick: "",
      packContains: "",
      productStatus: "",
      productTag: "",
      scratchResistant: "",
      breakResistant: "",
      microwaveSafe: "",
      dishwasherSafe: "",
      disposable: "",
      custom: "",
      length: 0,
      width: 0,
      depth: 0,
      weigth: 0,
      productDescription: "",
    },
    bulkPurchase: {
      quantity: "", setPrice: ""
    },
    pricing: {
      purchasePrice: 0,
      mrp: 0,
      sellerPrice: 0,
      giftPackingAvilable: "",
      packingPrice: 0,
      startFrom: "",
      codAvilable: "",
    },
    taxDetails: {
      categorieId: 0,
      categorieName: "",
      cgst: 0,
      description: "",
      hsn: "",
      id: 0,
      igst: 0,
      sgst_utgst: 0,
      status: true,
      taxRate: 0
    },
    inventory: {
      saleableQty: 0,
      measuringUnits: "",
      minimumQty: 0,
      maximumQty: 0,
      stockStatus: "",
      lowStockAlert: 0,
    },
    warehouse: {
      warehouseId: 0,
      location:"",
      address:""
    },
    warrenty: {
      warrentyApplicable: "",
      warrentyType: "",
      warrenty: "1",
      warrentyLocation: "",
      warrentyDuration: "",
    },
    packingAndShipping: {
      length: 0,
      width: 0,
      depth: 0,
      weight: 0,
      shippingType: "",
      shippingOrder: 0,
      shippingDays: 0,
      shippingZone: "",
      shippingCharges: 0,
    },
    manufacturingDetails: {
      manufacturingName: "",
      manufacturingAddress: "",
      countryOfOrigin: "",
      batchNumber: "",
      manufacturingDate: "",
      expiryDate: "",
      importerName: "",
      importerAddress: "",
    },
    seoSection: {
      metaTitle: "",
      metaURL: "",
      metaKeyword: "",
      metaDescription: "",
    },
    imageAndVideo: {
      images: [],
      videos: [],
    },
    // shippingCancellationReturn: {
    //   shippingPolicy: "",        
    //   shippingDuration: "",        
    //   returnPolicy: "",           
    //   returnDays: "",              
    //   cancellationPolicy: "",    
    //   cancellationDuration: "",  
    // }
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [firstStep, setFirstStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [taxData, setTaxData] = useState([]);
  const [selectedTaxes, setSelectedTaxes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [images, setImages] = useState([]);
  const [categoryParent, setCategoryParent] = useState([]);
  const [categorySub, setCategorySub] = useState([]);
  const [categoryChild, setCategoryChild] = useState([]);
  const steps = [
    { number: 1, label: "Category" },
    { number: 2, label: "Product Details" },
    { number: 3, label: "Features" },
    { number: 4, label: "Allow Product to Bulk Purchase" },
    { number: 5, label: "Price" },
    { number: 6, label: "Tax Details" },
    { number: 7, label: "Inventory Details" },
    { number: 8, label: "Warehouse Details" },
    { number: 9, label: "Warranty Details" },
    { number: 10, label: "Cancellation, Replacement & Return Policy" },
    { number: 11, label: "Shipping" },
    { number: 12, label: "Manufacturing" },
    { number: 13, label: "SEO" },
    { number: 14, label: "Images & Videos" },
  ];
  const fetchCategorySub = async (parentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=${parentId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCategorySub(data.categories);
      } else {
        console.log(`Error fetching subcategories: ${data.message}`);
      }
    } catch (error) {
      console.log(`Error fetching subcategories: ${error.message}`);
    }
  };

  const fetchCategoryChild = async (parentId) => {
    try {

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=${parentId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCategoryChild(data.categories);
      } else {
        console.log(`Error fetching child categories: ${data.message}`);
      }
    } catch (error) {
      console.log(`Error fetching child categories: ${error.message}`);
    }
  };

  const handleImageSelect = (imageUrl) => {
    const updatedImages = [...images];
    updatedImages[selectedIndex] = imageUrl;
    setImages(updatedImages);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchCategoryParent = async () => {
      try {

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/get-child-categories?parentId=0`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setCategoryParent(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTaxData = async () => {
      try {

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/tax`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setTaxData(data.data);
        } else {
          toast.error(`Error fetching tax data: ${data.message}`);
        }
      } catch (error) {
        toast.error(`Error fetching tax data: ${error.message}`);
      }
    };

    const fetchWarehouses = async () => {
      try {

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/warehouse`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setWarehouses(data.data);
        } else {
          console.error("Failed to fetch warehouses");
        }
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };


    fetchWarehouses();
    fetchTaxData();
    fetchCategoryParent();
  }, []);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/product/${productId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        
        if (response.ok) {
          const product = data.data;
      console.log(product);
          setFormData((prev) => ({
            ...prev,
            category: {
              category: product.category?.id || 0,
              // subCategory: "",
              // childCategory: "",
            },
            productDetails: {
              product_name: product.product_name || "",
              brand_name: product.__productFeatured?.brand_name || "",
              brand_auth_letter: product.__productFeatured?.brand_auth_letter || "https://credible.storage.s3.ap-south-1.amazonaws.com/1741850469797-bus-stop.png",
              model_name: product.__productFeatured?.model_name || "",
              model_number: product.__productFeatured?.model_number || "",
              modelSeries: product.__productFeatured?.model_series || "",
              standardProductIdentifier: product.__productFeatured?.standardProductIdentifier || "",
              standardProductIdentifierNumber: product.__productFeatured?.standardProductIdentifierNumber || "",
              SKU: product.__productFeatured?.SKU || "",
            },
            productFeatured: {
              material: product.__productFeatured?.material || "",
              color: product.__productFeatured?.color || "",
              capacity: Number(product.__productFeatured?.capacity) || 0,
              withLid: product.__productFeatured?.widthLid || "",
              finish: product.__productFeatured?.finish || "",
              nonStick: product.__productFeatured?.nonStick || "",
              packContains: product.__productFeatured?.packContains || "",
              productStatus: product.__productFeatured?.productStatus || "",
              productTag: product.__productFeatured?.productTag || "",
              scratchResistant: product.__productFeatured?.scratchResistant || "",
              breakResistant: product.__productFeatured?.breakResistant || "",
              microwaveSafe: product.__productFeatured?.microwaveSafe || "",
              dishwasherSafe: product.__productFeatured?.disinfectantSafe || "",
              disposable: product.__productFeatured?.disposable || "",
              custom: product.__productFeatured?.customFeature || "",
              length: Number(product.__productFeatured?.length) || 0,
              width: Number(product.__productFeatured?.width) || 0,
              depth: Number(product.__productFeatured?.depth) || 0,
              weigth: Number(product.__productFeatured?.weight) || 0,
              productDescription: product.__productFeatured?.productDescription || "",
            },
            bulkPurchase: {
              quantity: "", 
              setPrice: ""
            },
            pricing: {
              purchasePrice: product.purchase_price || 0,
              mrp: product.mrp || 0,
              sellerPrice: product.seller_price || 0,
              giftPackingAvilable: product.__productShipping?.gift_packaging ? "yes" : "no",
              packingPrice: product.__productShipping?.packing_price || 0,
              startFrom: product.startFrom || "",
              codAvilable: product.codAvailable ? "yes" : "no",
            },
            taxDetails: {
              taxCountry: product.__productTax?.taxCountry || "",
              taxClass: product.__productTax?.taxClass || "1",
              countryTaxCode: product.__productTax?.countryTaxCode || "",
              hsnSacCode: product.__productTax?.hsnSacCode || "",
              taxType: product.__productTax?.taxType || "",
              taxRate: Number(product.__productTax?.taxRate) || 0,
              taxableAmount: Number(product.__productTax?.taxableAmount) || 0,
              taxTitle: product.__productTax?.taxTitle || "",
              cessPercentage: Number(product.__productTax?.cessPercentage) || 0,
            },
            inventory: {
              saleableQty: product.__productInventory?.saleableQty || 0,
              measuringUnits: product.__productInventory?.measuringUnits || "",
              minimumQty: product.__productInventory?.minimumQty || 0,
              maximumQty: product.__productInventory?.maximumQty || 0,
              stockStatus: product.__productInventory?.stockStatus ? "inStock" : "outOfStock",
              lowStockAlert: product.__productInventory?.lowStockAlert || 0,
            },
            warehouse: {
              warehouseId: product.__warehouse?.id || 0,
            },
            warrenty: {
              warrentyApplicable: product.__productWarranty?.warrantyApplicable || "",
              warrentyType: product.__productWarranty?.warrantyType || "",
              warrenty: product.__productWarranty?.warranty || "1",
              warrentyLocation: product.__productWarranty?.warrantyLocation || "",
              warrentyDuration: product.__productWarranty?.warrantyDuration || "",
            },
            packingAndShipping: {
              length: product.__productShipping?.ship_length || 0,
              width: product.__productShipping?.ship_width || 0,
              depth: product.__productShipping?.ship_depth || 0,
              weight: product.__productShipping?.ship_weight || 0,
              shippingType: product.__productShipping?.shippingType || "",
              shippingOrder: product.__productShipping?.shippingOrder || 0,
              shippingDays: product.__productShipping?.shippingDays || 0,
              shippingZone: product.__productShipping?.shippingZone || "",
              shippingCharges: product.__productShipping?.shippingCharges || 0,
            },
            manufacturingDetails: {
              manufacturingName: product.__productManufacture?.manufacturingName || "",
              manufacturingAddress: product.__productManufacture?.manufacturingAddress || "",
              countryOfOrigin: product.__productManufacture?.countryOfOrigin || "",
              batchNumber: product.__productManufacture?.batchNumber || "",
              manufacturingDate: product.__productManufacture?.manufacturingDate || "",
              expiryDate: product.__productManufacture?.expiryDate || "",
              importerName: product.__productManufacture?.importerName || "",
              importerAddress: product.__productManufacture?.importerAddress || "",
            },
            seoSection: {
              metaTitle: product.__productSeo__?.metaTitle || "",
              metaURL: product.__productSeo__?.metaURL || "",
              metaKeyword: product.__productSeo__?.metaKeyword || "",
              metaDescription: product.__productSeo__?.metaDescription || "",
            },
            imageAndVideo: {
              images: product.images || [],
              videos: product.videos || [],
            },
          }))
          
          // Fetch category hierarchy based on the product's category
          await fetchCategoryHierarchy(product.category.id);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(`Error fetching product: ${error.message}`);
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  const onSubmit = async () => {

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      return;
    }

    const payload = {
      category: {
        category: Number(formData.category.category),
      },
      productDetails: {
        product_name: formData.productDetails.product_name,
        brand_name: formData.productDetails.brand_name,
        brand_auth_letter: formData.productDetails.brand_auth_letter, // URL string
        model_name: formData.productDetails.model_name,
        model_number: formData.productDetails.model_number,
        modelSeries: formData.productDetails.modelSeries,
        standardProductIdentifier: formData.productDetails.standardProductIdentifier,
        standardProductIdentifierNumber: formData.productDetails.standardProductIdentifierNumber,
        SKU: formData.productDetails.SKU,
      },
      productFeatured: {
        material: formData.productFeatured.material,
        color: formData.productFeatured.color,
        capacity: formData.productFeatured.capacity,
        withLid: formData.productFeatured.withLid,
        finish: formData.productFeatured.finish,
        nonStick: formData.productFeatured.nonStick,
        packContains: formData.productFeatured.packContains,
        productStatus: formData.productFeatured.productStatus,
        productTag: formData.productFeatured.productTag,
        scratchResistant: formData.productFeatured.scratchResistant,
        breakResistant: formData.productFeatured.breakResistant,
        microwaveSafe: formData.productFeatured.microwaveSafe,
        dishwasherSafe: formData.productFeatured.dishwasherSafe,
        disposable: formData.productFeatured.disposable,
        custom: formData.productFeatured.custom,
        length: formData.productFeatured.length,
        width: formData.productFeatured.width,
        depth: formData.productFeatured.depth,
        weigth: formData.productFeatured.weigth,
        productDescription: formData.productFeatured.productDescription,
      },
      bulkPurchase: {
        quantity: Number(formData.bulkPurchase.quantity),
        setPrice: Number(formData.bulkPurchase.setPrice),
      },
      pricing: {
        purchasePrice: Number(formData.pricing.purchasePrice),
        mrp: Number(formData.pricing.mrp),
        sellerPrice: Number(formData.pricing.sellerPrice),
        giftPackingAvilable: formData.pricing.giftPackingAvilable,
        packingPrice: Number(formData.pricing.packingPrice),
        startFrom: formData.pricing.startFrom,
        codAvilable: formData.pricing.codAvilable,
      },
      taxDetails: {
        taxId: Number(formData.taxDetails.id),
     
        // taxCountry: formData.taxDetails.taxCountry,
        // taxClass: formData.taxDetails.taxClass,
        // countryTaxCode: formData.taxDetails.countryTaxCode,
        // hsnSacCode: formData.taxDetails.hsnSacCode,
        // taxableAmount: Number(formData.taxDetails.taxableAmount),
        // taxType: formData.taxDetails.taxType,
        // taxRate: Number(formData.taxDetails.taxRate),
        // taxTitle: formData.taxDetails.taxTitle,
        // cessPercentage: Number(formData.taxDetails.cessPercentage),
      },
      inventory: {
        saleableQty: Number(formData.inventory.saleableQty),
        measuringUnits: formData.inventory.measuringUnits,
        minimumQty: Number(formData.inventory.minimumQty),
        maximumQty: Number(formData.inventory.maximumQty),
        stockStatus: formData.inventory.stockStatus,
        lowStockAlert: Number(formData.inventory.lowStockAlert),
      },
      warehouse: {
        warehouseId: Number(formData.warehouse.warehouseId),
      },
      warrenty: {
        warrentyApplicable: formData.warrenty.warrentyApplicable,
        warrentyType: formData.warrenty.warrentyType,
        warrenty: formData.warrenty.warrenty,
        warrentyLocation: formData.warrenty.warrentyLocation,
        warrentyDuration: formData.warrenty.warrentyDuration,
      },
      // shippingCancellationReturn: {
      //   shippingPolicy: formData.shippingCancellationReturn.shippingPolicy,
      //   shippingDuration: formData.shippingCancellationReturn.shippingDuration,
      //   returnPolicy: formData.shippingCancellationReturn.returnPolicy,
      //   returnDays: formData.shippingCancellationReturn.returnDays,
      //   cancellationPolicy: formData.shippingCancellationReturn.cancellationPolicy,
      //   cancellationDuration: formData.shippingCancellationReturn.cancellationDuration,
      // },
      packingAndShipping: {
        length: Number(formData.packingAndShipping.length),
        width: Number(formData.packingAndShipping.width),
        depth: Number(formData.packingAndShipping.depth),
        weight: Number(formData.packingAndShipping.weight),
        shippingType: formData.packingAndShipping.shippingType,
        shippingOrder: Number(formData.packingAndShipping.shippingOrder),
        shippingDays: Number(formData.packingAndShipping.shippingDays),
        shippingZone: formData.packingAndShipping.shippingZone,
        shippingCharges: Number(formData.packingAndShipping.shippingCharges),
      },
      manufacturingDetails: {
        manufacturingName: formData.manufacturingDetails.manufacturingName,
        manufacturingAddress: formData.manufacturingDetails.manufacturingAddress,
        countryOfOrigin: formData.manufacturingDetails.countryOfOrigin,
        batchNumber: formData.manufacturingDetails.batchNumber,
        manufacturingDate: formData.manufacturingDetails.manufacturingDate,
        expiryDate: formData.manufacturingDetails.expiryDate,
        importerName: formData.manufacturingDetails.importerName,
        importerAddress: formData.manufacturingDetails.importerAddress,
      },
      seoSection: {
        metaTitle: formData.seoSection.metaTitle,
        metaURL: formData.seoSection.metaURL,
        metaKeyword: formData.seoSection.metaKeyword,
        metaDescription: formData.seoSection.metaDescription,
      }, imageAndVideo: {
        images: formData.imageAndVideo.images,
        videos: formData.imageAndVideo.videos,
      }
    };
console.log(payload.taxDetails);

try {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/admin/product/${productId}`,
    {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // Use the same payload structure
    }
  );

  if (!response.ok) throw new Error(await response.text());

  toast.success("Product updated successfully!");
} catch (error) {
  toast.error(error.message || "Update failed");
}
  };
  // Add this function to fetch the category hierarchy
const fetchCategoryHierarchy = async (categoryId) => {
  try {
    // First, check if this is a child category
    const childResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/category/${categoryId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const categoryData = await childResponse.json();
    
    if (categoryData.parentCat !== 0) {
      // It's a child or sub category
      fetchCategoryChild(categoryData.parentCat);
      
      // Check if parent has a parent (meaning current is child)
      const parentResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/category/${categoryData.parentCat}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const parentData = await parentResponse.json();
      
      if (parentData.parentCat !== 0) {
        // Current is a child category, parent is sub category
        fetchCategorySub(parentData.parentCat);
      } else {
        // Current is a sub category
        fetchCategorySub(categoryData.parentCat);
      }
    }
  } catch (error) {
    console.error("Error fetching category hierarchy:", error);
  }
};
  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <CategoryStep
            formData={formData}
            setFormData={setFormData}
            categoryParent={categoryParent}
            categorySub={categorySub}
            categoryChild={categoryChild}
            fetchCategorySub={fetchCategorySub}
            fetchCategoryChild={fetchCategoryChild}
          />

        );

      case 2:
        return (
          <div className="container mx-auto shadow-md rounded-md p-6 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  value={formData.productDetails.product_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        product_name: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-40 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Brand Name
                </label>
                <input
                  value={formData.productDetails.brand_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        brand_name: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Brand Authorization Letter
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        brand_auth_letter: e.target.files[0],
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Model Name
                </label>
                <input
                  value={formData.productDetails.model_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        model_name: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Model Number
                </label>
                <input
                  value={formData.productDetails.model_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        model_number: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Model Series
                </label>
                <input
                  value={formData.productDetails.modelSeries}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        modelSeries: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Standard Product Identifier
                </label>
                <input
                  value={formData.productDetails.standardProductIdentifier}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        standardProductIdentifier: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Standard Product Identifier Number
                </label>
                <input
                  value={formData.productDetails.standardProductIdentifierNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        standardProductIdentifierNumber: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  value={formData.productDetails.SKU}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDetails: {
                        ...prev.productDetails,
                        SKU: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="container mx-auto shadow-md rounded-md p-6 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Material */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Material
                </label>
                <input
                  value={formData.productFeatured.material}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        material: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Color
                </label>
                <input
                  value={formData.productFeatured.color}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        color: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={formData.productFeatured.capacity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        capacity: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* With Lid */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  With Lid
                </label>
                <select
                  value={formData.productFeatured.withLid}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        withLid: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Finish */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Finish
                </label>
                <input
                  value={formData.productFeatured.finish}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        finish: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Non-Stick */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Non-Stick
                </label>
                <select
                  value={formData.productFeatured.nonStick}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        nonStick: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Pack Contains */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Pack Contains
                </label>
                <input
                  value={formData.productFeatured.packContains}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        packContains: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Product Status */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Product Status
                </label>
                <select
                  value={formData.productFeatured.productStatus}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        productStatus: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Product Tag */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Product Tag
                </label>
                <input
                  value={formData.productFeatured.productTag}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        productTag: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Scratch Resistant */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Scratch Resistant
                </label>
                <select
                  value={formData.productFeatured.scratchResistant}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        scratchResistant: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Break Resistant */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Break Resistant
                </label>
                <select
                  value={formData.productFeatured.breakResistant}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        breakResistant: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Microwave Safe */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Microwave Safe
                </label>
                <select
                  value={formData.productFeatured.microwaveSafe}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        microwaveSafe: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Dishwasher Safe */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Dishwasher Safe
                </label>
                <select
                  value={formData.productFeatured.dishwasherSafe}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        dishwasherSafe: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Disposable */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Disposable
                </label>
                <select
                  value={formData.productFeatured.disposable}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        disposable: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Custom */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Custom
                </label>
                <input
                  value={formData.productFeatured.custom}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        custom: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Length */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Length
                </label>
                <input
                  type="number"
                  value={formData.productFeatured.length}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        length: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Width */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Width
                </label>
                <input
                  type="number"
                  value={formData.productFeatured.width}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        width: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Depth */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Depth
                </label>
                <input
                  type="number"
                  value={formData.productFeatured.depth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        depth: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  value={formData.productFeatured.weigth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productFeatured: {
                        ...prev.productFeatured,
                        weigth: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                value={formData.productFeatured.productDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productFeatured: {
                      ...prev.productFeatured,
                      productDescription: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
                rows="4"
              />
            </div>
          </div>
        );


      case 4:
        return (
          <div className="grid sm:grid-cols-2 gap-4 container mx-auto shadow-lg rounded-md p-6">
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={formData.bulkPurchase.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bulkPurchase: {
                      ...prev.bulkPurchase,
                      quantity: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              />
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Set Price
              </label>
              <input
                type="number"
                value={formData.bulkPurchase.setPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bulkPurchase: {
                      ...prev.bulkPurchase,
                      setPrice: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              />
            </div>
          </div>


        );

      case 5:
        return (
          <div className="space-y-4 container shadow-lg rounded-md p-4">


            {/* Price Details Section */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Purchase Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Purchase Price
                </label>
                <input
                  type="number"
                  value={formData.pricing.purchasePrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        purchasePrice: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                  placeholder="Enter purchase price"
                />
              </div>

              {/* MRP */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  MRP
                </label>
                <input
                  type="number"
                  value={formData.pricing.mrp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        mrp: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                  placeholder="Enter MRP"
                />
              </div>

              {/* Seller Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Seller Price
                </label>
                <input
                  type="number"
                  value={formData.pricing.sellerPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        sellerPrice: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                  placeholder="Enter seller price"
                />
              </div>

              {/* Gift Packing Available */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Gift Packing Available
                </label>
                <select
                  value={formData.pricing.giftPackingAvilable}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        giftPackingAvilable: e.target.value === "yes",
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Packing Price */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Packing Price
                </label>
                <input
                  type="number"
                  value={formData.pricing.packingPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        packingPrice: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                  placeholder="Enter packing price"
                />
              </div>

              {/* Starting From Date */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Starting From Date
                </label>
                <input
                  type="date"
                  value={formData.pricing.startFrom}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        startFrom: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                />
              </div>
            </div>
          </div>
        );

        case 6:
          return (
            <div className="container p-4">
              <div className="grid grid-cols-3 gap-6">
                {/* Tax Country */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Tax Country
                  </label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(
                      (opt) => opt.value === formData.taxDetails.taxCountry
                    )}
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          taxCountry: option ? option.value : "",
                        },
                      }))
                    }
                    placeholder="Select country..."
                    isSearchable
                  />
                </div>
  
                {/* Country Tax Code */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Country Tax Code
                  </label>
                  <Select
                    options={taxCodeOptions}
                    value={taxCodeOptions.find(
                      (opt) => opt.value === formData.taxDetails.countryTaxCode
                    )}
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          countryTaxCode: option ? option.value : "",
                        },
                      }))
                    }
                    placeholder="Select tax code..."
                    isSearchable
                  />
                </div>
  
                {/* HSN/SAC Code */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    HSN/SAC Code
                  </label>
                  <input
                    type="text"
                    value={formData.taxDetails.hsnCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          hsnCode: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                    placeholder="Enter HSN/SAC code"
                  />
                </div>
                {/* Tax Class */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Tax Class
                  </label>
                  <input
                    type="text"
                    value={formData.taxDetails.taxClass}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          taxClass: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                    placeholder="Enter tax class"
                  />
                </div>
  
  
                {/* Tax Type */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Tax Type
                  </label>
                  <select
                    value={formData.taxDetails.taxType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          taxType: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                  >
                    <option value="">Select tax type...</option>
                    <option value="fixed">Fixed</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
   {/* Tax Title */}
   <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Tax Title
                  </label>
                  <input
                    type="text"
                    value={formData.taxDetails.taxTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          taxTitle: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                    placeholder="Enter tax title"
                  />
                </div>
                {/* Tax Rate */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Tax Rate
                  </label>
                  <input
                    type="number"
                    value={formData.taxDetails.taxRate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          taxRate: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                    step="0.01"
                    min="0"
                    placeholder="Enter tax rate"
                  />
                </div>
   {/* Cess (%) */}
   <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Cess (%)
                  </label>
                  <input
                    type="number"
                    value={formData.taxDetails.cess}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          cess: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                    step="0.01"
                    min="0"
                    placeholder="Enter cess (%)"
                  />
                </div>
                {/* Taxable Amount */}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Taxable Amount
                  </label>
                  <input
                    type="number"
                    value={formData.taxDetails.taxableAmount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxDetails: {
                          ...prev.taxDetails,
                          taxableAmount: parseFloat(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                    step="0.01"
                    min="0"
                    placeholder="Enter taxable amount"
                  />
                </div>
  
               
  
               
              </div>
            </div>
          );
  

      case 7:
        return (
          <div className="container mx-auto shadow-md rounded-md p-6 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Saleable Quantity */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Saleable Quantity
                </label>
                <input
                  type="number"
                  value={formData.inventory.saleableQty}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        saleableQty: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  min="0"
                />
              </div>

              {/* Measuring Units */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Measuring Units
                </label>
                <select
                  value={formData.inventory.measuringUnits}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        measuringUnits: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select unit</option>
                  <option value="pieces">Pieces</option>
                  <option value="kg">Kilograms</option>
                  <option value="g">Grams</option>
                  <option value="l">Liters</option>
                  <option value="ml">Milliliters</option>
                  <option value="box">Box</option>
                  <option value="pack">Pack</option>
                </select>
              </div>

              {/* Minimum Quantity */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Minimum Quantity
                </label>
                <input
                  type="number"
                  value={formData.inventory.minimumQty}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        minimumQty: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  min="0"
                />
              </div>

              {/* Maximum Quantity */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Maximum Quantity
                </label>
                <input
                  type="number"
                  value={formData.inventory.maximumQty}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        maximumQty: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  min="0"
                />
              </div>

              {/* Stock Status */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Stock Status
                </label>
                <select
                  value={formData.inventory.stockStatus}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        stockStatus: e.target.value === 'in_stock', // Converts to boolean
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                >
                  <option value="">Select status</option>
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>


              {/* Low Stock Alert */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  value={formData.inventory.lowStockAlert}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inventory: {
                        ...prev.inventory,
                        lowStockAlert: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  min="0"
                />
              </div>
            </div>

            {/* Additional Inventory Notes */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-2">
                Inventory Notes (Optional)
              </label>
              <textarea
                value={formData.inventory.notes || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inventory: {
                      ...prev.inventory,
                      notes: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
                rows="3"
                placeholder="Any additional inventory notes..."
              />
            </div>
          </div>
        );



      case 8:
        return (
          <div className="space-y-4 container shadow-lg rounded-md p-4">

<div>
    <label className="block text-md font-semibold text-gray-700 mb-1">
      Select Warehouse
    </label>
    <select
      value={formData.warehouse.warehouseId}
      onChange={(e) => {
        const selectedId = parseInt(e.target.value);
        const warehouse = warehouses.find((wh) => wh.id === selectedId);

        setFormData((prev) => ({
          ...prev,
          warehouse: {
            ...prev.warehouse,
            warehouseId: selectedId,
          },
        }));

        // Set the selected warehouse for location and address
        setSelectedWarehouse(warehouse); // Update the selected warehouse state
      }}
      className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
    >
      <option value="">Select a warehouse...</option>
      {warehouses.map((warehouse) => (
        <option key={warehouse.id} value={warehouse.id}>
          {warehouse.name} - {warehouse.city}, {warehouse.state}
        </option>
      ))}
    </select>
  </div>

            {/* Warehouse Location */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warehouse Location
              </label>
              <input
                value={selectedWarehouse ? selectedWarehouse.location : ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              />
            </div>

            {/* Warehouse Address */}
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warehouse Address
              </label>
              <textarea
                value={selectedWarehouse ? selectedWarehouse.address : ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
                rows="3"
              />
            </div>

          </div>
        );
      case 9:
        return (
          <div className="gap-4 container shadow-lg rounded-md p-4 grid md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warranty
              </label>
              <input
                value={formData.warrenty.warrenty}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    warrenty: {
                      ...prev.warrenty,
                      warrenty: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              />
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warranty Applicable
              </label>
              <select
                value={formData.warrenty.warrentyApplicable}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    warrenty: {
                      ...prev.warrenty,
                      warrentyApplicable: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              >
                <option value="">Select warranty applicability...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warranty Type
              </label>
              <select
                value={formData.warrenty.warrentyType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    warrenty: {
                      ...prev.warrenty,
                      warrentyType: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              >
                <option value="">Select warranty type...</option>
                <option value="standard">Standard</option>
                <option value="extended">Extended</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warranty Duration (months)
              </label>
              <input
                value={formData.warrenty.warrentyDuration}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    warrenty: {
                      ...prev.warrenty,
                      warrentyDuration: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              />
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-700 mb-1">
                Warranty Location
              </label>
              <input
                value={formData.warrenty.warrentyLocation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    warrenty: {
                      ...prev.warrenty,
                      warrentyLocation: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent"
              />
            </div>
          </div>
        );
      case 10:
        return (
          <div>GO TO NEXT PLEASE</div>
          // <div className="container mx-auto shadow-md rounded-md p-6 space-y-6">
          //   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          //      {/* Cancellation Policy */}
          //      <div>
          //       <label className="block text-md font-semibold text-gray-700 mb-2">
          //         Cancellation Policy
          //       </label>
          //       <textarea
          //         value={formData.shippingCancellationReturn.cancellationPolicy}
          //         onChange={(e) =>
          //           setFormData((prev) => ({
          //             ...prev,
          //             shippingCancellationReturn: {
          //               ...prev.shippingCancellationReturn,
          //               cancellationPolicy: e.target.value,
          //             },
          //           }))
          //         }
          //         className="w-full px-4 py-2 border border-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          //         rows="4"
          //       />
          //     </div>
          //     {/* Shipping Policy */}
          //     <div>
          //       <label className="block text-md font-semibold text-gray-700 mb-2">
          //         Shipping Policy
          //       </label>
          //       <textarea
          //         value={formData.shippingCancellationReturn.shippingPolicy}
          //         onChange={(e) =>
          //           setFormData((prev) => ({
          //             ...prev,
          //             shippingCancellationReturn: {
          //               ...prev.shippingCancellationReturn,
          //               shippingPolicy: e.target.value,
          //             },
          //           }))
          //         }
          //         className="w-full px-4 py-2 border border-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          //         rows="4"
          //       />
          //     </div>


          //     {/* Return Policy */}
          //     <div>
          //       <label className="block text-md font-semibold text-gray-700 mb-2">
          //         Return Policy
          //       </label>
          //       <textarea
          //         value={formData.shippingCancellationReturn.returnPolicy}
          //         onChange={(e) =>
          //           setFormData((prev) => ({
          //             ...prev,
          //             shippingCancellationReturn: {
          //               ...prev.shippingCancellationReturn,
          //               returnPolicy: e.target.value,
          //             },
          //           }))
          //         }
          //         className="w-full px-4 py-2 border border-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          //         rows="4"
          //       />
          //     </div>
          //   </div>

          //   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          //       {/* Shipping Duration */}
          //       <div>
          //       <label className="block text-md font-semibold text-gray-700 mb-2">
          //         Shipping Duration
          //       </label>
          //       <input
          //         value={formData.shippingCancellationReturn.shippingDuration}
          //         onChange={(e) =>
          //           setFormData((prev) => ({
          //             ...prev,
          //             shippingCancellationReturn: {
          //               ...prev.shippingCancellationReturn,
          //               shippingDuration: e.target.value,
          //             },
          //           }))
          //         }
          //         className="w-full px-4 py-2 border border-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          //       />
          //     </div>

          //     {/* Return Days */}
          //     <div>
          //       <label className="block text-md font-semibold text-gray-700 mb-2">
          //         Return Days
          //       </label>
          //       <input
          //         type="number"
          //         value={formData.shippingCancellationReturn.returnDays}
          //         onChange={(e) =>
          //           setFormData((prev) => ({
          //             ...prev,
          //             shippingCancellationReturn: {
          //               ...prev.shippingCancellationReturn,
          //               returnDays: e.target.value,
          //             },
          //           }))
          //         }
          //         className="w-full px-4 py-2 border border-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          //       />
          //     </div>



          //     {/* Cancellation Duration */}
          //     <div>
          //       <label className="block text-md font-semibold text-gray-700 mb-2">
          //         Cancellation Duration
          //       </label>
          //       <input
          //         type="number"
          //         value={formData.shippingCancellationReturn.cancellationDuration}
          //         onChange={(e) =>
          //           setFormData((prev) => ({
          //             ...prev,
          //             shippingCancellationReturn: {
          //               ...prev.shippingCancellationReturn,
          //               cancellationDuration: e.target.value,
          //             },
          //           }))
          //         }
          //         className="w-full px-4 py-2 border border-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          //       />
          //     </div>
          //   </div>
          // </div>
        );

      case 11:
        return (
          <div className=" container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium pb-1">
                COD Available
              </label>
              <select
                value={formData.pricing.codAvilable}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pricing: {
                      ...prev.pricing,
                      codAvilable: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              >
                <option value="">Select COD availability...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Length (CM)
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.length}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      length: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Width (CM)
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.width}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      width: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Depth (CM)
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.depth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      depth: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.weight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      weight: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Shipping Type
              </label>
              <select
                value={formData.packingAndShipping.shippingType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      shippingType: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              >
                <option value="">Select shipping type...</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Shipping Order
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.shippingOrder}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      shippingOrder: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Shipping Days
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.shippingDays}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      shippingDays: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Shipping Zone
              </label>
              <input
                value={formData.packingAndShipping.shippingZone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      shippingZone: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Shipping Charges
              </label>
              <input
                type="number"
                value={formData.packingAndShipping.shippingCharges}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    packingAndShipping: {
                      ...prev.packingAndShipping,
                      shippingCharges: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>
          </div>
        );

      case 12:
        return (
          <div className="container mx-auto shadow-md rounded-md p-6 space-y-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manufacturing Name */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Manufacturing Name
                </label>
                <input
                  value={formData.manufacturingDetails.manufacturingName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        manufacturingName: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Manufacturing Address */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Manufacturing Address
                </label>
                <textarea
                  value={formData.manufacturingDetails.manufacturingAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        manufacturingAddress: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  rows="3"
                />
              </div>

              {/* Country of Origin */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Country of Origin
                </label>
                <input
                  value={formData.manufacturingDetails.countryOfOrigin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        countryOfOrigin: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Batch Number */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Batch Number
                </label>
                <input
                  value={formData.manufacturingDetails.batchNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        batchNumber: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Manufacturing Date */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Manufacturing Date
                </label>
                <input
                  type="date"
                  value={formData.manufacturingDetails.manufacturingDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        manufacturingDate: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.manufacturingDetails.expiryDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        expiryDate: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Importer Name */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Importer Name
                </label>
                <input
                  value={formData.manufacturingDetails.importerName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        importerName: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* Importer Address */}
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Importer Address
                </label>
                <textarea
                  value={formData.manufacturingDetails.importerAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturingDetails: {
                        ...prev.manufacturingDetails,
                        importerAddress: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );



      case 13:
        return (
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Title
              </label>
              <input
                value={formData.seoSection.metaTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seoSection: {
                      ...prev.seoSection,
                      metaTitle: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            {/* Meta URL */}
            <div>
              <label className="block text-sm font-medium mb-1">Meta URL</label>
              <input
                value={formData.seoSection.metaURL}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seoSection: {
                      ...prev.seoSection,
                      metaURL: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            {/* Meta Keyword */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Keyword
              </label>
              <input
                value={formData.seoSection.metaKeyword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seoSection: {
                      ...prev.seoSection,
                      metaKeyword: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Description
              </label>
              <textarea
                value={formData.seoSection.metaDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seoSection: {
                      ...prev.seoSection,
                      metaDescription: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md"
                rows="3"
              />
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-4 p-5">
            <SelectMultipleMedia formData={formData} setFormData={setFormData} />

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Images:</h3>
              {formData.imageAndVideo.images?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.imageAndVideo.images.map((img, index) => (
                    <div key={`img-${index}`} className="relative group">
                      <img
                        src={img}
                        alt={`img-${index}`}
                        className="w-32 h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            imageAndVideo: {
                              ...prev.imageAndVideo,
                              images: prev.imageAndVideo.images.filter((_, i) => i !== index)
                            }
                          }))
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No images selected</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Videos:</h3>
              {formData.imageAndVideo.videos?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.imageAndVideo.videos.map((video, index) => (
                    <div key={`vid-${index}`} className="relative group">
                      <video
                        className="w-32 h-32 object-cover rounded border"
                        controls
                      >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            imageAndVideo: {
                              ...prev.imageAndVideo,
                              videos: prev.imageAndVideo.videos.filter((_, i) => i !== index)
                            }
                          }))
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No videos selected</p>
              )}
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
    <div className="max-w-[1800px] mx-auto px-6 pb-4">
      {/* <h1 className="text-3xl my-2 font-semibold uppercase">Add Product</h1> */}
      <Accordion
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        firstStep={firstStep}
      >
        {(stepNumber) => (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            {renderFormFields(stepNumber)}
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className={`px-6 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200
                  ${stepNumber === 1 ? "invisible" : "visible"}`}
              >
                Previous
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {stepNumber === steps.length ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        )}
      </Accordion>
      <ToastContainer autoClose={3000} closeButton={true} />
    </div>
  );
};

export default EditProductForm;

const CategoryStep = ({
  formData,
  setFormData,
  categoryParent,
  categorySub,
  categoryChild,
  fetchCategorySub,
  fetchCategoryChild,
  productCategoryId,
}) => {
  const [categoryLevel, setCategoryLevel] = useState(null);
const token = localStorage.getItem("token");
  useEffect(() => {
    // Determine if the product's category is parent, sub, or child
    const determineCategoryLevel = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/single-category-info-by-id/${productCategoryId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        const category = await response.json();
        
        if (category.parentCat === 0) {
          setCategoryLevel('parent');
        } else {
          const parentResponse = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/admin/single-category-info-by-id/${category.parentCat}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          const parentCategory = await parentResponse.json();
          
          if (parentCategory.parentCat === 0) {
            setCategoryLevel('sub');
          } else {
            setCategoryLevel('child');
          }
        }
      } catch (error) {
        console.error("Error determining category level:", error);
      }
    };
    
    determineCategoryLevel();
  }, [productCategoryId]);

  const handleCategoryChange = (e) => {
    const selectedCategory = parseInt(e.target.value);

    setFormData((prev) => ({
      ...prev,
      category: {
        category: selectedCategory,
      },
    }));

    fetchCategorySub(selectedCategory);
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = parseInt(e.target.value);

    setFormData((prev) => ({
      ...prev,
      category: {
        category: selectedSubCategory,
      },
    }));

    fetchCategoryChild(selectedSubCategory);
  };

  const handleChildCategoryChange = (e) => {
    const selectedChildCategory = parseInt(e.target.value);

    setFormData((prev) => ({
      ...prev,
      category: {
        category: selectedChildCategory,
      },
    }));
  };

  return (
    <div className="container mx-auto shadow-md rounded-md px-6 pb-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Main Category
        </label>
        <select
          value={formData.category.category}
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
        >
          <option value="">Select a Category</option>
          {categoryParent?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

     { <div>
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Sub Category
        </label>
        <select
          value={formData.category.category}
          onChange={handleSubCategoryChange}
          className="w-full px-4 py-2 border border-gray-400  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          disabled={!categorySub || categorySub.length === 0}
        >
          <option value="">Select sub category</option>
          {categorySub?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>}

      { <div>
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Child Category
        </label>
        <select
          value={formData.category.category}
          onChange={handleChildCategoryChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          disabled={!categoryChild || categoryChild.length === 0}
        >
          <option value="">Select a Category</option>
          {categoryChild?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>}

      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Is Featured
        </label>
        <select
          value={formData.category.isFeatured}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              category: {
                ...prev.category,
                isFeatured: e.target.value === "true",
              },
            }))
          }
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
    </div>
  </div>
  );
};
