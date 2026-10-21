"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Attendance } from "@/types";
import { BookOpen } from "lucide-react";

export interface SectionAttendanceStat {
  sectionId: string;
  sectionName: string;
  courseCode: string;
  courseTitle: string;
  semesterName: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  rate: number;
}

interface SectionSummaryProps {
  attendances: Attendance[];
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

const STATUS_KEYS = ["present", "absent", "late", "excused"] as const;

export function StudentAttendanceSectionSummary({
  attendances,
  selectedSectionId,
  onSelectSection,
}: SectionSummaryProps) {
  const sectionStats = useMemo(() => {
    const map = new Map<string, SectionAttendanceStat>();

    for (const record of attendances) {
      const section = record.registration?.section;
      const sectionId =
        section?.id || record.registration?.sectionId || "unknown";

      if (!map.has(sectionId)) {
        map.set(sectionId, {
          sectionId,
          sectionName: section?.name || "Section",
          courseCode: section?.course?.code || "Course",
          courseTitle: section?.course?.title || "Unknown Course",
          semesterName: section?.semester
            ? `${section.semester.name} ${section.semester.year || ""}`.trim()
            : "",
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          rate: 0,
        });
      }

      const stat = map.get(sectionId)!;
      stat.total++;
      const key = record.status.toLowerCase() as (typeof STATUS_KEYS)[number];
      if (key in stat) stat[key]++;
    }

    for (const stat of map.values()) {
      if (stat.total > 0) {
        stat.rate = Math.round(((stat.present + stat.late) / stat.total) * 100);
      }
    }

    return Array.from(map.values());
  }, [attendances]);

  if (sectionStats.length === 0) return null;

  const getRateColor = (rate: number) =>
    rate >= 85 ? "emerald" : rate >= 75 ? "amber" : "destructive";

  const getBadgeVariant = (rate: number) =>
    rate >= 85
      ? ("default" as const)
      : rate >= 75
        ? ("secondary" as const)
        : ("destructive" as const);

  const miniStats = [
    {
      label: "Present",
      key: "present" as const,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Late",
      key: "late" as const,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Excused",
      key: "excused" as const,
      color: "text-blue-600 dark:text-blue-400",
    },
    { label: "Absent", key: "absent" as const, color: "text-destructive" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Section Attendance Breakdown
        </h3>
        {selectedSectionId !== "ALL" && (
          <button
            type="button"
            onClick={() => onSelectSection("ALL")}
            className="text-xs text-primary hover:underline font-medium"
          >
            Show All Sections
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sectionStats.map((stat) => {
          const isSelected = selectedSectionId === stat.sectionId;
          const color = getRateColor(stat.rate);
          const barColor =
            color === "destructive" ? "bg-destructive" : `bg-${color}-500`;

          return (
            <Card
              key={stat.sectionId}
              onClick={() =>
                onSelectSection(isSelected ? "ALL" : stat.sectionId)
              }
              className={`cursor-pointer transition-all duration-200 hover:border-primary/50 shadow-xs ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10"
                  : "bg-card"
              }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                      <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{stat.courseCode}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        ({stat.sectionName})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {stat.courseTitle}
                    </p>
                  </div>
                  <Badge
                    variant={getBadgeVariant(stat.rate)}
                    className="text-xs shrink-0"
                  >
                    {stat.rate}%
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${barColor}`}
                    style={{
                      width: `${Math.min(100, Math.max(0, stat.rate))}%`,
                    }}
                  />
                </div>

                {/* Mini counts */}
                <div className="grid grid-cols-4 gap-1 text-center pt-1 border-t text-[11px]">
                  {miniStats.map((ms) => (
                    <div key={ms.key}>
                      <span className="text-muted-foreground block text-[10px]">
                        {ms.label}
                      </span>
                      <span className={`font-semibold ${ms.color}`}>
                        {stat[ms.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default StudentAttendanceSectionSummary;
