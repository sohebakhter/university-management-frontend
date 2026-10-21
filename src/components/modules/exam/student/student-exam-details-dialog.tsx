"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Exam } from "@/types";
import { format, isPast, isToday } from "date-fns";
import {
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  User,
  Award,
  Layers,
} from "lucide-react";

interface StudentExamDetailsDialogProps {
  exam: Exam | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function StudentExamDetailsDialog({
  exam,
  open,
  onOpenChange,
}: StudentExamDetailsDialogProps) {
  if (!exam) return null;

  const examDateObj = exam.examDate ? new Date(exam.examDate) : null;
  const isExamPast = examDateObj
    ? isPast(examDateObj) && !isToday(examDateObj)
    : false;
  const isExamToday = examDateObj ? isToday(examDateObj) : false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant={examTypeBadgeVariant(exam.type)}>{exam.type}</Badge>
            {isExamToday ? (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                Today
              </Badge>
            ) : isExamPast ? (
              <Badge variant="secondary">Completed</Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-emerald-500 text-emerald-600 dark:text-emerald-400"
              >
                Upcoming
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl font-bold mt-2">
            {exam.title}
          </DialogTitle>
          <DialogDescription>
            Exam schedule and section details for your enrolled course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Marks & Schedule banner */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Total Marks
                </p>
                <p className="text-lg font-semibold">{exam.totalMarks}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Exam Time
                </p>
                <p className="text-sm font-semibold">
                  {examDateObj && !isNaN(examDateObj.getTime())
                    ? format(examDateObj, "p")
                    : "TBA"}
                </p>
              </div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Date: </span>
                <span className="font-medium text-foreground">
                  {examDateObj && !isNaN(examDateObj.getTime())
                    ? format(examDateObj, "PPPP")
                    : "Date not scheduled"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Course: </span>
                <span className="font-medium text-foreground">
                  {exam.section?.course?.title || "N/A"} (
                  {exam.section?.course?.code || "N/A"})
                </span>
                {exam.section?.course?.credit ? (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({exam.section.course.credit} Credits)
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Section: </span>
                <span className="font-medium text-foreground">
                  {exam.section?.name || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-muted-foreground">Semester: </span>
                <span className="font-medium text-foreground">
                  {exam.section?.semester?.name || "N/A"}{" "}
                  {exam.section?.semester?.year || ""}
                </span>
              </div>
            </div>

            {exam.section?.instructor && (
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <span className="text-muted-foreground">Instructor: </span>
                  <span className="font-medium text-foreground">
                    {exam.section.instructor?.user?.name ||
                      exam.section.instructor?.name ||
                      "N/A"}
                  </span>
                  {(exam.section.instructor?.user?.email ||
                    exam.section.instructor?.email) && (
                    <span className="text-xs text-muted-foreground ml-1">
                      (
                      {exam.section.instructor.user?.email ||
                        exam.section.instructor.email}
                      )
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
