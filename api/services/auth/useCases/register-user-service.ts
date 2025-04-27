import { HttpClient } from "@/infra/http/httpClient";
import { IService } from "../contracts/Iservice";
import { RegisterUserResponse, User } from "../authServiceTypes";
import { HttpMethod } from "@/infra/http/httpClientContract";

export class RegisterUserService implements IService<User, RegisterUserResponse> {
    constructor(private _httpClient: HttpClient) { }

    async exec(body: User): Promise<RegisterUserResponse> {

        const createdUser = await this._httpClient.sendRequest<RegisterUserResponse, User>({
            method: HttpMethod.POST,
            endpoint: "/auth/register",
            body
        })
        return createdUser
    }

}