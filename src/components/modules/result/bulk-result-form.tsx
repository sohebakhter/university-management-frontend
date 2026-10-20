"use client";

import { FileText, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useBulkCreateResult,
  useGetAllExams,
  useGetSectionStudents,
} from "@/hooks";
import type { Exam, SectionStudentRegistration } from "@/types";

interface StudentResultEntry {
  registrationId: string;
  marks: number;
  grade: string;
  gradePoint: number;
}

const GRADE_MAP: { min: number; grade: string; point: number }[] = [
  { min: 90, grade: "A+", point: 4.0 },
  { min: 85, grade: "A", point: 3.75 },
  { min: 80, grade: "A-", point: 3.5 },
  { min: 75, grade: "B+", point: 3.25 },
  { min: 70, grade: "B", point: 3.0 },
  { min: 65, grade: "B-", point: 2.75 },
  { min: 60, grade: "C+", point: 2.5 },
  { min: 55, grade: "C", point: 2.25 },
  { min: 50, grade: "D", point: 2.0 },
  { min: 0, grade: "F", point: 0.0 },
];

function autoGrade(marks: number, totalMarks: number) {
  const pct = (marks / totalMarks) * 100;
  for (const g of GRADE_MAP) {
    if (pct >= g.min) return { grade: g.grade, gradePoint: g.point };
  }
  return { grade: "F", gradePoint: 0.0 };
}

export default function BulkResultForm() {
  const [selectedExamId, setSelectedExamId] = useState("");
  const [resultsMap, setResultsMap] = useState<
    Record<string, StudentResultEntry>
  >({});

  const { data: examData, isPending: examsLoading } = useGetAllExams();
  const exams: Exam[] = examData?.data || [];
  const selectedExam = exams.find((e) => e.id === selectedExamId);

  const { data: studentsData, isPending: studentsLoading } =
    useGetSectionStudents(selectedExam?.sectionId || "");
  const students: SectionStudentRegistration[] = studentsData?.data || [];

  const { mutate: bulkCreate, isPending: isSubmitting } = useBulkCreateResult();

  const getEntry = (registrationId: string): StudentResultEntry =>
    resultsMap[registrationId] ?? {
      registrationId,
      marks: 0,
      grade: "F",
      gradePoint: 0.0,
    };

  const updateEntry = (
    registrationId: string,
    updates: Partial<StudentResultEntry>,
  ) => {
    setResultsMap((prev) => ({
      ...prev,
      [registrationId]: {
        ...getEntry(registrationId),
        ...updates,
      },
    }));
  };

  const handleMarksChange = (registrationId: string, marks: number) => {
    const total = selectedExam?.totalMarks || 100;
    const clamped = Math.max(0, Math.min(marks, total));
    const { grade, gradePoint } = autoGrade(clamped, total);
    updateEntry(registrationId, { marks: clamped, grade, gradePoint });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExamId || !students.length) return;

    const results = students.map((s) => getEntry(s.id));

    bulkCreate(
      { examId: selectedExamId, results },
      {
        onSuccess: () => {
          toast.success("Results published successfully!");
          setResultsMap({});
        },
        onError: (err: unknown) => {
          const message =
            (err as { data?: { message?: string }; message?: string })?.data
              ?.message ||
            (err as { message?: string })?.message ||
            "Failed to publish results";
          toast.error(message);
        },
      },
    );
  };

  const isLoading = examsLoading || studentsLoading;

  return (
    <Card className="shadow-xs">
      <CardHeader className="p-4 border-b bg-muted/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-72">
              <Select
                value={selectedExamId}
                onValueChange={(val) => {
                  setSelectedExamId(val);
                  setResultsMap({});
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Exam" />
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

          {selectedExamId && students.length > 0 && (
            <Button
              type="submit"
              form="bulk-result-form"
              size="sm"
              disabled={isSubmitting}
              className="gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              {isSubmitting ? "Publishing..." : "Publish Results"}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {!selectedExamId && (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Select an Exam</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose an exam from the dropdown above to enter results for
              enrolled students.
            </p>
          </div>
        )}

        {selectedExamId && isLoading && <Skeleton className="h-48 m-4" />}

        {selectedExamId && !isLoading && students.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No enrolled students found for this exam's section.
          </div>
        )}

        {selectedExamId && !isLoading && students.length > 0 && (
          <form id="bulk-result-form" onSubmit={handleSubmit}>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 text-center text-xs">#</TableHead>
                  <TableHead className="text-xs">Student</TableHead>
                  <TableHead className="text-xs w-28">Marks</TableHead>
                  <TableHead className="text-xs w-24">Grade</TableHead>
                  <TableHead className="text-xs w-28">Grade Point</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((reg, idx) => {
                  const entry = getEntry(reg.id);
                  const name =
                    reg.student?.user?.name || reg.student?.name || "Student";
                  const email =
                    reg.student?.user?.email || reg.student?.email || "-";

                  return (
                    <TableRow key={reg.id} className="hover:bg-muted/40">
                      <TableCell className="text-center text-xs text-muted-foreground font-mono">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium leading-none">
                          {name}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {email}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={selectedExam?.totalMarks}
                          value={entry.marks}
                          onChange={(e) =>
                            handleMarksChange(
                              reg.id,
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value),
                            )
                          }
                          className="h-8 w-24 text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={entry.grade}
                          onChange={(e) =>
                            updateEntry(reg.id, { grade: e.target.value })
                          }
                          className="h-8 w-20 text-sm"
                          placeholder="A+"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={4}
                          step={0.25}
                          value={entry.gradePoint}
                          onChange={(e) =>
                            updateEntry(reg.id, {
                              gradePoint: Math.max(
                                0,
                                Math.min(4, Number(e.target.value) || 0),
                              ),
                            })
                          }
                          className="h-8 w-24 text-sm"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
