export interface IAuthService<Input = unknown, Output = unknown> {
    signin(data: Input): Promise<Output>
    signout(): Promise<void>
    register(data: Input): Promise<void>
}