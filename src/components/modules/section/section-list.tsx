"use client";
import { Suspense } from "react";
import SectionTable from "./section-table";
import SectionTableLoading from "./section-table-loading";
import SectionCreateDialog from "./section-create-dialog";

const SectionList = () => {
  return (
    <div>
      <div className="flex justify-end items-center my-3">
        <SectionCreateDialog />
      </div>
      <Suspense fallback={<SectionTableLoading />}>
        <SectionTable />
      </Suspense>
    </div>
  );
};

export default SectionList;
