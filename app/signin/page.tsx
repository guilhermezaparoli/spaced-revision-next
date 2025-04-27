"use client";
import { AuthService } from "@/api/services/auth/authService";
import useSigninModel from "./signin.model";
import { SigninView } from "./signin.view";

export default function Signin() {

  const signinService = new AuthService()
  const methods = useSigninModel({ signinService });


  return <SigninView {...methods} />;
}
