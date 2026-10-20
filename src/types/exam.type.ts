import { Course } from "./course.type";
import { Semester } from "./semester.type";
import { Instructor } from "./user.type";

export type ExamType = "QUIZ" | "MIDTERM" | "FINAL" | "ASSIGNMENT";

export interface Exam {
  id: string;
  title: string;
  type: ExamType;
  totalMarks: number;
  examDate: string;
  sectionId: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  section: {
    id: string;
    name: string;
    capacity: number;
    courseId: string;
    semesterId: string;
    instructorId: string;
    isDeleted: boolean;
    course: Course;
    semester: Semester;
    instructor: Instructor & {
      user?: {
        id: string;
        name: string;
        email: string;
      };
    };
  };
}

export interface ICreateExamPayload {
  title: string;
  type: ExamType;
  totalMarks: number;
  examDate: string;
  sectionId: string;
}

export interface IUpdateExamPayload {
  title?: string;
  type?: ExamType;
  totalMarks?: number;
  examDate?: string;
}
