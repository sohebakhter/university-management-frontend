"use client";

import ExamCreateDialog from "./exam-create-dialog";
import ExamTable from "./exam-table";

const ExamList = () => {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Examinations</h1>
        <p className="text-sm text-muted-foreground">
          Manage exams for your assigned sections
        </p>
      </div>

      <div className="flex justify-end items-center">
        <ExamCreateDialog />
      </div>

      <ExamTable />
    </div>
  );
};

export default ExamList;
