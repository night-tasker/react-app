import axios, { AxiosError, AxiosResponse } from "axios";
import { API_USERS_URL } from "shared/config/paths";
import TokenService from "shared/services/token-service";
import { Token } from "../typicode/models/token";
import { AlertMessageService } from "shared/services/alert-message-service";

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
    ? AlertMessageService.showSuccessMessage(response.data.displayMessage)
    : AlertMessageService.showSuccessMessage(defaultSuccessRequestMessage);

export const handleFailedRequest = (
  error: AxiosError<{ displayMessage: string }>
) =>
  error.response?.data?.displayMessage
    ? AlertMessageService.showErrorMessage(error.response?.data?.displayMessage)
    : AlertMessageService.showErrorMessage(defaultErrorRequestMessage);

export default axiosInstance;
