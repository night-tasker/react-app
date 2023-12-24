import { API_USERS_URL } from "../paths";
import apiInstance from "./api-instance";

const getCurrentUserInfo = () => {
  return apiInstance.get(`${API_USERS_URL}/current`);
};

const UserService = { getCurrentUserInfo };

export default UserService;
