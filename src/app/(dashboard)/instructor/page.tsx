"use client";

import Link from "next/link";
import { useGetMySections } from "@/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, CheckCircle2, ChevronRight, GraduationCap, Users } from "lucide-react";

const InstructorOverviewPage = () => {
  const { data, isPending, isError } = useGetMySections();
  const sections = data?.data || [];

  const totalStudents = sections.reduce(
    (acc: number, sec: any) => acc + (sec._count?.registrations || 0),
    0
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-linear-to-r from-blue-900 via-indigo-800 to-blue-700 p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col gap-2">
          <Badge variant="secondary" className="w-fit text-xs font-semibold">
            Instructor Portal
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome to Your Dashboard
          </h1>
          <p className="text-sm md:text-base text-blue-100 max-w-2xl">
            View your assigned sections, manage enrolled students, and track classroom attendance efficiently.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Assigned Sections
              </p>
              {isPending ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-3xl font-bold">{sections.length}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total Enrolled Students
              </p>
              {isPending ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-3xl font-bold">{totalStudents}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Quick Action
              </p>
              <Link href="/instructor/section">
                <Button size="sm" className="mt-1 text-xs gap-1">
                  Manage Attendance
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sections Overview */}
      <Card className="shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-xl">Your Assigned Sections</CardTitle>
            <CardDescription>
              Quick access to your active courses and classes
            </CardDescription>
          </div>
          <Link href="/instructor/section">
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              View All Sections
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          {isPending ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-36 w-full rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-sm text-destructive py-4">
              Failed to load sections.
            </p>
          ) : sections.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No sections currently assigned to you.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sections.slice(0, 3).map((section: any) => (
                <Link
                  key={section.id}
                  href="/instructor/section"
                  className="group block rounded-xl border p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {section.course?.code}
                    </Badge>
                    <span className="text-xs font-semibold text-primary">
                      Sec {section.name}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {section.course?.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {section.semester?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {section._count?.registrations || 0}/{section.capacity}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorOverviewPage;
