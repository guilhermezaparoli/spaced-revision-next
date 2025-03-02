import axios from "axios";
import api from "../../api";

export const SubjectService = {
    getSubjects: async () => {
        console.log("entrou aqui")
        try {
            const {data} = await api.get('http://localhost:3000/subject');
            return data
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
               throw new Error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
            }
        }
    }
}