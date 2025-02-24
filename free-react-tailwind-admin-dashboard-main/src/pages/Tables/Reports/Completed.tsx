import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";

export default function Completed() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | Tailadmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for Tailadmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Completed" />
      <div className="space-y-6">
        <ComponentCard title="1365 Completed Orders">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
