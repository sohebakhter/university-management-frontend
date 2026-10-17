export type SemesterStatus =
  | "UPCOMING"
  | "REGISTRATION_OPEN"
  | "ONGOING"
  | "COMPLETED";

export interface Semester {
  id: string;
  name: string;
  year: number;
  status: SemesterStatus;
  registrationStart: string;
  registrationEnd: string;
  feeAmount: string; // Kept as string since it's formatted as one in the JSON, or number if parsed
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface ICreateSemesterPayload {
  name: string;
  year: number;
  registrationStart?: string;
  registrationEnd?: string;
  feeAmount: number;
}
export interface IUpdateSemesterPayload {
  name?: string;
  year?: number;
  registrationStart?: string;
  registrationEnd?: string;
  feeAmount?: number;
}
