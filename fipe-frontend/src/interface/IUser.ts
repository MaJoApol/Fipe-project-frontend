import { DefaultUser } from "next-auth";

export interface IUser extends DefaultUser{
    name: string;
    id: string;
    birthdate: Date | null;
    contact: string | null;
    nationalId: string;
    email: string;
    password: string;
    token: string | null;
}