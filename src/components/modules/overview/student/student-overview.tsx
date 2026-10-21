"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  useGetMe,
  useGetMyRegistrations,
  useGetMyResults,
  useGetMyAttendance,
  useGetMyPayments,
} from "@/hooks";
import { Registration, Result, Attendance, Payment } from "@/types";
import { StatCard } from "../shared/stat-card";
import { CustomChartTooltip } from "../shared/custom-chart-tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  CalendarCheck,
  BookOpen,
  CreditCard,
  Award,
  ArrowUpRight,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";

export function StudentOverview() {
  const { data: meData } = useGetMe();
  const { data: regData } = useGetMyRegistrations();
  const { data: resData } = useGetMyResults();
  const { data: attData } = useGetMyAttendance();
  const { data: payData } = useGetMyPayments();

  const user = meData?.data;
  const registrations: Registration[] = regData?.data ?? [];
  const results: Result[] = resData?.data ?? [];
  const attendances: Attendance[] = attData?.data ?? [];
  const payments: Payment[] = payData?.data ?? [];

  // Enrolled courses & total credits
  const enrolledRegs = useMemo(
    () => registrations.filter((r) => r.status === "ENROLLED"),
    [registrations]
  );
  const totalCredits = useMemo(
    () => enrolledRegs.reduce((sum, r) => sum + (r.section?.course?.credit ?? 0), 0),
    [enrolledRegs]
  );

  // Cumulative GPA
  const { avgGpa, gpaStanding } = useMemo(() => {
    const valid = results.filter((r) => typeof r.gradePoint === "number");
    const gpa = valid.length > 0
      ? (valid.reduce((s, r) => s + (r.gradePoint ?? 0), 0) / valid.length).toFixed(2)
      : "0.00";
    const num = parseFloat(gpa);
    const standing = num >= 3.5 ? "Dean's Honor" : num >= 3.0 ? "Good Standing" : num > 0 ? "Academic Warning" : "No Grades Yet";
    return { avgGpa: gpa, gpaStanding: standing };
  }, [results]);

  // Overall Attendance rate
  const attRate = useMemo(() => {
    if (attendances.length === 0) return 100;
    const attended = attendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
    return Math.round((attended / attendances.length) * 100);
  }, [attendances]);

  // Course-level attendance data for BarChart
  const courseAttData = useMemo(() => {
    const map = new Map<string, { code: string; attended: number; total: number }>();
    for (const a of attendances) {
      const code = a.registration?.section?.course?.code || "Course";
      if (!map.has(code)) map.set(code, { code, attended: 0, total: 0 });
      const item = map.get(code)!;
      item.total++;
      if (a.status === "PRESENT" || a.status === "LATE") item.attended++;
    }
    return Array.from(map.values()).map((c) => {
      const rate = c.total > 0 ? Math.round((c.attended / c.total) * 100) : 100;
      return {
        code: c.code,
        rate,
        attended: c.attended,
        total: c.total,
        fill: rate >= 80 ? "#10b981" : rate >= 75 ? "#f59e0b" : "#f43f5e",
      };
    });
  }, [attendances]);

  // Exam Score progression data for AreaChart
  const examScoreData = useMemo(() => {
    return results
      .slice()
      .reverse()
      .map((r) => {
        const totalMarks = r.exam?.totalMarks || 100;
        return {
          title: r.exam?.title || r.exam?.section?.course?.code || "Exam",
          pct: Math.round((r.marks / totalMarks) * 100),
          grade: r.grade || "N/A",
          marks: r.marks,
          totalMarks,
        };
      });
  }, [results]);

  // Payment status
  const pendingPayments = payments.filter((p) => p.status === "PENDING").length;

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border bg-linear-to-r from-emerald-500/10 via-indigo-500/5 to-transparent p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome, {user?.name || "Student"}
            </h1>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="mr-1 h-3 w-3" /> {gpaStanding}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your personal academic standing, attendance compliance, and enrolled subjects.
          </p>
        </div>
        <Link href="/student/section">
          <Button size="sm" className="gap-1.5 shadow-xs">
            <BookOpen className="h-4 w-4" /> Available Sections
          </Button>
        </Link>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Cumulative GPA"
          value={avgGpa}
          subtitle={`${results.length} published exams`}
          icon={<Award className="h-5 w-5" />}
          gradient="indigo"
        />
        <StatCard
          title="Attendance"
          value={`${attRate}%`}
          subtitle={attRate >= 75 ? "Requirement met (≥75%)" : "At risk (<75%)"}
          icon={<CalendarCheck className="h-5 w-5" />}
          gradient={attRate >= 75 ? "emerald" : "rose"}
        />
        <StatCard
          title="Enrolled Courses"
          value={`${enrolledRegs.length} Courses`}
          subtitle={`${totalCredits} credit hours`}
          icon={<GraduationCap className="h-5 w-5" />}
          gradient="violet"
        />
        <StatCard
          title="Tuition Fees"
          value={pendingPayments === 0 ? "Cleared" : `${pendingPayments} Due`}
          subtitle={pendingPayments === 0 ? "Account up to date" : "Payment action required"}
          icon={<CreditCard className="h-5 w-5" />}
          gradient={pendingPayments === 0 ? "emerald" : "amber"}
        />
      </div>

      {/* 2 Core Visualizations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Exam Score Trajectory */}
        <Card className="lg:col-span-7 border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Exam Performance Trends</CardTitle>
              <CardDescription className="text-xs">Score percentage progression across published assessments</CardDescription>
            </div>
            <Link href="/student/result">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                Results <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {examScoreData.length > 0 ? (
              <div className="h-65 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={examScoreData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="title" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                    <Tooltip
                      content={
                        <CustomChartTooltip
                          valueFormatter={(v, item) => `${v}% (Grade: ${item?.payload?.grade})`}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="pct"
                      name="Score"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#scoreGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-65 items-center justify-center text-sm text-muted-foreground">
                No exam results published yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Course Attendance Compliance */}
        <Card className="lg:col-span-5 border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Course Attendance</CardTitle>
              <CardDescription className="text-xs">Subject compliance vs 75% threshold</CardDescription>
            </div>
            <Link href="/student/attendance">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                Log <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {courseAttData.length > 0 ? (
              <div className="h-65 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseAttData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="code" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                    <Tooltip
                      content={
                        <CustomChartTooltip
                          valueFormatter={(v, item) => `${v}% (${item?.payload?.attended}/${item?.payload?.total} classes)`}
                        />
                      }
                    />
                    <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Bar dataKey="rate" name="Attendance" radius={[6, 6, 0, 0]} maxBarSize={40}>
                      {courseAttData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-65 items-center justify-center text-sm text-muted-foreground">
                No attendance logs recorded yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Enrolled Courses</h2>
          <Link href="/student/my-registration">
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
              All Registrations <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {enrolledRegs.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {enrolledRegs.map((reg) => (
              <Card key={reg.id} className="p-4 border-border/60 hover:shadow-xs transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="font-mono text-xs">{reg.section?.course?.code}</Badge>
                    <p className="mt-1 font-semibold text-sm line-clamp-1">{reg.section?.course?.title}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Sec {reg.section?.name}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5" /> {reg.section?.instructor?.name || "Faculty"}
                  </span>
                  <span>{reg.section?.course?.credit ?? 3} Credits</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-sm text-muted-foreground border-dashed">
            No enrolled courses for the current semester.
          </Card>
        )}
      </div>
    </div>
  );
}

export default StudentOverview;
