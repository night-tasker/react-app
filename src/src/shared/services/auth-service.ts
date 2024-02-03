import { RegisterUser } from "features/registration/registration-form/config/models/register-user";
import { LoginUser } from "features/login/login-form/config/models/login-user";
import TokenService from "./token-service";
import { API_USERS_URL } from "../config/paths";
import axiosInstance from "shared/api/base/api-instance";

const register = (user: RegisterUser) => {
  return axiosInstance.post(`${API_USERS_URL}/register`, user);
};

const login = (user: LoginUser) => {
  return axiosInstance.post(`${API_USERS_URL}/login`, user).then((response) => {
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
