import { ISession } from "@/interface/ISession";
import { IUser } from "@/interface/IUser";
import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth" {
    export interface Session extends ISession{
        user: User,
        token: string,
        refreshToken: string,
        tokenTime: number
    }
    export interface User extends IUser{}
}

declare module "next-auth/jwt"{
    interface JWT{
        user: User
    }
}