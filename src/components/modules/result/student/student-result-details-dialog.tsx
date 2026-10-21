"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Result } from "@/types";
import { format } from "date-fns";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Layers,
  Percent,
} from "lucide-react";

interface StudentResultDetailsDialogProps {
  result: Result | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getGradeBadgeVariant = (grade: string | null | undefined) => {
  if (!grade) return "outline";
  const g = grade.toUpperCase();
  if (g.startsWith("A")) return "default";
  if (g.startsWith("B")) return "secondary";
  if (g.startsWith("C") || g.startsWith("D")) return "outline";
  return "destructive";
};

export function StudentResultDetailsDialog({
  result,
  open,
  onOpenChange,
}: StudentResultDetailsDialogProps) {
  if (!result) return null;

  const totalMarks = result.exam?.totalMarks || 100;
  const percentage =
    totalMarks > 0 ? ((result.marks / totalMarks) * 100).toFixed(1) : "0";
  const examDateObj = result.exam?.examDate
    ? new Date(result.exam.examDate)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{result.exam?.type || "EXAM"}</Badge>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {result.status}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold mt-2">
            {result.exam?.title || "Exam Result"}
          </DialogTitle>
          <DialogDescription>
            Performance breakdown and official grading for this assessment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Marks and Grade Cards */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg text-center">
            <div className="p-2">
              <p className="text-xs text-muted-foreground font-medium">
                Marks Obtained
              </p>
              <p className="text-xl font-bold mt-1 text-primary">
                {result.marks}
                <span className="text-xs font-normal text-muted-foreground">
                  /{totalMarks}
                </span>
              </p>
            </div>

            <div className="p-2 border-x border-border">
              <p className="text-xs text-muted-foreground font-medium">Grade</p>
              <div className="mt-1">
                <Badge
                  variant={getGradeBadgeVariant(result.grade)}
                  className="text-sm px-2.5 py-0.5"
                >
                  {result.grade || "N/A"}
                </Badge>
              </div>
            </div>

            <div className="p-2">
              <p className="text-xs text-muted-foreground font-medium">
                Grade Point
              </p>
              <p className="text-xl font-bold mt-1 text-foreground">
                {result.gradePoint !== null && result.gradePoint !== undefined
                  ? Number(result.gradePoint).toFixed(2)
                  : "-"}
              </p>
            </div>
          </div>

          {/* Progress / Percentage */}
          <div className="rounded-lg border p-3 space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Percent className="h-4 w-4" /> Score Percentage
              </span>
              <span className="font-semibold">{percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(0, Number(percentage)))}%`,
                }}
              />
            </div>
          </div>

          {/* Detailed Course & Section info */}
          <div className="space-y-3 text-sm pt-1">
            <div className="flex items-start gap-3">
              <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Course: </span>
                <span className="font-medium text-foreground">
                  {result.exam?.section?.course?.title || "N/A"} (
                  {result.exam?.section?.course?.code || "N/A"})
                </span>
                {result.exam?.section?.course?.credit ? (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({result.exam.section.course.credit} Credits)
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Section: </span>
                <span className="font-medium text-foreground">
                  {result.exam?.section?.name || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Semester: </span>
                <span className="font-medium text-foreground">
                  {result.exam?.section?.semester?.name || "N/A"}{" "}
                  {result.exam?.section?.semester?.year || ""}
                </span>
              </div>
            </div>

            {examDateObj && !isNaN(examDateObj.getTime()) && (
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="text-muted-foreground">Exam Date: </span>
                  <span className="font-medium text-foreground">
                    {format(examDateObj, "PPPP")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StudentResultDetailsDialog;
