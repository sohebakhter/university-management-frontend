export type UserRole = "ADMIN" | "INSTRUCTOR" | "STUDENT";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type InstructorStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  imageUrl?: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export interface Student {
  id: string;
  name: string;
  email: string;
  userId: string;
  departmentId: string | null;
  programName: string | null;
  admissionDate: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserStatusPayload {
  status: UserStatus;
}

export interface IUpdateInstructorPayload {
  name?: string;
  designation?: string;
  departmentId?: string | null;
}

export interface IUpdateInstructorStatusPayload {
  instructorStatus: InstructorStatus;
}

export interface IUpdateStudentPayload {
  name?: string;
  programName?: string | null;
  departmentId?: string | null;
}

export interface IUserFilterParams {
  role?: UserRole;
  searchTerm?: string;
  page?: number;
  limit?: number;
}
