"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSuspenseGetAllStudents } from "@/hooks";
import { Student } from "@/types";
import { format } from "date-fns";

const StudentTable = () => {
  const { data } = useSuspenseGetAllStudents();
  const students: Student[] = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Admission Date</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No students found.
              </TableCell>
            </TableRow>
          )}
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{student.programName || "N/A"}</Badge>
              </TableCell>
              <TableCell>
                {format(new Date(student.admissionDate), "PPP")}
              </TableCell>
              <TableCell>
                {format(new Date(student.createdAt), "PPP")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
