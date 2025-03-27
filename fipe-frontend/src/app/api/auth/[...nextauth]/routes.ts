import { ISession } from "@/interface/ISession";
import { http } from "@/lib/http-common";
import { addDays } from "@/utils/addDays";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


async function refreshAccessToken(session:ISession) {
    try {
        const response = await http.post("/refresh", {
            token: session.refreshToken
        })

        const refreshedTokens = response.data;

        return {
            ...session,
            token: refreshedTokens.token,
            refreshToken: refreshedTokens.refreshToken,
            tokenTime: refreshedTokens.tokenTime
        }

    } catch (error) {
        
    }
}

const authOptions = NextAuth({
  providers: [

    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "email", placeholder: "email@email.com"},
            password: {label: "Senha", type:"password"}
        },
        async authorize(credentials, req){
            try {
                const response = await http.post("/auth/login",{
                    email: credentials?.email,
                    password: credentials?.password
                });
    
                const user = response.data;
                
                if (user){
                    return {
                        id: user.id,       // Obrigatório pelo NextAuth
                        email: user.email, // Dados adicionais opcionais
                        name: user.name,   // Pode ser usado no frontend
                        ...user,       
                    }
                }
                else{
                    return null
                }
                
            } catch (error: any) {
                console.error("Erro na autenticação:", error.response?.data)
                return null
            }
        }
    })
  ],
  callbacks: {
    async jwt({user}) {
        if(user){
            user.token = to
        }
        
    },
  }
})