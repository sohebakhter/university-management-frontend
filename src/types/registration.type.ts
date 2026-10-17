import { Section } from "./section.type";
import { Student } from "./user.type";

export type RegistrationStatus =
  | "PENDING"
  | "ENROLLED"
  | "DROPPED"
  | "COMPLETED";

export interface Registration {
  id: string;
  studentId: string;
  sectionId: string;
  status: RegistrationStatus;
  registeredAt: string;
  droppedAt: string | null;
  createdAt: string;
  updatedAt: string;
  student: Student;
  section: Section;
}
