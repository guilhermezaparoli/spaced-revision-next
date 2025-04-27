import { HttpClient } from "@/infra/http/httpClient";
import { HttpMethod } from "@/infra/http/httpClientContract";
import { IService } from "../contracts/Iservice";
import { User, LoginUserResponse } from "../authServiceTypes";

export class SigninUserService implements IService<User, LoginUserResponse> {
    constructor(private _httpClient: HttpClient) { }
    async exec(body: User): Promise<LoginUserResponse> {
        const responseSignin = await this._httpClient.sendRequest<LoginUserResponse, User>({
            method: HttpMethod.POST,
            endpoint: "/auth/login",
            body,
        })
        return responseSignin;
    }
}