"use client";

import { useEffect, useMemo, useState } from "react";
import { useBulkMarkAttendance, useGetSectionAttendance, useGetSectionStudents } from "@/hooks";
import { Attendance, AttendanceStatus, SectionStudentRegistration } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Calendar, Check, CheckCircle2, Send, Users } from "lucide-react";

const STATUSES: { value: AttendanceStatus; label: string; active: string }[] = [
  { value: "PRESENT", label: "Present", active: "bg-emerald-600 text-white" },
  { value: "LATE", label: "Late", active: "bg-amber-600 text-white" },
  { value: "ABSENT", label: "Absent", active: "bg-rose-600 text-white" },
  { value: "EXCUSED", label: "Excused", active: "bg-sky-600 text-white" },
];

export default function InstructorAttendanceForm({ sectionId }: { sectionId: string }) {
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});

  const { data: studentsData, isPending, isError } = useGetSectionStudents(sectionId);
  const { data: historyData } = useGetSectionAttendance(sectionId);
  const { mutate: markAttendance, isPending: isSubmitting } = useBulkMarkAttendance();

  const students: SectionStudentRegistration[] = studentsData?.data || [];
  const attendances: Attendance[] = historyData?.data || [];

  // Existing attendances for selected date: registrationId -> status
  const recordedMap = useMemo(() => {
    const map: Record<string, AttendanceStatus> = {};
    for (const a of attendances) {
      if (a.date?.split("T")[0] === selectedDate) map[a.registrationId] = a.status;
    }
    return map;
  }, [attendances, selectedDate]);

  // Pre-fill statuses from recordedMap if already saved, else keep or default to PRESENT
  useEffect(() => {
    if (!students.length) return;
    setAttendanceMap((prev) =>
      Object.fromEntries(students.map((s) => [s.id, recordedMap[s.id] ?? prev[s.id] ?? "PRESENT"]))
    );
  }, [students, recordedMap]);

  const summary = useMemo(
    () => ({
      present: students.filter((s) => (attendanceMap[s.id] || "PRESENT") === "PRESENT").length,
      total: students.length,
      saved: Object.keys(recordedMap).length,
    }),
    [students, attendanceMap, recordedMap]
  );

  const setAll = (status: AttendanceStatus) => {
    setAttendanceMap(Object.fromEntries(students.map((s) => [s.id, status])));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !students.length) return;

    markAttendance(
      {
        sectionId,
        date: new Date(`${selectedDate}T00:00:00.000Z`).toISOString(),
        attendances: students.map((s) => ({
          registrationId: s.id,
          status: attendanceMap[s.id] || "PRESENT",
        })),
      },
      {
        onSuccess: () => toast.success(`Attendance successfully saved for ${selectedDate}!`),
        onError: (err: any) =>
          toast.error(err?.data?.message || err?.message || "Failed to save attendance"),
      }
    );
  };

  if (isPending) return <Skeleton className="h-72 w-full rounded-xl" />;
  if (isError) return <div className="p-6 text-center text-destructive">Failed to load students.</div>;
  if (!students.length) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        <Users className="mx-auto h-10 w-10 mb-2 opacity-60" />
        <p className="font-medium">No enrolled students in this section.</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-xs">
      <CardHeader className="p-4 border-b bg-muted/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                value={selectedDate}
                max={todayStr}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-9 w-40 pl-8 text-sm"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => setAll("PRESENT")}
                className="text-emerald-700 hover:bg-emerald-50"
              >
                All Present
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => setAll("ABSENT")}
                className="text-rose-700 hover:bg-rose-50"
              >
                All Absent
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              {summary.present}/{summary.total} Present
              {summary.saved > 0 && (
                <span className="text-[11px] text-muted-foreground ml-1">
                  ({summary.saved} recorded)
                </span>
              )}
            </span>
            <Button
              type="submit"
              form="attendance-form"
              size="sm"
              disabled={isSubmitting}
              className="gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              {isSubmitting ? "Saving..." : "Save Attendance"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <form id="attendance-form" onSubmit={handleSubmit}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-12 text-center text-xs">#</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-right text-xs pr-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((reg, idx) => {
                const current = attendanceMap[reg.id] || "PRESENT";
                const isRecorded = Boolean(recordedMap[reg.id]);
                const name = reg.student?.user?.name || reg.student?.name || "Student";
                const email = reg.student?.user?.email || reg.student?.email || "-";

                return (
                  <TableRow key={reg.id} className="hover:bg-muted/40">
                    <TableCell className="text-center text-xs text-muted-foreground font-mono">
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium leading-none">{name}</span>
                        {isRecorded && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200">
                            <Check className="h-2.5 w-2.5" /> Saved
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{email}</p>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <div className="inline-flex rounded-md border bg-muted/30 p-0.5">
                        {STATUSES.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() =>
                              setAttendanceMap((prev) => ({ ...prev, [reg.id]: s.value }))
                            }
                            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${current === s.value
                              ? s.active
                              : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </form>
      </CardContent>
    </Card>
  );
}
