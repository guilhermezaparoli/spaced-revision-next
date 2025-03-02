import axios from "axios";
import api from "../../api";



type Subject = {
    name: string;
    interval?: number[];
}

export const SubjectService = {
    getAll: async () => {
        console.log("entrou aqui")
        try {
            const {data} = await api.get('/subject');
            return data
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
               throw new Error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
            }
        }
    },
    create: async (body: Subject) => {
        try {
            const {data} = await api.post('/subject/create', body);
            return data
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
               throw new Error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
            }
        }
    }
}