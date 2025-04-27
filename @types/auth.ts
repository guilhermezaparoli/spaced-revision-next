// src/types/auth.ts

export type User = {
  email: string;
  password_hash: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};


