"use client";
import { Suspense } from "react";
import SectionTable from "./section-table";
import SectionTableLoading from "./section-table-loading";

const StudentSectionList = () => {
  return (
    <div>
      <Suspense fallback={<SectionTableLoading />}>
        <SectionTable />
      </Suspense>
    </div>
  );
};

export default StudentSectionList;
