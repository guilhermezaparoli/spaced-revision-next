import axios from "axios";
import api from "../../api";

type Subject = {
  name: string;
  interval?: number[];
};

export const SubjectService = {
  getAll: async (): Promise<Subject[]> => {
    console.log("entrou aqui");
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
  create: async (body: Subject): Promise<Subject> => {
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
  update: async (id: string, body: Subject): Promise<Subject> => {
    try {
      const { data } = await api.put<Subject>(`/subject/${id}`, {
        name: body.name,
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
