"use client";
import { LoginProps } from "@/@types/auth";
import { useAuthMutationLogin } from "@/api/queries/auth/authQuery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import background from "../../public/background-space.png";

export default function Signin() {
  const zodSchema = z.object({
    email: z.string().email(),
    password_hash: z.string().min(8),
  });
  const router = useRouter();
  const mutationLogin = useAuthMutationLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "guilhermezapas2@gmail.com",
      password_hash: "OvoPascoa120@",
    },
  });

  async function onSubmit(data: LoginProps) {
    mutationLogin.mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  }


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
            Entrar
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
              <Label htmlFor="email" className="text-base text-white">Email</Label>
              <Input
              id="email"
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
            </div>
            <div className="w-full text-white">
              <div className="flex justify-between">
                <Label htmlFor="senha" className="text-base text-white">Senha</Label>
                <Link href="" className="text-sm text-white">
                  Esqueceu?
                </Link>
              </div>
              <Input
              id="senha"
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="password"
                placeholder="Digite sua senha"
                {...register("password_hash")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex w-full flex-col gap-2 px-8">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="mb-4 w-full bg-primaryButton transition-colors"
              disabled={mutationLogin.isPending}
            >
              {mutationLogin.isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
            </Button>
            <Link
              href="/signup"
              className="text-sm text-details transition-colors hover:opacity-70"
            >
              Ainda não possuo uma conta{" "}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
