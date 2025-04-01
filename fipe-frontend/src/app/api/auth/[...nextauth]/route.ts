import { ISession } from "@/interface/ISession";
import { http } from "@/lib/http-common";
import NextAuth from "next-auth/next";
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
        console.log(error);
        return {
            ...session,
            error: "RefreshAccessTokenError"
        }
    }
}

const authOptions = NextAuth({
    session: { // para dizer que estamos usando token
        strategy: "jwt"
    },
    pages:{ // se não estiver logado, redirecionará para cá
        signIn: "/auth"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email@email.com"},
                password: {label: "Senha", type:"password"}
            },
            async authorize(credentials){
                try {
                    console.log( credentials?.email)
                    console.log( credentials?.password)
                    console.log()
                    const response = await http.post("/auth/login",{
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    
        
                    const session = response.data; // checar o que vem em session
                    
                    if (session){
                        return {
                            id: session.user.id,       // Obrigatório pelo NextAuth
                            email: session.user.email, // Dados adicionais opcionais
                            name: session.user.name,   // Pode ser usado no frontend
                            ...session.user,       
                        }
                    }
                    else{
                        return null
                    }
                    
                } catch (error) {

                    console.error("Erro na autenticação:", error)
                    return null
                }
            }
        })
    ],
    callbacks: { 
        async jwt({user, token}) { // vai rodar quando um token e criado ou atualizado
            if(user && token){
                token.user = user;
                return token;
            } else if (Date.now() < token.user.tokenTime){
                return token; // mantém o token atual
            }
            else{
                return refreshAccessToken(token.user)
            }

        },
        async session({session, token}){ // Basicamente, pega tudo do token e coloca na sessão do usuário.
            session.user = token.user.user;
            session.token = token.user.token;
            session.refreshToken = token.user.refreshToken;
            session.tokenTime = token.user.tokenTime;
            return session;
        },
        redirect({baseUrl}){
            return `${baseUrl}`
        }
    },
});

export { authOptions as GET, authOptions as POST} // POR QUE?