"use client";
import { Suspense } from "react";
import StudentTable from "./student-table";
import UserTableLoading from "./user-table-loading";

const StudentList = () => {
  return (
    <div>
      <Suspense fallback={<UserTableLoading />}>
        <StudentTable />
      </Suspense>
    </div>
  );
};

export default StudentList;
