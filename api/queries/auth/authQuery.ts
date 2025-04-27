import { User } from "@/@types/auth"
import { LoginUserResponse } from "@/api/services/auth/authServiceTypes"
import { IService } from "@/api/services/auth/contracts/Iservice"
import { RegisterUserService } from "@/api/services/auth/useCases/register-user-service"
import { SignoutUserService } from "@/api/services/auth/useCases/signout-user-service"
import { HttpClient } from "@/infra/http/httpClient"
import { useMutation } from "@tanstack/react-query"

const httpClient = HttpClient.create()
const signOutUser = new SignoutUserService(httpClient)
const registerUser = new RegisterUserService(httpClient)

export const useAuthMutationLogin = (signinService: IService<User, LoginUserResponse>) => {

    return useMutation({
        mutationFn: signinService.exec,
    })
}

export const useAuthQueryMutationLogout = () => {

    return useMutation({
        mutationFn: signOutUser.exec,
    })
}

export const useAuthQueryMutationRegister = () => {

    return useMutation({
        mutationFn: registerUser.exec,
    })
}