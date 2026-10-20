export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export interface Attendance {
  id: string;
  registrationId: string;
  date: string;
  status: AttendanceStatus;
  markedById: string;
  createdAt: string;
  updatedAt: string;
  registration?: {
    id?: string;
    studentId?: string;
    sectionId?: string;
    student?: {
      id: string;
      userId?: string;
      name?: string;
      email?: string;
      user?: {
        id: string;
        name: string;
        email: string;
      };
    };
  };
}

export interface IBulkMarkAttendancePayload {
  sectionId: string;
  date: string;
  attendances: {
    registrationId: string;
    status: AttendanceStatus;
  }[];
}

export interface SectionStudentRegistration {
  id: string;
  studentId: string;
  sectionId: string;
  status: string;
  registeredAt?: string;
  droppedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  student: {
    id: string;
    name?: string;
    email?: string;
    userId?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  };
}
