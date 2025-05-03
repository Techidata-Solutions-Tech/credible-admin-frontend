import MerchantSupplierApprovalTable from "../../components/approval/MerchantSupplierApprovalTable";
import Breadcrumbs from "../../components/Breadcrumbs";
const MerchantSupplierApproval = () => {
  const breadcrumbItems = [
    { label: "Approval Management", href: "#" },
    { label: "Merchant", href: "#" },
    { label: "Supplier Approval", href: "/admin/approval/merchent/supplier" },
  ];

  return (
    <div className=" bg-white p-2 ">
      <Breadcrumbs pageTitle="Supplier Approval" items={breadcrumbItems} />

        <MerchantSupplierApprovalTable />
    </div>
  );
};

export default MerchantSupplierApproval;
