import { Course } from "./course.type";
import { Semester } from "./semester.type";
import { Instructor } from "./user.type";

export interface ICreateSectionPayload {
  name: string;
  capacity: number;
  courseId: string;
  semesterId: string;
  instructorId: string;
}

export interface IUpdateSectionPayload {
  name?: string;
  capacity?: number;
  courseId?: string;
  semesterId?: string;
  instructorId?: string;
}

export interface Section {
  id: string;
  name: string;
  capacity: number;
  courseId: string;
  semesterId: string;
  instructorId: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  course: Course;
  semester: Semester;
  instructor: Instructor;
  _count: {
    registrations: number;
  };
}
