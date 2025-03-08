import axios from "axios";
import api from "../../api";
import { Register } from "@/@types/auth";

type LoginProps = {
  email: string;
  password_hash: string;
};

export const AuthService = {
  login: async ({ email, password_hash }: LoginProps) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password_hash,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  logout: async () => {
 
    try {
      const response = await api.post("/auth/logout");
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
    }
  },
  register: async ({ email, password_hash, name }: Register) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password_hash,
        name,
      });
      console.log(response);
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
