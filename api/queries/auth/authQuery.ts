import { LoginProps } from "@/@types/auth"
import { AuthService } from "@/api/services/auth/authService"
import { LoginUserResponse } from "@/api/services/auth/authServiceTypes"
import { IService } from "@/api/services/auth/contracts/Iservice"
import { useMutation } from "@tanstack/react-query"
const authService = new AuthService()

export const useAuthMutationLogin = (signinService: IService<LoginProps, LoginUserResponse>) => {

    return useMutation({
        mutationFn: signinService.exec,
    })
}

export const useAuthQueryMutationLogout = () => {

    return useMutation({
        mutationFn: authService.signout,
    })
}

export const useAuthQueryMutationRegister = () => {

    return useMutation({
        mutationFn: authService.register,
    })
}