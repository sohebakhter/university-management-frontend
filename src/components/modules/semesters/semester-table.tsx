"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllSemesters } from "@/hooks";
import { format } from "date-fns";
import { Semester } from "@/types";
import SemesterActions from "./semester-actions";

const SemesterTable = () => {
  const { data } = useSuspenseGetAllSemesters();

  const semesters = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reg. Start</TableHead>
            <TableHead>Reg. End</TableHead>
            <TableHead>Reg. Fee</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {semesters.map((semester: Semester) => (
            <TableRow key={semester.id}>
              <TableCell>{semester.name}</TableCell>
              <TableCell>{semester.year}</TableCell>
              <TableCell>{semester.status}</TableCell>
              <TableCell>
                {format(new Date(semester.registrationStart), "PPP")}
              </TableCell>
              <TableCell>
                {format(new Date(semester.registrationEnd), "PPP")}
              </TableCell>
              <TableCell>{semester.feeAmount}</TableCell>

              <TableCell className="text-right">
                <SemesterActions semester={semester} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SemesterTable;
