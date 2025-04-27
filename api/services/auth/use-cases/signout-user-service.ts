import { HttpClient } from "@/infra/http/httpClient";
import { IService } from "../contracts/Iservice";
import { HttpMethod } from "@/infra/http/httpClientContract";

export class SignoutUserService implements IService {
    constructor(private _httpClient: HttpClient) { }

    async exec() {
        await this._httpClient.sendRequest({
            method: HttpMethod.POST,
            endpoint: '/auth/logout'
        })
    }
}