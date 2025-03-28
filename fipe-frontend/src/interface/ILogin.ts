import { IUser } from "./IUser";

export interface ILogin extends Pick<IUser, "email" | "password">{}