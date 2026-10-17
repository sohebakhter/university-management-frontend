export type UserRole = "ADMIN" | "INSTRUCTOR" | "STUDENT";
export type InstructorStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  userId: string;
  departmentId: string | null;
  designation: string;
  instructorStatus: InstructorStatus;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
