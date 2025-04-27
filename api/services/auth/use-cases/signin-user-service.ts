import { HttpClient } from "@/infra/http/httpClient";
import { HttpMethod } from "@/infra/http/httpClientContract";
import { IService } from "../contracts/Iservice";
import { LoginProps, LoginUserResponse } from "../authServiceTypes";

export class SigninUserService implements IService<LoginProps, LoginUserResponse> {
    constructor(private _httpClient: HttpClient) { }
    async exec(body: LoginProps): Promise<LoginUserResponse> {
        const responseSignin = await this._httpClient.sendRequest<LoginUserResponse, LoginProps>({
            method: HttpMethod.POST,
            endpoint: "/auth/login",
            body,
        })
        return responseSignin;
    }
}