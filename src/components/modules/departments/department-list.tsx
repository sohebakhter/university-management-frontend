"use client";
import { Suspense } from "react";
import DepartmentTable from "./department-table";
import DepartmentCreateDialog from "./department-create-dialog";
import DepartmentTableLoading from "./department-table-loading";

const DepartmentList = () => {
  return (
    <div>
      <div className="flex justify-end items-center my-3">
        <DepartmentCreateDialog />
      </div>
      <Suspense fallback={<DepartmentTableLoading />}>
        <DepartmentTable />
      </Suspense>
    </div>
  );
};

export default DepartmentList;
