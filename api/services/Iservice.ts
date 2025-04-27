export interface IService<Input = unknown, Output = unknown> {
    exec(data: Input): Promise<Output>;
}
