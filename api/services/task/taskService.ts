import axios from "axios";
import api from "../../api";

type TaskProps = {
  id: string;
  name?: string;
  description?: string;
  completed?: boolean;
};

export const TaskService = {
  update: async ({ id, completed, description, name }: TaskProps) => {
    console.log("entrou aqui");
    try {
      const { data } = await api.patch(`/task/${id}`, {
        name,
        completed,
        description,
      });
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
