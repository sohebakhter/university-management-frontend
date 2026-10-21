"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateRegistration, useGetSectionById } from "@/hooks";
import { CornerUpLeft } from "lucide-react";
import { toast } from "sonner";

const SectionDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");

  const { data, isPending, isError } = useGetSectionById(sectionId ?? "");
  const { mutate: sectionRegistration, isPending: isRegistering } =
    useCreateRegistration();

  const section = data?.data;

  if (isPending) return <Skeleton className="m-6 h-80" />;

  if (isError || !section) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Section not found.</p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const { course, semester, instructor } = section;
  const availableSeats = Math.max(
    0,
    section.capacity - section._count.registrations,
  );
  const canRegister =
    semester.status === "REGISTRATION_OPEN" && availableSeats > 0;

  const handleSectionRegistration = () => {
    sectionRegistration(
      { sectionId: sectionId as string },
      {
        onSuccess: () => {
          toast.success("Registration Successful");
          router.push("/student/my-registration");
        },
        onError: (err: any) => {
          toast.error(
            err?.data?.message ||
              err?.message ||
              "Faild to register this section",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div>
        <CornerUpLeft
          onClick={() => router.back()}
          className="hover:text-blue-600 cursor-pointer"
        />
        <h1 className="text-2xl font-bold">Section Details</h1>
        <p className="text-sm text-muted-foreground">
          Course and registration information
        </p>
      </div>

      <Card>
        <div className="rounded-t-xl bg-linear-to-r from-blue-900 to-indigo-700 p-5 text-white">
          <Badge variant="secondary">{course.code}</Badge>
          <h2 className="mt-2 text-2xl font-bold">{course.title}</h2>
          <p className="mt-1 text-sm text-blue-100">
            {course.department.name} · {course.credit} Credits
          </p>
          <p className="mt-2 text-sm">Section: {section.name}</p>
        </div>

        <CardContent className="space-y-5 p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Info
              label="Semester"
              value={`${semester.name} (${semester.year})`}
            />
            <Info
              label="Available Seats"
              value={`${availableSeats} / ${section.capacity}`}
            />
            <Info
              label="Semester Fee"
              value={`৳${Number(semester.feeAmount).toLocaleString("en-BD")}`}
            />
          </div>

          <hr />

          <div>
            <h3 className="font-semibold">Instructor</h3>
            <p className="mt-1">{instructor.name}</p>
            <p className="text-sm text-muted-foreground">
              {instructor.designation} · {instructor.email}
            </p>
          </div>

          <hr />

          <div>
            <h3 className="font-semibold">Registration Period</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {format(new Date(semester.registrationStart), "dd MMM yyyy")}
              {" – "}
              {format(new Date(semester.registrationEnd), "dd MMM yyyy")}
            </p>
            <Badge
              className="mt-2"
              variant={canRegister ? "default" : "secondary"}
            >
              {semester.status.replaceAll("_", " ")}
            </Badge>
          </div>

          <Button
            className=" bg-blue-800 hover:bg-blue-900"
            disabled={!canRegister || isRegistering}
            onClick={handleSectionRegistration}
          >
            Make Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="mt-1 font-medium">{value}</p>
  </div>
);

export default SectionDetails;
