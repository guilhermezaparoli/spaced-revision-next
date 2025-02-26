import axios from "axios";
import api from "../api/api";

export const SubjectService = {
    getSubjects: async () => {
        try {
            const response = await api.get('http://localhost:3000/api/subjects');
            return {
                status: 200,
                message: 'Success',
            }
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
               throw new Error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
            }
        }
    }
}