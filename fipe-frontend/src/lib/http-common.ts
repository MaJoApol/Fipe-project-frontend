import axios, { AxiosInstance} from "axios";
 
const BASE_URL = "http://localhost:3001"
console.log("AAAAAAAAAAAAAAAAAAAA,", BASE_URL)

export const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
}) as AxiosInstance