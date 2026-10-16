export interface Department {
  id: string;
  name: string;
  code: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateDepartmentPayload {
  name: string;
  code: string;
}

export interface IUpdateDepartmentPayload {
  name?: string;
  code?: string;
}
