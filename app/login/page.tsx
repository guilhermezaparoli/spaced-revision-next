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

export default function Login() {
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="bg-hero hidden p-10 md:flex md:flex-col md:justify-between">
        <h1 className="text-2xl font-bold italic text-white">
          SPACED REVISION
        </h1>
        <div className="text-white italic font-light">
          <h1 className="text-6xl">Bem vindo!</h1>
          <h1 className="text-6xl">Comece agora sua jornada com nosso sitema de revisões</h1>
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

        <Card className="border-borderGray flex w-full max-w-[500px] flex-col items-center border bg-darkbg">
          <CardHeader className="text-xl font-semibold text-white">
            Login
          </CardHeader>

          <CardContent className="flex w-full flex-col gap-4 px-8">
            <div className="flex gap-4">
              <Button className="bg-secondaryButton mb-4 w-full transition-colors">
                Google
              </Button>
              <Button className="bg-secondaryButton mb-4 w-full transition-colors">
                <span>Facebook</span>
              </Button>
            </div>
            <h1 className="text-center text-details">ou</h1>
            <div className="w-full text-white">
              <Label className="text-base text-white">Email</Label>
              <Input
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div className="w-full text-white">
              <div className="flex justify-between">
                <Label className="text-base text-white">Senha</Label>
                <Link href="" className="text-white">
                  Esqueceu?
                </Link>
              </div>
              <Input
                className="h-10 w-full rounded-lg border-details pl-3 text-white"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          </CardContent>
          <CardFooter className="w-full px-8">
            <Button className="bg-primaryButton mb-4 w-full transition-colors">
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
