import axios from "axios";
import api from "../../api";
import { Subject } from "@/@types/subject";



export const SubjectService = {
  getAll: async () => {
    console.log("entrou aqui222");
    try {
      const { data } = await api.get<Subject[]>("/subject");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
    }
    throw new Error("An unexpected error occurred");
  },
  create: async (body: Partial<Subject>) => {
    try {
      const { data } = await api.post<Subject>("/subject/create", body);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },
  update: async (id: string, name: string) => {
    try {
      const { data } = await api.put<Subject>(`/subject/${id}`, {
        name,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
    }
    throw new Error("An unexpected error occurred");
  },
  delete: async (id: string) => {
    try {
      const { data } = await api.delete(`/subject/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Status: ${error.response.status}, Message: ${error.response.data.message}`,
        );
      }
    }
  },
};
