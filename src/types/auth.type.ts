export interface IRegistrationPayload {
  name: string;
  email: string;
  password: string;
  role: "INSTRUCTOR" | "STUDENT";
}
export interface ILoginPayload {
  email: string;
  password: string;
}
export interface IVerifyAccountPayload {
  email: string;
  otp: string;
}
export interface IForgotPasswordPayload {
  email: string;
}
export interface IResetPassworddPayload {
  email: string;
  otp: string;
  newPassword: string;
}
