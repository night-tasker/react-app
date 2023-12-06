import { RegisterUser } from "../types/user/register-user";
import axiosInstance, { API_URL } from "./api-instance";
import { LoginUser } from "../types/user/login-user";
import TokenService from "./token-service";

const register = (user: RegisterUser) => {
  return axiosInstance.post(API_URL + "register", user);
};

const login = (user: LoginUser) => {
  return axiosInstance.post(API_URL + "login", user).then((response) => {
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
