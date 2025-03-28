"use client"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { useForm } from "react-hook-form";
import { IUser } from "@/interface/IUser";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ILogin } from "@/interface/ILogin";
import Header from "@/components/header";
import Container from "@/components/container";
import Input from "@/components/inputs";
import Button, { AddButton } from "@/components/buttons";

const loginschema = z.object({
    email: z.string().email("Insira uma e-mail válido"),
    password: z.string()
    .min(6, "Sua senha deve ter no mínimo 6 caracteres")
    .max(15, "Sua senha deve ter no máximo 15 caracteres")
});

export default function LoginPage(){
    const {handleSubmit, register, formState: {errors}} = useForm<ILogin>({
        mode: 'onSubmit',
        resolver: zodResolver(loginschema)
    });

    // const [showModal, setShowModal] = useState(false);
    // const [showIncorrectModal, setShowIncorrectModal] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);

    // async function  handleLogin({email, password}: ILogin) {
    //     const result = await signIn('credentials', {
    //         email,
    //         password,
    //         redirect: false,
    //     });
    //     console.log(result)

    //     if(result?.ok){
    //         console.log("Logado")
    //         window.location.href = '/';
    //     }
    //     else{
    //         console.log("N deu")
    //     }
    // }

    // const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return(
      <>
       <Header/>
       <main className="flex-grow bg-orange-200 items-center justify-center">
          
          <Container classNameOp="m-10 p-10 flex flex-col w-1/2">

            <section className="w-1/2 bg-red-300">

              <h1>Entrar</h1>

              <Input variant="solid"> </Input>
              <p>.</p>
              <Input variant="disabled" disabled> </Input>
              <p>.</p>
              <Button variant="solid" size="sm"> <p>Botão</p> </Button>
              <p>.</p>
              <Button variant="outline" size="sm"> <p>Botão</p> </Button>
              <p>.</p>
              <Button variant="solid" size="md"> <p>Botão</p> </Button>
              <p>.</p>
              <Button variant="outline" size="md"> <p>Botão</p> </Button>
              <p>.</p>
              <AddButton/>


            </section>

            
            

          </Container>

       </main>
      </>  
    );

}
