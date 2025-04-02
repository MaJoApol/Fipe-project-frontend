"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IRegister } from "@/interface/IRegister"
import { useForm } from "react-hook-form"
import { http } from "@/lib/http-common"
import Container from "@/components/container"
import Title from "@/components/titles"
import Input from "@/components/inputs"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import Link from "next/link"
import Button from "@/components/buttons"
import Modal from "@/components/modal"
import IError from "@/interface/IError"


const registerSchema = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "Sua senha deve ter no mínimo 6 caracteres"),
    name: z.string(),
    nationalId: z.string().min(11, "CPF inválido"), // vaidar descentementeS
    contact: z.string().optional(), // vaidar descentementeS
    birthdate: z.coerce.date().optional()
})


export default function RegisterPage(){

    const [errorMessage, setErrorMessage] = useState("Erro ao cadastrar usuário, tente novamente.") 
    const [showPassword, setShowPassword] = useState(false);
    const [showRedirectModal, setShowRedirectModal] = useState(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const {handleSubmit, register, formState: {errors}} = useForm<IRegister>({
        mode: 'onSubmit',
        resolver: zodResolver(registerSchema)
    });

    async function  handleRegister(data: IRegister){

        try {
            const result = await http.post('/auth/register', data)
            if(result){
              window.location.href = '/';
            }
        } catch (error: unknown) {
          setShowRedirectModal(true)
          const err = error as IError
          if (err.response.data.error.message){
            setErrorMessage(err.response.data.error.message + err.response.data.error.context)
            console.log(err.response.data.error.message)
            return errorMessage
          }
          else{
            return errorMessage
          }
        }
        
  
       
    }

    return(
      <div>      
       <main className="flex flex-grow h-dvh grid-cols-2 bg-[#0D3164] items-center justify-center gap-30">
          <div className="scale-120">
            <img src="../LogoLogin.png" alt="" className="" />
          </div>

          <Container classNameOp="flex flex-col bg-white justify-center items-center w-1/2 h-9/10 m-10 justify-between pb-10">

            <section className="flex-none">
              <Title variant="title" >Cadastre-se</Title>
            </section>  

            <section className="w-full flex flex-col items-center justify-between p-6">
            
              <form onSubmit={handleSubmit(handleRegister)} className="w-full flex flex-col items-center justfy-between ">

                    <div className="w-full flex flex-col justify-between">
                        <div>
                            <Title variant="label" className="text-left">Nome</Title>
                            <Input variant="solid"  className="w-full [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset]" placeholder="Nome..." {...register('name')}></Input>
                            {errors.name?.message && (<Title variant="warn">{errors.name?.message}</Title>)}
                        </div>

                        <div className="min-h-[70px]">
                            <Title variant="label" className="text-left">E-mail</Title>
                            <Input variant="solid"  className="w-full [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset]" placeholder="E-mail..." {...register('email')}></Input>
                            {errors.email?.message && (<Title variant="warn">{errors.email?.message}</Title>)}
                        </div>

                        <div className="min-h-[70px]">
                            <Title variant="label" className="text-left">CPF</Title>
                            <Input variant="solid"  className="w-full [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset]" placeholder="123.123.456-68" {...register('nationalId')}></Input>
                            {errors.nationalId?.message && (<Title variant="warn">{errors.nationalId?.message}</Title>)}
                        </div>
        
                    </div>

                    <div className="w-full flex flex-col justify-between">
                    <Title variant="label" className="text-left">Senha</Title>
                    <div className="relative">
                        <div className="relative "> {/* Container adicional para o input + ícone */}
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
                    </div>

                    <div className="flex flexl-cols-2 w-full justify-around items-center gap-4">
                        
                        <div className="w-full min-h-[70px]">
                            <Title variant="label" className="text-left">Contato</Title>
                            <Input variant="solid"  className="w-full [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset]" placeholder="(48) 99912-1233" {...register('contact')}></Input>
                            {errors.contact?.message && (<Title variant="warn">{errors.contact?.message}</Title>)}
                        </div>

                        <div className="w-full min-h-[70px]">
                            <Title variant="label" className="text-left">Data de nascimento</Title>
                          
                              <Input variant="solid" className="empty w-full custom-date-placeholder [&:-webkit-autofill]:shadow-[0_0_0_1000px_#CFDDF4_inset]"></Input>
                            {errors.birthdate?.message && (<Title variant="warn">{errors.birthdate?.message}</Title>)}
                        </div>
                    </div>

                <Button variant="solid" type="submit" className="w-full mt-6">
                  Cadastrar
                </Button>

                <Title variant="caption" className="text-center">
                  Já possui uma conta?
                  <Link href={"/auth/login"} className="text-[#2563EB] cursor-pointer hover:underline">
                    <p>Entre</p>
                  </Link>
                </Title>
              </form>

            </section>
            
            <footer className="text-center">
              <Title variant="label">Marjo</Title>
              <Title variant="caption">Consultor Fipe</Title>
            </footer>


          </Container>

          {showRedirectModal && (
            <Modal>
              <Container classNameOp="flex flex-col bg-white justify-center items-center w-3/10 h-4/10 gap-5">
                <Title variant="title">
                  Falha ao cadastrar
                </Title>
                <Title>
                  {errorMessage}
                </Title>
                <Button size="sm" onClick={() => {window.location.href = '/auth/login'}} > 
                  Sair
                </Button>
              </Container>
            </Modal>
          )} 

        </main>
      </div>
    )
}