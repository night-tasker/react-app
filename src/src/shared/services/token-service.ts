import { Token } from "shared/api/typicode/models/token";
import { API_USERS_URL } from "../config/paths";
import { updateToken } from "entities/user/model/token";
import apiInstance from "shared/api/base/api-instance";

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

const getToken = () => {
  const token: Token | null = JSON.parse(localStorage.getItem("user")!);
  return token
    ? { accessToken: token.accessToken, refreshToken: token.refreshToken }
    : { accessToken: null, refreshToken: null };
};

const TokenService = { setToken, clearToken, refreshToken, getToken };

export default TokenService;
