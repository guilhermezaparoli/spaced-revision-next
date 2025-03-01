import axios from "axios"

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDE4Y2U2LWM3YjgtNDFlNS04MWFlLTEyZDM1YWQ5OWM3ZCIsIm5hbWUiOiJHdWlsaGVybWUiLCJlbWFpbCI6Imd1aWxoZXJtZXphcGFzQGdtYWlsLmNvbSIsImlhdCI6MTc0MDcwMzk5OCwiZXhwIjoxNzQwNzQ3MTk4LCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIiwic3ViIjoiNWY0MThjZTYtYzdiOC00MWU1LTgxYWUtMTJkMzVhZDk5YzdkIn0.VtJzHRtFGbUtr6a0ryDUa5TcH-Rd1BuiLnJpEUgOaiA`
  },
  withCredentials: true
  
})

export default api