"use client";
import { Suspense } from "react";
import CourseTable from "./course-table";
import CourseTableLoading from "./course-table-loading";
import CourseCreateDialog from "./course-create-dialog";

const CourseList = () => {
  return (
    <div>
      <div className="flex justify-end items-center my-3">
        <CourseCreateDialog />
      </div>
      <Suspense fallback={<CourseTableLoading />}>
        <CourseTable />
      </Suspense>
    </div>
  );
};

export default CourseList;
