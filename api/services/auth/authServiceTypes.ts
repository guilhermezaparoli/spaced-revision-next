export type User = {
    id?: string
    name?: string;
    email: string;
    password_hash: string;
};

export type LoginUserResponse = {
    token: {
        accesstoken: string;
    };
};

export type RegisterUserResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};