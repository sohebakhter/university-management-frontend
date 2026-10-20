"use client";

import { useMemo, useState } from "react";
import { useGetSectionAttendance } from "@/hooks";
import { Attendance, AttendanceStatus } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, CheckCircle2, FileText, Search } from "lucide-react";
import { format } from "date-fns";

const STATUS_STYLES: Record<AttendanceStatus, string> = {
  PRESENT: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300",
  LATE: "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300",
  ABSENT: "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300",
  EXCUSED: "bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-950 dark:text-sky-300",
};

export default function InstructorAttendanceHistory({ sectionId }: { sectionId: string }) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("ALL");

  const { data, isPending, isError } = useGetSectionAttendance(sectionId);
  const attendances: Attendance[] = data?.data || [];

  const uniqueDates = useMemo(() => {
    const dates = new Set<string>();
    for (const a of attendances) {
      if (a.date) dates.add(a.date.split("T")[0]);
    }
    return Array.from(dates).sort().reverse();
  }, [attendances]);

  const metrics = useMemo(() => {
    if (!attendances.length) return { sessions: 0, total: 0, rate: 0 };
    const present = attendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
    return {
      sessions: uniqueDates.length,
      total: attendances.length,
      rate: Math.round((present / attendances.length) * 100),
    };
  }, [attendances, uniqueDates]);

  const filtered = useMemo(() => {
    return attendances.filter((a) => {
      if (dateFilter !== "ALL" && a.date?.split("T")[0] !== dateFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const name = (a.registration?.student?.user?.name || a.registration?.student?.name || "").toLowerCase();
      const email = (a.registration?.student?.user?.email || a.registration?.student?.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [attendances, dateFilter, search]);

  if (isPending) return <Skeleton className="h-72 w-full rounded-xl" />;
  if (isError) return <div className="p-6 text-center text-destructive">Failed to load attendance history.</div>;
  if (attendances.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        <FileText className="mx-auto h-10 w-10 mb-2 opacity-60" />
        <p className="font-medium">No attendance records found.</p>
        <p className="text-xs mt-1">Switch to "Mark Attendance" to record your first session.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Inline Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center shadow-xs">
          <p className="text-xs text-muted-foreground">Sessions</p>
          <p className="text-xl font-bold">{metrics.sessions}</p>
        </Card>
        <Card className="p-3 text-center shadow-xs">
          <p className="text-xs text-muted-foreground">Total Records</p>
          <p className="text-xl font-bold">{metrics.total}</p>
        </Card>
        <Card className="p-3 text-center shadow-xs">
          <p className="text-xs text-muted-foreground">Attendance Rate</p>
          <p className="text-xl font-bold text-emerald-600">{metrics.rate}%</p>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-xs">
        <CardHeader className="p-3.5 border-b bg-muted/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-8 rounded-md border border-input bg-background px-2.5 text-xs shadow-xs focus-visible:outline-none"
              >
                <option value="ALL">All Dates ({uniqueDates.length})</option>
                {uniqueDates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Filter student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full sm:w-48 pl-8 text-xs"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">No records match your filter.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 text-center text-xs">#</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Student</TableHead>
                  <TableHead className="text-right text-xs pr-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r, idx) => {
                  const name = r.registration?.student?.user?.name || r.registration?.student?.name || "Student";
                  const email = r.registration?.student?.user?.email || r.registration?.student?.email || "-";
                  let dStr = r.date;
                  try {
                    dStr = format(new Date(r.date), "MMM d, yyyy");
                  } catch {}

                  return (
                    <TableRow key={r.id} className="hover:bg-muted/40">
                      <TableCell className="text-center font-mono text-xs text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="text-xs font-medium">{dStr}</TableCell>
                      <TableCell>
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{email}</p>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs border font-medium uppercase ${
                            STATUS_STYLES[r.status] || "bg-muted text-muted-foreground"
                          }`}
                        >
                          {r.status.toLowerCase()}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          <div className="p-3 border-t bg-muted/10 text-xs text-muted-foreground flex justify-between">
            <span>Showing {filtered.length} of {attendances.length} records</span>
            {dateFilter !== "ALL" && <span>Date: {dateFilter}</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
