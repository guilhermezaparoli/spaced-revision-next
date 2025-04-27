import axios, { AxiosError, AxiosInstance } from "axios";
import { HttpRequest, IHttpClient } from "./httpClientContract";

export class HttpClient implements IHttpClient {

    private constructor(
        private api: AxiosInstance = axios,
        private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    ) { }

    static create() {
        return new HttpClient()
    }


    async sendRequest<TResponse, TBody>(props: HttpRequest<TBody>) {
        const { endpoint, method, body, headers } = props

        try {
            const { data } = await this.api.request<TResponse>({
                url: `${this.baseUrl}${endpoint}`,
                method,
                headers,
                data: body
            })
            return data
        } catch (er) {
            const error = er as AxiosError
            const status = error.response?.status || 500
            const message = error.response?.data || error.message
            throw new Error(`Request failed with status ${status}: ${message}`)
        }
    }


}