"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDepartments } from "@/hooks";
import { Department } from "@/types";
import { format } from "date-fns";
import DepartmentActions from "./department-actions";

const DepartmentTable = () => {
  const { data } = useSuspenseGetAllDepartments();

  const departments = data?.data || [];

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept: Department) => (
              <TableRow key={dept.id}>
                <TableCell>{dept.code}</TableCell>
                <TableCell>{dept.name}</TableCell>
                <TableCell>{format(new Date(dept.createdAt), "PPP")}</TableCell>

                <TableCell className="text-right">
                  <DepartmentActions department={dept} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="my-5">
        <TablePagination
          totalPages={data.meta.totalPages ?? 0}
          setPage={setPage}
          page={params.page ?? 0}
        />
      </div> */}
    </>
  );
};

export default DepartmentTable;
