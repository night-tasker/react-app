import apiInstance, { API_URL } from "./api-instance";

const getCurrentUserInfo = () => {
  return apiInstance.get(API_URL + "current");
};

const UserService = { getCurrentUserInfo };

export default UserService;
