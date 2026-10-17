"use client";
import { Suspense } from "react";
import SemesterTable from "./semester-table";
import SemesterTableLoading from "./semester-table-loading";
import SemesterCreateDialog from "./semester-create-dialog";

const SemesterList = () => {
  return (
    <div>
      <div className="flex justify-end items-center my-3">
        <SemesterCreateDialog />
      </div>
      <Suspense fallback={<SemesterTableLoading />}>
        <SemesterTable />
      </Suspense>
    </div>
  );
};

export default SemesterList;
