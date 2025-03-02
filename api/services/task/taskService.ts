import axios from "axios";
import api from "../../api";

type TaskProps = {
  name?: string;
  description?: string;
  completed?: boolean;
};

export const TaskService = {
  update: async (id: string, body: TaskProps) => {
    console.log("entrou aqui");
    try {
      const { data } = await api.patch(`/task/${id}`, body);
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
