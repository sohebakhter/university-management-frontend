"use client";

import { Suspense } from "react";
import StudentResultTable from "./student-result-table";
import ResultTableLoading from "../result-table-loading";

export function StudentResultList() {
  return (
    <div>
      <Suspense fallback={<ResultTableLoading />}>
        <StudentResultTable />
      </Suspense>
    </div>
  );
}

export default StudentResultList;
