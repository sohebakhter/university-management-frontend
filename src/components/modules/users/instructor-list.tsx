"use client";
import { Suspense } from "react";
import InstructorTable from "./instructor-table";
import UserTableLoading from "./user-table-loading";

const InstructorList = () => {
  return (
    <div>
      <Suspense fallback={<UserTableLoading />}>
        <InstructorTable />
      </Suspense>
    </div>
  );
};

export default InstructorList;
