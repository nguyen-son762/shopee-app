import store from "app/store";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "@env";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const authInterceptor = (request: AxiosRequestConfig) => {
  const requestConfig = request as any;
  const access_token = store.getState().auth.user?.access_token;

  if (access_token && requestConfig.headers) {
    requestConfig.headers.Authorization = `Bearer ${access_token}`;
  }

  return requestConfig;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor);
