import { RegisterUser } from "../types/user/register-user";
import axiosInstance from "./api-instance";
import { LoginUser } from "../types/user/login-user";
import TokenService from "./token-service";
import { PASSPORT_API_USERS_URL } from "../paths";

const register = (user: RegisterUser) => {
  return axiosInstance.post(`${PASSPORT_API_USERS_URL}/register`, user);
};

const login = (user: LoginUser) => {
  return axiosInstance
    .post(`${PASSPORT_API_USERS_URL}/login`, user)
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setToken(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.clearToken();
};

const AuthService = { register, login, logout };

export default AuthService;
