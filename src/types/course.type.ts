import { Department } from "./department.type";

export interface Course {
  id: string;
  title: string;
  code: string;
  credit: number;
  departmentId: string;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

export interface ICreateCoursePayload {
  title: string;
  code: string;
  credit: number;
  departmentId: string;
}

export interface IUpdateCoursePayload {
  title?: string;
  code?: string;
  credit?: number;
  departmentId?: string;
}
