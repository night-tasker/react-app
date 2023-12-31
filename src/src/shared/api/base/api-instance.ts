import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_USERS_URL } from "shared/config/paths";
import TokenService from "shared/services/token-service";
import { Token } from "../typicode/models/token";

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (error.config.url === `${API_USERS_URL}/refresh-token`) {
        TokenService.clearToken();
        return Promise.resolve();
      }

      await TokenService.refreshToken();
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
