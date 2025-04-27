"use client";
import useSigninModel from "./signin.model";
import { SigninView } from "./signin.view";
import { HttpClient } from "@/infra/http/httpClient";
import { SigninUserService } from "@/api/services/auth/useCases/signin-user-service";

export default function Signin() {
  const httpClient = HttpClient.create()
  const signinService = new SigninUserService(httpClient)
  const methods = useSigninModel({ signinService });


  return <SigninView {...methods} />;
}
