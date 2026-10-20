import { Exam } from "./exam.type";
import { Registration } from "./registration.type";
import { Student } from "./user.type";

export type ResultStatus = "DRAFT" | "PUBLISHED";

export interface Result {
  id: string;
  examId: string;
  registrationId: string;
  marks: number;
  grade: string | null;
  gradePoint: number | null;
  status: ResultStatus;
  createdAt: string;
  updatedAt: string;
  exam: Exam;
  registration: Registration & {
    student: Student & {
      user?: {
        id: string;
        name: string;
        email: string;
      };
    };
  };
}

export interface ICreateResultPayload {
  examId: string;
  registrationId: string;
  marks: number;
  grade?: string;
  gradePoint?: number;
  status?: ResultStatus;
}

export interface IBulkCreateResultPayload {
  examId: string;
  results: {
    registrationId: string;
    marks: number;
    grade?: string;
    gradePoint?: number;
  }[];
}

export interface IUpdateResultPayload {
  marks?: number;
  grade?: string | null;
  gradePoint?: number | null;
  status?: ResultStatus;
}
