export type LoginProps = {
    email: string;
    password_hash: string;
    name?: string;
};

export type LoginUserResponse = {
    token: {
        accesstoken: string;
    };
};