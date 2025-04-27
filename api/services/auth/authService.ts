import api from "@/api/api";
import { IHttpClient } from "@/infra/http/httpClientContract";
import { User } from "./authServiceTypes";



export class AuthService {
    constructor(private readonly httpClient: IHttpClient) { }

    async signout() {
        await api.post("/auth/logout");
    }
    async register(body: User) {
        await api.post("/auth/register", body);
    }

}