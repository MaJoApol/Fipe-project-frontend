"use client"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ILogin } from "@/interface/ILogin";
import Container from "@/components/container";
import Input from "@/components/inputs";

import Title from "@/components/titles";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "@/components/buttons";

const loginschema = z.object({
    email: z.string().email("Insira uma e-mail válido"),
    password: z.string()
    .min(6, "Sua senha deve ter no mínimo 6 caracteres")
});

export default function LoginPage(){
    const {handleSubmit, register, formState: {errors}} = useForm<ILogin>({
        mode: 'onSubmit',
        resolver: zodResolver(loginschema)
    });

    // const [showModal, setShowModal] = useState(false);
    // const [showIncorrectModal, setShowIncorrectModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin({email, password}: ILogin) {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        console.log(result)

        if(result?.ok){
            console.log("Logado")
            window.location.href = '/';
        }
        else{
            console.log("N deu")
        }
    }

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    return(
      <>
      <main className="flex flex-grow grid-cols-2 bg-[#0D3164] items-center justify-center gap-30">
  
        <div className="scale-120">
          <img src="LogoLogin.png" alt="" className="" />
        </div>

        <Container classNameOp="flex flex-col bg-white justify-center items-center w-1/2 h-9/10 m-10 gap-15">

          <section>
            <Title variant="title">Entrar</Title>
          </section>  

          <section className="w-full flex flex-col items-center gap-6 p-6">
          
            <form onSubmit={handleSubmit(handleLogin)} className="w-full flex flex-col items-center gap-4 ">
            
              <div className="w-full flex flex-col gap-1">
                <Title variant="label" className="text-left">E-mail</Title>
                <Input variant="solid"  className="w-full [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset]" placeholder="E-mail..." {...register('email')}></Input>
                {errors.email?.message && (<Title variant="warn">{errors.email?.message}</Title>)}
                
              </div>

              <div className="w-full flex flex-col gap-1">
                <Title variant="label" className="text-left">Senha</Title>

                <div className="relative">
                  <div className="relative"> {/* Container adicional para o input + ícone */}
                    <Input
                      variant="solid"
                      className="w-full [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset] pr-10" /* Adicione pr-10 */
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Senha..."
                      {...register('password')}
                    />
                    <button
                      onClick={toggleShowPassword}
                      type="button"
                      className="cursor-pointer hover:opacity-60 absolute text-black right-3 top-2/5 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showPassword ? <FiEye className="w-5" /> : <FiEyeOff className="w-5" />}
                    </button>
                  </div>
                  {errors.password?.message && (
                    <Title variant="warn" className="mt-1"> {/* Adicione mt-1 para espaçamento */}
                      {errors.password.message}
                    </Title>
                  )}
                </div>
                                
                <Title variant="caption" className="self-end">
                  <Link href={"/"}>
                  Esqueceu a senha?
                  </Link>
                </Title>
              </div>
   
              <Button variant="solid" type="submit" className="w-full mt-4">
                Entrar
              </Button>

              <Title variant="caption" className="text-center">
                Não tem uma conta?
                <Link href={"/"} className="text-[#2563EB] cursor-pointer hover:underline">
                  <p>Cadastre-se</p>
                </Link>
              </Title>
            </form>

          </section>
          
          <footer className="mt-3 text-center">
            <Title variant="label">Marjo</Title>
            <Title variant="caption">Consultor Fipe</Title>
          </footer>
        </Container>

      </main>
      </>  
    );

}
