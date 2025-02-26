import Image from "next/image";
import background from "../../public/bg.png";
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

export default function Login() {
  return (
    <div className="relative flex h-screen items-center justify-center ">
      <Image
        src={background}
        alt="avatar"
        className="absolute -z-10 h-full w-full"
      />

      <Card className="border-borderGray flex w-full flex-col items-center border bg-darkbg">
        <CardHeader className="text-xl font-semibold text-white">
          Login
        </CardHeader>

        <CardContent className="flex w-full flex-col gap-4 px-8">
          <div className="w-full text-white">
            <Label className="text-base text-white">Email</Label>
            <Input className="h-10 w-full rounded-lg border-details pl-3 text-white" type="email" placeholder="Digite seu e-mail" />
          </div>
          <div className="w-full text-white">
            <Label className="text-base text-white">Senha</Label>
            <Input className="h-10 w-full rounded-lg border-details pl-3 text-white" type="password" placeholder="Digite sua senha" />
          </div>
        </CardContent>
        <CardFooter className=" w-full px-8">
          <Button className="mb-4 w-full bg-primaryButton transition-colors hover:opacity-20">Entrar</Button>
          
        </CardFooter>
      </Card>
    </div>
  );
}
