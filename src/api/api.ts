import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

api.interceptors.response.use(responseInterceptor);
