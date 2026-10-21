"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  useGetAllUsers,
  useGetAllDepartments,
  useGetAllCourses,
  useGetAllSemesters,
  useGetAllRegistrations,
} from "@/hooks";
import { User, Registration } from "@/types";
import { StatCard } from "../shared/stat-card";
import { CustomChartTooltip } from "../shared/custom-chart-tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  Building2,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export function AdminOverview() {
  const { data: usersData } = useGetAllUsers({ limit: 100 });
  const { data: deptsData } = useGetAllDepartments();
  const { data: coursesData } = useGetAllCourses();
  const { data: semestersData } = useGetAllSemesters();
  const { data: regsData } = useGetAllRegistrations();

  const users: User[] = usersData?.data ?? [];
  const departments = deptsData?.data ?? [];
  const courses = coursesData?.data ?? [];
  const semesters = semestersData?.data ?? [];
  const registrations: Registration[] = regsData?.data ?? [];

  // Concise Role Stats for PieChart
  const roleData = useMemo(() => {
    const counts = { STUDENT: 0, INSTRUCTOR: 0, ADMIN: 0 };
    for (const u of users) {
      if (u.role in counts) counts[u.role as keyof typeof counts]++;
    }
    return [
      { name: "Students", value: counts.STUDENT, fill: "#6366f1" },
      { name: "Instructors", value: counts.INSTRUCTOR, fill: "#10b981" },
      { name: "Admins", value: counts.ADMIN, fill: "#8b5cf6" },
    ].filter((d) => d.value > 0);
  }, [users]);

  // Concise Registration Stats for BarChart
  const regData = useMemo(() => {
    const counts: Record<string, number> = {
      ENROLLED: 0,
      PENDING: 0,
      COMPLETED: 0,
      DROPPED: 0,
    };
    for (const r of registrations) {
      counts[r.status] = (counts[r.status] || 0) + 1;
    }
    return [
      { name: "Enrolled", count: counts.ENROLLED, fill: "#10b981" },
      { name: "Pending", count: counts.PENDING, fill: "#f59e0b" },
      { name: "Completed", count: counts.COMPLETED, fill: "#6366f1" },
      { name: "Dropped", count: counts.DROPPED, fill: "#f43f5e" },
    ];
  }, [registrations]);

  const totalUsers = usersData?.meta?.total ?? users.length;
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
  const enrolledRegs = registrations.filter(
    (r) => r.status === "ENROLLED",
  ).length;
  const pendingRegs = registrations.filter(
    (r) => r.status === "PENDING",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border bg-linear-to-r from-indigo-500/10 via-purple-500/5 to-transparent p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Admin Overview
            </h1>
            <Badge
              variant="outline"
              className="border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
            >
              <Sparkles className="mr-1 h-3 w-3" /> System
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Key operational metrics, account demographics, and enrollment
            pipeline.
          </p>
        </div>
        <Link href="/admin/user">
          <Button size="sm" className="gap-1.5 shadow-xs">
            <Users className="h-4 w-4" /> Manage Users
          </Button>
        </Link>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers}
          subtitle={`${activeUsers} active accounts`}
          icon={<Users className="h-5 w-5" />}
          gradient="indigo"
        />
        <StatCard
          title="Students"
          value={roleData.find((r) => r.name === "Students")?.value ?? 0}
          subtitle="Enrolled student body"
          icon={<GraduationCap className="h-5 w-5" />}
          gradient="violet"
        />
        <StatCard
          title="Registrations"
          value={registrations.length}
          subtitle={`${enrolledRegs} enrolled · ${pendingRegs} pending`}
          icon={<FileSpreadsheet className="h-5 w-5" />}
          gradient="emerald"
        />
        <StatCard
          title="Catalog"
          value={`${departments.length} Depts`}
          subtitle={`${courses.length} courses · ${semesters.length} terms`}
          icon={<Building2 className="h-5 w-5" />}
          gradient="amber"
        />
      </div>

      {/* 2 Core Visualizations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* User Distribution Chart */}
        <Card className="lg:col-span-5 border-border/60 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              User Role Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Account proportion across platform roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-65 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`role-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(v) => `${v} users`}
                      />
                    }
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Registration Pipeline Chart */}
        <Card className="lg:col-span-7 border-border/60 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">
                Registration Pipeline
              </CardTitle>
              <CardDescription className="text-xs">
                Current course registrations by status
              </CardDescription>
            </div>
            <Link href="/admin/registration">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-65 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regData}
                  margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(v) => `${v} registrations`}
                      />
                    }
                  />
                  <Bar
                    dataKey="count"
                    name="Total"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  >
                    {regData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation Shortcuts */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            title: "All Users",
            url: "/admin/user",
            desc: `${totalUsers} users`,
            icon: Users,
          },
          {
            title: "Registrations",
            url: "/admin/registration",
            desc: `${registrations.length} records`,
            icon: FileSpreadsheet,
          },
          {
            title: "Departments",
            url: "/admin/department",
            desc: `${departments.length} units`,
            icon: Building2,
          },
          {
            title: "Courses",
            url: "/admin/course",
            desc: `${courses.length} courses`,
            icon: GraduationCap,
          },
        ].map((item) => (
          <Link key={item.title} href={item.url} className="group">
            <Card className="p-4 transition-all hover:border-indigo-500/40 hover:shadow-xs">
              <div className="flex items-center justify-between">
                <item.icon className="h-5 w-5 text-indigo-500" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminOverview;
