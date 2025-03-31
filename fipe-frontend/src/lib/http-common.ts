import axios, { AxiosInstance} from "axios";

console.log(process.env.NEXTAUTH_URL)

const BASE_URL = process.env.NEXTAUTH_URL
export const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
}) as AxiosInstance