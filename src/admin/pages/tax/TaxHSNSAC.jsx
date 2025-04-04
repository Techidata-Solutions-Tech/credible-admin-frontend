import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TaxTable from "../../components/tax/TaxTable";
import Breadcrumbs from "../../components/Breadcrumbs";
const Taxes = () => {
 const token = localStorage.getItem("token");
  const breadcrumbItems = [
    { label: 'Home', href: '/admin' },
    { label: 'Manage Taxes', href: '/admin/taxes/hsn-sac' },
    // { label: 'Create Product Category', href: '/create-product-category' }
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <Breadcrumbs
              pageTitle="Manage Tax"
              items={breadcrumbItems}
            />
          <TaxTable token={token}/>
        </div>
      </div>
    </div>
  );
};

export default Taxes;
