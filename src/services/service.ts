import axios from "axios";

export const BASE_URL = "https://api.saivalentine.com";

export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})