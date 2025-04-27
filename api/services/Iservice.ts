export interface IService<Input, Output> {
    exec(data: Input): Promise<Output>;
}
