import api from "@/api/api";
import { IAuthService } from "./contracts/IAuthServiceContract";
import { LoginProps, LoginUserResponse } from "./authServiceTypes";
import { HttpMethod, IHttpClient } from "@/infra/http/httpClientContract";



export class AuthService implements IAuthService {
    constructor(private readonly httpClient: IHttpClient) { }

    async signout() {
        await api.post("/auth/logout");
    }
    async register(body: LoginProps) {
        await api.post("/auth/register", body);
    }

}