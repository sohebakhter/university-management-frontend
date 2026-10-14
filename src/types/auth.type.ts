export interface IRegistrationPayload {
    name: string
    email: string
    password: string
    patient: {
        contactNumber?: string
    }
}
export interface ILoginPayload {
    email: string
    password: string
}
export interface IVerifyAccountPayload {
    email: string
    otp: string
}