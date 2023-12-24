import { getToken } from "../lib/get-token";
import { API_USERS_URL } from "../paths";
import { updateToken } from "../store/user/token";
import { Token } from "../types/user/token";
import apiInstance from "./api-instance";

const setToken = (token: Token) => {
  const tokenString = JSON.stringify(token);
  localStorage.setItem("user", tokenString);
  updateToken();
};

const clearToken = () => {
  localStorage.removeItem("user");
  updateToken();
};

const refreshToken = async () => {
  const response = await apiInstance.post(
    `${API_USERS_URL}/refresh-token`,
    getToken()
  );

  if (response.data.accessToken) {
    setToken(response.data);
    updateToken();
  }
};

const TokenService = { setToken, clearToken, refreshToken };

export default TokenService;
