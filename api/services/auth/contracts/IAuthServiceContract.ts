export interface IAuthService<Input = unknown, Output = unknown> {
    exec(data: Input): Promise<Output>
}