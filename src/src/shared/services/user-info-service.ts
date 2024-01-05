import apiInstance from "shared/api/base/api-instance";
import { CurrentUserInfo } from "shared/api/typicode/models/user-info";
import { API_USER_INFOS_URL } from "shared/config/paths";

const getCurrentUserInfo = () => {
  return apiInstance.get(`${API_USER_INFOS_URL}/current`);
};

const updateCurrentUserInfo = (userInfo: CurrentUserInfo) => {
  return apiInstance.put(`${API_USER_INFOS_URL}/current`, userInfo);
};

const UserInfoService = { getCurrentUserInfo, updateCurrentUserInfo };

export default UserInfoService;
