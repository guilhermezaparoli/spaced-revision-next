import axios from "axios";
import api from "../api/api";

type LoginProps = {
    email: string;
    password_hash: string;
}

export const AuthService = {
  login: async ({ email, password_hash }: LoginProps) => {
    try {
      const { data } = await api.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password_hash,
        }
      );

      return {
        status: 200,
        message: "Success",
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
    }
  },
};
