import { AuthService } from "@/api/services/auth/authService"
import { IAuthService } from "@/api/services/auth/contracts/IAuthService"
import { useMutation } from "@tanstack/react-query"
const authService = new AuthService()

export const useAuthMutationLogin = (signinService: Pick<IAuthService, "signin">) => {

    return useMutation({
        mutationFn: signinService.signin,
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