"use client";
import Image from "next/image";
import background from "../../public/background-space.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useTransition } from "react";
import { AuthService } from "@/api/services/auth/authService";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const zodSchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8),
  });
  const [isPending, startTransiction] = useTransition()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "guilhermezapas2@gmail.com",
      password_hash: "OvoPascoa120@",
    }
  });

  async function onSubmit() {
    startTransiction(async () =>{
      const {status, message} =  await AuthService.login({
        email: "guilhermezapas2@gmail.com",
        password_hash: "OvoPascoa120@",
      });
  
      if(status === 200){
        router.push('/')
      }
        
    console.log(status)
    console.log(message)
    })

  }
  

  console.log(errors)
  console.log({isPending})
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="hidden bg-hero p-10 md:flex md:flex-col md:justify-between">
        <h1 className="text-2xl font-bold italic text-white">
          SPACED REVISION
        </h1>
        <div className="font-light italic text-white">
          <h1 className="text-6xl">Bem vindo!</h1>
          <h1 className="text-6xl">
            Comece agora sua jornada com nosso sitema de revisões
          </h1>
        </div>
      </div>

      <div className="relative flex h-screen flex-col items-center justify-center md:px-2">
        <h1 className="absolute top-2 text-lg font-bold text-white md:hidden">
          SPACED REVISION
        </h1>

        <Image
          src={background}
          alt="avatar"
          className="absolute -z-10 h-full w-full"
        />

        <Card className="flex w-full max-w-[500px] flex-col items-center border border-borderGray bg-darkbg">
          <CardHeader className="text-xl font-semibold text-white">
            Login
          </CardHeader>

          <CardContent className="flex w-full flex-col gap-4 px-8">
            <div className="flex gap-4 px-14">
              <Button className="mb-4 w-full bg-secondaryButton transition-colors">
                Google
              </Button>
              {/* <Button className="bg-secondaryButton mb-4 w-full transition-colors">
                <span>Facebook</span>
              </Button> */}
            </div>
            <h1 className="text-center text-details">ou</h1>
            <div className="w-full text-white">
              <Label className="text-base text-white">Email</Label>
              <Input
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
            </div>
            <div className="w-full text-white">
              <div className="flex justify-between">
                <Label className="text-base text-white">Senha</Label>
                <Link href="" className="text-sm text-white">
                  Esqueceu?
                </Link>
              </div>
              <Input
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="password"
                placeholder="Digite sua senha"
                {...register("password_hash")}
              />
            </div>
          </CardContent>
          <CardFooter className="w-full px-8">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="mb-4 w-full bg-primaryButton transition-colors"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
