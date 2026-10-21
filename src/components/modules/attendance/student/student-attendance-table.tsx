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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMyAttendance } from "@/hooks";
import { Attendance, AttendanceStatus } from "@/types";
import { format } from "date-fns";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  Search,
  Calendar,
  AlertCircle,
  Activity,
} from "lucide-react";
import { StudentAttendanceSectionSummary } from "./student-attendance-section-summary";
import StudentAttendanceLoading from "./student-attendance-loading";

// ── Status badge config ──
const STATUS_CONFIG: Record<
  AttendanceStatus,
  { icon: typeof CheckCircle2; label: string; className: string }
> = {
  PRESENT: {
    icon: CheckCircle2,
    label: "Present",
    className: "bg-emerald-600 hover:bg-emerald-700 text-white gap-1",
  },
  LATE: {
    icon: Clock,
    label: "Late",
    className: "bg-amber-500 hover:bg-amber-600 text-white gap-1",
  },
  EXCUSED: { icon: HelpCircle, label: "Excused", className: "gap-1" },
  ABSENT: { icon: XCircle, label: "Absent", className: "gap-1" },
};

const StatusBadge = ({ status }: { status: AttendanceStatus }) => {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return <Badge variant="outline">{status}</Badge>;
  const Icon = cfg.icon;
  const variant =
    status === "EXCUSED"
      ? "secondary"
      : status === "ABSENT"
        ? "destructive"
        : "default";
  return (
    <Badge variant={variant} className={cfg.className}>
      <Icon className="h-3 w-3" /> {cfg.label}
    </Badge>
  );
};

// ── Stat card config ──
const STAT_CARDS = [
  {
    key: "rate",
    label: "Overall Rate",
    suffix: "%",
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "present",
    label: "Total Present",
    suffix: "",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    key: "lateExc",
    label: "Late / Excused",
    suffix: "",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    key: "absent",
    label: "Total Absent",
    suffix: "",
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
] as const;

export function StudentAttendanceTable() {
  const { data, isPending, isError } = useGetMyAttendance();
  const attendances: Attendance[] = data?.data || [];

  const [search, setSearch] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Distinct sections for dropdown
  const sectionsList = useMemo(() => {
    const map = new Map<string, { id: string; label: string }>();
    for (const r of attendances) {
      const sec = r.registration?.section;
      const id = sec?.id || r.registration?.sectionId;
      if (id && !map.has(id)) {
        map.set(id, {
          id,
          label: `${sec?.course?.code || "Course"} (${sec?.name || "Sec"})`,
        });
      }
    }
    return Array.from(map.values());
  }, [attendances]);

  // Overall stats (single pass)
  const stats = useMemo(() => {
    let present = 0,
      absent = 0,
      late = 0,
      excused = 0;
    for (const r of attendances) {
      if (r.status === "PRESENT") present++;
      else if (r.status === "ABSENT") absent++;
      else if (r.status === "LATE") late++;
      else if (r.status === "EXCUSED") excused++;
    }
    const total = attendances.length;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    return {
      total,
      present,
      absent,
      late,
      excused,
      rate,
      lateExc: late + excused,
    };
  }, [attendances]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase();
    return attendances.filter((r) => {
      const sec = r.registration?.section;
      const secId = sec?.id || r.registration?.sectionId;
      if (selectedSectionId !== "ALL" && secId !== selectedSectionId)
        return false;
      if (selectedStatus !== "ALL" && r.status !== selectedStatus) return false;
      if (!q) return true;
      return (
        sec?.course?.code?.toLowerCase().includes(q) ||
        sec?.course?.title?.toLowerCase().includes(q) ||
        sec?.name?.toLowerCase().includes(q) ||
        (r.date && format(new Date(r.date), "PPP").toLowerCase().includes(q))
      );
    });
  }, [attendances, selectedSectionId, selectedStatus, search]);

  if (isPending) return <StudentAttendanceLoading />;

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
        <p className="font-semibold">Failed to load attendance records</p>
        <p className="text-sm text-muted-foreground mt-1">
          There was an error fetching your attendance data. Please refresh or
          try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, suffix, icon: Icon, color, bg }) => (
          <Card key={key} className="shadow-xs">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {label}
                </p>
                <h3 className={`text-2xl font-bold mt-1 ${color}`}>
                  {stats[key]}
                  {suffix}
                </h3>
              </div>
              <div
                className={`h-11 w-11 rounded-lg ${bg} flex items-center justify-center ${color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section breakdown */}
      <StudentAttendanceSectionSummary
        attendances={attendances}
        selectedSectionId={selectedSectionId}
        onSelectSection={setSelectedSectionId}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course, section, date..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedSectionId}
            onValueChange={setSelectedSectionId}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Sections</SelectItem>
              {sectionsList.map((sec) => (
                <SelectItem key={sec.id} value={sec.id}>
                  {sec.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {["ALL", "PRESENT", "LATE", "EXCUSED", "ABSENT"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "ALL"
                    ? "All Status"
                    : s.charAt(0) + s.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filteredRecords.length === 0 ? (
        <div className="p-10 text-center border rounded-lg bg-card shadow-xs">
          <CalendarCheck className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 text-lg font-semibold">
            No Attendance Records Found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {attendances.length === 0
              ? "You do not have any recorded attendance sessions yet."
              : "No records match your selected section or status filter."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-x-auto bg-card shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Date & Day</TableHead>
                <TableHead>Course & Section</TableHead>
                <TableHead>Attendance Status</TableHead>
                <TableHead>Semester</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => {
                const dateObj = record.date ? new Date(record.date) : null;
                const validDate = dateObj && !isNaN(dateObj.getTime());
                const sec = record.registration?.section;

                return (
                  <TableRow key={record.id} className="hover:bg-muted/30">
                    <TableCell>
                      {validDate ? (
                        <div className="space-y-0.5">
                          <div className="text-sm font-semibold flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {format(dateObj, "PPP")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(dateObj, "EEEE")}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          N/A
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-foreground">
                        {sec?.course?.code || "Course"} —{" "}
                        {sec?.name || "Section"}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {sec?.course?.title || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={record.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sec?.semester?.name || "Semester"}{" "}
                      {sec?.semester?.year || ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default StudentAttendanceTable;
