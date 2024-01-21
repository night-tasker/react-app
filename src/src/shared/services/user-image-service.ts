import { AxiosPromise } from "axios";
import apiInstance from "shared/api/base/api-instance";
import {
  ActiveUserImage,
  UserImage,
} from "shared/api/typicode/models/user-image";
import { API_USER_IMAGES_URL } from "shared/config/paths";

const getCurrentUserActiveImage = (): AxiosPromise<ActiveUserImage> => {
  return apiInstance.get(`${API_USER_IMAGES_URL}/current-user/active/url`);
};

const getCurrentUserActiveImages = (): AxiosPromise<{
  images: UserImage[];
}> => {
  return apiInstance.get(`${API_USER_IMAGES_URL}/current-user/url`);
};

const uploadCurrentUserImage = (image: File): AxiosPromise => {
  const formFile = new FormData();
  formFile.append("file", image);
  return apiInstance.post(
    `${API_USER_IMAGES_URL}/current-user/upload`,
    formFile
  );
};

const removeCurrentUserImage = (userImageId: string): AxiosPromise => {
  return apiInstance.delete(
    `${API_USER_IMAGES_URL}/current-user/${userImageId}`
  );
};

const setActiveCurrentUserImage = (userImageId: string): AxiosPromise => {
  return apiInstance.post(
    `${API_USER_IMAGES_URL}/current-user/active/${userImageId}`
  );
};

const UserImageService = {
  getCurrentUserActiveImage,
  getCurrentUserActiveImages,
  removeCurrentUserImage,
  uploadCurrentUserImage,
  setActiveCurrentUserImage,
};

export default UserImageService;
