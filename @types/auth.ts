// src/types/auth.ts

export type LoginProps = {
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
  

  export type Register = {
    email: string;
    password_hash: string;
    name: string;
  };