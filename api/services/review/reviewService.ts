import axios from "axios";
import api from "../../api";

export const ReviewService = {
    updateReview: async (id: string) => {
        console.log("entrou aqui")
        try {
            const {data} = await api.get(`/review/${id}`);
            return data
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
               throw new Error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
            }
        }
    }
}