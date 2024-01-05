import apiInstance from "shared/api/base/api-instance";
import { API_USERS_URL } from "shared/config/paths";

const getCurrentUser = () => {
  return apiInstance.get(`${API_USERS_URL}/current`);
};

const UserService = { getCurrentUser };

export default UserService;
