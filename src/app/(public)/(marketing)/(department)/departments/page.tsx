import DepartmentTableLoading from "@/components/modules/departments/department-table-loading";
import PublicDepartmentTable from "@/components/modules/departments/public-department-table";
import { Suspense } from "react";

const PublicDepartmentPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <p>here is the departments of all course you can choose.</p>
      </div>
      <Suspense fallback={<DepartmentTableLoading />}>
        <PublicDepartmentTable />
      </Suspense>
    </div>
  );
};

export default PublicDepartmentPage;
