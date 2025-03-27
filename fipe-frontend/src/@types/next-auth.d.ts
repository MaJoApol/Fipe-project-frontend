import { ISession } from "@/interface/ISession";
import { IUser } from "@/interface/IUser";


declare module "next-auth" {
    export interface Session extends ISession{}
    export interface User extends IUser{}
}

declare module "next/auth/jwt"{
    interface JWT{
        user: User
    }
}