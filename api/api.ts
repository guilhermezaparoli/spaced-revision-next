import axios from "axios"

console.log(process.env.NEXT_PUBLIC_BASE_URL)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
  withCredentials: true
  
})

export default api