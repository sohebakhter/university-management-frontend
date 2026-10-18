import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const MyRegistrationTableLoading = () => {
  return (
    <div className="border rounded-lg">
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
          {[1, 2, 3].map((doctor) => (
            <TableRow key={doctor}>
              <TableCell colSpan={6}>
                <Skeleton className="h-5 w-100"></Skeleton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyRegistrationTableLoading;
