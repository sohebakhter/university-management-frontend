"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllExams } from "@/hooks";
import { Exam } from "@/types";
import { Badge } from "@/components/ui/badge";
import ExamActions from "./exam-actions";
import ExamTableLoading from "./exam-table-loading";
import { FileText } from "lucide-react";

const examTypeBadgeVariant = (type: string) => {
  switch (type) {
    case "QUIZ":
      return "secondary";
    case "MIDTERM":
      return "default";
    case "FINAL":
      return "destructive";
    case "ASSIGNMENT":
      return "outline";
    default:
      return "default";
  }
};

const ExamTable = () => {
  const { data, isPending, isError } = useGetAllExams();

  const exams: Exam[] = data?.data || [];

  if (isPending) {
    return <ExamTableLoading />;
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          Failed to load exams. Please try again.
        </p>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="p-6 text-center">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Exams Found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't created any exams yet. Click "Create Exam" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Exam Date</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Section</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam: Exam) => (
            <TableRow key={exam.id}>
              <TableCell className="font-medium">{exam.title}</TableCell>
              <TableCell>
                <Badge variant={examTypeBadgeVariant(exam.type)}>
                  {exam.type}
                </Badge>
              </TableCell>
              <TableCell>{exam.totalMarks}</TableCell>
              <TableCell>
                {new Date(exam.examDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                {exam.section?.course?.title} ({exam.section?.course?.code})
              </TableCell>
              <TableCell>{exam.section?.name}</TableCell>
              <TableCell className="text-right">
                <ExamActions exam={exam} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamTable;
