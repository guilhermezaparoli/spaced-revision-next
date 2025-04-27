import api from "@/api/api";
import { IAuthService } from "./contracts/IAuthService";
import { LoginProps, LoginUserResponse } from "./authService.types";



export class AuthService implements IAuthService {
    async signin(body: LoginProps) {
        const { data } = await api.post<LoginUserResponse>("/auth/login", body);

        return data;
    }
    async signout() {
        await api.post("/auth/logout");
    }
    async register(body: LoginProps) {
        await api.post("/auth/register", body);
    }

}