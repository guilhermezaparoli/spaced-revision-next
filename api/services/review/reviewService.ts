import axios from "axios";
import api from "../../api";
import { Review } from "@/@types/review";

export const ReviewService = {
  update: async ({ id, completed }: Review) => {
    try {
      const { data } = await api.put(`/review/${id}`, {
        completed,
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
