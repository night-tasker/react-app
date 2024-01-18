import { AxiosPromise } from "axios";
import apiInstance from "shared/api/base/api-instance";
import { UserImage } from "shared/api/typicode/models/user-image";
import { API_USER_IMAGES_URL } from "shared/config/paths";

const getCurrentUserImage = (): AxiosPromise<UserImage> => {
  return apiInstance.get(`${API_USER_IMAGES_URL}/current-user/url`);
};

const UserImageService = { getCurrentUserImageUrl: getCurrentUserImage };

export default UserImageService;
