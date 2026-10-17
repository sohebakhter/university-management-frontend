"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllSections } from "@/hooks";
import { Section } from "@/types";
import SectionActions from "./section-actions";

const SectionTable = () => {
  const { data } = useSuspenseGetAllSections();

  const sections = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Section</TableHead>
            <TableHead>Total Capacity</TableHead>
            <TableHead>of Semester</TableHead>
            <TableHead>of Course</TableHead>
            <TableHead>Assigned Instructor</TableHead>
            <TableHead>Booked Seat</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections.map((section: Section) => (
            <TableRow key={section.id}>
              <TableCell>{section.name}</TableCell>
              <TableCell>{section.capacity}</TableCell>
              <TableCell>{section.semester.name}</TableCell>
              <TableCell>
                {section.course.title}({section.course.code})
              </TableCell>
              <TableCell>{section.instructor.name}</TableCell>
              <TableCell>{section._count.registrations}</TableCell>

              <TableCell className="text-right">
                <SectionActions section={section} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SectionTable;
