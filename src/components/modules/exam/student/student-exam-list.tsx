"use client";

import { Suspense } from "react";
import StudentExamTable from "./student-exam-table";
import ExamTableLoading from "../exam-table-loading";

export function StudentExamList() {
  return (
    <div>
      <Suspense fallback={<ExamTableLoading />}>
        <StudentExamTable />
      </Suspense>
    </div>
  );
}

export default StudentExamList;
