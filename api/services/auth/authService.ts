import axios from "axios";
import api from "../../api";
import { LoginResponse } from "@/@types/auth";

type LoginProps = {
  email: string;
  password_hash: string;
};

export const AuthService = {
  login: async ({
    email,
    password_hash,
  }: LoginProps): Promise<any> => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password_hash,
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
    }
  },
};
