import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../services/auth/authService"
import { LoginProps, LoginResponse } from "@/@types/auth"

export const useAuthMutationLogin = () => {
    return useMutation({
        mutationFn: AuthService.login,
    })
}

export const useAuthQueryMutationLogout = () => {
    return useMutation({
        mutationFn: AuthService.logout,
    })
}

export const useAuthQueryMutationRegister = () => {
    return useMutation({
        mutationFn: AuthService.register,
    })
}