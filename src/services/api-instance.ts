import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Token } from "../types/user/token";
import TokenService from "./token-service";

export const API_URL = "http://localhost:5000/api/v1/users/";

const defaultSuccessRequestMessage = "Успешно";
const defaultErrorRequestMessage = "Что-то пошло не так";

let axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
  const token = JSON.parse(localStorage.getItem("user")!) as Token;
  if (token) {
    request.headers.Authorization = "bearer " + token.accessToken;
  }

  return request;
});

let refreshTokenRetry = 0;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (refreshTokenRetry < 3) {
        await TokenService.refreshToken();
        refreshTokenRetry++;
      } else {
        refreshTokenRetry = 0;
      }
    }
    return Promise.reject(error);
  }
);

export const handleSuccessRequest = (response: AxiosResponse) =>
  response?.data?.displayMessage
    ? message.success(response.data.displayMessage)
    : message.success(defaultSuccessRequestMessage);

export const handleFailedRequest = (
  error: AxiosError<{ displayMessage: string }>
) =>
  error.response?.data?.displayMessage
    ? message.error(error.response?.data?.displayMessage)
    : message.error(defaultErrorRequestMessage);

export default axiosInstance;
