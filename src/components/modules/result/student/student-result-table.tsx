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
import { useGetMyResults } from "@/hooks";
import { Result } from "@/types";
import { format } from "date-fns";
import {
  Award,
  Percent,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { StudentResultDetailsDialog } from "./student-result-details-dialog";
import ResultTableLoading from "../result-table-loading";

// ── Helpers ──
const GRADE_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  A: "default",
  B: "secondary",
  C: "outline",
  D: "outline",
};

const getGradeBadgeVariant = (grade: string | null | undefined) => {
  if (!grade) return "outline" as const;
  return (
    GRADE_VARIANTS[grade.charAt(0).toUpperCase()] || ("destructive" as const)
  );
};

const pct = (marks: number, total: number) =>
  total > 0 ? (marks / total) * 100 : 0;

export function StudentResultTable() {
  const { data, isPending, isError } = useGetMyResults();
  const results: Result[] = data?.data || [];

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [activeResult, setActiveResult] = useState<Result | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Stats (single pass)
  const stats = useMemo(() => {
    if (results.length === 0) {
      return { total: 0, avgPct: "0.0", avgGP: "0.00", bestGrade: "N/A" };
    }
    let totalPct = 0,
      totalGP = 0,
      gpCount = 0,
      bestGrade = "N/A";

    for (const r of results) {
      totalPct += pct(r.marks, r.exam?.totalMarks || 100);
      if (r.gradePoint != null) {
        totalGP += Number(r.gradePoint);
        gpCount++;
      }
      if (r.grade && bestGrade === "N/A") bestGrade = r.grade;
    }

    return {
      total: results.length,
      avgPct: (totalPct / results.length).toFixed(1),
      avgGP: gpCount > 0 ? (totalGP / gpCount).toFixed(2) : "N/A",
      bestGrade,
    };
  }, [results]);

  // Filtered results
  const filteredResults = useMemo(() => {
    const q = search.toLowerCase();
    return results.filter((r) => {
      if (selectedType !== "ALL" && r.exam?.type !== selectedType) return false;
      if (!q) return true;
      return (
        r.exam?.title?.toLowerCase().includes(q) ||
        r.exam?.section?.course?.code?.toLowerCase().includes(q) ||
        r.exam?.section?.course?.title?.toLowerCase().includes(q) ||
        r.exam?.section?.name?.toLowerCase().includes(q)
      );
    });
  }, [results, search, selectedType]);

  // Stat card config
  const statCards = [
    {
      label: "Exams Graded",
      value: stats.total,
      suffix: "",
      icon: Award,
      color: "",
      bg: "bg-primary/10 text-primary",
    },
    {
      label: "Avg. Score",
      value: stats.avgPct,
      suffix: "%",
      icon: Percent,
      color: "text-primary",
      bg: "bg-primary/10 text-primary",
    },
    {
      label: "Avg. Grade Point",
      value: stats.avgGP,
      suffix: "",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Status",
      value: "Published",
      suffix: "",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  if (isPending) return <ResultTableLoading />;

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
        <p className="font-semibold">Failed to load results</p>
        <p className="text-sm text-muted-foreground mt-1">
          There was an error fetching your published results. Please refresh or
          try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {statCards.map(({ label, value, suffix, icon: Icon, color, bg }) => (
          <Card key={label} className="shadow-xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {label}
                </p>
                <h3 className={`text-2xl font-bold mt-1 ${color}`}>
                  {value}
                  {suffix}
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
            placeholder="Search by course code, title, exam..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
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
        </div>
      </div>

      {/* Table */}
      {filteredResults.length === 0 ? (
        <div className="p-10 text-center border rounded-lg bg-card shadow-xs">
          <Award className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 text-lg font-semibold">No Results Published</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length === 0
              ? "You do not have any published results yet. Check back once your instructors publish grading."
              : "No results match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-x-auto bg-card shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Course & Section</TableHead>
                <TableHead>Exam Title & Type</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Grade Point</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => {
                const totalMarks = result.exam?.totalMarks || 100;
                const percentage = pct(result.marks, totalMarks).toFixed(0);
                const examDate = result.exam?.examDate
                  ? new Date(result.exam.examDate)
                  : null;
                const validDate = examDate && !isNaN(examDate.getTime());

                return (
                  <TableRow key={result.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="font-semibold text-foreground">
                        {result.exam?.section?.course?.code || "Course"} —{" "}
                        {result.exam?.section?.name || "Sec"}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {result.exam?.section?.course?.title || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">
                        {result.exam?.title || "Exam"}
                      </div>
                      <Badge variant="outline" className="text-[10px] mt-0.5">
                        {result.exam?.type || "EXAM"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">
                        {result.marks}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /{totalMarks}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-muted rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(0, Number(percentage)))}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium">
                          {percentage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {result.grade ? (
                        <Badge variant={getGradeBadgeVariant(result.grade)}>
                          {result.grade}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {result.gradePoint != null
                        ? Number(result.gradePoint).toFixed(2)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {validDate ? format(examDate, "PP") : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => {
                          setActiveResult(result);
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

      <StudentResultDetailsDialog
        result={activeResult}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}

export default StudentResultTable;
