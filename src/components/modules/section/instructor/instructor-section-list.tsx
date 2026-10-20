"use client";

import { useGetMySections } from "@/hooks";
import { Section } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar } from "lucide-react";
import { useState } from "react";
import InstructorSectionDetail from "./instructor-section-detail";

const InstructorSectionList = () => {
  const { data, isPending, isError } = useGetMySections();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );

  const sections: Section[] = data?.data || [];

  if (selectedSectionId) {
    return (
      <InstructorSectionDetail
        sectionId={selectedSectionId}
        onBack={() => setSelectedSectionId(null)}
      />
    );
  }

  if (isPending) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          Failed to load your sections. Please try again.
        </p>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="p-6 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Sections Assigned</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You have not been assigned to any sections yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">My Sections</h1>
        <p className="text-sm text-muted-foreground">
          Sections assigned to you. Select a section to manage attendance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card
            key={section.id}
            className="transition-shadow hover:shadow-md cursor-pointer"
            onClick={() => setSelectedSectionId(section.id)}
          >
            <div className="rounded-t-xl bg-linear-to-r from-blue-900 to-indigo-700 p-4 text-white">
              <Badge variant="secondary">{section.course.code}</Badge>
              <h3 className="mt-2 text-lg font-bold">
                {section.course.title}
              </h3>
              <p className="mt-1 text-sm text-blue-100">
                Section: {section.name}
              </p>
            </div>

            <CardContent className="space-y-3 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {section.semester.name} ({section.semester.year})
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {section._count.registrations} / {section.capacity} Students
                </span>
              </div>

              <Button variant="default" className="w-full mt-2" size="sm">
                Manage Section
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstructorSectionList;
