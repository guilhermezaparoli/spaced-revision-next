"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import background from "../../public/background-space.png";
import { useSignup } from "./useSignup";

export default function Signup() {
  const {
    register,
    handleSubmit,
    onSubmit,
    mutationRegister,
  } = useSignup();

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
            Cadastre-se
          </CardHeader>

          <CardContent className="flex w-full flex-col gap-4 px-8">
            <div className="flex gap-4 px-14">
              <Button className="mb-4 w-full bg-secondaryButton transition-colors">
                Google
              </Button>
            </div>
            <h1 className="text-center text-details">ou</h1>
            <div className="w-full text-white">
              <Label id="name" className="text-base text-white">
                Nome
              </Label>
              <Input
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                id="name"
                placeholder="Digite seu nome"
                {...register("name")}
              />
            </div>
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
              <Label className="text-base text-white">Senha</Label>

              <Input
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="password"
                placeholder="Digite sua senha"
                {...register("password_hash")}
              />
            </div>
          </CardContent>
          <CardFooter className="gap-2s flex w-full flex-col px-8">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="mb-4 w-full bg-primaryButton transition-colors"
              disabled={mutationRegister.isPending}
            >
              {mutationRegister.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Criar conta"
              )}
            </Button>

            <Link
              href="/signin"
              className="text-sm text-details transition-colors hover:opacity-70"
            >
              Já possuo uma conta
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
