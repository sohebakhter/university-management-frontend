"use client";

import { Suspense } from "react";
import StudentAttendanceTable from "./student-attendance-table";
import StudentAttendanceLoading from "./student-attendance-loading";

export function StudentAttendanceList() {
  return (
    <div>
      <Suspense fallback={<StudentAttendanceLoading />}>
        <StudentAttendanceTable />
      </Suspense>
    </div>
  );
}

export default StudentAttendanceList;
