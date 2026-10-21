"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllExams } from "@/hooks";
import { Exam } from "@/types";
import { format, isPast, isToday } from "date-fns";
import {
  FileText,
  Calendar,
  Eye,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { StudentExamDetailsDialog } from "./student-exam-details-dialog";
import ExamTableLoading from "../exam-table-loading";

// ── Helpers ──
const EXAM_TYPE_VARIANTS: Record<
  string,
  "secondary" | "default" | "destructive" | "outline"
> = {
  QUIZ: "secondary",
  MIDTERM: "default",
  FINAL: "destructive",
  ASSIGNMENT: "outline",
};

const getExamTiming = (examDate: string | null | undefined) => {
  if (!examDate) return "unknown";
  const d = new Date(examDate);
  if (isNaN(d.getTime())) return "unknown";
  if (isToday(d)) return "today";
  return isPast(d) ? "completed" : "upcoming";
};

// ── Stat card config ──
const STAT_CARDS = [
  {
    key: "total",
    label: "Total Exams",
    icon: FileText,
    color: "",
    bg: "bg-primary/10 text-primary",
  },
  {
    key: "upcoming",
    label: "Upcoming / Today",
    icon: Clock,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "text-muted-foreground",
    bg: "bg-muted text-muted-foreground",
  },
] as const;

export function StudentExamTable() {
  const { data, isPending, isError } = useGetAllExams();
  const exams: Exam[] = data?.data || [];

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedTiming, setSelectedTiming] = useState("ALL");
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Stats (single pass)
  const stats = useMemo(() => {
    let upcoming = 0,
      completed = 0;
    for (const exam of exams) {
      const t = getExamTiming(exam.examDate);
      if (t === "completed") completed++;
      else if (t === "upcoming" || t === "today") upcoming++;
    }
    return { total: exams.length, upcoming, completed };
  }, [exams]);

  // Filtered exams
  const filteredExams = useMemo(() => {
    const q = search.toLowerCase();
    return exams.filter((exam) => {
      if (selectedType !== "ALL" && exam.type !== selectedType) return false;
      if (selectedTiming !== "ALL") {
        const t = getExamTiming(exam.examDate);
        if (selectedTiming === "UPCOMING" && t === "completed") return false;
        if (selectedTiming === "COMPLETED" && t !== "completed") return false;
      }
      if (!q) return true;
      return (
        exam.title.toLowerCase().includes(q) ||
        exam.section?.course?.code?.toLowerCase().includes(q) ||
        exam.section?.course?.title?.toLowerCase().includes(q) ||
        exam.section?.name?.toLowerCase().includes(q)
      );
    });
  }, [exams, search, selectedType, selectedTiming]);

  if (isPending) return <ExamTableLoading />;

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
        <p className="font-semibold">Failed to load exams</p>
        <p className="text-sm text-muted-foreground mt-1">
          There was an error fetching your exams. Please refresh or try again
          later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, color, bg }) => (
          <Card key={key} className="shadow-xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {label}
                </p>
                <h3 className={`text-2xl font-bold mt-1 ${color}`}>
                  {stats[key]}
                </h3>
              </div>
              <div
                className={`h-11 w-11 rounded-lg flex items-center justify-center ${bg}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, course, section..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Exam Type" />
            </SelectTrigger>
            <SelectContent>
              {["ALL", "QUIZ", "MIDTERM", "FINAL", "ASSIGNMENT"].map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "ALL"
                    ? "All Types"
                    : t.charAt(0) + t.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTiming} onValueChange={setSelectedTiming}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Timing" />
            </SelectTrigger>
            <SelectContent>
              {["ALL", "UPCOMING", "COMPLETED"].map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "ALL"
                    ? "All Status"
                    : t.charAt(0) + t.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filteredExams.length === 0 ? (
        <div className="p-10 text-center border rounded-lg bg-card shadow-xs">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 text-lg font-semibold">No Exams Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {exams.length === 0
              ? "You do not have any exams scheduled in your enrolled sections."
              : "No exams match your search or filter criteria."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-x-auto bg-card shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Exam Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Course & Section</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => {
                const timing = getExamTiming(exam.examDate);
                const examDate = exam.examDate ? new Date(exam.examDate) : null;
                const validDate = examDate && !isNaN(examDate.getTime());

                return (
                  <TableRow key={exam.id} className="hover:bg-muted/30">
                    <TableCell className="font-semibold text-foreground">
                      {exam.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={EXAM_TYPE_VARIANTS[exam.type] || "default"}
                      >
                        {exam.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">
                        {exam.section?.course?.code || "Course"} —{" "}
                        {exam.section?.name || "Sec"}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {exam.section?.course?.title || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {validDate ? (
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {format(examDate, "PPP")}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {format(examDate, "p")}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          TBA
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{exam.totalMarks}</span>
                    </TableCell>
                    <TableCell>
                      {timing === "today" ? (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                          Today
                        </Badge>
                      ) : timing === "completed" ? (
                        <Badge variant="secondary">Completed</Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        >
                          Upcoming
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => {
                          setActiveExam(exam);
                          setDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <StudentExamDetailsDialog
        exam={activeExam}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}

export default StudentExamTable;
