import MerchantSupplierApprovalTable from "../../components/approval/MerchantSupplierApprovalTable";
import Breadcrumbs from "../../components/Breadcrumbs";
const MerchantSupplierApproval = () => {
  const breadcrumbItems = [
    { label: "Approval Management", href: "#" },
    { label: "Merchant", href: "#" },
    { label: "Supplier Approval", href: "/admin/approval/merchent/supplier" },
  ];

  return (
    <div className="min-h-screen">
      <Breadcrumbs pageTitle="Supplier Approval" items={breadcrumbItems} />

      <div className="flex-1 rounded shadow-lg p-2 md:p-4 m-2 bg-white">
        <MerchantSupplierApprovalTable />
      </div>
    </div>
  );
};

export default MerchantSupplierApproval;
