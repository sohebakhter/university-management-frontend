"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllCourses } from "@/hooks";
import { format } from "date-fns";
import CourseActions from "./course-actions";
import { Course } from "@/types/course.type";

const CourseTable = () => {
  const { data } = useSuspenseGetAllCourses();

  const courses = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead>Department Name</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course: Course) => (
            <TableRow key={course.id}>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.credit}</TableCell>
              <TableCell>{course.department.name}</TableCell>
              <TableCell>{format(new Date(course.createdAt), "PPP")}</TableCell>

              <TableCell className="text-right">
                <CourseActions course={course} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
