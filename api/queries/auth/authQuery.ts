import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../services/auth/authService"
import { LoginProps, LoginResponse } from "@/@types/auth"

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginProps>(AuthService.login)
}