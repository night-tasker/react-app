import apiInstance from "shared/api/base/api-instance";
import { API_USERS_URL } from "shared/config/paths";

const getCurrentUserInfo = () => {
  return apiInstance.get(`${API_USERS_URL}/current`);
};

const UserService = { getCurrentUserInfo };

export default UserService;
