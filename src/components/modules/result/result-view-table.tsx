"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllExams, useGetResultsByRegistration, useGetSectionStudents } from "@/hooks";
import { Exam, Result, SectionStudentRegistration } from "@/types";
import { Badge } from "@/components/ui/badge";
import ResultActions from "./result-actions";
import ResultTableLoading from "./result-table-loading";
import { ClipboardList } from "lucide-react";

const ResultViewTable = () => {
  const [selectedExamId, setSelectedExamId] = useState("");
  const { data: examData, isPending: examsLoading } = useGetAllExams();
  const exams: Exam[] = examData?.data || [];

  const selectedExam = useMemo(
    () => exams.find((e) => e.id === selectedExamId),
    [exams, selectedExamId],
  );

  const sectionId = selectedExam?.sectionId || "";
  const { data: studentsData, isPending: studentsLoading } =
    useGetSectionStudents(sectionId);
  const students: SectionStudentRegistration[] = studentsData?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-72">
          <Select value={selectedExamId} onValueChange={setSelectedExamId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Exam to View Results" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.title} — {exam.section?.course?.code} (
                  {exam.section?.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedExam && (
          <span className="text-xs text-muted-foreground">
            Total Marks: <strong>{selectedExam.totalMarks}</strong>
          </span>
        )}
      </div>

      {!selectedExamId && (
        <div className="p-6 text-center">
          <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Select an Exam</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose an exam to view existing results.
          </p>
        </div>
      )}

      {selectedExamId && (examsLoading || studentsLoading) && (
        <ResultTableLoading />
      )}

      {selectedExamId && !studentsLoading && students.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">
          No enrolled students found for this section.
        </div>
      )}

      {selectedExamId && students.length > 0 && (
        <ResultsForExam
          students={students}
          examId={selectedExamId}
          totalMarks={selectedExam?.totalMarks || 0}
        />
      )}
    </div>
  );
};

// Sub-component that fetches results for each student's registration
function ResultsForExam({
  students,
  examId,
  totalMarks,
}: {
  students: SectionStudentRegistration[];
  examId: string;
  totalMarks: number;
}) {

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Grade Point</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((reg, idx) => (
            <StudentResultRow
              key={reg.id}
              registration={reg}
              examId={examId}
              totalMarks={totalMarks}
              index={idx}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StudentResultRow({
  registration,
  examId,
  totalMarks,
  index,
}: {
  registration: SectionStudentRegistration;
  examId: string;
  totalMarks: number;
  index: number;
}) {
  const { data, isPending } = useGetResultsByRegistration(registration.id);
  const results: Result[] = data?.data || [];

  const result = results.find((r) => r.examId === examId);
  const name =
    registration.student?.user?.name ||
    registration.student?.name ||
    "Student";
  const email =
    registration.student?.user?.email ||
    registration.student?.email ||
    "-";

  if (isPending) {
    return (
      <TableRow>
        <TableCell className="text-center text-xs text-muted-foreground font-mono">
          {index + 1}
        </TableCell>
        <TableCell>
          <span className="text-sm font-medium">{name}</span>
          <p className="text-xs text-muted-foreground">{email}</p>
        </TableCell>
        <TableCell colSpan={5} className="text-xs text-muted-foreground">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (!result) {
    return (
      <TableRow className="opacity-60">
        <TableCell className="text-center text-xs text-muted-foreground font-mono">
          {index + 1}
        </TableCell>
        <TableCell>
          <span className="text-sm font-medium">{name}</span>
          <p className="text-xs text-muted-foreground">{email}</p>
        </TableCell>
        <TableCell colSpan={5} className="text-xs text-muted-foreground italic">
          No result submitted yet
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell className="text-center text-xs text-muted-foreground font-mono">
        {index + 1}
      </TableCell>
      <TableCell>
        <span className="text-sm font-medium">{name}</span>
        <p className="text-xs text-muted-foreground">{email}</p>
      </TableCell>
      <TableCell>
        {result.marks}
        <span className="text-xs text-muted-foreground">/{totalMarks}</span>
      </TableCell>
      <TableCell>
        {result.grade ? (
          <Badge variant="outline">{result.grade}</Badge>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell>{result.gradePoint ?? "-"}</TableCell>
      <TableCell>
        <Badge
          variant={result.status === "PUBLISHED" ? "default" : "secondary"}
        >
          {result.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <ResultActions result={result} />
      </TableCell>
    </TableRow>
  );
}

export default ResultViewTable;
