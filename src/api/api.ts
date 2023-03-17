import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://10.10.150.212:5000/api/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

api.interceptors.response.use(responseInterceptor);
