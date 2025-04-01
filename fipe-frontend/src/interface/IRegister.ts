import { IUser } from "./IUser"

export interface IRegister extends Pick<IUser, "email" | "name" | "nationalId" | "password">{
    birthdate?: Date,
    contact?: string
}