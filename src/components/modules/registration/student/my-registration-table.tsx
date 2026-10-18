"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useSuspenseGetMyRegistrations } from "@/hooks";
import { Registration } from "@/types";
import { format } from "date-fns";
import MyRegistrationActions from "./my-registration-actions";
const MyRegistrationTable = () => {
  const { data } = useSuspenseGetMyRegistrations();

  const registrations: Registration[] = data?.data ?? [];

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course / Section</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Reg. Status</TableHead>
            <TableHead>Reg. At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {registrations.length > 0 ? (
            registrations.map((registration) => (
              <TableRow key={registration.id}>

                <TableCell>
                  <div className="font-medium">
                    {registration.section?.course?.code ?? "N/A"} /{" "}
                    {registration.section?.name ?? "N/A"}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {registration.section?.course?.title ?? "Unknown Course"}
                    {" ("}
                    {registration.section?.semester?.name ?? "Unknown Semester"}{" "}
                    {registration.section?.semester?.year ?? ""}
                    {")"}
                  </div>
                </TableCell>

                <TableCell>
                  {registration.section?.instructor?.name ?? "N/A"}
                </TableCell>

                <TableCell>{registration.status}</TableCell>

                <TableCell>
                  {registration.registeredAt &&
                  !Number.isNaN(new Date(registration.registeredAt).getTime())
                    ? format(new Date(registration.registeredAt), "PPP")
                    : "N/A"}
                </TableCell>

                <TableCell className="text-right">
                  <MyRegistrationActions registration={registration} />
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No registrations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyRegistrationTable;
