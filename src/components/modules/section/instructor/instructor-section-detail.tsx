"use client";

import { useGetSectionById } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { CornerUpLeft, Users, ClipboardList } from "lucide-react";
import { useState } from "react";
import InstructorAttendanceForm from "./instructor-attendance-form";
import InstructorAttendanceHistory from "./instructor-attendance-history";

interface InstructorSectionDetailProps {
  sectionId: string;
  onBack: () => void;
}

type TabView = "overview" | "mark-attendance" | "attendance-history";

const InstructorSectionDetail = ({
  sectionId,
  onBack,
}: InstructorSectionDetailProps) => {
  const { data, isPending, isError } = useGetSectionById(sectionId);
  const [activeTab, setActiveTab] = useState<TabView>("overview");

  const section = data?.data;

  if (isPending) return <Skeleton className="m-6 h-80" />;

  if (isError || !section) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Section not found.</p>
        <Button variant="outline" className="mt-3" onClick={onBack}>
          Go Back
        </Button>
      </div>
    );
  }

  const { course, semester, instructor } = section;

  return (
    <div className="space-y-5 p-4">
      <div>
        <CornerUpLeft
          onClick={onBack}
          className="hover:text-blue-600 cursor-pointer"
        />
        <h1 className="text-2xl font-bold">Section Details</h1>
        <p className="text-sm text-muted-foreground">
          Manage attendance for this section
        </p>
      </div>

      <Card>
        <div className="rounded-t-xl bg-linear-to-r from-blue-900 to-indigo-700 p-5 text-white">
          <Badge variant="secondary">{course.code}</Badge>
          <h2 className="mt-2 text-2xl font-bold">{course.title}</h2>
          <p className="mt-1 text-sm text-blue-100">
            {course.department?.name} · {course.credit} Credits
          </p>
          <p className="mt-2 text-sm">Section: {section.name}</p>
        </div>

        <CardContent className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Semester</p>
              <p className="mt-1 font-medium">
                {semester.name} ({semester.year})
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="mt-1 font-medium">
                {section._count.registrations} / {section.capacity}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Instructor</p>
              <p className="mt-1 font-medium">{instructor.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "mark-attendance" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("mark-attendance")}
        >
          <Users className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
        <Button
          variant={activeTab === "attendance-history" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("attendance-history")}
        >
          <ClipboardList className="mr-2 h-4 w-4" />
          Attendance History
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "mark-attendance" && (
        <InstructorAttendanceForm sectionId={sectionId} />
      )}
      {activeTab === "attendance-history" && (
        <InstructorAttendanceHistory sectionId={sectionId} />
      )}
    </div>
  );
};

export default InstructorSectionDetail;
